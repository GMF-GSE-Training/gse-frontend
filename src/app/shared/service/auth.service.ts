import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, LoginUserRequest, RegisterUserRequest, ResetPassword } from '../model/auth.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.auth;

  constructor(
    private http: HttpClient,
  ) {}

  register(request: RegisterUserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/${this.endpoint.register}`, request);
  }

  login(request: LoginUserRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/${this.endpoint.login}`, request, { withCredentials: true });
  }

  me(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/${this.endpoint.base}`, { withCredentials: true });
  }

  logout(): Observable<AuthResponse> {
    return this.http.delete<AuthResponse>(`${this.apiUrl}/${this.endpoint.base}`, { withCredentials: true });
  }

  forgotPassword(request: { email: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/${this.endpoint.requestResetPassword}`, request);
  }

  resetPassword(req: ResetPassword): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/${this.endpoint.resetPassword}`, req);
  }
}
