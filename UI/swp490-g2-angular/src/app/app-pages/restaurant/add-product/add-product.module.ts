import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ImageAttachmentModule } from "src/app/shared/image-attachment/image-attachment.module";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { AddProductComponent } from "./add-product.component";
import { AddProductRoutingModule } from "./add-product-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ImageAttachmentModule,
    ButtonModule,
    RippleModule,
    AddProductRoutingModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ],
})
export class AddProductModule { }
