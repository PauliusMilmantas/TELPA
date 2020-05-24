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

  linkingData;

  employeeName;
  employeeEmail;
  employeeRole;
  employeeLeader;

  constructor(private modalService: ModalService, private httpClient: HttpClient) { }

  ngOnInit() {
    //this.columns = this.atService.getColumns();
    //this.characters = this.atService.getEmployees();
    this.getBackendData();
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
        //this.employeeLeader = this.linkingData[i]['leaderId'];
        console.log(this.employeeEmail);
        this.employeeData.push({
          'name': this.employeeName,
          'email': this.employeeEmail,
          'role': this.employeeRole
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

  getDataForFE() {
    this.employeeData = [];
    for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
      this.employeeData.push(
        {
          'name': this.employeeName[i],
          'email': this.employeeEmail[i],
          'role': this.employeeRole[i]
          //'leader_id': this.employeeLeader[i]
        }
      );
    }
  }

  selectTeamBtnClick(event) {

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

    this.httpClient.post(location.origin + "/api/employee/create", {
      "name": name,
      "email": email,
      "role": role
      //"leaderId": leader_id
    }).subscribe(
      (val) => {
        console.log("POST call successful", val)
      }, response => {
        console.log("POST call in error", response);
      }, () => {
        console.log("The POST observable is now completed.");
      });
   

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

