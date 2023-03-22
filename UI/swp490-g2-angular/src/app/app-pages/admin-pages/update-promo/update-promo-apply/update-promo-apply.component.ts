import { Component } from "@angular/core";
import { SelectItemGroup } from "primeng/api";

@Component({
  selector: "app-update-promo-apply",
  templateUrl: "./update-promo-apply.component.html",
})
export class UpdatePromoApplyComponent {
  startDate: Date;
  endDate: Date;
  selectedPromo: string;
  groupedPromo: SelectItemGroup[];

  constructor() {
    this.groupedPromo = [
      {
        label: "Extra Item",
        value: "extraItem",
        items: [
          {
            label: "Buy One Meal Get One Beverage",
            value: "Buy One Meal Get One Beverage",
          },
          { label: "Buy One Get Extra Meal", value: "Buy One Get Extra Meal" },
          { label: "Buy Two Get One", value: "Buy Two Get One" },
          {
            label: "Buy Two Get One Beverage",
            value: "Buy Two Get One Beverage",
          },
        ],
      },
      {
        label: "Discount",
        value: "discount",
        items: [
          { label: "Discount 5%", value: "Discount 5%" },
          { label: "Discount 10%", value: "Discount 10%" },
          { label: "Discount 15%", value: "Discount 15%" },
          { label: "Discount 20%", value: "Discount 20%" },
        ],
      },
    ];
  }
}
