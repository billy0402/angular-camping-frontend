import { TestBed } from '@angular/core/testing';

import { RentalStatusService } from './rental-status.service';

describe('RentalStatusService', () => {
  let service: RentalStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
