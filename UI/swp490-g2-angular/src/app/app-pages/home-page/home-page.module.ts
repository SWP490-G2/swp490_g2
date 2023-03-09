import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { InputTextModule } from "primeng/inputtext";
import { TabViewModule } from "primeng/tabview";
import { ContextMenuModule } from "primeng/contextmenu";
import { BadgeModule } from "primeng/badge";
import { MultiSelectModule } from "primeng/multiselect";
import { HomePageRoutingModule } from "./home-page-routing.module";
import { HomePageComponent } from "./home-page.component";
import { ButtonModule } from "primeng/button";
import { MenuModule } from "primeng/menu";
import { DividerModule } from "primeng/divider";
import { ToggleButtonModule } from "primeng/togglebutton";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    TabViewModule,
    ContextMenuModule,
    BadgeModule,
    MenuModule,
    DividerModule,
    MultiSelectModule,
    ToggleButtonModule,
    FormsModule
  ],
})
export class HomePageModule {}
