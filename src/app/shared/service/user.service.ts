import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CreateUserRequest, ListUserResponse, User, UserResponse } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = environment.apiUrl;
  private endpoints = environment.endpoints.user;

  constructor(private http: HttpClient) {}

  createUser(request: CreateUserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/${this.endpoints.base}`, request, { withCredentials: true });
  }

  get(link: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${link}`, { withCredentials: true });
  }

  updateUser<T>(id: string, request: FormData): Observable<any> {
    return this.http.patch<T>(`${this.apiUrl}/${this.endpoints.base}/${id}`, request, { withCredentials: true });
  }

  searchUser(q: string, page: number = 1, size: number = 10): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${this.apiUrl}/${this.endpoints.search}?q=${q}&page=${page}&size=${size}`,
      { withCredentials: true }
    );
  }

  listUsers(page: number = 1, size: number = 10): Observable<ListUserResponse> {
    return this.http.get<ListUserResponse>(`${this.apiUrl}/${this.endpoints.list}?page=${page}&size=${size}`, { withCredentials: true });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<User>(`${this.apiUrl}/${this.endpoints.base}/${id}`, { withCredentials: true });
  }
}
