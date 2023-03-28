import { Component, Input, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { AuthService } from "src/app/global/auth.service";
import { Client, User } from "src/app/ngswag/client";

@Component({
  selector: "app-side-bars",
  templateUrl: "./side-bars.component.html",
  styleUrls: ["./side-bars.component.scss"],
})
export class SideBarsComponent implements OnInit {
  @Input() user?: User;
  sidebarVisible: boolean;

  constructor(
    private $router: Router,
    private $route: ActivatedRoute,
    private $title: Title,
    private $auth: AuthService,
    private $client: Client
  ) {
    $title.setTitle("Home");
  }
  items!: MenuItem[];

  ngOnInit() {
    this.items = [];
  }
}
