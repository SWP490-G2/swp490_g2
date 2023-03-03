import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPagesRoutingModule } from './app-pages-routing.module';
import { AppPagesComponent } from './app-pages.component';
import { NavbarModule } from '../shared/navbar/navbar.module';
import { FooterModule } from '../shared/footer/footer.module';


@NgModule({
  declarations: [
    AppPagesComponent
  ],
  imports: [
    CommonModule,
    AppPagesRoutingModule,
    NavbarModule,
    FooterModule,
  ],
  bootstrap: [AppPagesComponent]
})
export class AppPagesModule { }