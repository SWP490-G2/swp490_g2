import { Component } from "@angular/core";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import {
  AdminClient,
  Restaurant,
  RestaurantClient,
  RestaurantInformationRequest,
  SearchRestaurantsRequest,
  UserClient,
} from "src/app/ngswag/client";
import { DateUtils, getFullName } from "src/app/utils";
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
      .search(undefined, undefined, undefined, new SearchRestaurantsRequest())
      .subscribe((page) => {
        if (page.content) {
          this.restaurants = page.content;
          this.$userClient
            .getAllOwnersByRestaurantIds(this.restaurants.map((r) => r.id!))
            .subscribe((owners) => {
              this.restaurants.map((r) => {
                (r as any).owners = owners.filter((o) =>
                  o.restaurants?.some((r1) => r1.id === r.id)
                );
              });
            });
        }
      });
  }

  // deleteRestaurant(id: number) {
  //   this.$adminClient
  //     .deleteRestaurantById(id)
  //     .subscribe(() => location.reload());
  // }

  deleteRestaurant(id: number) {
    this.confirmationService.confirm({
      message: "Do you want to delete this restaurant?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      accept: () => {
        this.$adminClient.deleteRestaurantById(id).subscribe(() =>
          this.messageService.add({
            severity: "info",
            summary: "Confirmed",
            detail: "Deleted successfully!",
          })
        );
        this.refresh();
      },
    });
  }

  getOwners(restaurant: Restaurant): string {
    if (!(restaurant as any).owners) return "";

    return (restaurant as any).owners.map((o) => o.email).join(", ");
  }
}
