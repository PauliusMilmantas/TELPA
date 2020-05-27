import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionAPIService } from '../api/session-api.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  baseUrl = location.origin;

  private apiTopics;
  topics = [];
  leaders;

  selectedTopicId = null;
  selectedLeaderId = null;


  employees;
  teams;
  completed;
  scheduled;

  ascending = true;

  constructor(private httpClient: HttpClient, private sessionAPIService: SessionAPIService) { }

  ngOnInit() {
    this.getLeaderData();
  }

  getTopicData() {
    this.httpClient.get(this.baseUrl + '/api/topic/get/all').subscribe(
      data => {
        this.apiTopics = data;
      }
    ).add(() => {
      this.parseTopics();
    });
  }

  parseTopics() {
    let index = 1;
    for (let i = 0; i < this.apiTopics.length; i++) {
      if (this.apiTopics[i]['parentTopicId'] == null) {
        this.topics.push(
          {
            id: this.apiTopics[i]['id'],
            index: index,
            name: this.apiTopics[i]['name'],
            subtopicAmount: 0,
            level: 0,
          }
        );
        index++;
      }
    }

    for (let i = 0; i < this.topics.length; i++) {
      for (let j = 0; j < this.apiTopics.length; j++) {
        if (this.topics[i]['id'] == this.apiTopics[j]['parentTopicId']) {
          this.topics[i]['subtopicAmount']++;
          this.topics.splice(i + this.topics[i]['subtopicAmount'], 0,
            {
              id: this.apiTopics[j]['id'],
              index: this.topics[i]['index'] + '.' + this.topics[i]['subtopicAmount'],
              name: this.apiTopics[j]['name'],
              subtopicAmount: 0,
              level: this.topics[i]['level'] + 1,
            }
          );
        }
      }
    }
  }

  onEmployeeTopicChange() {
    this.getEmployeesData();
  }

  getEmployeesData() {
    this.employees = [];
    this.httpClient.get(this.baseUrl + '/api/section/get/employeesForTopic/' + this.selectedTopicId).subscribe(
      data => {
        this.employees = data;
      }
    ).add(() => {
    });
  }

  sortEmployees(column) {
    if (!this.ascending) {
      this.employees.sort((a, b) => a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0)
      this.ascending = true;
    } else {
      this.employees.sort((a, b) => a[column] < b[column] ? 1 : a[column] > b[column] ? -1 : 0)
      this.ascending = false;
    }
  }

  onTeamsTopicChange() {
    this.getTeamsData();
  }

  getTeamsData() {
    this.teams = [];
    this.httpClient.get(this.baseUrl + '/api/section/get/leadersForTopic/' + this.selectedTopicId).subscribe(
      data => {
        this.teams = data;
      }
    ).add(() => {
    });
  }

  sortTeams(column) {
    if (!this.ascending) {
      this.teams.sort((a, b) => a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0)
      this.ascending = true;
    } else {
      this.teams.sort((a, b) => a[column] < b[column] ? 1 : a[column] > b[column] ? -1 : 0)
      this.ascending = false;
    }
  }

  getLeaderData() {
    let userId;
    this.sessionAPIService.me().subscribe((user) => {
      userId = user['id'];
    }).add(() => {
      this.httpClient.get(this.baseUrl + '/api/employee/get/all/employeesForLeader/leaders/' + userId).subscribe(
        data => {
          this.leaders = data;
        }
      ).add(() => {
      });
    });
  }
  
  onCompletedLeaderChange() {
    this.getCompletedData();
  }

  getCompletedData() {
    this.completed = [];
    this.httpClient.get(this.baseUrl + '/api/section/get/leadersForLearnedTopic/' + this.selectedLeaderId).subscribe(
      data => {
        this.completed = data;
      }
    ).add(() => {
    });
  }

  sortCompleted(column) {
    if (!this.ascending) {
      this.completed.sort((a, b) => a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0)
      this.ascending = true;
    } else {
      this.completed.sort((a, b) => a[column] < b[column] ? 1 : a[column] > b[column] ? -1 : 0)
      this.ascending = false;
    }
  }

  onScheduledLeaderChange() {
    this.getScheduledData();
  }

  getScheduledData() {
    this.scheduled = [];
    this.httpClient.get(this.baseUrl + '/api/section/get/futureLeadersForTopic/' + this.selectedLeaderId).subscribe(
      data => {
        this.scheduled = data;
      }
    ).add(() => {
    });
  }

  sortScheduled(column) {
    if (!this.ascending) {
      this.scheduled.sort((a, b) => a[column] > b[column] ? 1 : a[column] < b[column] ? -1 : 0)
      this.ascending = true;
    } else {
      this.scheduled.sort((a, b) => a[column] < b[column] ? 1 : a[column] > b[column] ? -1 : 0)
      this.ascending = false;
    }
  }
}
