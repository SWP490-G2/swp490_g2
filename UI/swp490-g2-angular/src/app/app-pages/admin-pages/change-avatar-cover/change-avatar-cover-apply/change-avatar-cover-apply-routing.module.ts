import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangeAvatarCoverApplyComponent } from "./change-avatar-cover-apply.component";

const routes: Routes = [{ path: "", component: ChangeAvatarCoverApplyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeAvatarCoverApplyRoutingModule { }
