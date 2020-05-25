import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.component.html',
  styleUrls: ['./topic-edit.component.css']
})
export class TopicEditComponent implements OnInit {

  baseUrl = location.origin;

  private apiTopics = [];
  topics = [];

  topicToModify = {
    'id': null,
    'name': '',
    'description': '',
    'parentTopicId': null
  };

  topicLinksToModify = [{
    'id': null,
    'topicId': null,
    'link': ''
  }];

  topicTest;

  hideForm = true;
  isEmpty = [false];
 

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.hideForm = true;
    this.getBackendData()
  }

  // Requesting data from API
  getBackendData() {
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
  }

  onTopicChange() {
    this.hideForm = true;

    if (this.topicToModify['id'] != 'null') {
      this.getTopicData();
    }
  }

  getTopicData() {
    this.httpClient.get(this.baseUrl + '/api/topic/get/' + this.topicToModify['id']).subscribe(
      data => {
        for (let i = 0; i < Object.keys(data).length; i++) {
          this.topicToModify =
          {
            'id': data['id'],
            'name': data['name'],
            'description': data['description'],
            'parentTopicId': data['parentTopicId']
          }
        }
      }
    ).add(() => {
      this.getTopicLinks();
    });
  }

  getTopicLinks() {
    this.httpClient.get(this.baseUrl + '/api/topicLink/getByTopic/' + this.topicToModify['id']).subscribe(
      data => {
        if (Object.keys(data).length > 0) {
          this.topicLinksToModify = [];
          this.isEmpty = [];
        }

        for (let i = 0; i < Object.keys(data).length; i++) {
          this.isEmpty.push(false);
          this.topicLinksToModify.push(
            {
              'id': data[i]['id'],
              'topicId': data[i]['topicId'],
              'link': data[i]['link']
            });
        }
        this.onLinkChange(this.topicLinksToModify[Object.keys(data).length - 1]['link'], Object.keys(data).length - 1);
      }
    ).add(() => {
      this.hideForm = false;
    });
  }

  onSubmit() {
    this.httpClient.put(this.baseUrl + "/api/topic/update", this.topicToModify
    ).subscribe(
      (val) => {
        console.log("PUT call successful value returned in body", val);
        this.updateTopicLinks();
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The PUT observable is now completed.");
      }
    );;
  }

  updateTopicLinks() {
  /* for (let i = 0; i < this.topicLinksToModify.length; i++) {
if (this.topicLinksToModify[i]['link'] != '') {
if (this.topicLinksToModify[i]['id'] != null) {
 console.log("update");
 console.log(this.topicLinksToModify[i]);
 this.httpClient.put(this.baseUrl + "/api/topicLink/update", this.topicLinksToModify[i]
 ).subscribe(
   (val) => {
     console.log("POST call successful value returned in body",
       val);
   },
   response => {
     console.log("POST call in error", response);
   },
   () => {
     console.log("The POST observable is now completed.");
   }
 );;
}
else {
 this.topicLinksToModify[i]['topicId'] = this.topicToModify['id'];
 console.log("post");
 console.log(this.topicLinksToModify[i]);
 this.httpClient.post(this.baseUrl + "/api/topicLink/create", this.topicLinksToModify[i]
 ).subscribe(
   (val) => {
     console.log("POST call successful value returned in body",
       val);
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
}*/
  }

  
  onLinkChange(value, place) {
    this.topicLinksToModify[place]['link'] = value;
    if (place == (this.topicLinksToModify.length - 1) && this.topicLinksToModify[place]['link'].length != 0) {
      this.topicLinksToModify.push(
        {
          'id': null,
          'topicId': null,
          'link': ''
        }
      );
      this.isEmpty.push(false);
    }
    else if (place != (this.topicLinksToModify.length - 1) && this.topicLinksToModify[place]['link'].length == 0) {
      this.isEmpty[place] = true;
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
