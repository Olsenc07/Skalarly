import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { ErrorHandlerComponent } from '../../child-reusable-options/error-handler/error-handler.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {
    this.dialog = dialog;
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse): Observable<never> => {
        // Should siaply appropriate message from server
        // not just this unknown bs lol
        let errorMessage: string = 'An unknown error occured!';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorHandlerComponent, {
          data: { message: errorMessage }
        });
        throw error;
      })
    );
  }
}
