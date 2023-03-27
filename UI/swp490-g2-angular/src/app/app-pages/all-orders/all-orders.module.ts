import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllOrdersRoutingModule } from './all-orders-routing.module';
import { AllOrdersComponent } from './all-orders.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AllOrdersComponent
  ],
  imports: [
    CommonModule,
    AllOrdersRoutingModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
  ]
})
export class AllOrdersModule { }
