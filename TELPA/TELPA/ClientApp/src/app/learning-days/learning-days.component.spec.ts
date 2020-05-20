import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningDaysComponent } from './learning-days.component';

describe('LearningDaysComponent', () => {
  let component: LearningDaysComponent;
  let fixture: ComponentFixture<LearningDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
