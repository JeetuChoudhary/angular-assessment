import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  successResponse = {
    status: 'Success',
    message: 'Thank you. You are now Subscribed.',
  };

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.method === 'POST' &&
      request.url === 'http://localhost:4200/users'
    ) {
      return of(new HttpResponse({ status: 200, body: this.successResponse }));
    }

    return next.handle(request);
  }
}
