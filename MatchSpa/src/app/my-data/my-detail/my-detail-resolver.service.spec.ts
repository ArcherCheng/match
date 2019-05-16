import { TestBed } from '@angular/core/testing';

import { MyDetailResolverService } from './my-detail-resolver.service';

describe('MyDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyDetailResolverService = TestBed.get(MyDetailResolverService);
    expect(service).toBeTruthy();
  });
});
