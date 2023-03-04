import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantFeedRoutingModule } from './restaurant-feed-routing.module';
import { RestaurantFeedComponent } from './restaurant-feed.component';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';


@NgModule({
  declarations: [
    RestaurantFeedComponent
  ],
  imports: [
    CommonModule,
    RestaurantFeedRoutingModule,
    InputTextModule,
    BadgeModule,
    StyleClassModule,
    ButtonModule,
    RippleModule,
    MenuModule
  ]
})
export class RestaurantFeedModule { }
