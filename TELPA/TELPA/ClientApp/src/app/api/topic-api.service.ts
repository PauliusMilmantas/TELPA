import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  Topic,
  TopicLink,
  LearnedTopic,
  RecommendedTopic,
  LearningDayTopic,
} from "./api-entities";
import { HttpWrapperService } from "../authentication/http-wrapper.service";

const API_URL = "api/topic/";

@Injectable({
  providedIn: "root",
})
export class TopicAPIService {
  constructor(private http: HttpWrapperService) {}

  getAll(): Observable<Topic[]> {
    return this.http.get<Topic[]>(API_URL + "get/all");
  }

  get(id: number): Observable<Topic> {
    return this.http.get<Topic>(API_URL + "get/" + id);
  }

  getSubtopics(id: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(API_URL + "get/" + id + "/subtopics");
  }

  getTopicLinks(id: number): Observable<TopicLink[]> {
    return this.http.get<TopicLink[]>(API_URL + "get/" + id + "/topicLinks");
  }

  getLearnedTopics(id: number): Observable<LearnedTopic[]> {
    return this.http.get<LearnedTopic[]>(
      API_URL + "get/" + id + "/learnedTopics"
    );
  }

  getRecommendedTopics(id: number): Observable<RecommendedTopic[]> {
    return this.http.get<RecommendedTopic[]>(
      API_URL + "get/" + id + "/recommendedTopics"
    );
  }

  getLearningDayTopics(id: number): Observable<LearningDayTopic[]> {
    return this.http.get<LearningDayTopic[]>(
      API_URL + "get/" + id + "/learningDayTopics"
    );
  }

  create(e: Topic): Observable<any> {
    return this.http.post(API_URL + "create", JSON.stringify(e));
  }

  update(e: Topic): Observable<any> {
    return this.http.put(API_URL + "update", JSON.stringify(e));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + "delete/" + id);
  }
}
