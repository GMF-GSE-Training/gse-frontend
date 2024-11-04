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
}
