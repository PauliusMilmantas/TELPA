import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginData, Employee } from "./api-entities";

const API_URL = "api/session/";

@Injectable({
  providedIn: "root",
})
export class SessionAPIService {
  constructor(private http: HttpClient) {}

  logIn(e: LoginData): Observable<HttpResponse<any>> {
    return this.http.post(API_URL + "logIn", e, {
      observe: "response",
    });
  }

  me(): Observable<Employee> {
    return this.http.get<Employee>(API_URL + "me");
  }

  logOut(): Observable<any> {
    return this.http.post(API_URL + "logOut", "{}");
  }

  ping(): Observable<any> {
    return this.http.get(API_URL + "ping");
  }
}
