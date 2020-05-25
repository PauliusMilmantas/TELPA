import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LearningDayTopic } from "./api-entities";
import { HttpWrapperService } from "../authentication/http-wrapper.service";

const API_URL = "api/learningDayTopic/";

@Injectable({
  providedIn: "root",
})
export class LearningDayTopicAPIService {
  constructor(private http: HttpWrapperService) {}

  getAll(): Observable<LearningDayTopic[]> {
    return this.http.get<LearningDayTopic[]>(API_URL + "get/all");
  }

  get(id: number): Observable<LearningDayTopic> {
    return this.http.get<LearningDayTopic>(API_URL + "get/" + id);
  }

  create(e: LearningDayTopic): Observable<any> {
    return this.http.post(API_URL + "create", e);
  }

  update(e: LearningDayTopic): Observable<any> {
    return this.http.put(API_URL + "update", e);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + "delete/" + id);
  }
}
