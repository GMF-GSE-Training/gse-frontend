import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";
import { CreateCurriculumSyllabus, CurriculumSyllabusResponse, UpdateCurriculumSyllabus } from "../model/curriculum-syllabus.model";

@Injectable({
  providedIn: 'root'
})
export class CurriculumSyllabusService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  private readonly apiUrl = environment.apiUrl;
  private readonly endpoints = environment.endpoints.curriculumSyllabus;

  createCurriculumSyllabus(request: CreateCurriculumSyllabus): Observable<CurriculumSyllabusResponse> {
    return this.http.post<CurriculumSyllabusResponse>(`${this.apiUrl}/${this.endpoints.base}`, request, { withCredentials: true });
  }

  updateCurriculumSyllabus(capabilityId: string, request: UpdateCurriculumSyllabus): Observable<CurriculumSyllabusResponse> {
    return this.http.patch<CurriculumSyllabusResponse>(`${this.apiUrl}/${this.endpoints.base}/${capabilityId}`, request, { withCredentials: true });
  }

  getCurriculumSyllabus(capabilityId: string): Observable<CurriculumSyllabusResponse> {
    return this.http.get<CurriculumSyllabusResponse>(`${this.apiUrl}/${this.endpoints.base}/${capabilityId}`, { withCredentials: true });
  }
}
