import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/global/auth.service";
import { User, Client } from "src/app/ngswag/client";

@Component({
  selector: "app-admin-pages",
  templateUrl: "./admin-pages.component.html",
  styleUrls: ["./admin-pages.component.scss"],
})
export class AdminPagesComponent implements OnInit{
  user?: User;

  constructor(private $client: Client, private $auth: AuthService) {}
  ngOnInit(): void {
    this.$auth.getCurrentUser().subscribe({
      next: (user?: User) => {
        // this.user: thuoc ve AppPages
        // user: from API
        this.user = user;
      },
    });
  }
}
