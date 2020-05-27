import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicNetworkComponent } from './topic-network.component';

describe('TopicNetworkComponent', () => {
  let component: TopicNetworkComponent;
  let fixture: ComponentFixture<TopicNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
