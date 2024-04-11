import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { CheckoutComponent } from './components/checkout/checkout/checkout.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart/cart.component';
import { UserInformationComponent } from './components/cart/user-information/user-information.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    CheckoutComponent,
    NavbarComponent,
    CartComponent,
    UserInformationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
