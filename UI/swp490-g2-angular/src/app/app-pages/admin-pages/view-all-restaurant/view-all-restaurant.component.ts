import { Component } from "@angular/core";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import {
  AdminClient,
  Restaurant,
  RestaurantInformationRequest,
} from "src/app/ngswag/client";
import { DateUtils } from "src/app/utils";
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
  restaurants: RestaurantInformationRequest[] = [];

  constructor(
    private $adminClient: AdminClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.refresh();
  }

  refresh() {
    this.$adminClient.getAllRestaurant().subscribe((restaurants) => {
      this.restaurants = restaurants;
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
}
