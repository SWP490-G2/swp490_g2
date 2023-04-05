import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CartPagesComponent } from "./cart-pages.component";
import { AppPagesRoutingModule } from "../app-pages-routing.module";
import { CartPagesRoutingModule } from "./cart-pages-routing.module";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import { StyleClassModule } from "primeng/styleclass";
import { DialogModule } from "primeng/dialog";

@NgModule({
  declarations: [CartPagesComponent],
  imports: [
    CommonModule,
    CartPagesRoutingModule,
    ButtonModule,
    RippleModule,
    StyleClassModule,
    DialogModule,
  ],
})
export class CartPagesModule {}
