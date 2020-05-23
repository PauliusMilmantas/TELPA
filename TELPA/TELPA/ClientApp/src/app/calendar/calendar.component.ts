import { Component, OnInit } from '@angular/core';
import { CalendarDataList } from './data/mock_data';
import { CalendarData } from './data/data';
import { ModalService } from '../__modal';
import { HttpClient } from '@angular/common/http';

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

  //For calendar frontend
  month_id = 5;
  current_month_name = "";

  //For modular window
  date_string = "";
  selectedDay;
  selectedEvent;
  selectedTopic;
  selectedTopicDescription;

  // Dates with events
  eventDates = [];

  constructor(private modalService: ModalService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.getBackendData();
  }

  // Loading eventDates variable
  getBackendData() {
    var baseURL = location.origin;
    this.httpClient.get(baseURL + '/api/learningDay/get/all').subscribe(response => {
      for (var i = 0; i < Object.keys(response).length; i++) {
        var date = response[i]['date'];
        this.eventDates.push(
          {
            'date': date.split("T")[0],
            'id': response[i]['id']
          }
        );
      }
    }).add(() => {
      this.get_month_name(this.month_id);
      this.getMonthData(this.month_id);
    });
  }

  get_month_name(month_id) {
    switch (month_id) {
      case 1:
        this.current_month_name = "January";
        break;
      case 2:
        this.current_month_name = "February";
        break;
      case 3:
        this.current_month_name = "March";
        break;
      case 4:
        this.current_month_name = "April";
        break;
      case 5:
        this.current_month_name = "May";
        break;
      case 6:
        this.current_month_name = "June";
        break;
      case 7:
        this.current_month_name = "July";
        break;
      case 8:
        this.current_month_name = "August";
        break;
      case 9:
        this.current_month_name = "September";
        break;
      case 10:
        this.current_month_name = "October";
        break;
      case 11:
        this.current_month_name = "November";
        break;
      case 12:
        this.current_month_name = "December";
        break;
    }
  }

  // Left and right buttons
  click_left(event) {
    if(this.month_id != 2) {
      this.month_id -= 1;
      this.get_month_name(this.month_id);
      this.getMonthData(this.month_id);
    }
  }

  click_right(event) {
    if (this.month_id != 6) {
      this.month_id += 1;
      this.get_month_name(this.month_id);
      this.getMonthData(this.month_id);
    }
  }

  //Loading frondend data
  getMonthData(month_id) {
    this.last_month = []

    this.first_week = [];
    this.second_week = [];
    this.third_week = [];
    this.fourth_week = [];
    this.fifth_week = [];

    //Setting today date
    for (let row in this.calendarDataList) {
      if (this.calendarDataList[row].day == 2 && this.calendarDataList[row].month_id == 5) {
        this.calendarDataList[row] = { month_id: 5, year: "2020", day: 2, week_id: 1, "last_month": false, today: true, has_tasks: false, task_id: '', eventRow: 0 };
      }
    }

    //Parsing events
    for (var i = 0; i < Object.keys(this.eventDates).length; i++) {
      for (var t = 0; t < Object.keys(this.calendarDataList).length; t++) {
        if (
          this.calendarDataList[t].day == this.eventDates[i]['date'].split('-')[2] &&
          this.calendarDataList[t].month_id == this.eventDates[i]['date'].split('-')[1] &&
          this.calendarDataList[t].year == this.eventDates[i]['date'].split('-')[0]
        ) {
          this.calendarDataList[t] = {
            month_id: this.calendarDataList[t].month_id, year: this.calendarDataList[t].year
            , day: this.calendarDataList[t].day, week_id: this.calendarDataList[t].week_id, "last_month": this.calendarDataList[t].last_month, today: this.calendarDataList[t].today,
            has_tasks: true, task_id: this.calendarDataList[t].task_id, eventRow: 0
          };
        }
      }
    }

    //Setting up FE
    var prev_week = 0;
    for (let row in this.calendarDataList) {
      var current_row = this.calendarDataList[row];

      if (this.month_id != 1) {
        if (current_row.year == "2020" && current_row.month_id == (month_id - 1)) {
          this.last_month.push(current_row);
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
    for (var i = 0; i < 7 - this.fifth_week.length + i; i++) {
      this.fifth_week.push({ month_id: this.third_week[0].month_id, year: this.third_week[0].year, day: i + 1, week_id: 5, last_month: true, today: false, has_tasks: false, task_id: '' });
    }

    for (var k = 0; k < (7 - this.first_week.length + k); k++) {
      current_row = this.last_month[this.last_month.length - k - 1];
      let current_object: CalendarData = { month_id: current_row.month_id, year: current_row.year, day: current_row.day, week_id: current_row.week_id, last_month: true, today: false, has_tasks: false, task_id: '', eventRow: 0 };
      this.first_week.unshift(current_object);  
    }
  }

  //Modal window control
  openModal(id: string, day: number) {
    this.date_string = (this.second_week[0].year).concat("-").concat(this.month_id.toString()).concat("-").concat(day);
    this.modalService.open(id);
  }

  openEventViewer(id: string, day: number, row: string) {
    this.date_string = (this.second_week[0].year).concat("-").concat(this.month_id.toString()).concat("-").concat(day);
    for (var i = 0; i < Object.keys(this.eventDates).length; i++) {
      if (this.eventDates[i]['date'].split('-')[0] == '2020' &&
        this.eventDates[i]['date'].split('-')[1] == this.month_id &&
        this.eventDates[i]['date'].split('-')[2] == day) {
        this.selectedEvent = this.eventDates[i];
      }
    }

    var foundEventFromResponse;
    this.httpClient.get(location.origin + '/api/learningDayTopic/get/all').subscribe(response => {
      for (var i = 0; i < Object.keys(response).length; i++) {
        if (response[i]['id'] == this.selectedEvent['id']) {
          foundEventFromResponse = response[i];
        }
      }
    }).add(() => {
      console.log(foundEventFromResponse);

      this.httpClient.get(location.origin + '/api/topic/get/' + foundEventFromResponse['topicId']).subscribe(response2 => {
        console.log(response2['name']);
        this.selectedTopic = response2['name'];
        this.selectedTopicDescription = response2['description'];

        this.modalService.open(id);
      });
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
