import { Component, OnInit } from '@angular/core';
import { TopicData } from '../topic-add/data/data';


@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.component.html',
  styleUrls: ['./topic-edit.component.css']
})
export class TopicEditComponent implements OnInit {

  topicToAdd = new TopicData(1, 2, '', '', ['']);
  hideForm = true;
  isEmpty = [false];
 

  constructor() { }

  ngOnInit() {
    this.hideForm = true;
  }

  onSubmit() { }

  onTopicChange(value) {
    if (value == "(None)") {
      this.hideForm = true;
    }
    else {
      this.hideForm = false;
    }
  }

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
