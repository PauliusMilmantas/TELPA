import { Component, OnInit } from '@angular/core';
import { TopicData } from './data/data';
@Component({
  selector: 'app-topic-add',
  templateUrl: './topic-add.component.html',
  styleUrls: ['./topic-add.component.css']
})
export class TopicAddComponent implements OnInit {

  topicToAdd = new TopicData(1, 2, '', '', ['']);
  isEmpty = [false];

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {  }

  onLinkChange(value, place) {
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
}
}
