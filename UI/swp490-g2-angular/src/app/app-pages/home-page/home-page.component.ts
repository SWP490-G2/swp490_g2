import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { AuthService } from "src/app/global/auth.service";
import { User } from "src/app/ngswag/client";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  user?: User;

  constructor(
    private $router: Router,
    private $route: ActivatedRoute,
    private $title: Title,
    private $auth: AuthService
  ) {
    $title.setTitle("Home");
    $auth.getCurrentUser().subscribe(user => this.user = user);
  }
  items!: MenuItem[];
  ngOnInit(): void {}

  navToLogin() {
    this.$router.navigate(["auth", "login"], { relativeTo: this.$route });
  }

  navToRegister() {
    this.$router.navigate(["auth", "register"], { relativeTo: this.$route });
  }

  navToForgotPassword() {
    this.$router.navigate(["auth", "forgot-password"], {
      relativeTo: this.$route,
    });
  }

  navToFeed() {
    this.$router.navigate(["feed-page"], { relativeTo: this.$route });
  }

  userExisted(): boolean {
    // !! giup ep kieu sang boolean
    return !!(this.user && this.user.email);
}
}
