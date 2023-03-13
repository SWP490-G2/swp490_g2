import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-request-open-details",
  templateUrl: "./request-open-details.component.html",
})
export class RequestOpenDetailsComponent implements OnInit {
  ngOnInit(): void {}
  items: MenuItem[];
}
