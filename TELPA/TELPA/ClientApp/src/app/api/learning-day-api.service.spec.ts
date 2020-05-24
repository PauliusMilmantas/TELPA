import { TestBed } from '@angular/core/testing';

import { LearningDayAPIService } from './learning-day-api.service';

describe('LearningDayAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningDayAPIService = TestBed.get(LearningDayAPIService);
    expect(service).toBeTruthy();
  });
});
