import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
declare var $: any;
@Component({
  selector: "app-topic-edit",
  templateUrl: "./topic-edit.component.html",
  styleUrls: ["./topic-edit.component.css"],
})
export class TopicEditComponent implements OnInit {

  baseUrl = location.origin;

  private apiTopics = [];
  topics = [];

  topicToModify = {
    id: null,
    name: "",
    description: "",
    parentTopicId: null,
    version: null
  };

  topicLinksToModify = [
    {
      id: null,
      topicId: null,
      link: "",
      version: null
    },
  ];

  topicTest;

  hideMessageBox = true;
  hideForm = true;
  isEmpty = [false];

  doneUpdate = true;
  doneCreate = true;
  doneDelete = true;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.hideMessageBox = true;
    this.hideForm = true;
    this.getBackendData();
  }

  // Requesting data from API
  getBackendData() {
    this.apiTopics = [];
    this.topics = [];

    this.httpClient
      .get(this.baseUrl + "/api/topic/get/all")
      .subscribe((data) => {
        for (let i = 0; i < Object.keys(data).length; i++) {
          this.apiTopics.push({
            id: data[i]["id"],
            name: data[i]["name"],
            description: data[i]["description"],
            parentTopicId: data[i]["parentTopicId"],
          });
        }
      })
      .add(() => {
        this.parseTopics();
      });
  }

  parseTopics() {
    let index = 1;
    for (let i = 0; i < this.apiTopics.length; i++) {
      if (this.apiTopics[i]["parentTopicId"] == null) {
        this.topics.push({
          id: this.apiTopics[i]["id"],
          index: index,
          name: this.apiTopics[i]["name"],
          subtopicAmount: 0,
          level: 0,
        });
        index++;
      }
    }

    for (let i = 0; i < this.topics.length; i++) {
      for (let j = 0; j < this.apiTopics.length; j++) {
        if (this.topics[i]["id"] == this.apiTopics[j]["parentTopicId"]) {
          this.topics[i]["subtopicAmount"]++;
          this.topics.splice(i + this.topics[i]["subtopicAmount"], 0, {
            id: this.apiTopics[j]["id"],
            index:
              this.topics[i]["index"] + "." + this.topics[i]["subtopicAmount"],
            name: this.apiTopics[j]["name"],
            subtopicAmount: 0,
            level: this.topics[i]["level"] + 1,
          });
        }
      }
    }
  }

  onTopicChange() {

    this.hideMessageBox = true;
    this.hideForm = true;

    if (this.topicToModify["id"] != "null") {
      this.getTopicData();

      this.topicLinksToModify = [
        {
          id: null,
          topicId: null,
          link: "",
          version: null
        },
      ];
    }
  }

  getTopicData() {
    this.httpClient.get(this.baseUrl + '/api/topic/get/' + this.topicToModify['id']).subscribe(
      data => {
        this.topicToModify =
        {
          id: data['id'],
          name: data['name'],
          description: data['description'],
          parentTopicId: data['parentTopicId'],
          version: data['version']
        }
      })
      .add(() => {
        this.getTopicLinks();
      });
  }

  getTopicLinks() {
    this.httpClient
      .get(
        this.baseUrl + "/api/topicLink/getByTopic/" + this.topicToModify["id"]
      )
      .subscribe((data) => {
        if (Object.keys(data).length > 0) {
          this.topicLinksToModify = [];
          this.isEmpty = [];
        }

        for (let i = 0; i < Object.keys(data).length; i++) {
          this.isEmpty.push(false);
          this.topicLinksToModify.push({
            id: data[i]['id'],
            topicId: data[i]['topicId'],
            link: data[i]['link'],
            version: data[i]['version']
          });
        }
        this.onLinkChange(
          this.topicLinksToModify[Object.keys(data).length - 1]['link'],
          Object.keys(data).length - 1
        );
      })
      .add(() => {
        this.hideForm = false;
      });
  }

  onSubmit() {
    this.updateTopic();
  }

  updateTopic() {
    this.httpClient.put(this.baseUrl + "/api/topic/update", this.topicToModify
    ).subscribe(
      (val) => {
        console.log("PUT call successful value returned in body", val);
        this.topicUpdated();
      },
      response => {
        console.log("PUT call in error", response);
        $('#optLockingModal').modal();
      },
      () => {
        console.log("The PUT observable is now completed.");
      }
    );;
  }

  topicUpdated() {
    if (this.topicLinksToModify.length > 1) {
      this.editTopicLinks();
    }
    else {
      this.editDone();
    }
  }
  
  editTopicLinks() {
    let updateCount = 0;
    let createCount = 0;
    let deleteCount = 0;

    for (let i = 0; i < this.topicLinksToModify.length; i++) {
      if (this.topicLinksToModify[i]['link'] != '') {
        if (this.topicLinksToModify[i]['id'] != null) {
          updateCount++;
        } else {
          createCount++;
        }
      } else if (this.topicLinksToModify[i]['id'] != null) {
        deleteCount++;
      }
    }

    for (let i = 0; i < this.topicLinksToModify.length; i++) {
      if (this.topicLinksToModify[i]['link'] != '') {
        if (this.topicLinksToModify[i]['id'] != null) {
            this.updateTopicLink(this.topicLinksToModify[i], (--updateCount == 0));
        } else {
          this.createTopicLink(this.topicLinksToModify[i], (--createCount == 0));
        }
      }
      else if (this.topicLinksToModify[i]['id'] != null) {
        this.deleteTopicLink(this.topicLinksToModify[i], (--deleteCount == 0));
      }
    }
  }

  updateTopicLink(topicLinkToUpdate, last) {
    this.doneUpdate = false;
    this.httpClient.put(this.baseUrl + "/api/topicLink/update", topicLinkToUpdate
    ).subscribe(
      (val) => {
        console.log("PUT call successful value returned in body", val);
        if (last) {
          this.topicLinkUpdated();
        }
      },
      response => {
        console.log("PUT call in error", response);
        $('#optLockingModal').modal();
      },
      () => {
        console.log("The PUT observable is now completed.");
      }
    );;
  }

  topicLinkUpdated() {
    this.doneUpdate = true;
    this.checkIfDone();
  }

  createTopicLink(topicLinkToCreate, last) {
    this.doneCreate = false;
    topicLinkToCreate['topicId'] = this.topicToModify['id'];
    this.httpClient.post(this.baseUrl + "/api/topicLink/create", {
      "topicId": topicLinkToCreate['topicId'],
      "link": topicLinkToCreate['link']
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

  deleteTopicLink(topicLinkToRemove, last) {
    this.doneDelete = false;
    this.httpClient.delete(this.baseUrl + "/api/topicLink/delete/" + topicLinkToRemove['id']
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
        console.log("The DELETE observable is now completed.");
      }
    );;
  }

  checkIfDone() {
    if (this.doneUpdate && this.doneCreate && this.doneDelete) {
      this.editDone();
    }
  }

  editDone() {
    this.hideMessageBox = false;
    this.getBackendData();
    this.getTopicData();
  }

  onLinkChange(value, place) {
    this.topicLinksToModify[place]["link"] = value;
    if (
      place == this.topicLinksToModify.length - 1 &&
      this.topicLinksToModify[place]["link"].length != 0
    ) {
      this.topicLinksToModify.push({
        id: null,
        topicId: null,
        link: '',
        version: null
      });
      this.isEmpty.push(false);
    } else if (
      place != this.topicLinksToModify.length - 1 &&
      this.topicLinksToModify[place]["link"].length == 0
    ) {
      this.isEmpty[place] = true;
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  overrideOptLock() {
    this.httpClient.get(this.baseUrl + '/api/topic/get/' + this.topicToModify['id']).subscribe(
      data => {
        this.topicToModify =
        {
          id: this.topicToModify['id'],
          name: this.topicToModify['name'],
          description: this.topicToModify['description'],
          parentTopicId: this.topicToModify['parentTopicId'],
          version: data['version']
        }
      })
      .add(() => {
        this.httpClient
          .get(
            this.baseUrl + "/api/topicLink/getByTopic/" + this.topicToModify["id"]
          )
          .subscribe((data) => {
            for (let i = 0; i < Object.keys(data).length; i++) {
              this.isEmpty.push(false);
              this.topicLinksToModify[i] = ({
                id: data[i]['id'],
                topicId: data[i]['topicId'],
                link: this.topicLinksToModify[i]['link'],
                version: data[i]['version']
              });
            }
            this.onLinkChange(
              this.topicLinksToModify[Object.keys(data).length - 1]['link'],
              Object.keys(data).length - 1
            );
          })
          .add(() => {
            this.updateTopic();
          });
      });
  }

  updateOptLock() {
    this.getBackendData();
    this.getTopicData();
  }
}
