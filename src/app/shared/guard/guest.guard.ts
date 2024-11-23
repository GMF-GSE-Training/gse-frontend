import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SweetalertService } from '../service/sweetaler.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const sweetalertService = inject(SweetalertService);

  return authService.me().pipe(
    map((response: any) => {
      if (response.code === 200 || response.status === 'OK') {
        if(state.url === 'login') {
          sweetalertService.alert('Peringatan!', 'Anda sudah login', 'warning');
        } else if(state.url === 'register') {
          sweetalertService.alert('Peringatan!', 'Anda sudah terdaftar', 'warning');
        }
        router.navigateByUrl('/');
        return false;
      }
      return true;
    }),
    catchError(() => {
      return of(true);
    })
  );
};
