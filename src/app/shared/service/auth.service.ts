import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, LoginUserRequest, ResetPassword } from '../model/auth.model';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.auth;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  // getToken(): string | undefined {
  //   return this.cookieService.get('access_token');
  // }

  register<T>(request: any): Observable<any > {
    return this.http.post<T>(`${this.apiUrl}/${this.endpoint.register}`, request);
  }

  login(request: LoginUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.endpoint.login}`, request, { withCredentials: true });
  }

  me(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.endpoint.base}`, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.endpoint.base}`, { withCredentials: true });
  }

  forgotPassword(request: { email: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/${this.endpoint.requestResetPassword}`, request);
  }

  resetPassword(req: ResetPassword): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/${this.endpoint.resetPassword}`, req);
  }
}
