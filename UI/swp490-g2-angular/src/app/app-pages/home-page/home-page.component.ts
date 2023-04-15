import { Component, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService, MenuItem, MessageService } from "primeng/api";
import { AuthService } from "src/app/global/auth.service";
import { Order, OrderProductDetail, Product, ProductCategory, ProductClient, Restaurant, User } from "src/app/ngswag/client";
import { CartService } from "src/app/service/cart.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html"
})
export class HomePageComponent implements OnInit {
  user?: User;
  @Input() restaurant: Restaurant;
  order: Order | undefined;
  productId: number | undefined;
  products: Product[];
  product: Product = new Product({
    categories: [],
    images: [],
    productStatus: "ACTIVE"
  });

  productCategoryNames: string[] = [];
  allCategories: ProductCategory[] = [];
  responsiveOptions: any[];

  constructor(
    private $router: Router,
    private $route: ActivatedRoute,
    private $title: Title,
    private $auth: AuthService,
    private $cart: CartService,
    private $productClient: ProductClient,
    private $message: MessageService,
    private $confirmation: ConfirmationService
  ) {
    $title.setTitle("Home");
    $auth.getCurrentUser().subscribe((user) => (this.user = user));
  }
  items!: MenuItem[];
  ngOnInit(): void {}

  get initialized(): boolean {
    return true;
  }

  addToCart(product: Product, quantity: number): void {
    if (
      this.order?.orderProductDetails?.length &&
      this.restaurant.id !== this.$cart.restaurant$.value?.id
    ) {
      this.$message.add({
        severity: "error",
        summary: "Error",
        detail: "You need to empty the cart before do this action!"
      });

      return;
    }

    const orderProductDetail: OrderProductDetail = new OrderProductDetail({
      productId: product.id,
      quantity: quantity,
      price: product.price,
    });

    this.$cart.addToCart(orderProductDetail, this.restaurant);
    this.$message.add({
      severity: "success",
      summary: "Success",
      detail: `Product [${product.productName}] with quantity = ${quantity} is added to cart!`
    });
  }

  getProductStatus(product: Product): {
    name: string,
    textColor: string
  } | undefined {
    switch (product.productStatus) {
      case "ACTIVE":
        return {
          name: "Available",
          textColor: "text-green-500"
        };

      case "OUT_OF_STOCK":
        return {
          name: "Out of stock",
          textColor: "text-red-500"
        }
    }

    return undefined
  }

  changeProductCategory(productCategoryNames: string[]) {
    if (!this.product.categories) {
      return;
    }

    this.product.categories.forEach(c => {
      if (productCategoryNames.every(pcn => pcn !== c.productCategoryName)) {
        this.product.categories = this.product.categories?.filter(c2 => c2.id !== c.id);
      }
    });

    productCategoryNames.forEach(pcn => {
      const category = this.allCategories?.find(c => c.productCategoryName === pcn)
      if (category) {
        if (this.product.categories?.every(c => c.id !== category.id)) {
          this.product.categories.push(category);
        }
      } else {
        if (this.product.categories?.every(c => c.productCategoryName !== pcn)) {
          this.product.categories?.push(new ProductCategory({
            productCategoryName: pcn
          }));
        }
      }
    })

    this.productCategoryNames = [...this.product.categories.map(c => c.productCategoryName!)];
  }

  navToLogin() {
    this.$router.navigate(["auth", "login"], { relativeTo: this.$route });
  }

  navToRegister() {
    this.$router.navigate(["auth", "register"], { relativeTo: this.$route });
  }

  navToForgotPassword() {
    this.$router.navigate(["auth", "forgot-password"], {
      relativeTo: this.$route,
    });
  }

  navToFeed() {
    this.$router.navigate(["feed-page"], { relativeTo: this.$route });
  }

  userExisted(): boolean {
    // !! giup ep kieu sang boolean
    return !!(this.user && this.user.email);
  }
}
