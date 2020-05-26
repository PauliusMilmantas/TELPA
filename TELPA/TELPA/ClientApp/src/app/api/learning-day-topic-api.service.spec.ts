import { TestBed } from '@angular/core/testing';

import { LearningDayTopicAPIService } from './learning-day-topic-api.service';

describe('LearningDayTopicAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningDayTopicAPIService = TestBed.get(LearningDayTopicAPIService);
    expect(service).toBeTruthy();
  });
});
