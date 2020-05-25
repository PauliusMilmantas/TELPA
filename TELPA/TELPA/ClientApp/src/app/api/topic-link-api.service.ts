import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TopicLink } from "./api-entities";

const API_URL = "api/topicLink/";

@Injectable({
  providedIn: "root",
})
export class TopicLinkAPIService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<TopicLink[]> {
    return this.http.get<TopicLink[]>(API_URL + "get/all");
  }

  get(id: number): Observable<TopicLink> {
    return this.http.get<TopicLink>(API_URL + "get/" + id);
  }

  create(e: TopicLink): Observable<any> {
    return this.http.post(API_URL + "create", e);
  }

  update(e: TopicLink): Observable<any> {
    return this.http.put(API_URL + "update", e);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + "delete/" + id);
  }
}
