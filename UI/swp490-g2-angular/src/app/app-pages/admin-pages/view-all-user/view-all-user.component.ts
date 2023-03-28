import { Component, OnInit } from "@angular/core";
import { AdminClient, SearchRequest, User } from "src/app/ngswag/client";

@Component({
  selector: "app-view-all-user",
  templateUrl: "./view-all-user.component.html",
})
export class ViewAllUserComponent implements OnInit {
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
  userList: User[] = [];
  request: SearchRequest;

  constructor(private $adminClient: AdminClient) {
    this.$adminClient.getAllUsers;
  }
}
