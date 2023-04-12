import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/global/auth.service";
import {
  AdminClient,
  Restaurant,
  RestaurantCategoryClient,
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
export class AddRestaurantInfoComponent implements OnInit {
  @ViewChild("form", { static: false }) form!: NgForm;

  restaurantId: number;
  restaurant = new Restaurant();
  user?: User;
  uploadUrl: string;

  users: any[];
  selectedUser: any;
  filteredUsers: any[];

  restaurantCategories: any[];
  selectedCategory: any;
  filteredCategories: any[];

  constructor(
    private $restaurantClient: RestaurantClient,
    private $restaurantCategoryClient: RestaurantCategoryClient,
    private $adminClient: AdminClient,
    private $userClient: UserClient,
    private $auth: AuthService,
    private $message: MessageService,
    private $route: ActivatedRoute
  ) {
    this.refresh();
  }

  ngOnInit() {
    this.$adminClient.getAllUserExceptAdmin().subscribe((users) => {
      this.users = users;
    });

    this.$restaurantCategoryClient.getAll().subscribe((restaurantCategories) => {
      this.restaurantCategories = restaurantCategories;
    });
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
    
    const restaurent = {
    restaurantName: this.restaurant.restaurantName,
    description: this.restaurant.description,
    phoneNumber: this.restaurant.phoneNumber,
    restaurantCategories : this.selectedCategory.id,
    active: true
    }
    console.log(restaurent);
    this.$adminClient.insertRestaurant(this.restaurant).subscribe(() => {
      this.$message.add({
        severity: "success",
        summary: "Success",
        detail: "Add new restaurant successfully!",
      });
    });
  }

  filterUser(event) {
    const filtered: any[] = [];
    const query = event.query;

    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user.email.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    }

    this.filteredUsers = filtered;
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

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.form.controls["phoneNumber"].addValidators([
  //       Validators.required,
  //       Validators.pattern("^(0[3|5|7|8|9])+([0-9]{8})$"),
  //     ]);
  //     this.form.controls["phoneNumber"].updateValueAndValidity();
  //     this.form.controls["contact"].addValidators([
  //       Validators.required,
  //       Validators.pattern("^(0[3|5|7|8|9])+([0-9]{8})$"),
  //     ]);
  //     this.form.controls["contact"].updateValueAndValidity();
  //   }, 0);
  // }

  // updateAvatar(image: File) {
  //   if (!this.restaurant) return;

  //   this.restaurant.avatarFile = image;
  //   this.$restaurantClient
  //     .update(this.restaurant)
  //     .subscribe(() => location.reload());
  // }

  // get editable(): boolean {
  //   if (!this.user || !this.user.id) return false;
  //   if (AuthService.isAdmin(this.user)) return true;
  //   if (
  //     AuthService.isSeller(this.user) &&
  //     this.user.restaurants?.some(
  //       (restaurant) => restaurant.id === this.restaurant?.id
  //     )
  //   ) {
  //     return true;
  //   }

  //   return false;
  // }
}
