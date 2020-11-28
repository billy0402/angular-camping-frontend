import { TestBed } from '@angular/core/testing';

import { RememberMeService } from './remember-me.service';

describe('RememberMeService', () => {
  let service: RememberMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RememberMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
