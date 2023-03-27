import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOrdersComponent } from './all-orders.component';

const routes: Routes = [{ path: '', component: AllOrdersComponent },
{ path: 'order-details', loadChildren: () => import('./order-details/order-details.module').then(m => m.OrderDetailsModule) },
{ path: 'active-orders', loadChildren: () => import('./active-orders/active-orders.module').then(m => m.ActiveOrdersModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllOrdersRoutingModule { }
