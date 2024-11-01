import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const AuthAndRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Periksa apakah data pengguna ada di cache
  const cachedUserRole = localStorage.getItem('currentUserRole');
  const cachedParticipantId = localStorage.getItem('participantId');

  if (cachedUserRole && cachedParticipantId) {
    const userRole = cachedUserRole.toLowerCase();
    const allowedRoles = (route.data['roles'] as Array<string>).map(role => role.toLowerCase());

    if (allowedRoles.includes(userRole)) {
      return true; // Akses diizinkan
    } else {
      router.navigate(['/home']);
      return false;
    }
  }

  return authService.me().pipe(
    map((response: any) => {
      if (response.code === 200 || response.status === 'OK') {
        console.log(response.data);
        localStorage.setItem('currentUserRole', response.data.role.role);
        localStorage.setItem('participantId', response.data.participantId);
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
      localStorage.removeItem('participantId');
      router.navigateByUrl('/login'); // Jika ada error, redirect ke halaman login
      return of(false);
    })
  );
};
