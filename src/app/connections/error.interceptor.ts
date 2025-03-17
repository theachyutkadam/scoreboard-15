import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _toastr: ToastrService,
    private _router: Router
  ){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Check--ErrorInterceptor->', error);
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.errors}`;
        }
        if(error.error.errors == 401){
          this._router.navigateByUrl('/login')
          this._toastr.error(error.error.errors, error.status.toString())
        }
        // Log the error
        if (typeof error.error.errors == "string") {
          this._toastr.error(error.error.errors, error.status.toString())
        }else{
          // this._toastr.error(error.error.errors, error.status.toString())
          // console.log('Error show--->', error.error.errors);
          error.error.errors.filter((object: any) => {
            console.log('Check--->', object);
          })
        }
        // Return an observable with a user-facing error message
        return throwError(() => errorMessage);
      })
    );
  }
}
