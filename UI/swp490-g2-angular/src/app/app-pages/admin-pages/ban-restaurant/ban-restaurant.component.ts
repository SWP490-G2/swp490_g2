import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ban-restaurant",
  templateUrl: "./ban-restaurant.component.html",
})
export class BanRestaurantComponent implements OnInit {
  selectedReason: string[] = [];
  checked = false;
  ngOnInit(): void {}
}
