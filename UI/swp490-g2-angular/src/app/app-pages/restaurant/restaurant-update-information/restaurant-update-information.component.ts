import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { Restaurant, RestaurantClient } from 'src/app/ngswag/client';

@Component({
  selector: 'app-restaurant-update-information',
  templateUrl: './restaurant-update-information.component.html',
  styleUrls: ['./restaurant-update-information.component.scss']
})
export class RestaurantUpdateInformationComponent {
  @Input() restaurant: Restaurant;
  @Input() editable: boolean;
  @ViewChild("form", { static: false }) form!: NgForm;

  displayModal: boolean = false;
  private _submitButtonDisabled = false;

  constructor(
    private $restaurantClient: RestaurantClient,
    private $confirmation: ConfirmationService,
    private $message: MessageService
  ) {}

  showDialog() {
    this.displayModal = true;
  }

  get submitButtonDisabled(): boolean {
    return !!this.form?.invalid || this._submitButtonDisabled;
  }

  submit(): void {
    this.$restaurantClient.update(this.restaurant).subscribe(() => {
      this.$message.add({
        severity: "success",
        summary: "Success",
        detail: `Restaurant's information has changed`,
      });
    });
  }
}
