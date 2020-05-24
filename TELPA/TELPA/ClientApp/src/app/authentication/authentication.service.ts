import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { SessionAPIService } from "../api/session-api.service";
import { LoginData } from "../api/api-entities";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private sessionAPI: SessionAPIService,
    private cookieService: CookieService
  ) {}

  logIn(email: string, password: string): Observable<any> {
    let observable = this.sessionAPI.logIn(<LoginData>{
      email: email,
      password: password,
    });
    observable.subscribe(
      (response: Response) =>
        this.cookieService.set(
          "session-token",
          response.headers.get("X-SessionToken")
        ),
      (error) => {
        this.cookieService.delete("session-token");
      }
    );
    return observable;
  }

  logOut() {
    let observable = this.sessionAPI.logOut();
    observable.subscribe(
      (response: Response) => this.cookieService.delete("session-token"),
      (error) => {}
    );
    return observable;
  }

  getToken(): string {
    if (this.cookieService.check("session-token")) {
      return this.cookieService.get("session-token");
    } else {
      return null;
    }
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
