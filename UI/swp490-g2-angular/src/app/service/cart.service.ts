import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Order, OrderClient, OrderProductDetail, Restaurant } from "../ngswag/client";
import { AuthService } from "../global/auth.service";
import { getLocal, removeLocal, setLocal } from "../utils";

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
  restaurant$ = new BehaviorSubject<Restaurant | undefined>(undefined);
  private CART_STORAGE_KEY = "";
  private RESTAURANT_STORAGE_KEY = "";

  constructor(private $auth: AuthService, private $orderClient: OrderClient) {
    $auth.getCurrentUser().subscribe((user) => {
      if (!user)
        return;

      this.CART_STORAGE_KEY = `order/${user.id}`;
      this.RESTAURANT_STORAGE_KEY = `order/restaurant/${user.id}`;
      const order = new Order(getLocal(this.CART_STORAGE_KEY));
      order.orderProductDetails = order.orderProductDetails?.map(opd => new OrderProductDetail(opd));
      this.order$.next(order);

      const restaurant = new Restaurant(getLocal(this.RESTAURANT_STORAGE_KEY));
      this.restaurant$.next(restaurant);
    });

  }

  addToCart(orderProductDetail: OrderProductDetail, restaurant: Restaurant) {
    this.restaurant$.next(restaurant);
    setLocal(this.RESTAURANT_STORAGE_KEY, restaurant.toJSON());

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

    if (!order.orderProductDetails.length) {
      this.restaurant$.next(undefined);
      removeLocal(this.RESTAURANT_STORAGE_KEY);
    }
  }

  clearCart() {
    const order = this.order$.value;
    if (!order.orderProductDetails)
      return;

    order.orderProductDetails.length = 0;
    this.order$.next(order);
    setLocal(this.CART_STORAGE_KEY, order.toJSON());

    this.restaurant$.next(undefined);
    removeLocal(this.RESTAURANT_STORAGE_KEY);
  }

  getOrderObservable(): Observable<Order> {
    return this.order$.asObservable();
  }

  addOrder(): Observable<string> {
    const order = this.order$.value;
    return this.$orderClient.insert(order)
      .pipe(
        tap(() => this.clearCart())
      )
      ;
  }
}
