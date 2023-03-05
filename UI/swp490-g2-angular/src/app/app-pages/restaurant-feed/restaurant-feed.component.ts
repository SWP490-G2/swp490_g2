import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-restaurant-feed",
  templateUrl: "./restaurant-feed.component.html",
  styleUrls: ["./restaurant-feed.component.scss"]
})
export class RestaurantFeedComponent implements OnInit{
  items: MenuItem[];

  ngOnInit() {
      this.items = [
          {label: "Add New", icon: "pi pi-fw pi-plus"},
          {label: "Remove", icon: "pi pi-fw pi-minus"}
      ];
  }
}
