import { TestBed } from '@angular/core/testing';

import { UserMatchConditionResolverService } from './user-match-condition-resolver.service';

describe('UserMatchConditionResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserMatchConditionResolverService = TestBed.get(UserMatchConditionResolverService);
    expect(service).toBeTruthy();
  });
});
