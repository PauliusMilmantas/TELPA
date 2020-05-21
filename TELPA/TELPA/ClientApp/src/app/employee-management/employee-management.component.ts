import { Component, OnInit } from '@angular/core';
import { EmployeeDataList } from './data/mock_employee_data';
import { EmployeeData } from './data/data';
import { ModalService } from '../__modal';


@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  columns: string[];
  employeeToAdd = new EmployeeData(45, '', '', '', 78);
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    //this.columns = this.atService.getColumns();

    //this.characters = this.atService.getEmployees();
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

