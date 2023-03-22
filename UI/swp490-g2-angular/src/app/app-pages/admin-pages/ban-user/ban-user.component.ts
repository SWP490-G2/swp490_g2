import { Component, OnInit } from "@angular/core";
import { AllUsers } from "src/app/utils/allusers";

@Component({
  selector: "app-ban-user",
  templateUrl: "./ban-user.component.html",
})
export class BanUserComponent implements OnInit {
  userList: AllUsers[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
}
