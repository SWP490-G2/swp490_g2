import { Component, OnInit } from "@angular/core";
import { AdminClient, Buyer } from "src/app/ngswag/client";
import { DateUtils } from "src/app/utils";

@Component({
  selector: "app-request-open-list",
  templateUrl: "./request-open-list.component.html",
})
export class RequestOpenListComponent implements OnInit {
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  requestingUsers: Buyer[] = [];

  constructor(private $adminClient: AdminClient) {
    this.$adminClient.getAllOpeningRestaurantRequests().subscribe((buyers) => {
      this.requestingUsers = buyers.map((buyer) => {
        if (buyer.requestingOpeningRestaurantDate) {
          buyer.requestingOpeningRestaurantDate = DateUtils.fromDB(
            buyer.requestingOpeningRestaurantDate
          );
        }

        return buyer;
      });
    });
  }

  ngOnInit(): void {}
}
