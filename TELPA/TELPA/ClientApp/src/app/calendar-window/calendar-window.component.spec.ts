import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWindowComponent } from './calendar-window.component';

describe('CalendarWindowComponent', () => {
  let component: CalendarWindowComponent;
  let fixture: ComponentFixture<CalendarWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
