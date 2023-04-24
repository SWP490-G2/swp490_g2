import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartRevenueComponent } from "./chart-revenue.component";
import { ChartRevenueRoutingModule } from "./chart-revenue-routing.module";
import { ChartModule } from "primeng/chart";
import { ButtonModule } from "primeng/button";
@NgModule({
  imports: [CommonModule, ChartRevenueRoutingModule, ChartModule, ButtonModule],
  declarations: [ChartRevenueComponent],
})
export class ChartRevenueModule {}
