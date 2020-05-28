import { Component, OnInit } from '@angular/core';
import { TrainingDayList } from './data/mock_data';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../__modal';

@Component({
  selector: 'app-learning-days',
  templateUrl: './learning-days.component.html',
  styleUrls: ['./learning-days.component.css']
})
export class LearningDaysComponent implements OnInit {

  constructor(private httpClient: HttpClient, private modalService: ModalService) { }

  //POST Register learning day
  post_topic;
  post_date;
  post_comment;
  post_topic_id //set with http get

  dayToAdd = {
    date: null,
    comment: null,
    employeeId: null,
  }

  linkToAdd = {
    learningDayId: null,
    topicId: null
  }

  //Modal window content
  topicDescription;
  comment;

  //Not parsed
  linkingData;

  //Parsed
  learningDayId;
  topicId;
  dayDate;
  topicName;

  //Parsed arrays
  topicNames = [];
  employeeIds = [];

  // Loading static data
  learningDaysAll = TrainingDayList;

  // Front end
  pageCounter = 1;

  // Data to be displayed
  learningDays = [];

  // Current user
  currentEmployeeId;

  // For modal window
  topics = [];

  ngOnInit() {
    this.authentication();
  }

  authentication() {
    this.httpClient.get(location.origin + '/api/session/me').subscribe(
      response => {
        this.currentEmployeeId = response['id'];
      }
    ).add(() => {
      this.getBackendData();
    });
  }

  submit_learning_day() {

    this.httpClient.get(location.origin + '/api/topic/get/all').subscribe(response => {
      for (var i = 0; i < Object.keys(response).length; i++) {
        if (response[i].name == this.post_topic) {
          this.post_topic_id = response[i].id
        }
      }
    }).add(() => {

      this.dayToAdd.date = this.post_date
      this.dayToAdd.comment = this.post_comment
      this.dayToAdd.employeeId = this.currentEmployeeId

      var post_response;

      // Posting learning day
      this.httpClient.post(location.origin + '/api/learningDay/create', this.dayToAdd).subscribe(rsp => {
        post_response = rsp
      }).add(() => {
        var learning_day_id

        /// Getting posted learning day ID
        this.httpClient.get(location.origin + '/api/learningDay/get/all').subscribe(resp => {
          for (var i = 0; i < Object.keys(resp).length; i++) {
            console.log(resp[i]);
            if (resp[i]["date"].split("T")[0] == this.post_date) {
              learning_day_id = resp[i]['id']
            }
          }
        }).add(() => {
          this.linkToAdd.learningDayId = learning_day_id
          this.linkToAdd.topicId = this.post_topic_id

          this.httpClient.post(location.origin + '/api/learningDayTopic/create', this.linkToAdd).subscribe(rst => {
            console.log(rst);
          });
        });
      });
    });
  }

  // Requesting data from API
  getBackendData() {
    this.httpClient.get(location.origin + '/api/learningDay/get/learningDaysAndTopicsForEmployee/' + this.currentEmployeeId).subscribe(response => {
      this.linkingData = response
    }).add(() => {
      this.learningDays = [];
      for (var i = 4 * (this.pageCounter - 1); i < 3 * this.pageCounter + 1; i++) {
        if (i <= this.linkingData.length) {
          this.learningDays.push(this.linkingData[i]);
        }
      }
    });
  }

  //Control buttons
  changePageLeft() {
    if (this.pageCounter >= 2) {
      this.pageCounter -= 1;
      this.getBackendData();
    }
  }

  changePageRight() {
    if (this.learningDays.length == 4) {
      this.pageCounter += 1;
      this.getBackendData();
    }
  }

  //Modal window control
  openModal(topic: string, date: string, id) {
    this.topicName = topic;
    this.dayDate = date;
    this.httpClient.get(location.origin + '/api/topic/get/all').subscribe(response => {
      for (var i = 0; i < Object.keys(response).length; i++) {
        if (response[i]['name'] == topic) {
          this.topicDescription = response[i]['description'];
          this.topicId = response[i]['id'];
        }
      }
    }).add(() => {
      this.httpClient.get(location.origin + '/api/learningDay/get/all').subscribe(response2 => {
        for (var i = 0; i < Object.keys(response2).length; i++) {
          if (response2[i]['date'].split('T')[0].split('-')[0] == date.split(' ')[0].split('-')[0] &&
            response2[i]['date'].split('T')[0].split('-')[1] == date.split(' ')[0].split('-')[1] &&
            response2[i]['date'].split('T')[0].split('-')[2] == date.split(' ')[0].split('-')[2]) {

            this.comment = response2[i]['comment'];
          }
        }
      }).add(() => {
        this.modalService.open(id);
      })
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  registerForm(id: string) {
    this.httpClient.get(location.origin + '/api/topic/get/all').subscribe(response => {
      this.topics.push(response);
    }).add(() => {
      this.topics = this.topics[0];
      this.modalService.open(id);
    });
  }
}
