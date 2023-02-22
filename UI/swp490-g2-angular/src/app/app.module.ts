import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HomePageModule } from './home-page/home-page.module';
import { AuthenticationPagesModule } from './authentication-pages/authentication-pages.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HomePageModule,
    AuthenticationPagesModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
