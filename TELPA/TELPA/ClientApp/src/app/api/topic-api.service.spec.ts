import { TestBed } from '@angular/core/testing';

import { TopicAPIService } from './topic-api.service';

describe('TopicAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicAPIService = TestBed.get(TopicAPIService);
    expect(service).toBeTruthy();
  });
});
