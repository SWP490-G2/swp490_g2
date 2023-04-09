import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
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

  constructor(private cartService: CartService, private $productClient: ProductClient, private $message: MessageService, private $confirmation: ConfirmationService,) { }
  ngOnInit(): void {
    this.cartService.getOrderObservable().subscribe(order => this.order = order);
  }
  get initialized(): boolean {
    return true;
  }

  addToCart(product: Product, quantity: number): void {
    if (
      this.order?.orderProductDetails?.length &&
      this.restaurant.products?.every(p => this.order?.orderProductDetails?.every(opd => opd.productId !== p.id))
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

    this.cartService.addToCart(orderProductDetail);
    this.$message.add({
      severity: "success",
      summary: "Success",
      detail: `Product [${product.productName}] with quantity = ${quantity} is added to cart!`
    });
  }

  delete(product: Product) {
    if (!this.restaurant.id)
      return;

    this.$confirmation.confirm({
      message:
        "Are you sure to delete this product?",
      accept: () => {
        this.$productClient.deleteProductById(this.restaurant.id!, product.id!).subscribe(() => {
          this.productDeleted.emit();
          this.$message.add({
            severity: "success",
            summary: "Success",
            detail: `Product [${product.productName}] has been deleted!`
          });
        });
      },
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
