import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { CreateESign, ESignResponse } from "../model/e-sign.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ESignService {
  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.eSign;

  constructor(
    private http: HttpClient,
  ) { }

  createESign(request: FormData): Observable<ESignResponse> {
    return this.http.post<ESignResponse>(`${this.apiUrl}/${this.endpoint.base}`, request, { withCredentials: true });
  }

  listESign(page: number = 1, size: number = 10): Observable<ESignResponse> {
    return this.http.get<ESignResponse>(`${this.apiUrl}/${this.endpoint.list}?page=${page}&size=${size}`, { withCredentials: true });
  }
}
