import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangeAvatarCoverComponent } from "./change-avatar-cover.component";

const routes: Routes = [
  { path: "", component: ChangeAvatarCoverComponent },
  {
    path: "change-avatar-cover-apply",
    loadChildren: () =>
      import(
        "./change-avatar-cover-apply/change-avatar-cover-apply.module"
      ).then((m) => m.ChangeAvatarCoverApplyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeAvatarCoverRoutingModule {}
