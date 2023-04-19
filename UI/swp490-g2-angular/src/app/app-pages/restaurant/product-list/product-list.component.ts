import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from "@angular/core";
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from "primeng/api";
import { AuthService } from "src/app/global/auth.service";
import {
  Order,
  OrderProductDetail,
  Product,
  ProductClient,
  Restaurant,
  User,
  UserClient,
} from "src/app/ngswag/client";
import { CartService } from "src/app/service/cart.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() restaurant: Restaurant;
  @Output() productDeleted = new EventEmitter();
  order: Order | undefined;
  deletedProduct: Product | undefined;
  currentUser?: User;
  isVisible = false;

  constructor(
    private $cart: CartService,
    private $productClient: ProductClient,
    private $message: MessageService,
    private $confirmation: ConfirmationService,
    private $zone: NgZone,
    private $userClient: UserClient,
    private $auth: AuthService,
  ) {}
  ngOnInit(): void {
    this.$userClient
      .getCurrentUser()
      .subscribe((user) => {
        this.currentUser = user;
        if (AuthService.isSeller(this.currentUser) || AuthService.isAdmin(this.currentUser)) this.isVisible = true;
      });
    this.$cart.getOrderObservable().subscribe((order) => (this.order = order));
  }
  get initialized(): boolean {
    return true;
  }

  addToCart(product: Product, quantity: number): void {
    if (!quantity) {
      throw new Error("Cannot add zero amount item to cart!");
    }

    if (
      this.order?.orderProductDetails?.length &&
      this.restaurant.id !== this.$cart.restaurant$.value?.id
    ) {
      throw new Error("You need to empty the cart before do this action!");
    }

    const orderProductDetail: OrderProductDetail = new OrderProductDetail({
      product: product,
      quantity: quantity,
      price: product.price,
    });

    this.$cart.addToCart(orderProductDetail, this.restaurant);

    this.$zone.run(() => {
      this.$message.add({
        severity: "success",
        summary: "Success",
        detail: `Product [${product.productName}] with quantity = ${quantity} is added to cart!`,
      });
    });
  }

  chooseProductToDelete(product: Product) {
    if (!this.restaurant.id) return;

    this.$confirmation.confirm({
      header: "Confirmation",
      message: "Are you sure to delete this product?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.$productClient
          .deleteProductById(this.restaurant.id!, product.id!)
          .subscribe(() => {
            this.productDeleted.emit();
            this.$message.add({
              severity: "success",
              summary: "Success",
              detail: `Product [${product.productName}] has been deleted!`,
            });
          });
      },
    });
  }

  getProductStatus(product: Product):
    | {
      name: string;
      textColor: string;
    }
    | undefined {
    switch (product.productStatus) {
      case "ACTIVE":
        return {
          name: "Available",
          textColor: "text-green-500",
        };

      case "OUT_OF_STOCK":
        return {
          name: "Out of stock",
          textColor: "text-red-500",
        };
    }

    return undefined;
  }

  getOrderProductDetail(product: Product): OrderProductDetail {
    if (
      !this.order ||
      !this.order.orderProductDetails ||
      this.order.orderProductDetails.every(
        (opd) => opd.product?.id !== product.id
      )
    ) {
      return new OrderProductDetail();
    }

    return this.order.orderProductDetails.find(
      (opd) => opd.product?.id === product.id
    )!;
  }
}
