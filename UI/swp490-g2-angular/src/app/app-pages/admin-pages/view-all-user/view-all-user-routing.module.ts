import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewAllUserComponent } from "./view-all-user.component";

const routes: Routes = [
  { path: "", component: ViewAllUserComponent },
  {
    path: "view-user-details",
    loadChildren: () =>
      import("./view-user-details/view-user-details.module").then(
        (m) => m.ViewUserDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllUserRoutingModule {}
