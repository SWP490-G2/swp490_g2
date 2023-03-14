import { Component, OnInit } from "@angular/core";
import { AllRes } from "src/app/utils/allres";

@Component({
  selector: "app-create-promo",
  templateUrl: "./create-promo.component.html",
})
export class CreatePromoComponent implements OnInit {
  resOpening: AllRes[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
}
