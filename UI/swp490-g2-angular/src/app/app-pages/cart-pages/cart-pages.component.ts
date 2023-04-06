import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  Order,
  OrderClient,
  OrderProductDetail,
  OrderStatus,
} from "src/app/ngswag/client";
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
  orderForm = this.fb.group({
    orderProductDetails: this.fb.array([this.createOrderProductDetail()]),
    orderStatus: "PENDING",
  });

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private $orderClient: OrderClient
  ) {}

  createOrderProductDetail(): FormGroup {
    return this.fb.group({
      productId: [1],
      quantity: [1],
      price: [120],
      note: [""],
    });
  }
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
  onSubmit(): void {
    const order = {
      orderProductDetails: this.orderForm.value.orderProductDetails,
      orderStatus: this.orderForm.value.orderStatus,
    };

    console.log(order);

    this.$orderClient
      .insert(
        new Order({
          orderProductDetails: order.orderProductDetails?.map(
            (o) => new OrderProductDetail(o)
          ),
          orderStatus: order.orderStatus as any,
        })
      )
      .subscribe((res) => console.log(res));
  }
}
