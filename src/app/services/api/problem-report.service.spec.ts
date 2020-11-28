import { TestBed } from '@angular/core/testing';

import { ProblemReportService } from './problem-report.service';

describe('ProblemReportService', () => {
  let service: ProblemReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
