import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { FileUploadService } from "src/app/global/file-upload.service";
import { Restaurant, RestaurantClient } from "src/app/ngswag/client";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.scss"],
})
export class RestaurantComponent implements OnInit {
  items: MenuItem[];
  restaurant?: Restaurant;
  restaurantId: number;
  uploadUrl: string;

  constructor(
    private $route: ActivatedRoute,
    private $restaurantClient: RestaurantClient,
    private $fileUpload: FileUploadService) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );

    this.uploadUrl = "restaurant/update-avatar/" + id;
    this.restaurantId = id;
    this.refresh();
  }

  ngOnInit() {
    this.items = [
      { label: "Add New", icon: "pi pi-fw pi-plus" },
      { label: "Remove", icon: "pi pi-fw pi-minus" },
    ];
  }

  refresh() {
    this.$restaurantClient
      .getById(this.restaurantId)
      .subscribe((restaurant) => (this.restaurant = restaurant));
  }
}
