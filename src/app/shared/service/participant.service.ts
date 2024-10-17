import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CreateParticipant, DeleteParticipant, FileResponse, ListParticipantsResponse, Participant, ParticipantResponse } from "../model/participant.model";

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private apiUrl = environment.apiUrl;
  private endpoints = environment.endpoints.participant;

  constructor(private http: HttpClient) {}

  createParticipant(request: FormData): Observable<ParticipantResponse> {
    return this.http.post<ParticipantResponse>(`${this.apiUrl}/${this.endpoints.base}`, request, { withCredentials: true });
  }

  getParticipantById(id: string): Observable<ParticipantResponse> {
    return this.http.get<ParticipantResponse>(`${this.apiUrl}/${this.endpoints.base}/${id}`, { withCredentials: true });
  }

  getParticipantByNik(): Observable<{ code: string; status: number; data: string}> {
    return this.http.get<{ code: string; status: number; data: string}>(`${this.apiUrl}/${this.endpoints.base}/get/profile`, { withCredentials: true });
  }

  updateParticipant(id: string, request: FormData): Observable<ParticipantResponse> {
    return this.http.patch<ParticipantResponse>(`${this.apiUrl}/${this.endpoints.base}/${id}`, request, { withCredentials: true });
  }

  deleteParticipant(id: string): Observable<DeleteParticipant> {
    return this.http.delete<DeleteParticipant>(`${this.apiUrl}/${this.endpoints.base}/${id}`, { withCredentials: true });
  }

  listParticipants(page: number = 1, size: number = 10): Observable<ListParticipantsResponse> {
    return this.http.get<ListParticipantsResponse>(`${this.apiUrl}/${this.endpoints.list}?page=${page}&size=${size}`, { withCredentials: true });
  }

  getFile({ id }: { id: string; }, fileName: string): Observable<FileResponse> {
    return this.http.get<FileResponse>(`${this.apiUrl}/participants/${id}/${fileName}`, { withCredentials: true });
  }

  getFoto(id: string): Observable<FileResponse> {
    return this.http.get<FileResponse>(`${this.apiUrl}/participants/${id}/foto`, { withCredentials: true });
  }

  getQrCode(id: string): Observable<FileResponse> {
    return this.http.get<FileResponse>(`${this.apiUrl}/participants/${id}/qr-code`, { withCredentials: true });
  }

  downloadIdCard(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${this.endpoints.base}/${id}/${this.endpoints.download_id_card}`, {
      withCredentials: true,
      responseType: 'blob'
    });
  }

  viewIdCard(id: string): Observable<string> {
      return this.http.get(`${this.apiUrl}/${this.endpoints.base}/${id}/${this.endpoints.id_card}`, {
          responseType: 'text', // Mengatur responseType ke 'text'
          withCredentials: true
      });
  }

  searchParticipant(q: string, page: number = 1, size: number = 10): Observable<ListParticipantsResponse> {
    return this.http.get<ListParticipantsResponse>(
      `${this.apiUrl}/${this.endpoints.search}?q=${q}&page=${page}&size=${size}`,
      { withCredentials: true }
    );
  }
}
