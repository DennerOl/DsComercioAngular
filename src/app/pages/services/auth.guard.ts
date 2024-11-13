import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './serviceUser/user.service';

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.estaLogado()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
