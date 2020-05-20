import { Component, OnInit } from '@angular/core';
import { CalendarDataList } from './data/mock_data';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  // Data about all months (static)
  calendarDataList = CalendarDataList;

  last_month = []

  first_week = [];
  second_week = [];
  third_week = [];
  fourth_week = [];
  fifth_week = [];

  constructor() { }

  ngOnInit() {
    this.getMonthData();
  }

  getMonthData() {
    var month_id = 2;

    var prev_week = 0;
    for (let row in this.calendarDataList) {
      var current_row = this.calendarDataList[row];

      if (month_id != 1) {
        if (current_row.year == "2020" && current_row.month_id == (month_id - 1)) {
          this.last_month.push(current_row);
          console.log("PUSHED");
        }
      }

      if (current_row.year == "2020" && current_row.month_id == month_id) {
        // If it's first week
        if (prev_week == 0) {
          this.first_week.push(current_row);
          prev_week = current_row.week_id;
        } else if (current_row.week_id == 1) {
          this.first_week.push(current_row);
        }

        //If it's a second week
        if (prev_week == 1 && current_row.week_id == 2) {
          this.second_week.push(current_row);
          prev_week = current_row.week_id;
        } else if (current_row.week_id == 2) {
          this.second_week.push(current_row);
        }

        //If it's a third week
        if (prev_week == 2 && current_row.week_id == 3) {
          this.third_week.push(current_row);
          prev_week = current_row.week_id;
        } else if (current_row.week_id == 3) {
          this.third_week.push(current_row);
        }

        //If it's a fourth week
        if (prev_week == 3 && current_row.week_id == 4) {
          this.fourth_week.push(current_row);
          prev_week = current_row.week_id;
        } else if (current_row.week_id == 4) {
          this.fourth_week.push(current_row);
        }

        //If it's a fifth week
        if (prev_week == 4 && current_row.week_id == 5) {
          this.fifth_week.push(current_row);
          prev_week = current_row.week_id;
        } else if (current_row.week_id == 5) {
          this.fifth_week.push(current_row);
        }
      }
    }

    //Filling in days
    //If it's the last days
    for (var r = 0; r < 3; r++) {
      for (var i = 0; i < 7 - this.fifth_week.length; i++) {
        this.fifth_week.push({ month_id: this.third_week[0].month_id, year: this.third_week[0].year, day: i + 1, week_id: 5, last_month: true });
      }
    }

    //First week
    for (var r = 0; r < 3; r++) {
      for (var i = 0; i < (7 - this.first_week.length); i++) {
        current_row = this.last_month[this.last_month.length - i - 1]
        this.first_week.unshift({ month_id: current_row.month_id, year: current_row.year, day: current_row.day, week_id: current_row.week_id, last_month: true })
      }
    }
  }
}
