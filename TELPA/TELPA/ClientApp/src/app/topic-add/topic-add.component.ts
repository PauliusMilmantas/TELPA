import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})

export class TopicAddComponent implements OnInit {
  baseUrl = location.origin;
  private apiTopics = [];
  private addedTopicId = null;
  topics = [];
  topicToAdd = {
    'name': '',
    'description': '',
    'parentTopicId': null
  };

  topicLinksToAdd = [];

  hideMessageBox = true;
  isEmpty = [false];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.hideMessageBox = true;
    this.resetForm();
    this.getBackendData(false);
  }

  // Requesting data from API
  getBackendData(submitted) {
    this.apiTopics = [];
    this.topics = [];

    this.httpClient.get(this.baseUrl + '/api/topic/get/all').subscribe(
      data => {
        for (let i = 0; i < Object.keys(data).length; i++) {
          this.apiTopics.push(
            {
              'id': data[i]['id'],
              'name': data[i]['name'],
              'description': data[i]['description'],
              'parentTopicId': data[i]['parentTopicId']
            }
          );
        }
      }
    ).add(() => {
      this.parseTopics(submitted);
    });
  }

  parseTopics(submitted) {

    let index = 1;
    for (let i = 0; i < this.apiTopics.length; i++) {
      if (this.apiTopics[i]['parentTopicId'] == null) {
        this.topics.push(
          {
            'id': this.apiTopics[i]['id'],
            'index': index,
            'name': this.apiTopics[i]['name'],
            'subtopicAmount': 0,
            'level': 0
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
              'id': this.apiTopics[j]['id'],
              'index': this.topics[i]['index'] + '.' + this.topics[i]['subtopicAmount'],
              'name': this.apiTopics[j]['name'],
              'subtopicAmount': 0,
              'level': this.topics[i]['level'] + 1
            }
          );
        }
      }
    }

    if (submitted) {
      this.hideMessageBox = false;
      this.resetForm();
    }
  }
 
  onSubmit() {
    this.httpClient.post(this.baseUrl + "/api/topic/create", this.topicToAdd
    ).subscribe(
      (val) => {
        console.log("POST call successful value returned in body", val);
        this.submitted()
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );;
  }

  submitted() {
    this.httpClient.get(this.baseUrl + '/api/topic/get/last').subscribe(
      data => {
        this.addedTopicId = data;
      }
    ).add(() => {
      for (let i = 0; i < this.topicLinksToAdd.length; i++)
      {
        if (this.topicLinksToAdd[i]['link'] != '') {
          this.topicLinksToAdd[i]['topicId'] = this.addedTopicId;
          this.httpClient.post(this.baseUrl + "/api/topicLink/create", this.topicLinksToAdd[i]
          ).subscribe(
            (val) => {
              console.log("POST call successful value returned in body", val);
            },
            response => {
              console.log("POST call in error", response);
            },
            () => {
              console.log("The POST observable is now completed.");
            }
          );;
        }
      }
      this.getBackendData(true);
    });
  }

  resetForm() {
    this.topicToAdd = {
      'name': '',
      'description': '',
      'parentTopicId': null
    }

    this.topicLinksToAdd =
      [
        { topicId: null, link: '' }
      ];
  }

  onLinkChange(value, place) {
    this.topicLinksToAdd[place]['link'] = value;
    if (place == (this.topicLinksToAdd.length - 1) && this.topicLinksToAdd[place]['link'].length != 0) {
      this.topicLinksToAdd.push(
        {
          topicId: null,
          link: ''
        }
      );
      this.isEmpty.push(false);
    }
    else if (place != (this.topicLinksToAdd.length - 1) && this.topicLinksToAdd[place]['link'].length == 0) {
      this.isEmpty[place] = true;
    }
  }

  trackByFn(index: any, item: any) {
   return index;
  }
}
