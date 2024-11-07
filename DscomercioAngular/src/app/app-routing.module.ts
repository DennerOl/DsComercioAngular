import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginComponent } from './pages/login/login.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { authGuard } from './pages/services/auth.guard';
import { ConfirmationCartComponent } from './pages/confirmation-cart/confirmation-cart.component';
import { CadastroUserComponent } from './pages/cadastro-user/cadastro-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'product/product-details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'shoppingCart',
    component: ShoppingCartComponent,
    canActivate: [authGuard],
  },
  {
    path: 'confirmation/:orderId',
    component: ConfirmationCartComponent,
    canActivate: [authGuard],
  },

  {
    path: 'cadastro',
    component: CadastroUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
