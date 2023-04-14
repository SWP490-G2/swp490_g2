import { Component } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { of, switchMap } from "rxjs";
import {
  AdminClient,
  Restaurant,
  RestaurantClient,
  SearchRestaurantsRequest,
  UserClient,
} from "src/app/ngswag/client";
import { AllRes } from "src/app/utils/allres";

@Component({
  selector: "app-view-all-restaurant",
  templateUrl: "./view-all-restaurant.component.html",
  styleUrls: ["./view-all-restaurant.component.css"],
  providers: [ConfirmationService, MessageService],
})
export class ViewAllRestaurantComponent {
  resOpening: AllRes[];
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  // restaurants: RestaurantInformationRequest[] = [];
  restaurants: Restaurant[] = [];

  constructor(
    private $adminClient: AdminClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private $restaurantClient: RestaurantClient,
    private $userClient: UserClient
  ) {
    this.refresh();
  }

  refresh() {
    // this.$adminClient.getAllRestaurant().subscribe((restaurants) => {
    //   this.restaurants = restaurants;
    // });
    this.$restaurantClient
      .search(
        undefined,
        undefined,
        undefined,
        true,
        false,
        new SearchRestaurantsRequest()
      )
      .pipe(
        switchMap((page) => {
          if (page.content) {
            this.restaurants = page.content;
            return this.$userClient.getAllOwnersByRestaurantIds(
              this.restaurants.map((r) => r.id!)
            );
          }

          return of(undefined);
        })
      )
      .subscribe((owners) => {
        if (owners) {
          this.restaurants.map((r) => {
            (r as any).owners = owners.filter((o) =>
              o.restaurants?.some((r1) => r1.id === r.id)
            );
          });
        }
      });
  }

  // deleteRestaurant(id: number) {
  //   this.$adminClient
  //     .deleteRestaurantById(id)
  //     .subscribe(() => location.reload());
  // }

  toggleRestaurantStatus(restaurant: Restaurant, event: any) {
    const intended = event.checked;
    this.confirmationService.confirm({
      message: `Do you want to ${
        intended ? "activate" : "disable"
      } this restaurant?`,
      header: "Toggle Status Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.$restaurantClient.update(restaurant).subscribe();
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
