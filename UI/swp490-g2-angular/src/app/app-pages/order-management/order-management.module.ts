import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagementComponent } from './order-management.component';
import { OrderManagementRoutingModule } from './order-management-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OrderManagementRoutingModule
  ],
  declarations: [OrderManagementComponent]
})
export class OrderManagementModule { }
