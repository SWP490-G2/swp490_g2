import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
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
  SortRequest,
  User,
  UserClient,
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
  isOpening = true;
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
    private $userClient: UserClient,
    private $title: Title,
    private router: Router
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
      .pipe(
        switchMap((restaurant) => {
          this.restaurant = restaurant;
          if (this.restaurant.restaurantName)
            this.$title.setTitle(this.restaurant.restaurantName);

          return forkJoin([
            this.$productCategoryClient.getAllByRestaurantId(this.restaurantId),
            this.$productClient.getProductPriceRangesByRestaurantId(
              this.restaurantId
            ),
          ])
        }),
        switchMap(([categories, priceRange]) => {
          this.categories = categories;
          this.selectedCategoryIds = this.categories.map((c) => c.id!);
          this.originalSelectedCategoryIds = [...this.selectedCategoryIds];

          this.priceRange = priceRange;
          this.selectedPriceRange = [...this.priceRange];

          return this.productSearch();
        }),
        switchMap((productPage) => {
          this.products = productPage.content!;
          this.totalPages = productPage.totalPages!;
          return of();
        })
      )
      .subscribe();



    this.$auth
      .getCurrentUser()
      .pipe(
        switchMap((user) => {
          this.user = user;
          if (this.user?.id && AuthService.isSeller(this.user)) {
            return this.$userClient.getById(this.user.id).pipe(
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
    const filters = [
      new FilterRequest({
        key1: "id",
        operator: "IN",
        fieldType: "LONG",
        values: this.restaurant?.products?.map(p => p.id),
      }),
    ];

    if (this.selectedCategoryIds.length > 0) {
      filters.push(new FilterRequest({
        key1: "categories",
        key2: "id",
        operator: "IN",
        fieldType: "LONG",
        values: this.selectedCategoryIds,
      }),);
    }

    if (this.selectedPriceRange?.length > 1
      && this.selectedPriceRange[0]
      && this.selectedPriceRange[1]
    ) {
      filters.push(new FilterRequest({
        key1: "price",
        operator: "BETWEEN",
        fieldType: "DOUBLE",
        value: this.selectedPriceRange[0],
        valueTo: this.selectedPriceRange[1],
      }));
    }

    return this.$productClient.search(
      new SearchRequest({
        filters: filters,
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
    if (AuthService.isAdmin(this.user)) return true;
    if (
      AuthService.isSeller(this.user) &&
      this.user.restaurants?.some(
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
    } else {
      this.selectedCategoryIds = [];
    }

    this.productSearch().subscribe((productPage) => {
      this.products = productPage.content!;
    });
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
  navigateAddItem() {
    this.router.navigate(["restaurant", this.restaurantId, "add-product"]);
  }
}

/**
 * Toan: 1, 3, 4
 * Long: 1, 2, 5
 * this.restaurant: 3
 * this.user: Toan
 */
