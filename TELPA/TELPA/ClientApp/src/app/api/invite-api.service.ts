import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Invite } from "./api-entities";
import { HttpWrapperService } from "../authentication/http-wrapper.service";

const API_URL = "api/invite/";

@Injectable({
  providedIn: "root",
})
export class InviteAPIService {
  constructor(private http: HttpWrapperService) {}

  getAll(): Observable<Invite[]> {
    return this.http.get<Invite[]>(API_URL + "get/all");
  }

  get(id: number): Observable<Invite> {
    return this.http.get<Invite>(API_URL + "get/" + id);
  }

  create(e: Invite): Observable<any> {
    return this.http.post(API_URL + "create", JSON.stringify(e));
  }

  update(e: Invite): Observable<any> {
    return this.http.put(API_URL + "update", JSON.stringify(e));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + "delete/" + id);
  }
}
