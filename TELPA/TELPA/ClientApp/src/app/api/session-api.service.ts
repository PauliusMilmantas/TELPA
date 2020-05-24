import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginData } from "./api-entities";
import { HttpWrapperService } from "../authentication/http-wrapper.service";

const API_URL = "api/session/";

@Injectable({
  providedIn: "root",
})
export class SessionAPIService {
  constructor(private http: HttpWrapperService) {}

  logIn(e: LoginData): Observable<any> {
    return this.http.post(API_URL + "logIn", JSON.stringify(e));
  }

  logOut(): Observable<any> {
    return this.http.post(API_URL + "logOut", "{}");
  }

  ping(): Observable<any> {
    return this.http.get(API_URL + "ping");
  }
}
