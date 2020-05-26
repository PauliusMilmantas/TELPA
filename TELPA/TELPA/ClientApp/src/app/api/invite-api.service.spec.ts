import { TestBed } from '@angular/core/testing';

import { InviteApiService } from './invite-api.service';

describe('InviteApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InviteApiService = TestBed.get(InviteApiService);
    expect(service).toBeTruthy();
  });
});
