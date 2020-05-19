import { Component, OnInit } from '@angular/core';
import { CalendarDataList } from './data/mock_data';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarDataList = CalendarDataList;

  constructor() { }

  ngOnInit() {
  }
}
