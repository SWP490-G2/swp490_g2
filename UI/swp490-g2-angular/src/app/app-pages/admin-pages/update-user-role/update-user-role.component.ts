import { Component, OnInit } from "@angular/core";
import { AllUsers } from "src/app/utils/allusers";

@Component({
  selector: "app-update-user-role",
  templateUrl: "./update-user-role.component.html",
})
export class UpdateUserRoleComponent implements OnInit {
  userList: AllUsers[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
}
