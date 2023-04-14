import { AfterViewInit, Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ConfirmationService } from "primeng/api";
import { User, Restaurant, BuyerClient } from "src/app/ngswag/client";

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
  restaurantsShown = true;
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }

  constructor(
    $title: Title,
    private $confirmation: ConfirmationService,
    private $buyerClient: BuyerClient
  ) {
    $title.setTitle("Seller Management");
  }
}
