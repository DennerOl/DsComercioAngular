import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  user$ = this.userService.retornarUser();

  logout() {
    this.userService.logout();
    this, this.router.navigate(['/login']);
  }
}
