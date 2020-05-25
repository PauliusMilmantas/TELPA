import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"],
})
export class LoginFormComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private authentication: AuthenticationService) {}

  ngOnInit() {}

  onLogin() {
    this.authentication.logIn(this.email, this.password);
  }
}
