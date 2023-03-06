import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppPagesRoutingModule } from "./app-pages-routing.module";
import { AppPagesComponent } from "./app-pages.component";
import { NavbarModule } from "../shared/navbar/navbar.module";
import { FooterModule } from "../shared/footer/footer.module";
import { HomePageModule } from "./home-page/home-page.module";
import { RestaurantFeedModule } from "./restaurant-feed/restaurant-feed.module";
import { AccountInformationModule } from "./account-information/account-information.module";
import { UpdateRestaurantInformationComponent } from './update-restaurant-information/update-restaurant-information.component';


@NgModule({
  declarations: [
    AppPagesComponent,
    UpdateRestaurantInformationComponent
  ],
  imports: [
    CommonModule,
    AppPagesRoutingModule,
    NavbarModule,
    FooterModule,
    HomePageModule,
    RestaurantFeedModule,
    AccountInformationModule
  ],
  bootstrap: [AppPagesComponent]
})
export class AppPagesModule { }
