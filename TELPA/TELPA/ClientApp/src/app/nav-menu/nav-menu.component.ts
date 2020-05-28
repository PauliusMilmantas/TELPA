import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication/authentication.service";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { Employee } from "../api/api-entities";
import { SessionAPIService } from "../api/session-api.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;

  me: Observable<Employee> = of(<Employee>{ name: "" });

  constructor(
    private authentication: AuthenticationService,
    private sessionAPI: SessionAPIService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sessionAPI.me().subscribe(
      (e) => {
        this.me = of(e);
      },
      (err: HttpErrorResponse) => {}
    );
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onLogOut() {
    this.authentication.logOut().subscribe(
      (resp) => {
        this.router.navigate([""]);
      },
      (err: HttpErrorResponse) => {}
    );
  }
}
