import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { finalize } from "rxjs";
import { BuyerClient } from "src/app/ngswag/client";

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

  constructor(
    private $title: Title,
    private $message: MessageService,
    private $buyerClient: BuyerClient,
    private $confirmation: ConfirmationService,
    private $router: Router,
    private $route: ActivatedRoute
  ) {
    $title.setTitle("Open Restaurant Request");
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {}

  submit(): void {
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

  back() {
    this.$router.navigate([".."], { relativeTo: this.$route });
  }
}
