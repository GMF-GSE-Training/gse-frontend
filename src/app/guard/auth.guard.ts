import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)

  return authService.me().pipe(
    map((response: any) => {
        if (response.code === 200 || response.status === 'OK') {
            return true;
        } else {
            router.navigateByUrl('/login');
            return false;
        }
    }),
    catchError(() => {
        router.navigateByUrl('/login');
        return of(false);
    })
);
};
