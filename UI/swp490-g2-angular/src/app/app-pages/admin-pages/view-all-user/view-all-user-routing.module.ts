import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewAllUserComponent } from "./view-all-user.component";

const routes: Routes = [{ path: "", component: ViewAllUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewAllUserRoutingModule { }
