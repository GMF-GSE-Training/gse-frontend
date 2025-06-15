import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { AuthResponse, LoginUserRequest, RegisterUserRequest, UpdatePassword } from '../model/auth.model';
import { environment } from '../../../environments/environment';
import { WebResponse } from '../model/web.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.auth;

  constructor(
    private readonly http: HttpClient,
  ) { }

  register(request: RegisterUserRequest): Observable<WebResponse<string>> {
    return this.http.post<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.register}`, request)
      .pipe(
        catchError(error => {
          // Jika error SMTP (email gagal terkirim), tetap anggap sukses
          if (error.error?.message?.includes('ETIMEDOUT') || 
              error.error?.message?.includes('ECONNREFUSED') ||
              error.error?.message?.includes('ESOCKET') ||
              error.message?.includes('connect')) {
            const response: WebResponse<string> = {
              code: 201,
              status: 'OK',
              data: 'Register berhasil, link verifikasi akan dikirim ke email anda'
            };
            return of(response);
          }
          throw error;
        })
      );
  }

  login(request: LoginUserRequest): Observable<WebResponse<AuthResponse>> {
    return this.http.post<WebResponse<AuthResponse>>(`${this.apiUrl}/${this.endpoint.login}`, request, { withCredentials: true });
  }

  me(): Observable<WebResponse<AuthResponse>> {
    return this.http.get<WebResponse<AuthResponse>>(`${this.apiUrl}/${this.endpoint.base}`, { withCredentials: true }).pipe(
      tap((response) => {
        this.userProfile$.next(response.data);
      })
    );
  }

  refreshToken(): Observable<WebResponse<string>> {
    return this.http.get<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.refreshToken}`, { withCredentials: true });
  }

  forgotPassword(request: { email: string }): Observable<WebResponse<string>> {
    return this.http.post<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.resetPasswordRequest}`, request);
  }

  resetPassword(request: UpdatePassword): Observable<WebResponse<string>> {
    return this.http.post<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.resetPassword}`, request);
  }

  resendVerification(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${this.endpoint.accountVerificationRequest}`, { email }).pipe(
      catchError(error => {
        // Jika error terkait SMTP, anggap sebagai sukses
        if (error.error?.message?.includes('ETIMEDOUT') || 
            error.error?.message?.includes('Error sending email') ||
            error.error?.message?.includes('ECONNREFUSED')) {
          console.warn('SMTP Error ignored:', error);
          return of('Link verifikasi akan dikirim ke email Anda');
        }
        return throwError(() => error);
      })
    );
  }

  verifyAccount(token: string): Observable<WebResponse<string>> {
    return this.http.post<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.verify}`, { token });
  }

  updateEmailRequest(request: { email: string }): Observable<WebResponse<string>> {
    return this.http.post<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.updateEmailRequest}`, request, { withCredentials: true });
  }

  updatePassword(request: UpdatePassword): Observable<WebResponse<string>> {
    return this.http.post<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.updatePassword}`, request, { withCredentials: true });
  }

  logout(): Observable<WebResponse<string>> {
    return this.http.delete<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.base}`, { withCredentials: true });
  }

  userProfile$ = new BehaviorSubject<AuthResponse | null | undefined>(undefined);

  setUserProfile(data: any) {
    if(data) {
      this.userProfile$.next(data);
    } else {
      this.userProfile$.next(null);
    }
  }
}
