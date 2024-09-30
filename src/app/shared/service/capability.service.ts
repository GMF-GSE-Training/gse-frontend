import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CapabilityService {
  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.capability;

  constructor(
    private http: HttpClient,
  ) {}

  createCapability(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.endpoint.base}`, request, { withCredentials: true });
  }

  listCapability(page: number = 1, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.endpoint.list}?page=${page}&size=${size}`, { withCredentials: true });
  }
}
