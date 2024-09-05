import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RoleResponse } from '../model/Role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  private apiUrl = environment.apiUrl;
  private endpoints = environment.endpoints.role;

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.apiUrl}/${this.endpoints.base}`, { withCredentials: true });
  }
}
