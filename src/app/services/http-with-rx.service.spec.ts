import { TestBed } from '@angular/core/testing';

import { HttpWithRxService } from './http-with-rx.service';

describe('HttpWithRxService', () => {
  let service: HttpWithRxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpWithRxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
