import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminPagesComponent } from "./admin-pages.component";

const routes: Routes = [{ path: "", component: AdminPagesComponent },

{ path: "request-open-list", loadChildren: () => import("./request-open-list/request-open-list.module").then(m => m.RequestOpenListModule) },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
