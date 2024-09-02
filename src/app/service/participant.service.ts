import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse, Participant } from "../model/participant.model";

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private apiUrl = environment.apiUrl;
  private endpoints = environment.endpoints.participant;

  constructor(private http: HttpClient) {}

  createParticipant<T>(request: FormData): Observable<any> {
    return this.http.post<T>(`${this.apiUrl}/${this.endpoints.base}`, request, { withCredentials: true });
  }

  getParticipantById(id: string): Observable<any> {
    return this.http.get<Participant>(`${this.apiUrl}/${this.endpoints.base}/${id}`, { withCredentials: true });
  }

  updateParticipant(id: string, participant: Participant): Observable<Participant> {
    return this.http.put<Participant>(id, participant, { withCredentials: true });
  }

  deleteParticipant(id: string): Observable<any> {
    return this.http.delete<Participant>(`${this.apiUrl}/${this.endpoints.base}/${id}`, { withCredentials: true });
  }

  listParticipants(page: number = 1, size: number = 10): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${this.endpoints.list}?page=${page}&size=${size}`, { withCredentials: true });
  }

  getFoto(id: string): Observable<{ data: string }> {
    return this.http.get<{ data: string }>(`${this.apiUrl}/participants/${id}/foto`, { withCredentials: true });
  }

  getQrCode(id: string): Observable<{ data: string }> {
    return this.http.get<{ data: string }>(`${this.apiUrl}/participants/${id}/qr-code`, { withCredentials: true });
  }
}
