import { TestBed } from '@angular/core/testing';

import { LearnedTopicAPIService } from './learned-topic-api.service';

describe('LearnedTopicAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearnedTopicAPIService = TestBed.get(LearnedTopicAPIService);
    expect(service).toBeTruthy();
  });
});
