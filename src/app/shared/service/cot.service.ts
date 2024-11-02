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

    listCot(page: number = 1, size: number = 10): Observable<CotResponse> {
      return this.http.get<CotResponse>(`${this.apiUrl}/${this.endpoint.list}?page=${page}&size=${size}`, { withCredentials: true });
    }
}
