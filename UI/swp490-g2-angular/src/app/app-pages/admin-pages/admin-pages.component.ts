import { Component } from "@angular/core";

@Component({
  selector: "app-admin-pages",
  templateUrl: "./admin-pages.component.html",
})
export class AdminPagesComponent {
  buttonContents: ButtonContent[] = [];

  constructor() {
    this.initButtonContents();
  }

  private initButtonContents(): void {
    const colors = ["teal", "pink", "orange"];
    this.buttonContents = [
      {
        title: "View Restaurant Opening Request",
        routerLink: "request-open-list",
        iconClass: "pi-list",
      },
      {
        title: "View All Users",
        routerLink: "view-all-user",
        iconClass: "pi-users",
      },
      {
        title: "View All Restaurants",
        routerLink: "view-all-restaurant",
        iconClass: "pi-bars",
      },
      {
        title: "Ban An User",
        routerLink: "ban-user",
        iconClass: "pi-user-minus",
      },
      {
        title: "Ban An Restaurant",
        routerLink: "ban-restaurant",
        iconClass: "pi-ban",
      },
      {
        title: "Update User Role",
        routerLink: "update-user-role",
        iconClass: "pi-user-edit",
      },
      {
        title: "Update Restaurant Avatar and Cover",
        routerLink: "change-avatar-cover",
        iconClass: "pi-image",
      },
      {
        title: "Update Restaurant Information",
        routerLink: "update-restaurant-info",
        iconClass: "pi-pencil",
      },
      {
        title: "Create New Restaurant Promotion Campaign",
        routerLink: "create-promo",
        iconClass: "pi-plus-circle",
      },
      {
        title: "View All Restaurant Promotion Campaign",
        routerLink: "view-all-promo",
        iconClass: "pi-ticket",
      },
      {
        title: "Update Restaurant Promotion Campaign",
        routerLink: "update-promo",
        iconClass: "pi-pencil",
      },
    ];

    this.buttonContents.map((buttonContent, index) => {
      buttonContent.color = colors[index % 3];
    });
  }
}

interface ButtonContent {
  title?: string;
  color?: string;
  routerLink?: string;
  iconClass?: string;
}
