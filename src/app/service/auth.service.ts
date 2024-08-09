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
  private endpoint = environment.endpoints;

  constructor(private http: HttpClient) {}

  login(request: LoginUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.endpoint.login}`, request);
  }
}
