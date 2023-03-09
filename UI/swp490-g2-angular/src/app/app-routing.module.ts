import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppPagesRoutingModule } from "./app-pages/app-pages-routing.module";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./authentication-pages/authentication-pages.module").then(
        (m) => m.AuthenticationPagesModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./app-pages/app-pages.module").then((m) => m.AppPagesModule),
  },
  { path: "request-open-page", loadChildren: () => import("./app-pages/admin-pages/request-open-page/request-open-page.module").then(m => m.RequestOpenPageModule) },
  { path: 'admin-pages', loadChildren: () => import('./app-pages/admin-pages/admin-pages.module').then(m => m.AdminPagesModule) },
  { path: 'request-open-list', loadChildren: () => import('./app-pages/admin-pages/request-open-list/request-open-list.module').then(m => m.RequestOpenListModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AppPagesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
