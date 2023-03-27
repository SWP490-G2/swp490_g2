import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveOrdersComponent } from './active-orders.component';

const routes: Routes = [{ path: '', component: ActiveOrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveOrdersRoutingModule { }
