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

    //Modal window content
    topicDescription;
    comment;

    userId;

    //Not parsed
    linkingData;

    //Parsed
    learningDayId;
    topicId;
    dayDate;
    topicName;

    //Parsed arrays
    C = [];
    topicNames = [];
    employeeIds = [];

    //Thread status
    thread1 = [];
    thread2 = [];

  // Loading static data
  learningDaysAll = TrainingDayList;

  dayDates = [];

  // Front end
  pageCounter = 1;

  // Data to be displayed
  learningDays = [];

  currentEmployeeId;

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
    var post_topic_id;

    this.httpClient.get(location.origin + '/api/topic/get/all').subscribe(response => {
      for (var i = 0; i < Object.keys(response).length; i++) {
        if (response[i]['name'] == this.post_topic) {
          post_topic_id = response[i]['id'];
        }
      }
    }).add(() => {
      this.httpClient.get(location.origin + '/api/learningDay/createWithGET/' + this.post_date + '/' + this.post_comment + '/1/1/' + post_topic_id).subscribe(response2 => {
      }).add(() => {
        this.closeModal('custom-modal-4');
      });
    });
  }

  // Requesting data from API
  getBackendData() {
    var baseURL = location.origin;
    this.learningDaysAll = [];

    this.httpClient.get(baseURL + '/api/learningDayTopic/get/all').subscribe(
      data => {
        this.linkingData = data;
      }
    ).add(() => {
      for (var i = 0; i < Object.keys(this.linkingData).length; i++) {
        this.learningDayId = this.linkingData[i]['learningDayId'];
        this.topicId = this.linkingData[i]['topicId'];

        var empId;
        // Getting date
        this.httpClient.get(baseURL + '/api/learningDay/get/' + this.learningDayId).subscribe((response) => {
          this.dayDate = response['date'];
          empId = response['employeeId'];
        }).add(() => {
            this.employeeIds.push(empId);
            this.thread1.push(1);
            this.dayDates.push(this.dayDate);
            this.getDataForFE(1);
        });

        // Getting topic name
        this.httpClient.get(baseURL + '/api/topic/get/' + this.topicId).subscribe((response) => {
          this.topicName = response['name'];
        }).add(() => {
          this.thread2.push(1);
          this.topicNames.push(this.topicName);
          this.getDataForFE(1);
        });
      }
    });
  }

  // Parsing data from API
  getDataForFE(pageNumber) {

    if (this.thread1.length == Object.keys(this.linkingData).length && this.thread1.length == Object.keys(this.linkingData).length
      && this.topicNames.length == Object.keys(this.linkingData).length && this.dayDates.length == Object.keys(this.linkingData).length) {
      this.thread1.push(1);
      this.thread2.push(1);
      for (var i = 0; i < Object.keys(this.linkingData).length; i++) {
        if (this.employeeIds[i] == this.currentEmployeeId) {
          this.learningDaysAll.push(
            {
              'date': this.dayDates[i].split("T")[0] + " " + this.dayDates[i].split("T")[1],
              'topic': this.topicNames[i]
            }
          );
        }
      }
    }

    this.learningDays = [];
    for (var i = 4 * (pageNumber - 1); i < 3 * pageNumber + 1; i++) {
      if (i <= this.learningDaysAll.length) {
        this.learningDays.push(this.learningDaysAll[i]);
      }
    }
  }

  //Control buttons
  changePageLeft() {
    if (this.pageCounter >= 2) {
      this.pageCounter -= 1;
      this.getDataForFE(this.pageCounter);
    }
  }

  changePageRight() {
    if (this.learningDays.length == 4) {
      this.pageCounter += 1;
      this.getDataForFE(this.pageCounter);
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
