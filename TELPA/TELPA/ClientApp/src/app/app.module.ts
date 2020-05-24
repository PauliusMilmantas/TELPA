import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ModalModule } from "./__modal";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { FrontPageComponent } from "./front-page/front-page.component";
import { CalendarWindowComponent } from "./calendar-window/calendar-window.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { LearningDaysComponent } from "./learning-days/learning-days.component";
import { ManagerCalendarComponent } from "./manager-calendar/manager-calendar.component";
import { ManagerHomePageComponent } from "./manager-home-page/manager-home-page.component";
import { CookieService } from "ngx-cookie-service";
import { EmployeeManagementComponent } from "./employee-management/employee-management.component";
import { TopicAddComponent } from "./topic-add/topic-add.component";
import { TopicEditComponent } from "./topic-edit/topic-edit.component";
import { RecommendationsComponent } from "./recommendations/recommendations.component";

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
    LearningDaysComponent,
    EmployeeManagementComponent,
    ManagerCalendarComponent,
    ManagerHomePageComponent,
    TopicAddComponent,
    TopicEditComponent,
    RecommendationsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    ModalModule,
    RouterModule.forRoot([
      { path: "", component: FrontPageComponent },
      { path: "counter", component: CounterComponent },
      { path: "fetch-data", component: FetchDataComponent },
      { path: "calendar", component: CalendarWindowComponent },
      { path: "homepage", component: HomePageComponent },
      { path: "register", component: RegistrationFormComponent },
      { path: "login", component: LoginFormComponent },
      { path: "manager", component: ManagerHomePageComponent },
      { path: "employee-management", component: EmployeeManagementComponent },
      { path: "topic-add", component: TopicAddComponent },
      { path: "topic-edit", component: TopicEditComponent },
      { path: "recommendations", component: RecommendationsComponent },
    ]),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
