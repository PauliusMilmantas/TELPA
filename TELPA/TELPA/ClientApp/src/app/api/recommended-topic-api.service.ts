import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RecommendedTopic } from "./api-entities";
import { HttpWrapperService } from "../authentication/http-wrapper.service";

const API_URL = "api/recommendedTopic/";

@Injectable({
  providedIn: "root",
})
export class RecommendedTopicAPIService {
  constructor(private http: HttpWrapperService) {}

  getAll(): Observable<RecommendedTopic[]> {
    return this.http.get<RecommendedTopic[]>(API_URL + "get/all");
  }

  get(id: number): Observable<RecommendedTopic> {
    return this.http.get<RecommendedTopic>(API_URL + "get/" + id);
  }

  create(e: RecommendedTopic): Observable<any> {
    return this.http.post(API_URL + "create", e);
  }

  update(e: RecommendedTopic): Observable<any> {
    return this.http.put(API_URL + "update", e);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + "delete/" + id);
  }
}
