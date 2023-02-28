import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ContextMenuModule } from 'primeng/contextmenu';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    TabViewModule,
    ContextMenuModule
  ]
})
export class HomePageModule { }
