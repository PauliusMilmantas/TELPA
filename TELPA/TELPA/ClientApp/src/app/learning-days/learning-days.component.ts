import { Component, OnInit } from '@angular/core';
import { TrainingDayList } from './data/mock_data';
import { LearningDay } from './data/TrainingDay';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-learning-days',
  templateUrl: './learning-days.component.html',
  styleUrls: ['./learning-days.component.css']
})
export class LearningDaysComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

    //Not parsed
    linkingData;

    //Parsed
    learningDayId;
    topicId;
    dayDate;
    topicName;

    //Parsed arrays
    dayDates = [];
    topicNames = [];

    //Thread status
    thread1 = [];
    thread2 = [];

  // Loading static data
  learningDaysAll = TrainingDayList;

  // Front end
  pageCounter = 1;

  // Data to be displayed
  learningDays = [];

  ngOnInit() {
    this.getBackendData();
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
        
        // Getting date
        this.httpClient.get(baseURL + '/api/learningDay/get/' + this.learningDayId).subscribe((response) => {
          this.dayDate = response['date'];
        }).add(() => {
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
        this.learningDaysAll.push(
          {
            'date': this.dayDates[i].split("T")[0] + " " + this.dayDates[i].split("T")[1],
            'topic': this.topicNames[i]
          }
        );
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
}
