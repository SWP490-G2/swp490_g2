import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant-info',
  templateUrl: './add-restaurant-info.component.html',
  styleUrls: ['./add-restaurant-info.component.scss']
})
export class AddRestaurantInfoComponent {
  @ViewChild("form", { static: false }) form!: NgForm;

  submit(): void {
    // if (this.restaurant.address) {
    //   this.restaurant.address.ward = new Ward({
    //     id: this.form.value.ward.id,
    //   });

    //   this.restaurant.address.specificAddress = this.form.value.specificAddress;
    // }

    // this.$restaurantClient.update(this.restaurant).subscribe(() => {
    //   this.$message.add({
    //     severity: "success",
    //     summary: "Success",
    //     detail: "Restaurant's information has changed",
    //   });
    // });
  }
}