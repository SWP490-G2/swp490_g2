import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BanUserComponent } from "./ban-user.component";

const routes: Routes = [
  { path: "", component: BanUserComponent },
  {
    path: "ban-user-apply",
    loadChildren: () =>
      import("./ban-user-apply/ban-user-apply.module").then(
        (m) => m.BanUserApplyModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanUserRoutingModule {}
