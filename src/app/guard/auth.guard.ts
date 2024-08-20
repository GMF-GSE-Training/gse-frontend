import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const localData = localStorage.getItem('Token');

  if(localData != null) {
    return true;
  } else {
    router.navigateByUrl('/login')
    return false;
  }
};
