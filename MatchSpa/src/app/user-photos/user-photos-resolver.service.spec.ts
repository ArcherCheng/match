import { TestBed } from '@angular/core/testing';

import { UserPhotosResolverService } from './user-photos-resolver.service';

describe('UserPhotosResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPhotosResolverService = TestBed.get(UserPhotosResolverService);
    expect(service).toBeTruthy();
  });
});
