import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRestaurantInfoRoutingModule } from './add-restaurant-info-routing.module';
import { AddRestaurantInfoComponent } from './add-restaurant-info.component';


@NgModule({
  declarations: [
    AddRestaurantInfoComponent
  ],
  imports: [
    CommonModule,
    AddRestaurantInfoRoutingModule
  ]
})
export class AddRestaurantInfoModule { }
