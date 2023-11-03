import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthorizeService } from './../services/authorize.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  // eslint-disable-next-line no-unused-vars
  constructor(private authService: AuthorizeService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.token$.pipe(
      switchMap((token: string | null) => {
        const authToken: string | null = token;
        // Use setHeaders to set the authorization header
        const authRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });

        return next.handle(authRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            // Handle the error here, you can log it or perform any other action
            console.error('HTTP error occurred in auth-interceptor', error);
            // Rethrow the error to propagate it to the caller
            throw error;
          })
        );
      })
    );
  }
}
