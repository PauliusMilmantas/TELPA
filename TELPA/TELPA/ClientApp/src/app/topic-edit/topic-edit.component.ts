import { Component, OnInit } from "@angular/core";
import { Topic } from "../api/api-entities";

@Component({
  selector: "app-topic-edit",
  templateUrl: "./topic-edit.component.html",
  styleUrls: ["./topic-edit.component.css"],
})
export class TopicEditComponent implements OnInit {
  topicToAdd = {
    id: 1,
    name: "",
    description: "",
    parentTopicId: 2,
    links: [],
  };
  hideForm = true;
  isEmpty = [false];

  constructor() {}

  ngOnInit() {
    this.hideForm = true;
  }

  onSubmit() {}

  onTopicChange(value) {
    if (value == "(None)") {
      this.hideForm = true;
    } else {
      this.hideForm = false;
    }
  }

  onLinkChange(value, place) {
    this.topicToAdd.links[place] = value;
    if (
      place == this.topicToAdd.links.length - 1 &&
      this.topicToAdd.links[place].length != 0
    ) {
      this.topicToAdd.links.push("");
      this.isEmpty.push(false);
    } else if (
      place != this.topicToAdd.links.length - 1 &&
      this.topicToAdd.links[place].length == 0
    ) {
      this.isEmpty[place] = true;
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
