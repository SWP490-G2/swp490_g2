import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangeAvatarCoverComponent } from "./change-avatar-cover.component";

const routes: Routes = [{ path: "", component: ChangeAvatarCoverComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeAvatarCoverRoutingModule {}
