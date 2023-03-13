import { Component, Input } from "@angular/core";
import { Product, RestaurantClient } from "src/app/ngswag/client";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent {
  @Input() products: Product[] = [];

  constructor() {}

  get initialized(): boolean {
    return true;
  }
}
