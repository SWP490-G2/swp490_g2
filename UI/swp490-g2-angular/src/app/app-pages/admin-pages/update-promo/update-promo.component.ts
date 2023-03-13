import { Component } from "@angular/core";
import { AllPromo } from "src/app/utils/allpromo";

@Component({
  selector: "app-update-promo",
  templateUrl: "./update-promo.component.html",
})
export class UpdatePromoComponent {
  promoList: AllPromo[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
}
