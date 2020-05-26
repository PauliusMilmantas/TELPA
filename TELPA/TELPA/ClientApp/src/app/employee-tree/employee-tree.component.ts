import { Component, OnInit } from "@angular/core";
import { TopicAPIService } from "../api/topic-api.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Topic } from "../api/api-entities";

@Component({
  selector: "app-employee-tree",
  templateUrl: "./employee-tree.component.html",
  styleUrls: ["./employee-tree.component.css"],
})
export class EmployeeTreeComponent implements OnInit {
  topic: Topic;
  topicText = () => JSON.stringify(this.topic, null, 4);

  constructor(private topicAPI: TopicAPIService) {}

  ngOnInit() {}

  onClickGet() {
    this.topicAPI.get(1).subscribe(
      (topic: Topic) => {
        this.topic = topic;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
  onClickUpdate() {
    this.topicAPI.update(this.topic).subscribe(
      (response: any) => {
        console.log(response);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 409) {
          console.log("Optimistic lock");
          this.topicAPI.get(1).subscribe(
            (topic: Topic) => {
              this.topic.version = topic.version;
            },
            (err: HttpErrorResponse) => {
              console.log(err);
            }
          );
        } else {
          console.log("Other errors");
        }
      }
    );
  }
}
