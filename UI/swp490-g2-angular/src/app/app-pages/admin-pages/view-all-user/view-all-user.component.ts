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
  users?: User;

  constructor(private $adminClient: AdminClient) {
    this.$adminClient.getAllUsers(new SearchRequest()).subscribe((res) => {
      if (!res.content) return;
      this.userList = res.content;
      console.log(res);
    });
  }

  // adminUser() {
  // }
}
