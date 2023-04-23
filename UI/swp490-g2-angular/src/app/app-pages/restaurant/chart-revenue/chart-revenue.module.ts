import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartRevenueComponent } from './chart-revenue.component';
import { ChartRevenueRoutingModule } from './chart-revenue-routing.module';
import { ChartModule } from 'primeng/chart';
@NgModule({
  imports: [
    CommonModule,
    ChartRevenueRoutingModule,
    ChartModule
  ],
  declarations: [ChartRevenueComponent]
})
export class ChartRevenueModule { }
