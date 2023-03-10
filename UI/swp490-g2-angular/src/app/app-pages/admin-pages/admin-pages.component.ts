import { Component } from "@angular/core";

@Component({
  selector: "app-admin-pages",
  templateUrl: "./admin-pages.component.html",
  styleUrls: ["./admin-pages.component.scss"],
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
        iconClass: "pi-list"
      },
      {
        title: "View All Users",
        routerLink: "",
        iconClass: "pi-users"
      },
      {
        title: "View All Restaurants",
        routerLink: "",
        iconClass: "pi-bars"
      },
      {
        title: "Ban An User",
        routerLink: "",
        iconClass: "pi-user-minus"
      },
      {
        title: "Ban An Restaurant",
        routerLink: "",
        iconClass: "pi-ban"
      },
      {
        title: "Update User Information",
        routerLink: "",
        iconClass: "pi-user-edit"
      },
      {
        title: "Update User Role",
        routerLink: "",
        iconClass: "pi-user-edit"
      },
      {
        title: "Update Restaurant Avatar and Cover",
        routerLink: "",
        iconClass: "pi-image"
      },
      {
        title: "Update Restaurant Information",
        routerLink: "",
        iconClass: "pi-pencil"
      },
      {
        title: "Create New Restaurant Promotion Campaign",
        routerLink: "",
        iconClass: "pi-plus-circle"
      },
      {
        title: "View All Restaurant Promotion Campaign",
        routerLink: "",
        iconClass: "pi-ticket"
      },
      {
        title: "Update Restaurant Promotion Campaign",
        routerLink: "",
        iconClass: "pi-pencil"
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
