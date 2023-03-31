import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { finalize } from "rxjs";
import { AdminClient, User, UserClient } from "src/app/ngswag/client";
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
  requestingUsers: User[] = [];
  acceptRes: User[] = [];
  displayModal: boolean;
  displayMaximizable: boolean;
  requester?: User;
  buyerId: number;

  constructor(
    private $adminClient: AdminClient,
    private $route: ActivatedRoute,
    private $userClient: UserClient
  ) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );

    this.buyerId = id;
    this.refresh();
  }

  refresh() {
    this.$userClient.getById(this.buyerId).subscribe((requester) => {
      this.requester = requester;
      this.requester.requestingOpeningRestaurantDate = DateUtils.fromDB(
        this.requester.requestingOpeningRestaurantDate
      );
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
    return this.requester?.requestingRestaurantStatus == "PENDING";
  }

  approve() {
    this.$adminClient
      .approveBecomeSeller(this.buyerId)
      .pipe(
        finalize(() => {
          this.displayModal = false;
        })
      )
      .subscribe(() => {
        this.refresh();
      });
  }

  rejected() {
    this.$adminClient
      .rejectBecomeSeller(this.buyerId)
      .pipe(
        finalize(() => {
          this.displayModal = false;
        })
      )
      .subscribe(() => {
        this.refresh();
      });
  }
}
