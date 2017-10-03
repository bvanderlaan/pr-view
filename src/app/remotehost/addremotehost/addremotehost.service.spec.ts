import { TestBed, inject } from '@angular/core/testing';

import { AddRemoteHostService } from './addremotehost.service';

describe('AddRemoteHostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddRemoteHostService]
    });
  });

  it('should be created', inject([AddRemoteHostService], (service: AddRemoteHostService) => {
    expect(service).toBeTruthy();
  }));
});
