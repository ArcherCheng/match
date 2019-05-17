import { TestBed } from '@angular/core/testing';

import { MyMessagesThreadResolverService } from './my-messages-thread-resolver.service';

describe('MyMessagesThreadResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyMessagesThreadResolverService = TestBed.get(MyMessagesThreadResolverService);
    expect(service).toBeTruthy();
  });
});
