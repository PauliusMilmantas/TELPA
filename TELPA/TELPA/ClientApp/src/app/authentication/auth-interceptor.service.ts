import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = localStorage.getItem("session-token");
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          "X-SessionToken": accessToken,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403 && !request.url.includes("ping")) {
          this.router.navigate([""]);
          return throwError("authentication required");
        }
        return throwError(err);
      })
    );
  }
}
