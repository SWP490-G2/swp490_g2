import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdminClient, User, UserClient } from "src/app/ngswag/client";

@Component({
  selector: "app-change-role",
  templateUrl: "./change-role.component.html",
})
export class ChangeRoleComponent implements OnInit {
  users?: User;
  userId: number;
  username = 2;

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
      console.log(users);
    });
  }
  ngOnInit(): void {}
}
