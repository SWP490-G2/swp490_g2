import { Component, OnInit } from "@angular/core";
import { AllPromo } from "src/app/utils/allpromo";

@Component({
  selector: "app-view-all-promo",
  templateUrl: "./view-all-promo.component.html",
})
export class ViewAllPromoComponent implements OnInit {
  promoList: AllPromo[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
}
