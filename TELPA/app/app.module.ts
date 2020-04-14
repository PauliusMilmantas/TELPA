import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports:      [ 
        BrowserModule
   ],
    declarations: [
        AppComponent,
        CalendarComponent
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
