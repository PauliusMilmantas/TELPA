import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountAPIService } from "../api/account-api.service";
import { RegisterData, Invite } from "../api/api-entities";
import { tap, catchError } from "rxjs/operators";
import { throwError, of, Observable } from "rxjs";
import { InviteAPIService } from "../api/invite-api.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.css"],
})
export class RegistrationFormComponent implements OnInit {
  email: string = "";
  link: string = null;
  name: string = "";
  password: string = "";
  repeatedPassword: string = "";
  nameError: boolean = false;
  passwordError: boolean = false;
  repeatedPasswordError: boolean = false;
  linkError: Observable<boolean> = of(false);

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountAPI: AccountAPIService,
    private authentication: AuthenticationService,
    private inviteAPI: InviteAPIService,
    private router: Router
  ) {}

  ngOnInit() {
    this.link = this.activatedRoute.snapshot.queryParamMap.get("link");
    this.inviteAPI.getByLink(this.link).subscribe(
      (data: Invite) => {
        this.email = data.email;
      },
      (err: HttpErrorResponse) => {
        this.linkError = of(true);
      }
    );
  }

  onRegister() {
    this.nameError = this.name.length < 1;
    this.passwordError = this.password.length < 4;
    this.repeatedPasswordError = this.password !== this.repeatedPassword;
    if (this.nameError || this.passwordError || this.repeatedPasswordError) {
      return;
    }

    this.accountAPI
      .register(<RegisterData>{
        link: this.link,
        name: this.name,
        password: this.password,
      })
      .subscribe(
        (data: HttpResponse<any>) => {
          this.authentication.logIn(this.email, this.password).subscribe(
            (data: HttpResponse<any>) => {
              this.router.navigate(["homepage"]);
            },
            (err: HttpErrorResponse) => {}
          );
        },
        (err: HttpErrorResponse) => {}
      );
  }
}
