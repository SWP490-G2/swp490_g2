import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Order, OrderProductDetail } from "../ngswag/client";
import { HttpClient } from "@angular/common/http";

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
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private readonly CART_STORAGE_KEY = "cartItems";
  private apiUrl = "http://localhost:8080";
  constructor(private http: HttpClient) {
    const storedCartItems = localStorage.getItem(this.CART_STORAGE_KEY);
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      this.cartItems.next(parsedCartItems);
    }
  }

  addToCart(item: CartItem) {
    const items = this.cartItems.value;
    const index = items.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      // The item already exists in the cart, so increase its quantity by 1
      items[index].quantity += 1;
    } else {
      // The item is new to the cart, so add it to the array
      items.push(item);
    }
    this.cartItems.next(items);
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
  }
  removeFromCart(item: CartItem) {
    const items = this.cartItems.value;
    const index = items.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      items.splice(index, 1);
      this.cartItems.next(items);
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
    }
  }

  clearCart() {
    this.cartItems.next([]);
    localStorage.setItem(this.CART_STORAGE_KEY, "");
  }

  getCartItemsObservable(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  insertOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/order/insert`, order);
  }
}
