import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCalendarComponent } from './manager-calendar.component';

describe('ManagerCalendarComponent', () => {
  let component: ManagerCalendarComponent;
  let fixture: ComponentFixture<ManagerCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
