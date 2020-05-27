import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Invite, RegisterData } from "./api-entities";

const API_URL = "api/account/";

@Injectable({
  providedIn: "root",
})
export class AccountAPIService {
  constructor(private http: HttpClient) {}

  invite(e: Invite): Observable<any> {
    return this.http.post(API_URL + "invite", e);
  }

  register(e: RegisterData): Observable<any> {
    return this.http.post(API_URL + "register", e);
  }
}
