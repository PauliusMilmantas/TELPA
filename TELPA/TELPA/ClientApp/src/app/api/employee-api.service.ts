import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "./api-entities";
import { HttpWrapperService } from "../authentication/http-wrapper.service";

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

  create(e: Employee): Observable<any> {
    return this.http.post(API_URL + "create", JSON.stringify(e));
  }

  update(e: Employee): Observable<any> {
    return this.http.put(API_URL + "update", JSON.stringify(e));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API_URL + "delete/" + id);
  }
}
