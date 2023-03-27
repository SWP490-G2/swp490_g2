import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailsRoutingModule } from './order-details-routing.module';
import { OrderDetailsComponent } from './order-details.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';
import { RequestOpenListModule } from '../../admin-pages/request-open-list/request-open-list.module';


@NgModule({
  declarations: [
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrderDetailsRoutingModule,
    TagModule,
    TabMenuModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    RequestOpenListModule,
  ]
})
export class OrderDetailsModule { }
