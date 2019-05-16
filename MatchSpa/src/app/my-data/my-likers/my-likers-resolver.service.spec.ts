import { TestBed } from '@angular/core/testing';

import { MyLikersResolverService } from './my-likers-resolver.service';

describe('MyLokersResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyLikersResolverService = TestBed.get(MyLikersResolverService);
    expect(service).toBeTruthy();
  });
});
