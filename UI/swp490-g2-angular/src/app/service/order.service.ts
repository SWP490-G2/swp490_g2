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

  toOrder(obj: any): Order {
    const order = new Order(obj);
    order.orderProductDetails = order.orderProductDetails?.map((opd) => {
      const result = new OrderProductDetail(opd);
      result.product = new Product(result.product);
      result.product.categories = result.product.categories?.map(
        (c) => new ProductCategory(c)
      );

      result.product.images = result.product.images?.map((i) => new File(i));

      return result;
    });

    return order;
  }
}
