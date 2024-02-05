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
  //   return this.authService.token$.pipe(
  //     switchMap((token: string | null) => {
  //       console.log('environment', environment.production);
  //       const authReq = token ? req.clone({
  //         setHeaders: {
  //           Authorization: `Bearer ${token}`
  //         }
  //     }): req;
  //     console.log('authReq', authReq);
  //     return next.handle(authReq).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('HTTP error occurred in auth-interceptor', error);
  //       // Rethrow the error to propagate it to the caller
  //       throw error
  //     })
  //   );
  // }))
  // temporary
  return next.handle(req);
  
}
}
