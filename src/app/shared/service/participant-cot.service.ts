import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";
import { ParticipantResponse } from "../model/participant.model";
import { addParticipantToCot, ListParticipantCotResponse } from "../model/participant-cot.model";
import { WebResponse } from "../model/web.model";

@Injectable({
  providedIn: 'root'
})
export class ParticipantCotService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.participantCot;

  getUnregisteredParticipants(cotId: string, page: number = 1, size: number = 10): Observable<WebResponse<ParticipantResponse[]>> {
    return this.http.get<WebResponse<ParticipantResponse[]>>(`${this.apiUrl}/${this.endpoint.unregisteredParticipants}/${cotId}?page=${page}&size=${size}`, { withCredentials: true });
  }

  addParticipantToCot(cotId: string, participantIds: addParticipantToCot): Observable<WebResponse<string>> {
    return this.http.post<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.base}/${cotId}`, participantIds, { withCredentials: true });
  }

  deleteParticipantFromCot(cotId: string, participantId: string): Observable<WebResponse<string>> {
    return this.http.delete<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.base}/${cotId}/${participantId}`, { withCredentials: true });
  }

  listParticipantCot(cotId: string, page?: number, size?: number,): Observable<WebResponse<ListParticipantCotResponse>> {
    return this.http.get<WebResponse<ListParticipantCotResponse>>(`${this.apiUrl}/${this.endpoint.base}/${cotId}/${this.endpoint.list}?page=${page}&size=${size}&`, { withCredentials: true });
  }

  searchParticipantCot(cotId: string, q?: string, page?: number, size?: number ): Observable<WebResponse<ListParticipantCotResponse>> {
    return this.http.get<WebResponse<ListParticipantCotResponse>>(`${this.apiUrl}/${this.endpoint.base}/${cotId}/${this.endpoint.search}?q=${q}&page=${page}&size${size}`, { withCredentials: true });
  }
}
