import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LearningDay, LearningDayTopic, LearningDayLink } from "./api-entities";
import { HttpWrapperService } from "../authentication/http-wrapper.service";

const API_URL = "api/learningDay/";

@Injectable({
  providedIn: "root",
})
export class LearningDayAPIService {
  constructor(private http: HttpWrapperService) {}

  getAll(): Observable<LearningDay[]> {
    return this.http.get<LearningDay[]>(API_URL + "get/all");
  }

  get(id: number): Observable<LearningDay> {
    return this.http.get<LearningDay>(API_URL + "get/" + id);
  }

  getLearningDayTopics(id: number): Observable<LearningDayTopic[]> {
    return this.http.get<LearningDayTopic[]>(
      API_URL + "get/" + id + "/learningDayTopics"
    );
  }

  getLearningDayLinks(id: number): Observable<LearningDayLink[]> {
    return this.http.get<LearningDayLink[]>(
      API_URL + "get/" + id + "/learningDayLinks"
    );
  }

  create(e: LearningDay): Observable<any> {
    return this.http.post(API_URL + "create", JSON.stringify(e));
  }

  update(e: LearningDay): Observable<any> {
    return this.http.put(API_URL + "update", JSON.stringify(e));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + "delete/" + id);
  }
}
