import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CapabilityService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {}

  listCapability(page: number = 1, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/capability/list/result?page=${page}&size=${size}`, { withCredentials: true });
  }
}
