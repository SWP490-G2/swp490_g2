import { Component } from "@angular/core";
import { AllRes } from "src/app/utils/allres";

@Component({
  selector: "app-view-all-restaurant",
  templateUrl: "./view-all-restaurant.component.html",
})
export class ViewAllRestaurantComponent {
  resOpening: AllRes[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
}
