import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateUserInfoApplyComponent } from "./update-user-info-apply.component";

const routes: Routes = [{ path: "", component: UpdateUserInfoApplyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateUserInfoApplyRoutingModule { }
