import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPagesRoutingModule } from './order-pages-routing.module';
import { OrderPagesComponent } from './order-pages.component';


@NgModule({
  declarations: [
    OrderPagesComponent
  ],
  imports: [
    CommonModule,
    OrderPagesRoutingModule
  ]
})
export class OrderPagesModule { }
