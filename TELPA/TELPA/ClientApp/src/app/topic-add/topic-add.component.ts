import { Component, OnInit } from '@angular/core';
import { TopicData } from './data/data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})
export class TopicAddComponent implements OnInit {

  topics: TopicData[];

  topicToAdd = new TopicData(1, 2, '', '', ['']);
  isEmpty = [false];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getBackendData();
  }


  onSubmit() { }

  // Requesting data from API
  getBackendData() {
    var baseURL = location.origin;
    this.httpClient.get(baseURL + '/api/topic/get/all').subscribe(
      data => {
        for (var i = 0; i < Object.keys(data).length; i++) {
          console.log(data[i]);
        }
      }
    )
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
