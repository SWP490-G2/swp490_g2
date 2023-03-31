import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/global/auth.service";
import { AdminClient, File, RestaurantInformationRequest, User } from "src/app/ngswag/client";
import { DateUtils, getFullAddress } from "src/app/utils";

@Component({
  selector: "app-view-restaurant-details",
  templateUrl: "./view-restaurant-details.component.html"
})
export class ViewRestaurantDetailsComponent implements OnInit {
  ngOnInit(): void {}
  restaurantId: number;
  restaurant: RestaurantInformationRequest;
  uploadUrl: string;
  user?: User;

  constructor(
    private $adminClient: AdminClient,
    private $route: ActivatedRoute,
    private $auth: AuthService,
  ) {
    const id: number = Number.parseInt(
      <string>this.$route.snapshot.paramMap.get("id")
    );
    this.uploadUrl = "restaurant/update-avatar/" + id;

    this.restaurantId = id;
    this.refresh();
    
  }

  refresh() {
    this.$adminClient.getRestaurantById(this.restaurantId).subscribe((restaurant) => {
      this.restaurant = restaurant;
      console.log(restaurant);
    });

    this.$auth.getCurrentUser().subscribe((user) => (this.user = user));
  }

  get fullAddress(): string {
    return getFullAddress(this.restaurant.address);
  }

  get editable(): boolean {
    if (!this.user || !this.user.id) return false;
    // if (this.user.role === "ADMIN") return true;
    // if (
    //   this.user.role === "SELLER" &&
    //   (<Seller>this.user).restaurants?.some(
    //     (restaurant) => restaurant.id === this.restaurant?.restaurantId
    //   )
    // ) {
    //   return true;
    // }

    return false;
  }

  updateAvatar(image: File) {
    if (!this.restaurant) return;

    this.restaurant.avatarFile = image;
    this.$adminClient
      .updateRestaurant(this.restaurant)
      .subscribe(() => location.reload());
  }
}
