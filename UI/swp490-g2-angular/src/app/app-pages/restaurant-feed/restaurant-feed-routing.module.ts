import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantFeedComponent } from './restaurant-feed.component';

const routes: Routes = [{ path: '', component: RestaurantFeedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantFeedRoutingModule { }
