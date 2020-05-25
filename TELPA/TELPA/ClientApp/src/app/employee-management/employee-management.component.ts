import { Component, OnInit } from '@angular/core';
import { EmployeeDataList } from './data/mock_employee_data';
import { EmployeeData } from './data/data';
import { ModalService } from '../__modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  columns: string[];
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  employeeDataAll = EmployeeDataList;
  employeeData = [];
  leaderData = [];

  linkingData;
  linkingLeaderData;

  employeeName;
  employeeEmail;
  employeeRole;
  employeeLeaderId;
  employeeLeader;
  employeeLeaderName;

  constructor(private modalService: ModalService, private httpClient: HttpClient) { }

  ngOnInit() {
    //this.columns = this.atService.getColumns();
    //this.characters = this.atService.getEmployees();
    this.getBackendData();
    this.getBackendLeaderData();
  }
/*
  getBackendData() {
    var baseURL = location.origin;
    this.httpClient.get(baseURL + '/api/employees/get/all').toPromise().then(data => {
      console.log(data);
    });
  }
*/

  getBackendData() {
    console.log(location.origin);
    //let lyderis: string;
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
 /*     .add(() => {
      //this.getDataForFE();
      for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
        this.employeeData.push({
          'name': this.employeeName[i],
          'email': this.employeeEmail[i],
          'role': this.employeeRole[i]
        });
      }
    });*/
  }
  getBackendLeaderData() {
    //let lyderis: string;
    this.leaderData = [];
    this.httpClient.get(location.origin + '/api/employee/get/all').subscribe(
      data => {
        this.linkingData = data;
      }
    ).add(() => {
      let contains = 0;
      for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
        contains = 0;
        //contains = this.containsElement(contains, this.linkingData[i]['leaderId']);
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
  containsElement(contains: boolean, leaderId: number) {
    console.log("containsElement", leaderId);
    for (let i = 0; i < this.leaderData.length; i++) {
      if (this.leaderData[i]['leader'] == leaderId) {
        contains = true;
        return contains;
      }
      else {
        contains = false;
        console.log("does not contain", leaderId);
      }
    }
    return contains;
  }

  selectTeam(id: number) {
    console.log("id yra", id);
    //let lyderis: string;
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

  //Modal window control
  openModal(id: string) {

    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  addFieldValue(id: string, name: string, email: string, role: string, leader_id: number) {

    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
    console.log(name, email, role);
    this.httpClient.post(location.origin + "/api/employee/create", {
      "name": name,
      "email": email,
      "role": role,
      "passwordHash": "slaptazodis"
      //"leaderId": leader_id
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
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  handleError() {
    console.log("nepavyko prideti");
    return "nepavyko prideti";
  }
}

