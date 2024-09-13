import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUserRequest } from '../model/auth.model';
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

  getToken(): string | undefined {
    return this.cookieService.get('access_token');
  }

  register<T>(request: any): Observable<any > {
    return this.http.post<T>(`${this.apiUrl}/${this.endpoint.register}`, request);
  }

  login(request: LoginUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.endpoint.login}`, request, { withCredentials: true });
  }

  me(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.endpoint.base}`, { withCredentials: true });
  }

  logout<T>(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.endpoint.base}`, { withCredentials: true });
  }
}
