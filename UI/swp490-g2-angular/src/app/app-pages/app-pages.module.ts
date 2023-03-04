import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPagesRoutingModule } from './app-pages-routing.module';
import { AppPagesComponent } from './app-pages.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { FooterModule } from '../shared/footer/footer.module';
import { HomePageModule } from './home-page/home-page.module';
import { RestaurantFeedModule } from './restaurant-feed/restaurant-feed.module';
import { BuyerInformationModule } from './buyer-information/buyer-information.module';


@NgModule({
  declarations: [
    AppPagesComponent
  ],
  imports: [
    CommonModule,
    AppPagesRoutingModule,
    NavbarModule,
    FooterModule,
    HomePageModule,
    RestaurantFeedModule,
    BuyerInformationModule
  ],
  bootstrap: [AppPagesComponent]
})
export class AppPagesModule { }
