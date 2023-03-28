import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { forkJoin, Observable, of, switchMap } from "rxjs";
import { AuthService } from "src/app/global/auth.service";
import {
  File,
  FilterRequest,
  PageProduct,
  Product,
  ProductCategory,
  ProductCategoryClient,
  ProductClient,
  Restaurant,
  RestaurantClient,
  SearchRequest,
  Seller,
  SellerClient,
  SortRequest,
  User,
} from "src/app/ngswag/client";
import { getFullAddress } from "src/app/utils";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.scss"],
})
export class RestaurantComponent implements OnInit {
  items: MenuItem[];
  restaurant?: Restaurant;
  restaurantId: number;
  uploadUrl: string;
  user?: User;
  categories: ProductCategory[] = [];
  selectedCategoryIds: number[] = [];
  originalSelectedCategoryIds: number[] = [];
  products: Product[] = [];
  priceRange: number[] = [0, 0];
  selectedPriceRange: number[] = [0, 0];
  currentPage = 0;
  private pageSize = 8;
  totalPages = 0;
  private timeout?: number;
  private isFulltextSearching = false;
  fulltext = "";
  sorts: SortRequest[] = [
    new SortRequest({
      key: "productName",
      direction: "ASC",
    }),
  ];

  constructor(
    private $route: ActivatedRoute,
    private $restaurantClient: RestaurantClient,
    private $auth: AuthService,
    private $productCategoryClient: ProductCategoryClient,
    private $productClient: ProductClient,
    private $sellerClient: SellerClient
  ) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );

    this.uploadUrl = "restaurant/update-avatar/" + id;
    this.restaurantId = id;
    this.refresh();
  }

  ngOnInit() {
    this.items = [
      { label: "Add New", icon: "pi pi-fw pi-plus" },
      { label: "Remove", icon: "pi pi-fw pi-minus" },
    ];
  }

  refresh() {
    this.$restaurantClient
      .getById(this.restaurantId)
      .subscribe((restaurant) => {
        this.restaurant = restaurant;
      });

    forkJoin([
      this.$productCategoryClient.getAllByRestaurantId(this.restaurantId),
      this.$productClient.getProductPriceRangesByRestaurantId(
        this.restaurantId
      ),
    ])
      .pipe(
        switchMap(([categories, priceRange]) => {
          this.categories = categories;
          this.selectedCategoryIds = this.categories.map((c) => c.id!);
          this.originalSelectedCategoryIds = [...this.selectedCategoryIds];

          this.priceRange = priceRange;
          this.selectedPriceRange = [...this.priceRange];

          return this.productSearch();
        })
      )
      .subscribe((productPage) => {
        this.products = productPage.content!;
        this.totalPages = productPage.totalPages!;
      });

    this.$auth
      .getCurrentUser()
      .pipe(
        switchMap((user) => {
          this.user = user;
          if (this.user?.id && this.user?.role === "SELLER") {
            return this.$sellerClient.getById(this.user.id).pipe(
              switchMap((seller) => {
                this.user = seller;
                return of();
              })
            );
          }

          return of();
        })
      )
      .subscribe();
  }

  private productSearch(): Observable<PageProduct> {
    return this.$productClient.search(
      new SearchRequest({
        filters: [
          new FilterRequest({
            key1: "restaurant",
            key2: "id",
            operator: "EQUAL",
            fieldType: "LONG",
            value: this.restaurantId,
          }),
          new FilterRequest({
            key1: "categories",
            key2: "id",
            operator: "IN",
            fieldType: "LONG",
            values: this.selectedCategoryIds,
          }),
          new FilterRequest({
            key1: "price",
            operator: "BETWEEN",
            fieldType: "DOUBLE",
            value: this.selectedPriceRange[0],
            valueTo: this.selectedPriceRange[1],
          }),
        ],
        sorts: this.sorts,
        page: this.currentPage,
        size: this.pageSize,
      })
    );
  }

  updateAvatar(image: File) {
    if (!this.restaurant) return;

    this.restaurant.avatarFile = image;
    this.$restaurantClient
      .update(this.restaurant)
      .subscribe(() => location.reload());
  }

  get editable(): boolean {
    if (!this.user || !this.user.id) return false;
    if (this.user.role === "ADMIN") return true;
    if (
      this.user.role === "SELLER" &&
      (<Seller>this.user).restaurants?.some(
        (restaurant) => restaurant.id === this.restaurant?.id
      )
    ) {
      return true;
    }

    return false;
  }

  toggleAllCategories(selected: boolean) {
    if (selected) {
      this.selectedCategoryIds = [...this.originalSelectedCategoryIds];
      this.productSearch().subscribe((productPage) => {
        this.products = productPage.content!;
      });
    } else {
      this.selectedCategoryIds = [];
      this.products = [];
    }
  }

  changeFilter() {
    this.fulltext = "";
    this.isFulltextSearching = false;
    this.currentPage = 0;
    this.productSearch().subscribe((productPage) => {
      this.products = productPage.content!;
      this.totalPages = productPage.totalPages!;
    });
  }

  loadMore() {
    this.currentPage++;
    this.productSearch().subscribe((productPage) => {
      this.products = this.products.concat(productPage.content!);
    });
  }

  fulltextSearch() {
    window.clearTimeout(this.timeout);

    this.timeout = window.setTimeout(() => {
      const text = this.fulltext;
      if (text.trim().length === 0) {
        this.changeFilter();
        return;
      }

      this.isFulltextSearching = true;
      this.selectedCategoryIds = [...this.originalSelectedCategoryIds];
      this.selectedPriceRange = [...this.priceRange];
      this.$productClient
        .fulltextSearch(text, this.restaurantId)
        .subscribe((products) => {
          this.products = products;
        });
    }, 300);
  }

  get loadMoreShown(): boolean {
    if (this.isFulltextSearching) return false;
    return this.currentPage < this.totalPages - 1;
  }

  onSortByChange(sortRequest: SortRequest) {
    this.sorts = [sortRequest];
    this.changeFilter();
  }

  get fullAddress(): string {
    return getFullAddress(this.restaurant?.address);
  }
}

/**
 * Toan: 1, 3, 4
 * Long: 1, 2, 5
 * this.restaurant: 3
 * this.user: Toan
 */
