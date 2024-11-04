import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CotResponse, CreateCOT, UpdateCOT } from "../model/cot.model";

@Injectable({
  providedIn: 'root'
})
export class CotService {
  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.cot;

  constructor(
    private http: HttpClient,
  ) { }

    createCot(request: CreateCOT): Observable<string> {
      return this.http.post<string>(`${this.apiUrl}/${this.endpoint.base}`, request, { withCredentials: true });
    }

    getCotById(id: string): Observable<CotResponse> {
      return this.http.get<CotResponse>(`${this.apiUrl}/${this.endpoint.base}/${id}`, { withCredentials: true });
    }

    updateCot(id: string, request: UpdateCOT): Observable<CotResponse> {
      return this.http.patch<CotResponse>(`${this.apiUrl}/${this.endpoint.base}/${id}`, request, { withCredentials: true });
    }

    getUnregisteredParticipants(cotId: string, page: number = 1, size: number = 10): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${this.endpoint.participanCot}/${cotId}/${this.endpoint.unregisteredParticipants}?page=${page}&size=${size}`, { withCredentials: true });
    }

    addParticipantToCot(cotId: string, participantIds: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/${this.endpoint.participanCot}/${cotId}`, participantIds, { withCredentials: true });
    }

    getParticipantCot(cotId: string, page: number = 1, size: number = 10): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${this.endpoint.participanCot}/${cotId}?page=${page}&size=${size}`, { withCredentials: true });
    }

    deleteParticipantFromCot(cotId: string, participantId: string): Observable<CotResponse> {
      return this.http.delete<CotResponse>(`${this.apiUrl}/${this.endpoint.participanCot}/${cotId}/${participantId}`, { withCredentials: true });
    }

    deleteCot(id: string): Observable<CotResponse> {
      return this.http.delete<CotResponse>(`${this.apiUrl}/${this.endpoint.base}/${id}`, { withCredentials: true });
    }

    listCot(page: number = 1, size: number = 10): Observable<CotResponse> {
      return this.http.get<CotResponse>(`${this.apiUrl}/${this.endpoint.list}?page=${page}&size=${size}`, { withCredentials: true });
    }

    searchCot(q: string, page: number = 1, size: number = 10): Observable<CotResponse> {
      return this.http.get<CotResponse>(`${this.apiUrl}/${this.endpoint.search}?q=${q}&page=${page}&size=${size}`,
        { withCredentials: true }
      );
    }
}
