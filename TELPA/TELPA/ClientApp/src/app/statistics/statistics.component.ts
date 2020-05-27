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

  selectedTopicId = null;

  employees;

  constructor(private httpClient: HttpClient, private sessionAPIService: SessionAPIService) { }

  ngOnInit() {
    this.getTopicData();
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

  onTopicChange() {
    this.getEmployeesData();
  }

  getEmployeesData() {
    this.httpClient.get(this.baseUrl + '/api/section/get/employeesForTopic/' + this.selectedTopicId).subscribe(
      data => {
        this.employees = data;
      }
    ).add(() => {
      console.log(this.employees);
    });
  }
}
