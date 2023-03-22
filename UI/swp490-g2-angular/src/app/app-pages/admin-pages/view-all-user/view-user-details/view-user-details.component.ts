import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-view-user-details",
  templateUrl: "./view-user-details.component.html",
})
export class ViewUserDetailsComponent implements OnInit {
  ngOnInit(): void {}
  items: MenuItem[];
}
