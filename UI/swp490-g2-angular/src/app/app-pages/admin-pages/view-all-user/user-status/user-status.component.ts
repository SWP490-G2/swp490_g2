import { Component, Input } from "@angular/core";
import { User } from "src/app/ngswag/client";

@Component({
  selector: "app-user-status",
  templateUrl: "./user-status.component.html",
  styleUrls: ["./user-status.component.scss"],
})
export class UserStatusComponent {
  @Input() users?: User;

  get active():
    | {
        text: string;
        severity: "success" | "danger";
      }
    | undefined {
    switch (this.users?.active) {
      case true:
        return {
          text: "Activated",
          severity: "success",
        };

      case false:
        return {
          text: "Banned",
          severity: "danger",
        };
    }

    return undefined;
  }
}
