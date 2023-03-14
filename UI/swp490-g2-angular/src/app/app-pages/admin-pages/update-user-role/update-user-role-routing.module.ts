import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateUserRoleComponent } from "./update-user-role.component";

const routes: Routes = [
  { path: "", component: UpdateUserRoleComponent },
  {
    path: "change-role",
    loadChildren: () =>
      import("./change-role/change-role.module").then(
        (m) => m.ChangeRoleModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateUserRoleRoutingModule {}
