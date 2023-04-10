import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { finalize, of, switchMap } from "rxjs";
import { Restaurant, RestaurantCategory, RestaurantCategoryClient, RestaurantClient, Ward } from "src/app/ngswag/client";
import { PHONE_NUMBER_PATTERN } from "src/app/utils";

@Component({
  selector: "app-restaurant-update-information",
  templateUrl: "./restaurant-update-information.component.html",
  styleUrls: ["./restaurant-update-information.component.scss"],
})
export class RestaurantUpdateInformationComponent implements AfterViewInit {
  @Input() restaurant: Restaurant;
  @Input() editable: boolean;
  @ViewChild("form", { static: false }) form!: NgForm;
  @Output() hidden = new EventEmitter();
  categories: RestaurantCategory[] = [];

  displayModal = false;
  private _submitButtonDisabled = false;
  get submitButtonDisabled(): boolean {
    return !!this.form?.invalid || this._submitButtonDisabled;
  }

  constructor(
    private $restaurantClient: RestaurantClient,
    private $confirmation: ConfirmationService,
    private $message: MessageService,
    private $restaurantCategoryClient: RestaurantCategoryClient
  ) { }

  ngAfterViewInit(): void {
    this.$restaurantCategoryClient
      .getAll()
      .pipe(
        switchMap((categories) => {
          this.categories = [...categories];
          return of();
        })
      )
      .subscribe();

    setTimeout(() => {
      this.form.controls["phoneNumber"].addValidators([
        Validators.required,
        Validators.pattern(PHONE_NUMBER_PATTERN),
      ]);
      this.form.controls["phoneNumber"].updateValueAndValidity();
      if (!this.editable)
      {
        this.form.control.disable();
      }
    });
  }

  showDialog() {
    this.displayModal = true;
  }

  submit(): void {
    this._submitButtonDisabled = true;
    if (this.restaurant.address) {
      this.restaurant.address.ward = new Ward({
        id: this.form.value.ward.id,
      });

      this.restaurant.address.specificAddress = this.form.value.specificAddress;
    }

    this.$restaurantClient
      .update(this.restaurant)
      .pipe(
        finalize(() => {
          this._submitButtonDisabled = false;
        })
      )
      .subscribe(() => {
        this.$message.add({
          severity: "success",
          summary: "Success",
          detail: "Restaurant's information has changed",
        });
      });
  }

  onDialogHide() {
    this.hidden.emit();
  }
}
