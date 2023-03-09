import { Component, OnInit } from "@angular/core";
import { Requests } from "src/app/utils/requests";

@Component({
  selector: "app-request-open-list",
  templateUrl: "./request-open-list.component.html",
  styleUrls: ["./request-open-list.component.scss"],
})
export class RequestOpenListComponent implements OnInit {
  resOpening: Requests[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
}
