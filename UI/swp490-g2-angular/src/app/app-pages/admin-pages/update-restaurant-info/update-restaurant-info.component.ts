import { Component, OnInit } from "@angular/core";
import { AllRes } from "src/app/utils/allres";

@Component({
  selector: "app-update-restaurant-info",
  templateUrl: "./update-restaurant-info.component.html",
})
export class UpdateRestaurantInfoComponent implements OnInit {
  resOpening: AllRes[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
}
