import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  // constructor() {}
  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }

  constructor(private loader: LoaderService) {}
  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }

  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   this.loader.showLoader();
  //   return next.handle(request).pipe(
  //     finalize(() => this.loader.hideLoader())
  //   );
  // }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.showLoader();
    return next.handle(request).pipe(
      finalize(() => this.loader.hideLoader())
    );
  }
}

