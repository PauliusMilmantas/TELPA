import { TestBed } from '@angular/core/testing';

import { RecommendedTopicAPIService } from './recommended-topic-api.service';

describe('RecommendedTopicAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecommendedTopicAPIService = TestBed.get(RecommendedTopicAPIService);
    expect(service).toBeTruthy();
  });
});
