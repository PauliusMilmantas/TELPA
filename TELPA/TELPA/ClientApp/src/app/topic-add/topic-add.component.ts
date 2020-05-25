import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})
export class TopicAddComponent implements OnInit {

  baseUrl = location.origin;
  private apiTopics = [];
  topics = [];
  topicToAdd = {
    'name': '',
    'description': '',
    'parentTopicId': null
  }

  adding = true;
  isEmpty = [false];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.adding = true;
    this.resetForm();
    this.getBackendData();
  }

  // Requesting data from API
  getBackendData() {
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
      this.parseTopics();
    });
  }

  parseTopics() {
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
        this.apiTopics.splice(i, 1);
        index++;
      }
    }
  }
/*
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
        this.apiTopics.splice(i, 1);
        index++;
      }
    }*/

 /*   while (this.apiTopics.length != 0) {
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
            this.apiTopics.splice(j, 1);
          }
        }
      }
    }
  }*/
 
  onSubmit() {
    this.httpClient.post(this.baseUrl + "/api/topic/create", this.topicToAdd
    ).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
        this.submitted();
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );;
  }

  submitted() {
    this.adding = false;
    this.resetForm();
  }

  resetForm() {
    this.topicToAdd = {
      'name': '',
      'description': '',
      'parentTopicId': null
    }
  }

 /* onLinkChange(value, place) {
    this.topicToAdd.links[place] = value;
    if (place == (this.topicToAdd.links.length - 1) && this.topicToAdd.links[place].length != 0) {
      this.topicToAdd.links.push('');
      this.isEmpty.push(false);
    }
    else if (place != (this.topicToAdd.links.length - 1) && this.topicToAdd.links[place].length == 0) {
      this.isEmpty[place] = true;
    }
  }

  trackByFn(index: any, item: any) {
   return index;
  }*/
}
