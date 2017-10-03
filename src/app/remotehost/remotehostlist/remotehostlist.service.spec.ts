import { TestBed, inject } from '@angular/core/testing';

import { RemotehostlistService } from './remotehostlist.service';

describe('RemotehostlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemotehostlistService]
    });
  });

  it('should be created', inject([RemotehostlistService], (service: RemotehostlistService) => {
    expect(service).toBeTruthy();
  }));
});
