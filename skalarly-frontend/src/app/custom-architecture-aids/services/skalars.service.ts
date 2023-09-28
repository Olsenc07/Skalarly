import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthorizeService } from '../services/authorize.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { type SkalarInfoInterface } from '../interfaces/skalars-info-interface';

@Injectable({
  providedIn: 'root'
})
export class SkalarsService {
  userId: string | undefined;

  constructor(
    // eslint-disable-next-line no-unused-vars
    private http: HttpClient,
    private authorizeService: AuthorizeService
  ) {
    this.userId = authorizeService.getUserId();
  }

  getSkalars(input: string): Observable<SkalarInfoInterface[]> {
    // fetch userId from auth service that stores id after login
    const queryParams = {
      input: input,
      userId: this.userId || ''
    };
    const params: HttpParams = new HttpParams({ fromObject: queryParams });
    return this.http.get<SkalarInfoInterface[]>(
      // set up mock server to serve local host requests?
      'http://localhost:4200' ||
        'https://www.skalarly.com/api/skalars/skalarsFound',
      {
        params
      }
    );
  }
}
