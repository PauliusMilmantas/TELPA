import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LearningDayLink } from "./api-entities";
import { HttpWrapperService } from "../authentication/http-wrapper.service";

const API_URL = "api/learningDayLink/";

@Injectable({
  providedIn: "root",
})
export class LearningDayLinkAPIService {
  constructor(private http: HttpWrapperService) {}

  getAll(): Observable<LearningDayLink[]> {
    return this.http.get<LearningDayLink[]>(API_URL + "get/all");
  }

  get(id: number): Observable<LearningDayLink> {
    return this.http.get<LearningDayLink>(API_URL + "get/" + id);
  }

  create(e: LearningDayLink): Observable<any> {
    return this.http.post(API_URL + "create", JSON.stringify(e));
  }

  update(e: LearningDayLink): Observable<any> {
    return this.http.put(API_URL + "update", JSON.stringify(e));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + "delete/" + id);
  }
}
