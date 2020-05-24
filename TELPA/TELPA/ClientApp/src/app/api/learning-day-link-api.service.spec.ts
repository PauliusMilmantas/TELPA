import { TestBed } from '@angular/core/testing';

import { LearningDayLinkAPIService } from './learning-day-link-api.service';

describe('LearningDayLinkAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningDayLinkAPIService = TestBed.get(LearningDayLinkAPIService);
    expect(service).toBeTruthy();
  });
});
