import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User, AdminClient, UserClient } from "src/app/ngswag/client";

@Component({
  selector: "app-ban-user",
  templateUrl: "./ban-user.component.html",
  styleUrls: ["./ban-user.component.scss"],
})
export class BanUserComponent implements OnInit {
  selectedReason: string[] = [];
  checked = false;
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
      console.log(users);
    });
  }
  ngOnInit(): void {}
}
