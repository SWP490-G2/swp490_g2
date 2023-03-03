import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NavbarComponent } from './navbar.component';
import { RippleModule } from 'primeng/ripple'
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MenubarModule, InputTextModule, TabViewModule, ContextMenuModule, RippleModule, BadgeModule, StyleClassModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
