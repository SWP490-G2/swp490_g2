import { Component, OnInit } from "@angular/core";
import { AdminClient } from "src/app/ngswag/client";
import { Requests } from "src/app/utils/requests";

@Component({
  selector: "app-request-open-list",
  templateUrl: "./request-open-list.component.html",
})
export class RequestOpenListComponent implements OnInit {
  resList: Requests[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];

  constructor(private $adminClient: AdminClient) {
    this.$adminClient.getAllOpeningRestaurantRequests().subscribe((buyer) => {
      console.log(buyer);
    });
  }

  ngOnInit(): void {}
}
