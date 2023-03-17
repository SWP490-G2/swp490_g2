import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Buyer, AdminClient, BuyerClient } from "src/app/ngswag/client";
import { DateUtils } from "src/app/utils";

@Component({
  selector: "app-request-open-details",
  templateUrl: "./request-open-details.component.html",
})
export class RequestOpenDetailsComponent implements OnInit {
  selectedReason: string[] = [];
  checked = false;
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  requestingUsers: Buyer[] = [];
  displayModal: boolean;
  displayMaximizable: boolean;
  requester?: Buyer;

  constructor(
    private $adminClient: AdminClient,
    private $route: ActivatedRoute,
    private $buyerClient: BuyerClient
  ) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );

    $buyerClient.getById(id).subscribe((requester) => {
      this.requester = requester;
      console.log(requester);
    });

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
  items: MenuItem[];

  showModalDialog() {
    this.displayModal = true;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  getStatus() {
    return this.requester?.requestingRestaurantStatus;
  }
}
