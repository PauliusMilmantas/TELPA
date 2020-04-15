import { Component, OnInit } from '@angular/core';

import { EVENTS } from '../mock/mock-month'
import { EventInt } from './EventInterface'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let events: EventInt[] = EVENTS;
  }
}
