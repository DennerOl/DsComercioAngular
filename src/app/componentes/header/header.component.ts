import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartLocalStorageService } from 'src/app/pages/services/cart/cart-local-storage.service';
import { UserService } from 'src/app/pages/services/serviceUser/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private cartLocalStorageService: CartLocalStorageService,
    private router: Router
  ) {}

  user$ = this.userService.retornarUser();

  logout() {
    this.userService.logout();
    this.cartLocalStorageService.excluir();
    this.router.navigate(['/login']);
  }
}