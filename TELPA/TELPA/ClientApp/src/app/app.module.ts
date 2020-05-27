import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Router } from "@angular/router";
import { ModalModule } from "./__modal";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { FrontPageComponent } from "./front-page/front-page.component";
import { CalendarWindowComponent } from "./calendar-window/calendar-window.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { LearningDaysComponent } from "./learning-days/learning-days.component";
import { ManagerCalendarComponent } from "./manager-calendar/manager-calendar.component";
import { ManagerHomePageComponent } from "./manager-home-page/manager-home-page.component";
import { EmployeeManagementComponent } from "./employee-management/employee-management.component";
import { TopicAddComponent } from "./topic-add/topic-add.component";
import { TopicEditComponent } from "./topic-edit/topic-edit.component";
import { RecommendationsComponent } from "./recommendations/recommendations.component";
import { AuthenticationService } from "./authentication/authentication.service";
import { AuthInterceptorService } from "./authentication/auth-interceptor.service";
import { SessionAPIService } from "./api/session-api.service";
import { EmployeeAPIService } from "./api/employee-api.service";
import { InviteAPIService } from "./api/invite-api.service";
import { LearnedTopicAPIService } from "./api/learned-topic-api.service";
import { LearningDayAPIService } from "./api/learning-day-api.service";
import { LearningDayLinkAPIService } from "./api/learning-day-link-api.service";
import { LearningDayTopicAPIService } from "./api/learning-day-topic-api.service";
import { LimitAPIService } from "./api/limit-api.service";
import { RecommendedTopicAPIService } from "./api/recommended-topic-api.service";
import { TopicAPIService } from "./api/topic-api.service";
import { TopicLinkAPIService } from "./api/topic-link-api.service";
import { EmployeeTreeComponent } from "./employee-tree/employee-tree.component";
import { TreeComponent } from "./tree/tree.component";
import { AccountAPIService } from "./api/account-api.service";
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
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
    EmployeeTreeComponent,
    TreeComponent,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    ModalModule,
    RouterModule.forRoot([
      { path: "", component: FrontPageComponent },
      { path: "calendar", component: CalendarWindowComponent },
      { path: "homepage", component: HomePageComponent },
      { path: "register", component: RegistrationFormComponent },
      { path: "login", component: LoginFormComponent },
      { path: "manager", component: ManagerHomePageComponent },
      { path: "employee-management", component: EmployeeManagementComponent },
      { path: "topic-add", component: TopicAddComponent },
      { path: "topic-edit", component: TopicEditComponent },
      { path: "recommendations", component: RecommendationsComponent },
      { path: "employee-tree", component: EmployeeTreeComponent },
      { path: "statistics", component: StatisticsComponent },
    ]),
  ],
  providers: [
    AuthenticationService,
    EmployeeAPIService,
    InviteAPIService,
    LearnedTopicAPIService,
    LearningDayAPIService,
    LearningDayLinkAPIService,
    LearningDayTopicAPIService,
    LimitAPIService,
    RecommendedTopicAPIService,
    TopicAPIService,
    TopicLinkAPIService,
    SessionAPIService,
    AccountAPIService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
      deps: [Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
