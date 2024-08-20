import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  get<T>(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.endpoint.me}`);
  }
}
