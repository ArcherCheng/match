import { TestBed } from '@angular/core/testing';

import { MyPhotosResolverService } from './my-photos-resolver.service';

describe('MyPhotosResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyPhotosResolverService = TestBed.get(MyPhotosResolverService);
    expect(service).toBeTruthy();
  });
});
