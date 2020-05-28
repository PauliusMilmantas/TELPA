import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionAPIService } from '../api/session-api.service';


@Component({
  selector: 'app-limits',
  templateUrl: './limits-edit.component.html',
  styleUrls: ['./limits-edit.component.css']
})
export class LimitsEditComponent implements OnInit {

  baseUrl = location.origin;
  user = {
    id: null,
  };

  employees;
  selectedEmployeeId = null;

  hideLimits = true;
  hideMessageBox = true;

  limits;

  constructor(private httpClient: HttpClient, private sessionAPIService: SessionAPIService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.sessionAPIService.me().subscribe((user) => {
      this.user = user;
    }).add(() => {
      this.getEmployeeData();
    });
  }


  getEmployeeData() {
    this.httpClient.get(this.baseUrl + `/api/employee/get/${this.user['id']}/subordinates`).subscribe(
      data => {
        this.employees = data;
      }
    ).add(() => {
    });
  }

  onForWhoChange() {
    if (this.selectedEmployeeId != "null") {
      this.getLimitData();
    } else {
      this.hideLimits = true;
    }
  }

  getLimitData() {
    this.limits = [];
    this.httpClient.get(this.baseUrl + '/api/limit/getByEmployee/' + this.selectedEmployeeId).subscribe(
      data => {
        this.limits = data;
      })
      .add(() => {
        console.log(this.limits);
        this.hideLimits = false;
      });
  }

  onRemove(limitId) {
    console.log(limitId);
    this.httpClient.delete(this.baseUrl + '/api/limit/delete/' + limitId
    ).subscribe(
      (val) => {
        console.log("DELETE call successful value returned in body", val);
        this.getLimitData();
      },
      response => {
        console.log("DELETE call in error", response);
      },
      () => {
        console.log("DELETE POST observable is now completed.");
      }
    );;
  }
}
