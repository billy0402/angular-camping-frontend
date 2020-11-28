import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiModel } from '@models/api-model.model';
import { ProblemReport } from '@models/problem-report/problem-report.model';

import { HttpService } from '@services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ProblemReportService {
  baseUrl = '/problem-report';

  constructor(private httpService: HttpService) {}

  getProblemReports(): Observable<ApiModel<ProblemReport[]>> {
    return this.httpService.get<ProblemReport[]>(this.baseUrl);
  }

  addProblemReport(data: object): Observable<ApiModel<string>> {
    return this.httpService.post<string>(this.baseUrl, data);
  }

  handleProblemReport(id: number): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(`${this.baseUrl}/${id}/handle`, {});
  }

  handleProblemReportResult(
    id: number,
    data: object
  ): Observable<ApiModel<string>> {
    return this.httpService.patch<string>(
      `${this.baseUrl}/${id}/handle/result`,
      data
    );
  }
}
