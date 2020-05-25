import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  Employee,
  LearnedTopic,
  RecommendedTopic,
  Limit,
  Invite,
} from "./api-entities";
import { HttpWrapperService } from "../authentication/http-wrapper.service";
import { LearningDay } from "../learning-days/data/TrainingDay";

const API_URL = "api/employee/";

@Injectable({
  providedIn: "root",
})
export class EmployeeAPIService {
  constructor(private http: HttpWrapperService) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL + "get/all");
  }

  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(API_URL + "get/" + id);
  }

  getSubordinates(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(API_URL + "get/" + id + "/subordinates");
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

  getLearningDays(id: number): Observable<LearningDay[]> {
    return this.http.get<LearningDay[]>(
      API_URL + "get/" + id + "/learningDays"
    );
  }

  getLimits(id: number): Observable<Limit[]> {
    return this.http.get<Limit[]>(API_URL + "get/" + id + "/limits");
  }

  getInvites(id: number): Observable<Invite[]> {
    return this.http.get<Invite[]>(API_URL + "get/" + id + "/invites");
  }

  create(e: Employee): Observable<any> {
    return this.http.post(API_URL + "create", e);
  }

  update(e: Employee): Observable<any> {
    return this.http.put(API_URL + "update", e);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + "delete/" + id);
  }
}
