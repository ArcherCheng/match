import { TestBed } from '@angular/core/testing';

import { MyMessagesResolverService } from './my-messages-resolver.service';

describe('MyMessagesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyMessagesResolverService = TestBed.get(MyMessagesResolverService);
    expect(service).toBeTruthy();
  });
});
