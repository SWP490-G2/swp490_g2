import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/global/auth.service";
import { User } from "src/app/ngswag/client";

interface City {
  name: string,
  code: string
}

@Component({
  selector: "app-account-information",
  templateUrl: "./account-information.component.html",
  styleUrls: ["./account-information.component.scss"]
})

export class AccountInformationComponent implements OnInit {
  @ViewChild("form", { static: false }) form!: NgForm;

  cities: City[];
  selectedCity: City;
  uploadedFiles: any[] = [];

  display = false;
  user?: User;

  constructor(private messageService: MessageService,
    private $router: Router,
    private $route: ActivatedRoute,
    private $auth: AuthService,
  ) {
    this.cities = [
      { name: "Hà Nội", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" }
    ];
  }

  ngOnInit() {
    this.$auth.getCurrentUser(true).subscribe(user => {
      this.user = user;
    });
  }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({ severity: "info", summary: "File Uploaded", detail: "" });
  }

  showDialog() {
    this.display = true;
  }

  navToOpenNewRestaurant() {
    this.$router.navigate(["open-restaurant-request"], { relativeTo: this.$route });
  }

  navToListOfRestaurants() {
    this.$router.navigate(["list-of-restaurants"], { relativeTo: this.$route });
  }

  get isBuyer(): boolean {
    return this.user?.role === "BUYER";
  }
}
