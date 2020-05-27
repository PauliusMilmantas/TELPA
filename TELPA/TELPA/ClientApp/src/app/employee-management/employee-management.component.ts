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
  employeeData1 = [];
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
  employeeId;
  employeeName;
  employeeEmail;
  employeeRole;
  employeeLeaderId;
  employeeLeader;
  employeeLeaderName;
  employeePasswordHash;
  employeeVersion;
  //leader
  leaderName;
  leaderId;
  newLeader = {
    id: null,
    email: '',
    // passwordHash: '' ,
    role: '',
    name: '',
    leaderId: null,
    version: null
  }
  //subordinates
  subordinateId;
  subordinateName;
  subordinateEmail;
  subordinateRole;
  subordinateLeaderName;
  subordinateLeaderId;
  //employeeToEdit
  employeeToEdit = {
    id: null,
    email: '',
    // passwordHash: '' ,
    role: '',
    name: '',
    leaderId: null,
    version: null
  };

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
    /*    this.sessionAPIService.me().subscribe((e) => {
          this.e = e;
        }).add(() => {
          this.httpClient.get(location.origin + '/api/employee/get/all/employeesForLeader/' + this.e.id).subscribe(*/
    this.httpClient.get(location.origin + '/api/employee/get/all/employeesAndLeaders/').subscribe(
      data => {
        this.linkingData = data;
      }).add(() => {
        for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
          this.employeeId = this.linkingData[i]['employeeId'];
          this.employeeName = this.linkingData[i]['employeeName'];
          this.employeeEmail = this.linkingData[i]['employeeEmail'];
          this.employeeRole = this.linkingData[i]['employeeRole'];
          this.employeeLeaderId = this.linkingData[i]['leaderId'];
          this.employeeLeaderName = this.linkingData[i]['leaderName'];
          this.employeeData.push({
            'employeeId': this.employeeId,
            'employeeName': this.employeeName,
            'employeeEmail': this.employeeEmail,
            'employeeRole': this.employeeRole,
            'leaderId': this.employeeLeaderId,
            'leaderName': this.employeeLeaderName
          });
        }
        console.log(this.employeeData);
      });
    //    });
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
    console.log("fullLeaderData:", this.fullLeaderData)
  }

  getSubordinateData() {
    this.subordinateData = [];
    //id gaunamas is SessionApiController
    this.sessionAPIService.me().subscribe((e) => {
      this.e = e;
    }).add(() => {
      this.httpClient.get(location.origin + '/api/employee/get/all/employeesForLeader/leaders/' + this.e.id).subscribe(
        data => {
          this.linkingData = data;
        }).add(() => {
          for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
            this.subordinateId = this.linkingData[i]['id'];
            this.subordinateName = this.linkingData[i]['name'];
            this.subordinateEmail = this.linkingData[i]['email'];
            this.subordinateRole = this.linkingData[i]['role'];
            this.subordinateLeaderId = this.linkingData[i]['leaderId'];

            this.subordinateData.push({
              'id': this.subordinateId,
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
    this.employeeId = id;
    this.employeeData = [];
    if (id == 0 || id == null) {
      this.getBackendData();
    }
    else {
      this.httpClient.get(location.origin + '/api/employee/get/all/employeesAndLeaders/').subscribe(
        data => {
          this.linkingData = data;
        }
      ).add(() => {
        //console.log("e.id:", this.e.id);
        for (let i = 0; i < Object.keys(this.linkingData).length; i++) {
          console.log("linkingData length:", Object.keys(this.linkingData).length);
          this.employeeName = this.linkingData[i]['employeeName'];
          this.employeeEmail = this.linkingData[i]['employeeEmail'];
          this.employeeRole = this.linkingData[i]['employeeRole'];
          this.employeeLeaderId = this.linkingData[i]['leaderId'];
          this.employeeLeaderName = this.linkingData[i]['leaderName'];
          console.log(this.employeeId, this.linkingData[i]['leaderId']);
          if (this.linkingData[i]['leaderId'] == this.employeeId) {
            this.employeeData.push({
              'employeeName': this.employeeName,
              'employeeEmail': this.employeeEmail,
              'employeeRole': this.employeeRole,
              'leaderId': this.employeeLeaderId,
              'leaderName': this.employeeLeaderName
            })
          }
        }
        console.log(id, this.employeeData);
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

  openEditModal(employeeId, employeeName, employeeLeaderId, id) {
    console.log("employee kuri perduodu i modal:", employeeId);
    console.log("subordinate data viduj modal:", this.subordinateData);
    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.leaderId = employeeLeaderId;
    this.httpClient.get('/api/employee/get/' + this.employeeId).subscribe(
      data => {
        this.linkingData = data;
      }).add(() => {
        this.employeeName = this.linkingData['name'];
        this.employeeLeaderId = this.linkingData['leaderId'];
      }).add(() => {
        this.modalService.open(id);
      })
  }
  getNewLeader(id: number) {
    this.employeeId = id;
    console.log("naujas lyderis",this.employeeId);
    this.httpClient.get('api/employee/get/' + this.employeeId).subscribe(data => {
      this.linkingData = data;
    }).add(() => {
      this.employeeName = this.linkingData['name'];
      this.employeeRole = this.linkingData['role'];
      //this.employeePasswordHash = this.linkingData['passwordHash'];
      this.employeeEmail = this.linkingData['email'];
      this.employeeId = this.linkingData['id'];
      this.employeeLeaderId = this.linkingData['leaderId'];
      this.employeeVersion = this.linkingData['version'];
      console.log("viduj http get naujo lyderio id:", this.employeeId);
      this.newLeader = {
        id: this.employeeId,
        email: this.employeeEmail,
        //passwordHash: this.employeePasswordHash,
        role: this.employeeRole,
        name: this.employeeName,
        leaderId: this.employeeLeaderId,
        version: this.employeeVersion
      }
    });

    console.log("new Leader metode", this.newLeader);
  }
  editLeader(id, leaderId: number, employeeId: number) {
    this.employeeId = employeeId;
    this.leaderId = leaderId;
    this.modalService.close(id);
    this.employeeToEdit['leaderId'] = leaderId;
    console.log("newLeader: ", this.newLeader);
    console.log("employee edit", this.employeeToEdit);
    if (this.employeeToEdit['id'] != this.newLeader['leaderId']) {
      this.httpClient.put('api/employee/update', this.employeeToEdit).subscribe(
        (val) => {
          console.log("PUT call successful value returned in body", val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
    }
    else console.log("editint negalima");
  }

  getEmployee(id: number) {
    this.httpClient.get('api/employee/get/' + id).subscribe(data => {
      this.linkingData = data;
    }).add(() => {
      this.employeeName = this.linkingData['name'];
      this.employeeRole = this.linkingData['role'];
      //this.employeePasswordHash = this.linkingData['passwordHash'];
      this.employeeEmail = this.linkingData['email'];
      this.employeeId = this.linkingData['id'];
      this.employeeLeaderId = this.linkingData['leaderId'];
      this.employeeVersion = this.linkingData['version'];

      this.employeeToEdit = {
        id: this.employeeId,
        email: this.employeeEmail,
        //passwordHash: this.employeePasswordHash,
        role: this.employeeRole,
        name: this.employeeName,
        leaderId: this.employeeLeaderId,
        version: this.employeeVersion
      }
    });
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

  handleError() {
    console.log("nepavyko prideti");
    return "nepavyko prideti";
  }

  onLeaderChange(value) {
    console.log("employeeData value:", this.employeeData);
  }
}

