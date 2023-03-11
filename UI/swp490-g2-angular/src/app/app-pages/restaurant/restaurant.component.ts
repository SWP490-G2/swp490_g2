import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { AuthService } from "src/app/global/auth.service";
import {
  File,
  ProductCategory,
  Restaurant,
  RestaurantClient,
  User,
} from "src/app/ngswag/client";

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

  constructor(
    private $route: ActivatedRoute,
    private $restaurantClient: RestaurantClient,
    private $auth: AuthService
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
        if (this.restaurant.products) {
          let categories: ProductCategory[] = [];
          this.restaurant.products.map((product) => {
            if (product.categories) {
              categories = categories.concat(product.categories);
            }
          });

          this.categories = categories
            .filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.id === value.id)
            )
            .sort((a, b) => {
              if (!a.productCategoryName || !b.productCategoryName) return 0;

              return a.productCategoryName?.localeCompare(
                b.productCategoryName
              );
            });
        }
      });

    this.$auth.getCurrentUser().subscribe((user) => (this.user = user));
  }

  updateAvatar(image: File) {
    if (!this.restaurant) return;

    this.restaurant.avatarFile = image;
    this.$restaurantClient
      .update(this.restaurant)
      .subscribe(() => location.reload());
  }

  canEditImage(): boolean {
    return true;

    // if (!this.user || !this.user.id) return false;
    // if (this.user.role === "ADMIN") return true;
    // if (
    //   this.user.role === "SELLER" &&
    //   (<Seller>this.user).restaurants?.some(
    //     (restaurant) => restaurant.id === this.restaurant?.id
    //   )
    // ) {
    //   return true;
    // }

    // return false;
  }
}

/**
 * Toan: 1, 3, 4
 * Long: 1, 2, 5
 * this.restaurant: 3
 * this.user: Toan
 */
