import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CalendarComponent } from './calendar/calendar.component';
import { DayComponent } from './day/day.component';
import { EventComponent } from './event/event.component';
import { HourComponent } from './hour/hour.component'

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayComponent,
    EventComponent,
    HourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
