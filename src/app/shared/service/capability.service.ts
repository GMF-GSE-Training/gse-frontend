import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CapabilityListResponse, CapabilityResponse, UpdateCapability } from "../model/capability.model";

@Injectable({
  providedIn: 'root',
})
export class CapabilityService {
  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.capability;

  constructor(
    private http: HttpClient,
  ) {}

  createCapability(request: any): Observable<CapabilityResponse> {
    return this.http.post<CapabilityResponse>(`${this.apiUrl}/${this.endpoint.base}`, request, { withCredentials: true });
  }

  getCapabilityById(id: string): Observable<CapabilityResponse> {
    return this.http.get<CapabilityResponse>(`${this.apiUrl}/${this.endpoint.base}/${id}`, { withCredentials: true });
  }

  updateCapability(id: string, request: UpdateCapability): Observable<CapabilityResponse> {
    return this.http.patch<CapabilityResponse>(`${this.apiUrl}/${this.endpoint.base}/${id}`, request, { withCredentials: true });
  }

  deleteCapability(id: string): Observable<CapabilityResponse> {
    return this.http.delete<CapabilityResponse>(`${this.apiUrl}/${this.endpoint.base}/${id}`, { withCredentials: true });
  }

  listCapability(page: number = 1, size: number = 10): Observable<CapabilityListResponse> {
    return this.http.get<CapabilityListResponse>(`${this.apiUrl}/${this.endpoint.list}?page=${page}&size=${size}`, { withCredentials: true });
  }

  searchCapability(q: string, page: number = 1, size: number = 10): Observable<CapabilityListResponse> {
    return this.http.get<CapabilityListResponse>(`${this.apiUrl}/${this.endpoint.search}?q=${q}&page=${page}&size=${size}`,
      { withCredentials: true }
    );
  }
}
