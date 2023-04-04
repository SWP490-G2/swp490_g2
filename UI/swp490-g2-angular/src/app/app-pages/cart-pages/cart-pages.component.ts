import { Component, OnInit } from "@angular/core";
import { CartItem, CartService } from "src/app/service/cart.service";

@Component({
  selector: "app-cart-pages",
  templateUrl: "./cart-pages.component.html",
  styleUrls: ["./cart-pages.component.scss"],
})
export class CartPagesComponent implements OnInit {
  cartItems: CartItem[];
  totalPrice = 0;
  message = "";
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItemsObservable().subscribe((items) => {
      this.cartItems = items;
      if (this.cartItems.length > 0) {
        this.cartItems
          .map((item) => item.price * item.quantity)
          .reduce(
            (prevPrice, currPrice) => (this.totalPrice = prevPrice + currPrice)
          );
      } else {
        this.message = "Your cart is empty";
      }
    });
  }
}
