import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionAPIService } from '../api/session-api.service';


@Component({
  selector: 'app-limits',
  templateUrl: './limits-add.component.html',
  styleUrls: ['./limits-add.component.css']
})
export class LimitsAddComponent implements OnInit {

  baseUrl = location.origin;
  user = {
    id: null,
  };

  employees;
  selectedEmployeeId = null;

  hideForm = true;
  hideSuccessBox = true;
  hideErrorBox = true;
  errorMessage;

  limitToAdd = {
    employeeId: null,
    startDate: '',
    endDate: '',
    maxConsecutiveLearningDays: null,
    maxTotalLearningDays: null
  }

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
    this.hideSuccessBox = true;
    this.hideErrorBox = true;
    if (this.selectedEmployeeId != "null") {
      this.hideForm = false;
      this.limitToAdd['employeeId'] = this.selectedEmployeeId;
    } else {
      this.hideForm = true;
    }
  }

  onSubmit() {
    this.hideSuccessBox = true;
    this.hideErrorBox = true;
    this.httpClient.post(this.baseUrl + "/api/limit/create", this.limitToAdd
    ).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
        if (val['statusCode'] == 200) {
          this.hideSuccessBox = false;
          this.resetLimit();
        } else {
          this.errorMessage = val['value'];
          this.hideErrorBox = false;
        }
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );;
  }

  resetLimit() {
    this.limitToAdd = {
      employeeId: this.selectedEmployeeId,
      startDate: '',
      endDate: '',
      maxConsecutiveLearningDays: null,
      maxTotalLearningDays: null
    }
  }

}
