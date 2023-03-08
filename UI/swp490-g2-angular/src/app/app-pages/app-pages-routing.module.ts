import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppPagesComponent } from "./app-pages.component";

const routes: Routes = [
  {
    path: "",
    component: AppPagesComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./home-page/home-page.module").then((m) => m.HomePageModule),
      },
      {
        path: "restaurant-feed",
        loadChildren: () =>
          import("./restaurant-feed/restaurant-feed.module").then(
            (m) => m.RestaurantFeedModule
          ),
      },
      {
        path: "account-information",
        loadChildren: () =>
          import("./account-information/account-information.module").then(
            (m) => m.AccountInformationModule
          ),
      },
      {
        path: "admin-pages",
        loadChildren: () =>
          import("./admin-pages/admin-pages.module").then(
            (m) => m.AdminPagesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPagesRoutingModule {}
