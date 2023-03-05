import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";

interface City {
  name: string,
  code: string
}
@Component({
  selector: "app-buyer-information",
  templateUrl: "./buyer-information.component.html",
  styleUrls: ["./buyer-information.component.scss"]
})

export class BuyerInformationComponent implements OnInit {
  @ViewChild("form", { static: false }) form!: NgForm;

  cities: City[];
  selectedCity: City;
  uploadedFiles: any[] = [];

  display = false;

  ngOnInit() {
  }

  constructor(private messageService: MessageService,
    private $router: Router,
    private $route: ActivatedRoute,) {
    this.cities = [
      { name: "Hà Nội", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" }
    ];
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

  navToListOfRestaurants(){
    this.$router.navigate(["list-of-restaurants"], { relativeTo: this.$route });
  }

  

}
