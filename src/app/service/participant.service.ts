import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints.user;

  constructor(private http: HttpClient) {}

  create<T>(request: any): Observable<any > {
    return this.http.post<T>(`${this.apiUrl}/${this.endpoint.register}`, request);
  }
}
