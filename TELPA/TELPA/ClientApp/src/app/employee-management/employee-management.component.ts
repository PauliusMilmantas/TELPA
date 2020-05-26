import { Component, OnInit } from '@angular/core';
import { EmployeeDataList } from './data/mock_employee_data';
import { EmployeeData } from './data/data';
import { ModalService } from '../__modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SessionAPIService } from '../api/session-api.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  columns: string[];
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  private changeLeader: any = {};
  //employee lentoms
  employeeDataAll = EmployeeDataList;
  employeeData = [];
  //subordinate lentoms
  subordinateData = [];
  fullSubordinateData = [];
  //leaderiu lentoms
  leaderData = [];
  fullLeaderData = [];
  unasignedLeaderData = [];
  fullUnasignedLeaderData = [];

  linkingData;
  linkingLeaderData;
  //employee
  employeeName;
  employeeEmail;
  employeeRole;
  employeeLeaderId;
  employeeLeader;
  //leader
  leaderName;
  leaderId;
  //subordinates
  subordinateName;
  subordinateEmail;
  subordinateRole;
  subordinateLeaderName;
  subordinateLeaderId;

  mySession;
  e;

  constructor(private modalService: ModalService, private httpClient: HttpClient, private sessionAPIService: SessionAPIService) { }

  ngOnInit() {
    this.getBackendData();
    this.getLeaderData();
    //this.getBackendLeaderData();
    this.getSubordinateData();
  }
  getBackendData() {
    console.log(location.origin);
    this.employeeDataAll = [];
    this.employeeData = [];
    this.httpClient.get(location.origin + '/api/employee/get/all').subscribe(
      data => {
        this.linkingData = data;
      }
    ).add(() => {
      for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
        this.employeeName = this.linkingData[i]['name'];
        this.employeeEmail = this.linkingData[i]['email'];
        this.employeeRole = this.linkingData[i]['role'];
        this.employeeLeaderId = this.linkingData[i]['leaderId'];
        this.employeeData.push({
          'name': this.employeeName,
          'email': this.employeeEmail,
          'role': this.employeeRole,
          'leaderName': this.employeeLeaderId
        })

      }
    });
  }
  getBackendLeaderData() {
    this.leaderData = [];
    this.httpClient.get(location.origin + '/api/employee/get/all').subscribe(
      data => {
        this.linkingData = data;
      }
    ).add(() => {
      let contains = 0;
      for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
        contains = 0;
        for (let j = 0; j < this.leaderData.length; j++) {
          if (this.leaderData[j]['leaderId'] == this.linkingData[i]['leaderId'] && this.linkingData[i]['leaderId'] != null) {
            contains++;
          }
          else {
            console.log("does not contain", this.linkingData[i]['leaderId']);
          }
        }
        if (this.linkingData[i]['leaderId'] != null && contains == 0) {
          console.log(this.leaderData, "not includes ", this.linkingData[i]['leaderId']);
          this.employeeLeaderId = this.linkingData[i]['leaderId'];
          this.leaderData.push({
            'leaderId': this.employeeLeaderId
          });
        }
      }
    });
  }
  getLeaderData() {
    this.fullLeaderData = [];
    this.httpClient.get(location.origin + '/api/employee/get/all/leaders').subscribe(
      data => {
        this.linkingData = data;
      }).add(() => {
        for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
          this.leaderId = this.linkingData[i]['id'];
          this.leaderName = this.linkingData[i]['name'];
          console.log("leader name and id", this.leaderId, this.leaderName);
          this.fullLeaderData.push({
            'leaderId': this.leaderId,
            'leaderName': this.leaderName
          });
        }
      })
  }

  getSubordinateData() {
    this.subordinateData = [];
    //id gaunamas is SessionApiController
    this.sessionAPIService.me().subscribe((e) => {
      this.e = e;
    }).add(() => {
      this.httpClient.get(location.origin + '/api/employee/get/' + this.e.id + '/subordinates').subscribe(
        data => {
          this.linkingData = data;
        }).add(() => {
          for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
            this.subordinateName = this.linkingData[i]['id'];
            this.subordinateEmail = this.linkingData[i]['email'];
            this.subordinateRole = this.linkingData[i]['role'];
            this.subordinateLeaderId = this.linkingData[i]['leaderId'];

            this.subordinateData.push({
              'name': this.subordinateName,
              'email': this.subordinateEmail,
              'role': this.subordinateRole,
              'leaderId': this.subordinateLeaderId
            });
          }
        });
      console.log("subordinate data:", this.subordinateData);
      console.log("session ID", this.e.id);
    });
  }

  selectTeam(id: number) {
    console.log("id yra", id);
    this.employeeDataAll = [];
    this.employeeData = [];
    if (id == 0) {
      this.getBackendData();
    }
    else {
      this.httpClient.get(location.origin + '/api/employee/get/all').subscribe(
        data => {
          this.linkingData = data;
        }
      ).add(() => {
        for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
          this.employeeName = this.linkingData[i]['name'];
          this.employeeEmail = this.linkingData[i]['email'];
          this.employeeRole = this.linkingData[i]['role'];
          this.employeeLeaderId = this.linkingData[i]['leaderId'];
          if (this.linkingData[i]['leaderId'] == id) {
            this.employeeData.push({
              'name': this.employeeName,
              'email': this.employeeEmail,
              'role': this.employeeRole,
              'leaderName': this.employeeLeaderId
            })

          }
        }
      });
    }
  }

  addEmployeeBtnClick(event) {

  }
  onChange(leaderId: number) {

  }

  onSave() {

  }

  sendData(id: number) {

  }
  //Modal window control
  openModal(id: string) {

    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  sendInvite(id: string, name: string, email: string, leaderName: string) {
    let leaderId: number;
    this.leaderName = leaderName;
    //this.fieldArray.push(this.newAttribute)
    console.log(name);
    console.log(this.leaderName);
    console.log("length", this.fullLeaderData.length);
    this.sessionAPIService.me().subscribe(e => {
      this.e = e;
    }).add(() => {
      for (let i = 0; i < this.fullLeaderData.length; i++) {
        console.log(this.fullLeaderData[i]['leaderName'], this.leaderName);
        if (this.fullLeaderData[i]['leaderName'] == this.leaderName) {
          leaderId = this.fullLeaderData[i]['leaderId'];
        }
      }
      this.newAttribute = {};
      console.log(name, email, leaderId);
      this.httpClient.post(location.origin + "/api/invite/create", {
        "name": name,
        "email": email,
        "inviterId": this.e.id,
        "expiryDate": "06/06/2020",
        "link": "whatever.com"
      }).subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });;


      this.modalService.close(id);
    });
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  handleError() {
    console.log("nepavyko prideti");
    return "nepavyko prideti";
  }
}

