import { Component, OnInit } from '@angular/core';
import { TrainingDayList } from './data/mock_data';
import { LearningDay } from './data/TrainingDay';

@Component({
  selector: 'app-learning-days',
  templateUrl: './learning-days.component.html',
  styleUrls: ['./learning-days.component.css']
})
export class LearningDaysComponent implements OnInit {

  constructor() { }

  // Loading static data
  learningDaysAll = TrainingDayList;

  // Front end
  pageCounter = 1;

  // Data to be displayed
  learningDays = [];

  ngOnInit() {
    console.log(TrainingDayList);
    this.getDataForFE(1);
  }

  getDataForFE(pageNumber) {
    this.learningDays = [];

    for (var i = 4 * (pageNumber - 1); i < 3 * pageNumber + 1; i++) {
      if (i <= this.learningDaysAll.length) {
        this.learningDays.push(this.learningDaysAll[i]);
      }
    }
  }

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
