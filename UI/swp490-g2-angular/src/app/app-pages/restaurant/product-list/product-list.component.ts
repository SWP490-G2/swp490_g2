import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Product, ProductClient } from "src/app/ngswag/client";
import { CartItem, CartService } from "src/app/service/cart.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() restaurantId: number;
  @Output() productDeleted = new EventEmitter();

  constructor(private cartService: CartService, private $productClient: ProductClient, private $message: MessageService, private $confirmation: ConfirmationService,) { }
  ngOnInit(): void { }
  get initialized(): boolean {
    return true;
  }

  addToCart(product: any): void {
    const cartItem: CartItem = {
      id: product.id,
      name: product.productName,
      price: product.price,
      quantity: 1,
    };
    this.cartService.addToCart(cartItem);
  }

  delete(product: Product) {
    this.$confirmation.confirm({
      message:
        "Are you sure to delete this product?",
      accept: () => {
        this.$productClient.deleteProductById(this.restaurantId, product.id!).subscribe(() => {
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
}
