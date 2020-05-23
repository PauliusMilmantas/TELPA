import { Component, OnInit } from '@angular/core';
import { EmployeeDataList } from './data/mock_employee_data';
import { EmployeeData } from './data/data';
import { ModalService } from '../__modal';
import { HttpClient } from '@angular/common/http';


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

  getBackendData() {
    var baseURL = location.origin;
    this.employeeDataAll = [];
    this.httpClient.get(baseURL + 'api/employee/get/all').subscribe(
      data => {
        this.linkingData = data;
      }
    ).add(() => {
      for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
        this.employeeName = this.linkingData[i]['name'];
        this.employeeEmail = this.linkingData[i]['email'];
        this.employeeRole = this.linkingData[i]['role'];
        this.employeeLeader = this.linkingData[i]['leaderId'];
      }
    }).add(() => {
      this.getDataForFE();
    });
  }

  getDataForFE() {
    this.employeeData = [];
    for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
      this.employeeData.push(
        {
          'name': this.employeeName[i],
          'email': this.employeeEmail[i],
          'role': this.employeeRole[i],
          'leader_id': this.employeeLeader[i]
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

  addFieldValue(id: string) {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
    this.modalService.close(id);
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
}

