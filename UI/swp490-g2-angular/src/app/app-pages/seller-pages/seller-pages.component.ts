import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { AuthService } from "src/app/global/auth.service";
import { GoogleMapService } from "src/app/global/google-map.service";
import { User, Restaurant, BuyerClient, FileClient, UserClient } from "src/app/ngswag/client";

@Component({
  selector: "app-seller-pages",
  templateUrl: "./seller-pages.component.html"
})
export class SellerPagesComponent implements OnInit, AfterViewInit{
  @ViewChild("form", { static: false }) form!: NgForm;
  @Input()
  display = false;
  user?: User;
  restaurants: Restaurant[];
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }

  constructor(
    private $router: Router,
    private $route: ActivatedRoute,
    private $auth: AuthService,
    $title: Title,
    private $userClient: UserClient,
    private $message: MessageService,
    private $map: GoogleMapService,
    private $confirmation: ConfirmationService,
    private $fileClient: FileClient,
    private $buyerClient: BuyerClient
  ) {
    $title.setTitle("Seller Management");
  }

}
