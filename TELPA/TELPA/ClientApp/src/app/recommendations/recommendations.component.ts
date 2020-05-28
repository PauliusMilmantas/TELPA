import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionAPIService } from '../api/session-api.service';


@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  baseUrl = location.origin;
  user = {
    id: null,
  };

  employees;
  employeeToRecommendId = null;
  private apiTopics;
  topics = [];
  recommendedTopics;

  selectedAvailableTopicId = null;
  selectedRecommendedTopicId = null;

  topicIdsToAdd = [];
  topicIdsToRemove = [];

  hideMessageBox = true;
  hideForm = true;

  doneCreate = true;
  doneDelete = true;

  constructor(private httpClient: HttpClient, private sessionAPIService: SessionAPIService) { }

  ngOnInit() {
    this.getUserData();
    this.getTopicData();
  }

  getUserData() {
    this.sessionAPIService.me().subscribe((user) => {
      this.user = user;
    }).add(() => {
      this.getEmployeeData();
    });
  }


  getEmployeeData() {
    this.httpClient.get(this.baseUrl + `/api/employee/get/${ this.user['id'] }/subordinates`).subscribe(
      data => {
        this.employees = data;
      }
    ).add(() => {

    });
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
            recommended: false,
            recommendedId: null
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
              recommended: false,
              recommendedId: null
            }
          );
        }
      }
    }
  }

  onForWhoChange() {
    this.hideMessageBox = true;
    this.hideForm = true;
    if (this.employeeToRecommendId != 'null') {
      this.getRecommendedTopicsData();
      this.resetTopicIds();
    }
  }

  getRecommendedTopicsData() {
    for (let i = 0; i < this.topics.length; i++) {
      this.updateTopics(this.topics[i]['id'], false);
    }
    this.recommendedTopics = null;
    for (let i = 0; i < this.topics.length; i++) {
      this.topics[i]['recommended'] = false;
      this.topics[i]['recommendedId'] = null
    }
    this.httpClient.get(this.baseUrl + '/api/recommendedTopic/getByEmployee/' + this.employeeToRecommendId).subscribe(
      data => {
        this.recommendedTopics = data;
      }
    ).add(() => {
      for (let i = 0; i < (this.recommendedTopics as Array<any>).length; i++) {
        for (let j = 0; j < this.topics.length; j++) {
          if (this.topics[j]['id'] == this.recommendedTopics[i]['topicId']) {
            this.topics[j]['recommended'] = true;
            this.topics[j]['recommendedId'] = this.recommendedTopics[i]['id'];
          }
        }
      }
      this.hideForm = false;
    });
  }

  updateTopics(recommendedTopicId, recommended) {
    for (let i = 0; i < this.topics.length; i++) {
      if (this.topics[i]['id'] == recommendedTopicId) {
        this.topics[i]['recommended'] = recommended;
      }
    }
    this.hideForm = false;
  }

  onAvailableChange(value) {
    this.selectedRecommendedTopicId = null;
  }

  onRecommendedChange(value) {
    this.selectedAvailableTopicId = null;
  }

  onAdd() {
    this.updateTopics(this.selectedAvailableTopicId, true);
    for (let i = 0; i < this.topics.length; i++) {
      if (this.selectedAvailableTopicId == this.topics[i]['id']) {
        if (this.topics[i]['recommendedId'] == null) {
          this.topicIdsToAdd.push(this.selectedAvailableTopicId);
        }
        else {
          this.topicIdsToRemove.splice(this.topicIdsToRemove.indexOf(this.topics[i]['recommendedId']), 1);
        }
        break;
      }
    }
    this.selectedAvailableTopicId = null;
  }

  onRemove() {
    this.updateTopics(this.selectedRecommendedTopicId, false);
    for (let i = 0; i < this.topics.length; i++) {
      if (this.selectedRecommendedTopicId == this.topics[i]['id']) {
        if (this.topics[i]['recommendedId'] != null) {
          this.topicIdsToRemove.push(this.topics[i]['recommendedId']);
        }
        else {
          this.topicIdsToAdd.splice(this.topicIdsToAdd.indexOf(this.selectedRecommendedTopicId), 1);
        }
        break;
      }
    }

    this.selectedRecommendedTopicId = null;
  }

  onUpdate() {
    for (let i = 0; i < this.topicIdsToAdd.length; i++) {
      if (i == this.topicIdsToAdd.length - 1) {
        this.createRecommendedTopic(this.topicIdsToAdd[i], true);
      } else {
        this.createRecommendedTopic(this.topicIdsToAdd[i], false);
      }
    }

    for (let i = 0; i < this.topicIdsToRemove.length; i++) {
      if (i == this.topicIdsToRemove.length - 1) {
        this.deleteRecommendedTopic(this.topicIdsToRemove[i], true);
      } else {
        this.deleteRecommendedTopic(this.topicIdsToRemove[i], false);
      }
    }

  }

  createRecommendedTopic(recommendedTopicIdToCreate, last) {
    this.doneCreate = false;
    this.httpClient.post(this.baseUrl + "/api/recommendedTopic/create",
      {
        topicId: recommendedTopicIdToCreate,
        employeeId: this.employeeToRecommendId
      }
    ).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
        if (last) {
          this.doneCreate = true;
          this.checkIfDone();
        }
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );;
  }

  deleteRecommendedTopic(recommendedIdToDelete, last) {
    this.doneDelete = false;
    this.httpClient.delete(this.baseUrl + "/api/recommendedTopic/delete/" + recommendedIdToDelete, 
    ).subscribe(
      (val) => {
        console.log("DELETE call successful value returned in body", val);
        if (last) {
          this.doneDelete = true;
          this.checkIfDone();
        }
      },
      response => {
        console.log("DELETE call in error", response);
      },
      () => {
        console.log("DELETE POST observable is now completed.");
      }
    );;
  }

  checkIfDone() {
    if (this.doneCreate && this.doneDelete) {
      this.getRecommendedTopicsData();
      this.resetTopicIds();
      this.selectedAvailableTopicId = null;
      this.selectedRecommendedTopicId = null;
      this.hideMessageBox = false;
    }
  }

  resetTopicIds() {
    this.topicIdsToAdd = [];
    this.topicIdsToRemove = [];
  }
}
