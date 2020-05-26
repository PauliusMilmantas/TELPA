import { TestBed } from '@angular/core/testing';

import { TopicLinkAPIService } from './topic-link-api.service';

describe('TopicLinkAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicLinkAPIService = TestBed.get(TopicLinkAPIService);
    expect(service).toBeTruthy();
  });
});
