import { TestBed, inject } from '@angular/core/testing';

import { RemoteHostListService } from './remotehostlist.service';

describe('RemoteHostListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteHostListService]
    });
  });

  it('should be created', inject([RemoteHostListService], (service: RemoteHostListService) => {
    expect(service).toBeTruthy();
  }));
});
