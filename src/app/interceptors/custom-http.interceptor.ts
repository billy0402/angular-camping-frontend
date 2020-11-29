import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SpinnerService } from '@services/ui/spinner.service';

import { environment } from '@environments/environment';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.hide();

            const isApi = event.url.startsWith(environment.serverIp);
            if (isApi && !event.body.result) {
              throw new HttpErrorResponse({ ...event, error: event.body });
            }
          }
        },
        (error) => {
          this.spinnerService.hide();
        }
      )
    );
  }
}
