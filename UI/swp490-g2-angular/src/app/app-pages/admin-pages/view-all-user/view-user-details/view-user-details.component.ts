import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { AdminClient, User, UserClient } from "src/app/ngswag/client";
import { DateUtils } from "src/app/utils";

@Component({
  selector: "app-view-user-details",
  templateUrl: "./view-user-details.component.html",
})
export class ViewUserDetailsComponent implements OnInit {
  userId: number;
  users?: User;
  constructor(
    private $adminClient: AdminClient,
    private $route: ActivatedRoute,
    private $userClient: UserClient
  ) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );

    this.userId = id;
    this.refresh();
  }
  refresh() {
    this.$userClient.getById(this.userId).subscribe((users) => {
      this.users = users;
      this.users.dateOfBirth = DateUtils.fromDB(this.users.dateOfBirth);
      console.log(users);
    });
  }

  ngOnInit(): void {}
  items: MenuItem[];
}
