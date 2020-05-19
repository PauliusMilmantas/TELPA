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

  // Returned HTML content to view
  month_data = "";

  constructor() { }

  ngOnInit() {
    this.month_data = this.getMonthData();
  }

  getMonthData() {
    var month_id = 1;

    var prev_week = 0;
    for (let row in this.calendarDataList) {
      var current_row = this.calendarDataList[row];

      // ===========================
      // START OF WEEK SWITCHING
      // ===========================

      // If it's first week
      if (prev_week == 0) {
        this.month_data = this.month_data.concat('<div class="first">');
        prev_week = current_row.week_id;
      }

      //If it's a second week
      if (prev_week == 1 && current_row.week_id == 2) {
        this.month_data = this.month_data.concat('</div>');
        this.month_data = this.month_data.concat('<div class="second">');
        prev_week = current_row.week_id;
      }

      //If it's a third week
      if (prev_week == 2 && current_row.week_id == 3) {
        this.month_data = this.month_data.concat('</div>');
        this.month_data = this.month_data.concat('<div class="third">');
        prev_week = current_row.week_id;
      }

      //If it's a fourth week
      if (prev_week == 3 && current_row.week_id == 4) {
        this.month_data = this.month_data.concat('</div>');
        this.month_data = this.month_data.concat('<div class="fourth">');
        prev_week = current_row.week_id;
      }

      //If it's a fifth week
      if (prev_week == 4 && current_row.week_id == 5) {
        this.month_data = this.month_data.concat('</div>');
        this.month_data = this.month_data.concat('<div class="fifth">');
        prev_week = current_row.week_id;
      }

      // ===========================
      // END OF WEEK SWITCHING
      // ===========================

      if (current_row.month_id == month_id) {
        this.month_data = this.month_data.concat('<span>'.concat(current_row.day.toString()).concat('</span>'));
      }
    }

    this.month_data = this.month_data.concat('</div>');

    return this.month_data;
  }
}
