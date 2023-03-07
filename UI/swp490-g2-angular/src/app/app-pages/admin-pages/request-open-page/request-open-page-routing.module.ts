import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RequestOpenPageComponent } from "./request-open-page.component";

const routes: Routes = [{ path: "", component: RequestOpenPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestOpenPageRoutingModule { }
