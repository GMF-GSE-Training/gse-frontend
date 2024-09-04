import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ListUserResponse, User, UserResponse } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = environment.apiUrl;
  private endpoints = environment.endpoints.user;

  constructor(private http: HttpClient) {}

  get(link: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${link}`, { withCredentials: true });
  }

  listUsers(page: number = 1, size: number = 10): Observable<ListUserResponse> {
    return this.http.get<ListUserResponse>(`${this.apiUrl}/${this.endpoints.list}?page=${page}&size=${size}`, { withCredentials: true });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<User>(`${this.apiUrl}/${this.endpoints.base}/${id}`, { withCredentials: true });
  }
}
