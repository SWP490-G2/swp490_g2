import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveOrdersRoutingModule } from './active-orders-routing.module';
import { ActiveOrdersComponent } from './active-orders.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    ActiveOrdersComponent
  ],
  imports: [
    CommonModule,
    ActiveOrdersRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
  ]
})
export class ActiveOrdersModule { }
