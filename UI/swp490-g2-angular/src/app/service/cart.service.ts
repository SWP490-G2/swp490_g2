import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Order, OrderProductDetail } from "../ngswag/client";
import { AuthService } from "../global/auth.service";
import { getLocal, setLocal } from "../utils";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  private order$ = new BehaviorSubject<Order>(new Order());
  private CART_STORAGE_KEY = "";

  constructor(private $auth: AuthService) {
    $auth.getCurrentUser().subscribe((user) => {
      if (!user)
        return;

      this.CART_STORAGE_KEY = `order/${user.id}`
      const order = new Order(getLocal(this.CART_STORAGE_KEY));
      order.orderProductDetails = order.orderProductDetails?.map(opd => new OrderProductDetail(opd));
      this.order$.next(order);
    });

  }

  addToCart(orderProductDetail: OrderProductDetail) {
    const order = this.order$.value;
    if (!order.orderProductDetails)
      order.orderProductDetails = [];

    const existed = order.orderProductDetails.some((opd, index) => {
      if (opd.productId === orderProductDetail.productId) {
        if (orderProductDetail.quantity) {
          order.orderProductDetails![index] = orderProductDetail.clone();
        } else {
          order.orderProductDetails?.splice(index, 1);
        }

        return true;
      }

      return false;
    });

    if (!existed) {
      order.orderProductDetails.push(orderProductDetail);
    }

    this.order$.next(order);
    setLocal(this.CART_STORAGE_KEY, order.toJSON());
  }

  removeFromCart(orderProductDetail: OrderProductDetail) {
    const order = this.order$.value;
    if (!order.orderProductDetails)
      return;

    const index = order.orderProductDetails.findIndex((i) => i.id === orderProductDetail.id);
    if (index >= 0) {
      order.orderProductDetails.splice(index, 1);
      this.order$.next(order);
      setLocal(this.CART_STORAGE_KEY, order.toJSON());
    }
  }

  clearCart() {
    const order = this.order$.value;
    if (!order.orderProductDetails)
      return;

    order.orderProductDetails.length = 0;
    this.order$.next(order);
    setLocal(this.CART_STORAGE_KEY, order.toJSON());
  }

  getOrderObservable(): Observable<Order> {
    return this.order$.asObservable();
  }
}
