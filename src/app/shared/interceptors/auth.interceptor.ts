import {
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject, } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SweetalertService } from '../service/sweetaler.service';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const sweetalertService = inject(SweetalertService);

  let isRefreshing = false;
  const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/token')) {
        return handle401Error(req, next, authService, router, sweetalertService, isRefreshing, refreshTokenSubject);
      }
      return throwError(() => error);
    })
  );
};

const handle401Error = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router,
  sweetalertService: SweetalertService,
  isRefreshing: boolean,
  refreshTokenSubject: BehaviorSubject<string | null>
): Observable<HttpEvent<any>> => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((response) => {
        isRefreshing = false;
        refreshTokenSubject.next(response.data);
        return next(req);
      }),
      catchError((err) => {
        isRefreshing = false;
        clearLocalStorageAndLogout(router, authService);
        sweetalertService.alert('Sesi berakhir', 'Silakan login kembali', 'warning');
        router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      switchMap((token) => {
        if (token) {
            return next(req);
        }
        clearLocalStorageAndLogout(router, authService);
        sweetalertService.alert('Sesi berakhir', 'Silakan login kembali', 'warning');
        return throwError(() => new Error('Token refresh failed'));
      })
    );
  }
};

const clearLocalStorageAndLogout = (router: Router, authService: AuthService) => {
  localStorage.clear(); // Hapus semua data di localStorage
  router.navigate(['/login']); // Redirect ke halaman login
};
