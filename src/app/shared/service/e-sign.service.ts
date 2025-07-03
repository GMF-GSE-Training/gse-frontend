import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { ESignResponse, UpdateESign } from "../model/e-sign.model";
import { Observable } from "rxjs";
import { WebResponse } from "../model/web.model";

@Injectable({
  providedIn: 'root'
})
export class ESignService {
  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.eSign;

  constructor(
    private readonly http: HttpClient,
  ) { }

  // Semua fungsi utama e-sign dikomentari sementara
  // getESigns() { ... }
  // addESign() { ... }
  // updateESign() { ... }
  // deleteESign() { ... }

  createESign(request: FormData): Observable<WebResponse<string>> {
    return this.http.post<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.base}`, request, { withCredentials: true });
  }

  getESignById(id: string): Observable<WebResponse<ESignResponse>> {
    return this.http.get<WebResponse<ESignResponse>>(`${this.apiUrl}/${this.endpoint.base}/${id}`, { withCredentials: true });
  }

  getESignFile(id: string): Observable<WebResponse<string>> {
    return this.http.get<WebResponse<string>>(`${this.apiUrl}/e-sign/${id}/view`, { withCredentials: true });
  }

  listESign(q?: string, page?: number, size?: number): Observable<WebResponse<ESignResponse[]>> {
    return this.http.get<WebResponse<ESignResponse[]>>(`${this.apiUrl}/${this.endpoint.list}?q=${q}&page=${page}&size=${size}`, { withCredentials: true });
  }
}
