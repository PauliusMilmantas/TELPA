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
        for (var i = 0; i < Object.keys(data).length; i++) {
          var date = data[i][''];
          this.employeeDataAll.push(
            {
              'name': name,
              'email': email,
              'role': role,
              'leader_id': leader_id
            }
          );
        }
      });
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

