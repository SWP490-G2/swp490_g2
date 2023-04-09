import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/global/auth.service";
import {
  AdminClient,
  Restaurant,
  RestaurantClient,
  User,
  UserClient,
  Ward,
} from "src/app/ngswag/client";

@Component({
  selector: "app-add-restaurant-info",
  templateUrl: "./add-restaurant-info.component.html",
  styleUrls: ["./add-restaurant-info.component.scss"],
})
export class AddRestaurantInfoComponent {
  @ViewChild("form", { static: false }) form!: NgForm;

  restaurantId: number;
  restaurant?: Restaurant;
  user?: User;
  uploadUrl: string;

  constructor(
    private $restaurantClient: RestaurantClient,
    private $adminClient: AdminClient,
    private $userClient: UserClient,
    private $auth: AuthService,
    private $message: MessageService,
    private $route: ActivatedRoute
  ) {
    this.refresh();
  }

  refresh() {
    this.$auth.getCurrentUser().subscribe((user) => (this.user = user));
  }

  submit(): void {
    if (!this.restaurant) return;

    if (this.restaurant.address) {
      this.restaurant.address.ward = new Ward({
        id: this.form.value.ward.id,
      });

      this.restaurant.address.specificAddress = this.form.value.specificAddress;
    }

    this.$restaurantClient.update(this.restaurant).subscribe(() => {
      this.$message.add({
        severity: "success",
        summary: "Success",
        detail: "Restaurant's information has changed",
      });
    });
  }
}
