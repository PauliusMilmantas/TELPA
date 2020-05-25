import { Injectable } from "@angular/core";
import { SessionAPIService } from "../api/session-api.service";
import { LoginData, Employee } from "../api/api-entities";
import { Observable } from "rxjs";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

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
    let observable = this.sessionAPI.logIn(<LoginData>{
      email: email,
      password: password,
    });
    this._email = email;
    this._password = password;
    observable.subscribe(
      (response: HttpResponse<any>) =>
        sessionStorage.setItem(
          "session-token",
          response.headers.get("X-SessionToken")
        ),
      (error: HttpErrorResponse) => {
        sessionStorage.removeItem("session-token");
      }
    );
    return observable;
  }

  logOut() {
    let observable = this.sessionAPI.logOut();
    observable.subscribe(
      (response: Response) => sessionStorage.removeItem("session-token"),
      (error) => {}
    );
    return observable;
  }

  getToken(): string {
    return sessionStorage.getItem("session-token");
  }

  isLoggedIn() {
    let observable = this.sessionAPI.ping();
    let result = true;
    observable.subscribe((error) => {
      result = false;
    });
    observable.toPromise();
    return result;
  }
}
