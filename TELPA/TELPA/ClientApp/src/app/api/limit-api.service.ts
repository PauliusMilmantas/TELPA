import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Limit } from "./api-entities";
import { HttpWrapperService } from "../authentication/http-wrapper.service";

const API_URL = "api/limit/";

@Injectable({
  providedIn: "root",
})
export class LimitAPIService {
  constructor(private http: HttpWrapperService) {}

  getAll(): Observable<Limit[]> {
    return this.http.get<Limit[]>(API_URL + "get/all");
  }

  get(id: number): Observable<Limit> {
    return this.http.get<Limit>(API_URL + "get/" + id);
  }

  create(e: Limit): Observable<any> {
    return this.http.post(API_URL + "create", JSON.stringify(e));
  }

  update(e: Limit): Observable<any> {
    return this.http.put(API_URL + "update", JSON.stringify(e));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + "delete/" + id);
  }
}
