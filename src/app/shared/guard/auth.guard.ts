import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const AuthAndRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.me().pipe(
    map((response: any) => {
      if (response.code === 200 || response.status === 'OK') {
        localStorage.setItem('currentUserRole', response.data.role.role);
        const userRole = response.data.role.role.toLowerCase(); // Ambil role dari response
        const allowedRoles = (route.data['roles'] as Array<string>).map(role => role.toLowerCase());

        // Cek apakah role pengguna termasuk dalam role yang diizinkan
        if (allowedRoles.includes(userRole)) {
          return true; // Akses diizinkan
        } else {
          router.navigate(['/home']); // Akses tidak diizinkan
          return false;
        }
      } else {
        router.navigateByUrl('/login'); // Jika tidak terautentikasi, redirect ke login
        return false;
      }
    }),
    catchError(() => {
      localStorage.removeItem('currentUserRole');
      router.navigateByUrl('/login'); // Jika ada error, redirect ke halaman login
      return of(false);
    })
  );
};
