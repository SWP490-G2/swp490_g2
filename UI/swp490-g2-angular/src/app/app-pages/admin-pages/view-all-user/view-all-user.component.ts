import { Component, OnInit } from "@angular/core";
import { AllUsers } from "src/app/utils/allusers";

@Component({
  selector: "app-view-all-user",
  templateUrl: "./view-all-user.component.html",
})
export class ViewAllUserComponent implements OnInit {
  userList: AllUsers[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
}
