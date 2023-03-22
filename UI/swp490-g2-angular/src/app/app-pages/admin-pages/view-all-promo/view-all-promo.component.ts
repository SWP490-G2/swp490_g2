import { Component } from "@angular/core";
import { AllPromo } from "src/app/utils/allpromo";

@Component({
  selector: "app-view-all-promo",
  templateUrl: "./view-all-promo.component.html",
})
export class ViewAllPromoComponent {
  promoList: AllPromo[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
}
