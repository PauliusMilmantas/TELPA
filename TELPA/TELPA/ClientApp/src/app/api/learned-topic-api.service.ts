import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LearnedTopic } from "./api-entities";

const API_URL = "api/learnedTopic/";

@Injectable({
  providedIn: "root",
})
export class LearnedTopicAPIService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<LearnedTopic[]> {
    return this.http.get<LearnedTopic[]>(API_URL + "get/all");
  }

  get(id: number): Observable<LearnedTopic> {
    return this.http.get<LearnedTopic>(API_URL + "get/" + id);
  }

  create(e: LearnedTopic): Observable<any> {
    return this.http.post(API_URL + "create", e);
  }

  update(e: LearnedTopic): Observable<any> {
    return this.http.put(API_URL + "update", e);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + "delete/" + id);
  }
}
