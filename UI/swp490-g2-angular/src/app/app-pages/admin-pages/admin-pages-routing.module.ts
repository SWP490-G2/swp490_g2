import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminPagesComponent } from "./admin-pages.component";

const routes: Routes = [
  { path: "", component: AdminPagesComponent },

  {
    path: "request-open-list",
    loadChildren: () =>
      import("./request-open-list/request-open-list.module").then(
        (m) => m.RequestOpenListModule
      ),
  },

  {
    path: "view-all-user",
    loadChildren: () =>
      import("./view-all-user/view-all-user.module").then(
        (m) => m.ViewAllUserModule
      ),
  },

  {
    path: "view-all-restaurant",
    loadChildren: () =>
      import("./view-all-restaurant/view-all-restaurant.module").then(
        (m) => m.ViewAllRestaurantModule
      ),
  },

  {
    path: "ban-user",
    loadChildren: () =>
      import("./ban-user/ban-user.module").then((m) => m.BanUserModule),
  },

  {
    path: "ban-restaurant",
    loadChildren: () =>
      import("./ban-restaurant/ban-restaurant.module").then(
        (m) => m.BanRestaurantModule
      ),
  },

  {
    path: "change-avatar-cover",
    loadChildren: () =>
      import("./change-avatar-cover/change-avatar-cover.module").then(
        (m) => m.ChangeAvatarCoverModule
      ),
  },

  {
    path: "update-user-info",
    loadChildren: () =>
      import("./update-user-info/update-user-info.module").then(
        (m) => m.UpdateUserInfoModule
      ),
  },
  {
    path: "update-user-role",
    loadChildren: () =>
      import("./update-user-role/update-user-role.module").then(
        (m) => m.UpdateUserRoleModule
      ),
  },
  {
    path: "update-restaurant-info",
    loadChildren: () =>
      import("./update-restaurant-info/update-restaurant-info.module").then(
        (m) => m.UpdateRestaurantInfoModule
      ),
  },
  {
    path: "create-promo",
    loadChildren: () =>
      import("./create-promo/create-promo.module").then(
        (m) => m.CreatePromoModule
      ),
  },
  {
    path: "view-all-promo",
    loadChildren: () =>
      import("./view-all-promo/view-all-promo.module").then(
        (m) => m.ViewAllPromoModule
      ),
  },
  {
    path: "update-promo",
    loadChildren: () =>
      import("./update-promo/update-promo.module").then(
        (m) => m.UpdatePromoModule
      ),
  },
  { path: 'add-restaurant-info', loadChildren: () => import('./add-restaurant-info/add-restaurant-info.module').then(m => m.AddRestaurantInfoModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPagesRoutingModule {}
