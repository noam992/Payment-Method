import { MaterialUIModule } from './modules/material-ui/material-ui.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [LayoutComponent, PaymentMethodComponent],
  imports: [BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            FormsModule,
            HttpClientModule,
            MaterialUIModule,
            ReactiveFormsModule],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
