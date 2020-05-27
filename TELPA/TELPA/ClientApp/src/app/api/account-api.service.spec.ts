import { TestBed } from '@angular/core/testing';

import { AccountAPIService } from './account-api.service';

describe('AccountAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountAPIService = TestBed.get(AccountAPIService);
    expect(service).toBeTruthy();
  });
});
