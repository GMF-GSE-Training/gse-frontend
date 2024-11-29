import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const AuthAndRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Mengambil instance Router untuk navigasi
  const authService = inject(AuthService); // Mengambil instance AuthService untuk memverifikasi user melalui metode me()

  // Fungsi untuk memeriksa dan memproses role user sesuai dengan role yang diizinkan
  const checkAndProcessRole = (userRole: string, allowedRoles: string[]): boolean => {
    const normalizedUserRole = userRole.toLowerCase(); // Normalisasi role user ke huruf kecil
    const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase()); // Normalisasi role yang diizinkan

    if (normalizedAllowedRoles.includes(normalizedUserRole)) { // Jika role user sesuai dengan role yang diizinkan
      return true;
    } else {
      router.navigate(['/home']); // Jika tidak sesuai, arahkan ke halaman /home
      return false;
    }
  };

  // Fungsi untuk menghapus data dari session storage dan mengarahkan ke halaman login
  const clearStorageAndRedirect = () => {
    sessionStorage.clear();
    router.navigateByUrl('/login'); // Arahkan ke halaman login
    return false;
  };

  // Fungsi untuk memeriksa apakah token sudah expired berdasarkan waktu kadaluarsa yang disimpan
  const isTokenExpired = (): boolean => {
    const expiration = sessionStorage.getItem('tokenExpiration'); // Ambil waktu kadaluarsa token
    if (!expiration) return true; // Jika tidak ada waktu kadaluarsa, anggap token expired

    return new Date().getTime() > parseInt(expiration); // Bandingkan waktu sekarang dengan waktu kadaluarsa
  };

  // Ambil role user dan ID participant dari session storage
  const cachedUserRole = sessionStorage.getItem('currentUserRole');
  const cachedParticipantId = sessionStorage.getItem('participantId') || sessionStorage.getItem('id');

  if (cachedUserRole && cachedParticipantId) {
    // Jika ada data di cache, periksa apakah token sudah expired
    if (!isTokenExpired()) {
      return of(checkAndProcessRole(
        cachedUserRole,
        route.data['roles'] as Array<string> // Memastikan role user cocok dengan role yang diizinkan
      ));
    }
    // Jika token expired, hapus data di storage dan minta user autentikasi ulang
    return clearStorageAndRedirect();
  }

  // Jika tidak ada data di cache atau token expired, panggil metode me() untuk memverifikasi user
  return authService.me().pipe(
    map((response: any) => {
      if (response.code === 200 || response.status === 'OK') { // Jika respons berhasil
        // Simpan data user dan waktu expired token di session storage
        sessionStorage.setItem('currentUserRole', response.data.role.name);
        if(response.data.participantId) {
          sessionStorage.setItem('participantId', response.data.participantId);
        } else {
          sessionStorage.setItem('id', response.data.id);
        };

        // Set waktu kadaluarsa token (misalnya 1 jam dari sekarang)
        const expirationTime = new Date().getTime() + (60 * 60 * 1000);
        sessionStorage.setItem('tokenExpiration', expirationTime.toString());

        // Lakukan pengecekan role user setelah data disimpan
        return checkAndProcessRole(
          response.data.role.name,
          route.data['roles'] as Array<string>
        );
      }
      // Jika gagal mendapatkan respons, hapus data dan arahkan ke login
      return clearStorageAndRedirect();
    }),
    catchError(() => {
      return of(clearStorageAndRedirect()); // Jika terjadi error, hapus data dan arahkan ke login
    })
  );
};
