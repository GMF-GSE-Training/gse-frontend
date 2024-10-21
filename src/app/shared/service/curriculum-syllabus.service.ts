import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";
import { CreateCurriculumSyllabus, UpdateCurriculumSyllabus } from "../model/curriculum-syllabus.model";

@Injectable({
  providedIn: 'root'
})
export class CurriculumSyllabusService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  private readonly apiUrl = environment.apiUrl;
  private readonly endpoints = environment.endpoints.curriculumSyllabus;

  createCurriculumSyllabus(request: CreateCurriculumSyllabus): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.endpoints.base}`, request, { withCredentials: true });
  }

  updateCurriculumSyllabus(capabilityId: string, request: UpdateCurriculumSyllabus): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${this.endpoints.base}/${capabilityId}`, request, { withCredentials: true });
  }

  getCurriculumSyllabus(capabilityId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.endpoints.base}/${capabilityId}`, { withCredentials: true });
  }
}
