import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ConfirmEventType, ConfirmationService, MessageService } from "primeng/api";
import { Order, OrderProductDetail, Product, ProductClient, Restaurant } from "src/app/ngswag/client";
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
  deleteProductDialogVisible = false;
  deletedProduct: Product | undefined;

  constructor(private $cart: CartService, private $productClient: ProductClient, private $message: MessageService, private $confirmation: ConfirmationService,) { }
  ngOnInit(): void {
    this.$cart.getOrderObservable().subscribe(order => this.order = order);
  }
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

  chooseProductToDelete(product: Product) {
    if (!this.restaurant.id)
    return;
    
    this.deleteProductDialogVisible = true;
    this.deletedProduct = product;
  }

  deleteProduct(confirmEventType: ConfirmEventType) {
    this.deleteProductDialogVisible = false;
    if (confirmEventType !== ConfirmEventType.ACCEPT || !this.deletedProduct)
      return;

    this.$productClient.deleteProductById(this.restaurant.id!, this.deletedProduct.id!).subscribe(() => {
      this.productDeleted.emit();
      this.$message.add({
        severity: "success",
        summary: "Success",
        detail: `Product [${this.deletedProduct?.productName}] has been deleted!`
      });
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

  getOrderProductDetail(product: Product): OrderProductDetail {
    if (!this.order
      || !this.order.orderProductDetails
      || this.order.orderProductDetails.every(opd => opd.productId !== product.id)
    ) {
      return new OrderProductDetail();
    }

    return this.order.orderProductDetails.find(opd => opd.productId === product.id)!;
  }
}
