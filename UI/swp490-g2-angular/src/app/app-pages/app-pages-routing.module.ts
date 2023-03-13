import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../global/auth.guard";
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
        path: "restaurant",
        loadChildren: () =>
          import("./restaurant/restaurant.module").then(
            (m) => m.RestaurantModule
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
        canActivate: [AuthGuard],
        data: {
          roles: ["ADMIN"],
        },
      },

      {
        path: "feed-page",
        loadChildren: () =>
          import("./feed-page/feed-page.module").then((m) => m.FeedPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPagesRoutingModule {}
