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
  private endpoints = environment.endpoints.user.base;

  constructor(private http: HttpClient) {}

  get<T>(link: string): Observable<any> {
    return this.http.get<T>(`${this.apiUrl}/${link}`, { withCredentials: true });
  }
}
