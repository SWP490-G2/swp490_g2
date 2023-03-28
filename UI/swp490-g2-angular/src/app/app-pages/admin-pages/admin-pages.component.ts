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
    const colors = ["red", "green", "blue"];
    this.buttonContents = [
      {
        title: "User Management",
        routerLink: "view-all-user",
        iconClass: "pi-users",
      },
      {
        title: "Restaurant Management",
        routerLink: "view-all-restaurant",
        iconClass: "pi-bars",
      },
      {
        title: "Restaurant Opening Request Management",
        routerLink: "request-open-list",
        iconClass: "pi-list",
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
