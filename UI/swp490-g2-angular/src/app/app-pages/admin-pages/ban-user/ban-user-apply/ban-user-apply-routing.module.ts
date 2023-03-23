import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BanUserApplyComponent } from "./ban-user-apply.component";

const routes: Routes = [{ path: "", component: BanUserApplyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BanUserApplyRoutingModule { }
