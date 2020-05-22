import { Component, OnInit } from '@angular/core';
import { TrainingDayList } from './data/mock_data';
import { LearningDay } from './data/TrainingDay';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-learning-days',
  templateUrl: './learning-days.component.html',
  styleUrls: ['./learning-days.component.css']
})
export class LearningDaysComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  // Loading static data
  learningDaysAll = TrainingDayList;

  // Front end
  pageCounter = 1;

  // Data to be displayed
  learningDays = [];

  ngOnInit() {
    console.log("Init");
    this.getBackendData();
  }

  // Requesting data from API
  getBackendData() {
    var baseURL = location.origin;
    this.learningDaysAll = [];
    this.httpClient.get(baseURL + '/api/learningDayTopic/get/all').subscribe(
      data => {
        console.log(data);
        for (var i = 0; i < Object.keys(data).length; i++) {
          var date = data[i]['learningDayDate'];
          this.httpClient.get(baseURL + '/api/topic/get/' + data[i]['topicId']).subscribe(topic => {
            this.learningDaysAll.push(
              {
                'date': date,
                'topic': topic["name"]
              }
            );
          });
        }
      }
    ).add(() => {
      if (this.learningDaysAll.length == 0) {
        this.ngOnInit();
      } else {
        this.getDataForFE(1);
      }
    });
  }

  // Parsing data from API
  getDataForFE(pageNumber) {
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
