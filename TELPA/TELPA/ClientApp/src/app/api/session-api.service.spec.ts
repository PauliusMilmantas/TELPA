import { TestBed } from '@angular/core/testing';

import { SessionAPIService } from './session-api.service';

describe('SessionAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionAPIService = TestBed.get(SessionAPIService);
    expect(service).toBeTruthy();
  });
});
