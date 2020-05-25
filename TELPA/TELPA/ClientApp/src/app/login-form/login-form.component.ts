import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent implements OnInit {
  email: string = "";
  password: string = "";
  showError: boolean = false;

  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.authentication.isLoggedIn().subscribe((loggedIn: boolean) => {
    //   if (loggedIn) {
    //     this.router.navigate(["homepage"]);
    //   }
    // });
  }

  onLogin() {
    this.authentication.logIn(this.email, this.password).subscribe(
      (data: HttpResponse<any>) => {
        this.router.navigate(["homepage"]);
      },
      (err: HttpErrorResponse) => {
        this.showError = true;
      }
    );
  }
}
