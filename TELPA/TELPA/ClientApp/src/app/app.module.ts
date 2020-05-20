import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModalModule } from './__modal';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { FrontPageComponent } from './front-page/front-page.component';
import { CalendarWindowComponent } from './calendar-window/calendar-window.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LearningDaysComponent } from './learning-days/learning-days.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    FrontPageComponent,
    CalendarWindowComponent,
    HomePageComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    CalendarComponent,
    LearningDaysComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    ModalModule,
    RouterModule.forRoot([
          { path: '', component: FrontPageComponent },
          { path: 'counter', component: CounterComponent },
          { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthorizeGuard] },
          { path: 'calendar', component: CalendarWindowComponent },
          { path: 'homepage', component: HomePageComponent },
          { path: 'register', component: RegistrationFormComponent },
          { path: 'login', component: LoginFormComponent }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
