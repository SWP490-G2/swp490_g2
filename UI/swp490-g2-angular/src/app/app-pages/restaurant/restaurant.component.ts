import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Restaurant, RestaurantClient } from "src/app/ngswag/client";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.scss"],
})
export class RestaurantComponent implements OnInit {
  items: MenuItem[];
  restaurant?: Restaurant;

  constructor(
    private $router: Router,
    private $route: ActivatedRoute,
    private $restaurantClient: RestaurantClient
  ) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );
    $restaurantClient
      .getById(id)
      .subscribe((restaurant) => (this.restaurant = restaurant));
  }

  ngOnInit() {
    this.items = [
      { label: "Add New", icon: "pi pi-fw pi-plus" },
      { label: "Remove", icon: "pi pi-fw pi-minus" },
    ];
  }
}
