import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { map, of, switchMap } from "rxjs";
import {
  AdminClient,
  Restaurant,
  RestaurantClient,
  SearchRestaurantsRequest,
  UserClient,
} from "src/app/ngswag/client";
import { DateUtils } from "src/app/utils";
import { AllRes } from "src/app/utils/allres";

@Component({
  selector: "app-view-all-restaurant",
  templateUrl: "./view-all-restaurant.component.html",
  styleUrls: ["./view-all-restaurant.component.css"],
  providers: [MessageService],
})
export class ViewAllRestaurantComponent {
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  restaurants: Restaurant[] = [];

  constructor(
    private $adminClient: AdminClient,
    private $confirmation: ConfirmationService,
    private messageService: MessageService,
    private $restaurantClient: RestaurantClient,
    private $userClient: UserClient
  ) {
    this.refresh();
  }

  refresh() {
    this.$restaurantClient
      .search(
        undefined,
        undefined,
        undefined,
        true,
        new SearchRestaurantsRequest()
      )
      .pipe(
        switchMap((page) => {
          if (page.content) {
            this.restaurants = page.content;
          }

          return of(undefined);
        })
      )
      .subscribe();
  }

  toggleRestaurantStatus(restaurant: Restaurant, event: any) {
    const intended = event.checked;

    this.$confirmation.confirm({
      message: `Do you want to ${
        intended ? "activate" : "disable"
      } this restaurant?`,
      header: "Toggle Status Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.$restaurantClient
          .update(restaurant)
          .pipe(
            map((errorMessage) => {
              if (errorMessage) throw new Error(errorMessage);
            })
          )
          .subscribe();
      },
      reject: () => {
        restaurant.active = !intended;
      },
    });
  }

  getOwners(restaurant: Restaurant): string {
    if (!(restaurant as any).owners) return "";

    return (restaurant as any).owners.map((o) => o.email).join(", ");
  }
}
