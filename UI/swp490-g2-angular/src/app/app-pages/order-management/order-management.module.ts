import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagementComponent } from './order-management.component';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    TableModule,
    ButtonModule,
    TagModule,
    DialogModule
  ],
  declarations: [OrderManagementComponent]
})
export class OrderManagementModule { }
