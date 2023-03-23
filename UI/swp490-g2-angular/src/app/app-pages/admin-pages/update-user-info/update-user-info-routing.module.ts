import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateUserInfoComponent } from "./update-user-info.component";

const routes: Routes = [
  { path: "", component: UpdateUserInfoComponent },
  {
    path: "update-user-info-apply",
    loadChildren: () =>
      import("./update-user-info-apply/update-user-info-apply.module").then(
        (m) => m.UpdateUserInfoApplyModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateUserInfoRoutingModule {}
