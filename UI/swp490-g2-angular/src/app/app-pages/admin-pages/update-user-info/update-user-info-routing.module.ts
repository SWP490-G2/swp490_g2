import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateUserInfoComponent } from "./update-user-info.component";

const routes: Routes = [{ path: "", component: UpdateUserInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateUserInfoRoutingModule { }
