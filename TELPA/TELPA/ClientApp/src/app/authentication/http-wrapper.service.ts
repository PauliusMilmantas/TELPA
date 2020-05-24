import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class HttpWrapperService {
  constructor(
    private http: HttpClient,
    private authentication: AuthenticationService
  ) {}

  post<T>(url, data): Observable<T> {
    let headers = new HttpHeaders();
    let token = this.authentication.getToken();
    if (token) {
      headers = headers.append("X-SessionToken", token);
    }
    return this.http.post<T>(url, data, { headers: headers });
  }

  get<T>(url): Observable<T> {
    let headers = new HttpHeaders();
    let token = this.authentication.getToken();
    if (token) {
      headers = headers.append("X-SessionToken", token);
    }
    return this.http.get<T>(url, { headers: headers });
  }

  put<T>(url, data): Observable<T> {
    let headers = new HttpHeaders();
    let token = this.authentication.getToken();
    if (token) {
      headers = headers.append("X-SessionToken", token);
    }
    return this.http.put<T>(url, data, { headers: headers });
  }

  delete<T>(url): Observable<T> {
    let headers = new HttpHeaders();
    let token = this.authentication.getToken();
    if (token) {
      headers = headers.append("X-SessionToken", token);
    }
    return this.http.delete<T>(url, { headers: headers });
  }
}
