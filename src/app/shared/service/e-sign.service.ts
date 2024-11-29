import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ESignResponse } from "../model/e-sign.model";
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

  createESign(request: FormData): Observable<WebResponse<string>> {
    return this.http.post<WebResponse<string>>(`${this.apiUrl}/${this.endpoint.base}`, request, { withCredentials: true });
  }

  listESign(page?: number, size?: number): Observable<WebResponse<ESignResponse[]>> {
    return this.http.get<WebResponse<ESignResponse[]>>(`${this.apiUrl}/${this.endpoint.list}?page=${page}&size=${size}`, { withCredentials: true });
  }
}
