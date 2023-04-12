import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { finalize } from "rxjs";
import { BuyerClient, RestaurantCategoryClient } from "src/app/ngswag/client";

@Component({
  selector: "app-open-restaurant-request",
  templateUrl: "./open-restaurant-request.component.html",
  styleUrls: ["./open-restaurant-request.component.scss"],
})
export class OpenRestaurantRequestComponent implements OnInit, AfterViewInit {
  @ViewChild("form", { static: false }) form!: NgForm;
  private _submitButtonDisabled = false;
  get submitButtonDisabled(): boolean {
    return !!this.form?.invalid || this._submitButtonDisabled;
  }

  restaurantCategories: any[];
  selectedCategory: any[];
  filteredCategories: any[];

  constructor(
    private $title: Title,
    private $message: MessageService,
    private $buyerClient: BuyerClient,
    private $confirmation: ConfirmationService,
    private $router: Router,
    private $route: ActivatedRoute,
    private $restaurantCategoryClient: RestaurantCategoryClient,
  ) {
    $title.setTitle("Open Restaurant Request");
  }

  ngOnInit() {
    this.$restaurantCategoryClient.getAll().subscribe((restaurantCategories) => {
      this.restaurantCategories = restaurantCategories;
    });
  }
  ngAfterViewInit(): void {}

  submit(): void {
    console.log(this.form.value);
    // this.restaurant.restaurantCategories = this.selectedCategory;
    this.$confirmation.confirm({
      message:
        "Request to open a new restaurant cannot be reverted. Are you sure that you want to perform this action?",
      accept: () => {
        let success = false;
        this._submitButtonDisabled = true;

        this.$buyerClient
          .requestOpeningNewRestaurant(this.form.value)
          .pipe(
            finalize(() => {
              if (success) {
                this.form.control.disable();
              } else {
                this._submitButtonDisabled = false;
              }
            })
          )
          .subscribe({
            next: () => {
              success = true;
              this.$message.add({
                severity: "success",
                summary: "Success",
                detail: "Request to open a new restaurant successfully",
              });
            },
          });
      },
    });
  }

  filterRestaurantCategory(event) {
    const filtered: any[] = [];
    const query = event.query;

    for (let i = 0; i < this.restaurantCategories.length; i++) {
      const restaurantCategory = this.restaurantCategories[i];
      if (restaurantCategory.restaurantCategoryName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(restaurantCategory);
      }
    }

    this.filteredCategories = filtered;
  }

  back() {
    this.$router.navigate([".."], { relativeTo: this.$route });
  }
}
