import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordFieldsComponent } from './password-fields.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PasswordFieldsComponent],
  exports: [PasswordFieldsComponent]
})
export class PasswordFieldsModule { }
 