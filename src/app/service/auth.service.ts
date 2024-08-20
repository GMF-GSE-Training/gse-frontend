import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUserRequest } from '../model/auth.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.auth;

  constructor(
    private http: HttpClient,
  ) {}

  token(): string | null {
    return localStorage.getItem('Token');
  }

  login<T>(request: LoginUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.endpoint.login}`, request);
  }

  me<T>(): Observable<any> {
    const token = this.token();
    if (!token) {
      throw new Error('Token is missing!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${this.endpoint.current}`, { headers });
  }

  logout<T>(): Observable<any> {
    const token = this.token();
    if (!token) {
      throw new Error('Token is missing!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${this.endpoint.current}`, { headers });
  }
}
