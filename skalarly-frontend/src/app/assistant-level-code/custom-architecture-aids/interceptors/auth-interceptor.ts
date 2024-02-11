import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthorizeService } from '../services/authorize.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  // eslint-disable-next-line no-unused-vars
  constructor(private authService: AuthorizeService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): 
  Observable<HttpEvent<any>> {
    const currentRoute = req.headers.get('X-Current-Route');
    console.log('eazy ', currentRoute);

    // Use the custom route to determine if the request is an "easy access" route
    if (currentRoute) {
      console.log('eazy access');
      const newReq = req.clone({ headers: req.headers.delete('X-Current-Route') })
      return next.handle(newReq);
    } else {
    return this.authService.token$.pipe(
      switchMap((token: string | null) => {
        console.log('environmen 77t', environment.production);
        const authReq = token ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
      }): req;
      console.log('authReq', authReq);
      return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP error occurred in auth-interceptor', error);
        // Rethrow the error to propagate it to the caller
        throw error
      })
    );
  }))
}
  }
}
