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

  categories = [
    { name: 'employees', disabled: true },
    { name: 'teams', disabled: false },
    { name: 'completed', disabled: false },
    { name: 'scheduled', disabled: false }
  ]


  employees;
  teams;
  completed;
  scheduled;

  ascending = true;

  constructor(private httpClient: HttpClient, private sessionAPIService: SessionAPIService) { }

  ngOnInit() {
    this.getData(0);
  }

  onCategoryClick(index) {
    for (let i = 0; i < this.categories.length; i++) {
      if (i == index) {
        this.categories[i]['disabled'] = true;
      } else {
        this.categories[i]['disabled'] = false;
      }
    }

    this.getData(index);
  }

  getData(index) {
    if (index == 0 || index == 1) {
      this.selectedTopicId = null;
      this.apiTopics = [];
      this.topics = [];
      this.getTopicData();
    } else if (index == 2 || index == 3) {
      this.selectedLeaderId = null;
      this.teams = [];
      this.getLeaderData();
    }
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
    if (this.selectedTopicId != "null") {
      this.getEmployeesData();
    } else {
      this.employees = [];
    }
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
    if (this.selectedTopicId != "null") {
      this.getTeamsData();
    } else {
      this.teams = [];
    }
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
    if (this.selectedLeaderId != "null") {
      this.getCompletedData();
    } else {
      this.completed = [];
    }
  }

  getCompletedData() {
    this.completed = [];
    this.httpClient.get(this.baseUrl + '/api/section/get/learnedTopicsForLeader/' + this.selectedLeaderId).subscribe(
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
    if (this.selectedLeaderId != "null") {
      this.getScheduledData();
    } else {
      this.scheduled = [];
    }
  }

  getScheduledData() {
    this.scheduled = [];
    this.httpClient.get(this.baseUrl + '/api/section/get/futureLearningDaysForLeader/' + this.selectedLeaderId).subscribe(
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
