import { Component, OnInit } from '@angular/core';
import { EmployeeDataList } from './data/mock_employee_data';
import { EmployeeData } from './data/data';
import { EmployeeServiceService } from './service/employee-service.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  characters: Observable<EmployeeData[]>;
  columns: string[];

  constructor(private atService: EmployeeServiceService) { }

  ngOnInit() {
    this.columns = this.atService.getColumns();

    this.characters = this.atService.getEmployees();
  }

  selectTeamBtnClick(event) {

  }

  addEmployeeBtnClick(event) {

  }

}

