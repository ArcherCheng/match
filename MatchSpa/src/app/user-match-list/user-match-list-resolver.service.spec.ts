import { TestBed } from '@angular/core/testing';

import { UserMatchListResolverService } from './user-match-list-resolver.service';

describe('UserMatchListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserMatchListResolverService = TestBed.get(UserMatchListResolverService);
    expect(service).toBeTruthy();
  });
});
