import { Injectable } from "@angular/core";
import {
  File,
  Order,
  OrderProductDetail,
  Product,
  ProductCategory,
} from "../ngswag/client";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor() {}
}
