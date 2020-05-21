import { Injectable } from '@angular/core';
import { EmployeeDataList } from './../data/mock_employee_data';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/of';
import { EmployeeData } from '../data/data';


@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor() { }

  getEmployees(): Observable<EmployeeData[]> {
    return of(EmployeeDataList);
  }

  getColumns(): string[] {
    return ["name", "email", "role", "leader_id"];
  }
}
