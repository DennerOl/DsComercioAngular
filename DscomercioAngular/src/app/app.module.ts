import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './componentes/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './pages/home/home.component';
import { CardProductComponent } from './pages/home/card-product/card-product.component';
import { MatCardModule } from '@angular/material/card';
import { ProductComponent } from './componentes/product/product.component';
import { ContainerComponent } from './componentes/container/container.component';
import { HttpClientModule } from '@angular/common/http';
import { BotaoCarregarMaisComponent } from './pages/home/card-product/botao-carregar-mais/botao-carregar-mais.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './componentes/footer/footer.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginComponent } from './pages/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './componentes/cart/cart.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ConfirmationCartComponent } from './pages/confirmation-cart/confirmation-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CardProductComponent,
    ProductComponent,
    ContainerComponent,
    BotaoCarregarMaisComponent,
    FooterComponent,
    ProductDetailsComponent,
    LoginComponent,
    CartComponent,
    ShoppingCartComponent,
    ConfirmationCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
