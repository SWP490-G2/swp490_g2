import { Component, Input } from "@angular/core";
import { Buyer } from "src/app/ngswag/client";

@Component({
  selector: "app-requesting-status",
  templateUrl: "./requesting-status.component.html",
  styleUrls: ["./requesting-status.component.scss"],
})
export class RequestingStatusComponent {
  @Input() requester?: Buyer;

  get status():
    | {
        text: string;
        severity: "success" | "info" | "danger";
      }
    | undefined {
    switch (this.requester?.requestingRestaurantStatus) {
      case "PENDING":
        return {
          text: "Pending",
          severity: "info",
        };

      case "APPROVED":
        return {
          text: "Approved",
          severity: "success",
        };

      case "REJECTED":
        return {
          text: "Rejected",
          severity: "danger",
        };
    }

    return undefined;
  }
}
