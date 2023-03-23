import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-view-promo-details",
  templateUrl: "./view-promo-details.component.html",
})
export class ViewPromoDetailsComponent implements OnInit {
  ngOnInit(): void {}
  items: MenuItem[];
}
