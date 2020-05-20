import { Component, OnInit } from '@angular/core';
import { EmployeeDataList } from './data/mock_employee_data';
import { EmployeeData } from './data/data';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
