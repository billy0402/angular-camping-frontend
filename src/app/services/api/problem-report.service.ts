import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ProblemReport } from '@models/problem-report/problem-report.model';

import { HttpWithRxService } from '@services/http-with-rx.service';

@Injectable({
  providedIn: 'root',
})
export class ProblemReportService {
  baseUrl = '/problem-report';

  constructor(private httpWithRxService: HttpWithRxService) {}

  getProblemReports(): Observable<ProblemReport[]> {
    return this.httpWithRxService.get<ProblemReport[]>(this.baseUrl);
  }

  addProblemReport(data: object): Observable<boolean> {
    return this.httpWithRxService.post<string>(this.baseUrl, data);
  }

  handleProblemReport(id: number): Observable<boolean> {
    return this.httpWithRxService.patch<string>(`${this.baseUrl}/${id}/handle`);
  }

  handleProblemReportResult(id: number, data: object): Observable<boolean> {
    return this.httpWithRxService.patch<string>(
      `${this.baseUrl}/${id}/handle/result`,
      data
    );
  }
}
