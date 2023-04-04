import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/ngswag/client";
import { CartItem, CartService } from "src/app/service/cart.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];

  constructor(private cartService: CartService) {}
  ngOnInit(): void {}
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
}
