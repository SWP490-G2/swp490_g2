import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-view-restaurant-details",
  templateUrl: "./view-restaurant-details.component.html"
})
export class ViewRestaurantDetailsComponent implements OnInit {
  ngOnInit(): void {}
  items: MenuItem[];
}
