import { Injectable } from "@angular/core";
import { SessionAPIService } from "../api/session-api.service";
import { LoginData, Employee } from "../api/api-entities";
import { Observable, throwError, of } from "rxjs";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private _email: string = null;
  get email(): string {
    return this._email;
  }
  private _password: string = null;
  get password(): string {
    return this._password;
  }

  constructor(private sessionAPI: SessionAPIService) {}

  logIn(email: string, password: string): Observable<any> {
    this._email = email;
    this._password = password;
    return this.sessionAPI
      .logIn(<LoginData>{
        email: email,
        password: password,
      })
      .pipe(
        tap((response: HttpResponse<any>) => {
          localStorage.setItem(
            "session-token",
            response.headers.get("X-SessionToken")
          );
        })
      );
  }

  logOut() {
    return this.sessionAPI
      .logOut()
      .pipe(tap(() => localStorage.removeItem("session-token")));
  }

  getToken(): string {
    return localStorage.getItem("session-token");
  }

  isLoggedIn(): Observable<boolean> {
    return this.sessionAPI.ping().pipe(
      map((x) => x.ok),
      catchError((err: HttpErrorResponse) => of(false))
    );
  }
}
