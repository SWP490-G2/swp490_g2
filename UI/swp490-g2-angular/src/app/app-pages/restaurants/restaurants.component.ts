import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"],
})
export class RestaurantsComponent {
  color = "";

  brands: any[] = [
    { name: "Alfred" },
    { name: "Hyper" },
    { name: "Peak" },
    { name: "Bastion" },
  ];

  colors: any[] = [
    { name: "Black", class: "bg-gray-500" },
    { name: "Orange", class: "bg-orange-500" },
    { name: "Indigo", class: "bg-indigo-500" },
    { name: "Pink", class: "bg-pink-500" },
  ];

  prices: any[] = [
    { range: "$10 - $100" },
    { range: "$101 - $200" },
    { range: "$201 - $300" },
    { range: "$301 - $400" },
  ];

  selectedBrands: any[] = [{ name: "Alfred" }, { name: "Hyper" }];

  selectedPrice: any;

  selectedColors: any[] = [{ name: "Black", class: "bg-gray-500" }];

  rangeValues = [20, 80];

  checked1 = true;

  checked2 = false;

  items: MenuItem[] = [
    { label: "Color" },
    { label: "Size" },
    { label: "Price" },
  ];
}
