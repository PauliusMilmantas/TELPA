import { Injectable, Injector } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { Router } from "@angular/router";
import { catchError, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HttpWrapperService {
  private http: HttpClient;
  private authentication: AuthenticationService;
  private router: Router;
  constructor(injector: Injector) {
    setTimeout(() => (this.http = injector.get(HttpClient)));
    setTimeout(
      () => (this.authentication = injector.get(AuthenticationService))
    );
    setTimeout(() => (this.router = injector.get(Router)));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req);
    // return next.handle(req).pipe(
    //   catchError((err, caught) => {
    //     if (err instanceof HttpErrorResponse) {
    //       if (err.status === 403) {
    //         this.router.navigate([""]);
    //       }
    //       return caught;
    //     }
    //   })
    // );
  }

  post<T>(url: string, data: any): Observable<T> {
    let headers = new HttpHeaders();
    let token = this.authentication.getToken();
    if (token) {
      headers = headers.append("X-SessionToken", token);
    }
    let observable = this.http.post<T>(url, data, {
      headers: headers,
    });
    return observable;
  }

  get<T>(url: string): Observable<T> {
    let headers = new HttpHeaders();
    let token = this.authentication.getToken();
    if (token) {
      headers = headers.append("X-SessionToken", token);
    }
    return this.http.get<T>(url, { headers: headers });
  }

  put<T>(url: string, data: any): Observable<T> {
    let headers = new HttpHeaders();
    let token = this.authentication.getToken();
    if (token) {
      headers = headers.append("X-SessionToken", token);
    }
    return this.http.put<T>(url, data, { headers: headers });
  }

  delete<T>(url: string): Observable<T> {
    let headers = new HttpHeaders();
    let token = this.authentication.getToken();
    if (token) {
      headers = headers.append("X-SessionToken", token);
    }
    return this.http.delete<T>(url, { headers: headers });
  }
}
