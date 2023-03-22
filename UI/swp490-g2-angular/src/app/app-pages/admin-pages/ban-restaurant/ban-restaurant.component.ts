import { Component, OnInit } from "@angular/core";
import { AllUsers } from "src/app/utils/allusers";

@Component({
  selector: "app-ban-restaurant",
  templateUrl: "./ban-restaurant.component.html",
})
export class BanRestaurantComponent implements OnInit {
  userList: AllUsers[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
}
