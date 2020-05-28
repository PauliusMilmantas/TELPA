import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitsEditComponent } from './limits-edit.component';

describe('LimitsEditComponent', () => {
  let component: LimitsEditComponent;
  let fixture: ComponentFixture<LimitsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LimitsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
