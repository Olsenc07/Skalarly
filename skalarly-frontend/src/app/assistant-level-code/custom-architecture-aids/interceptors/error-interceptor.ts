import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { ErrorHandlerComponent } from '../../child-reusable-options/error-handler/error-handler.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  private dialogRef: MatDialogRef<any> | undefined;
  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {
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
        this.dialogRef = this.dialog.open(ErrorHandlerComponent, {
          data: { message: errorMessage },
          disableClose: true
        });
        const routerSubscription = this.router.events.subscribe((event) => {
          if (event instanceof NavigationStart) {
            this.dialogRef?.close();
            routerSubscription.unsubscribe();
          }
        });
        throw error;
      })
    );
  }
}
