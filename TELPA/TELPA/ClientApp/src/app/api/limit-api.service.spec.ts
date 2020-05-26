import { TestBed } from '@angular/core/testing';

import { LimitAPIService } from './limit-api.service';

describe('LimitAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LimitAPIService = TestBed.get(LimitAPIService);
    expect(service).toBeTruthy();
  });
});
