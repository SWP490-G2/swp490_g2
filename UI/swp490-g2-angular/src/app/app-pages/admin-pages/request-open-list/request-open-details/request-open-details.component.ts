import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Buyer, AdminClient } from "src/app/ngswag/client";

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

  constructor(private $adminClient: AdminClient) {
    this.$adminClient.getAllOpeningRestaurantRequests().subscribe((buyers) => {
      this.requestingUsers = buyers;
      console.log(buyers);
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
}
