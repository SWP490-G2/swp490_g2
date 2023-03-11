import { Component, Input } from "@angular/core";
import { Product, Restaurant, RestaurantClient } from "src/app/ngswag/client";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent {
  @Input() restaurant: Restaurant;

  constructor(private $restaurantClient: RestaurantClient) {}

  get initialized(): boolean {
    return true;
  }
}
