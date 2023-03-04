import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerInformationComponent } from './buyer-information.component';
import { OpenRestaurantRequestComponent } from './open-restaurant-request/open-restaurant-request.component';

const routes: Routes = [
  { path: '', component: BuyerInformationComponent },
  { path: 'open-restaurant-request', component: OpenRestaurantRequestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerInformationRoutingModule { }
