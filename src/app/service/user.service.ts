import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { RegisterUserRequest } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {

  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints;

  constructor(private http: HttpClient) {}

  register<T>(request: RegisterUserRequest): Observable<any> {
    return this.http.post<T>(`${this.apiUrl}/${this.endpoint.register}`, request);
  }
}
