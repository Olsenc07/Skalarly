import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, shareReplay } from 'rxjs';
import { AuthorizeService } from '../services/authorize.service';
import { Injectable } from '@angular/core';
import { SkalarInfoInterface } from '../interfaces/skalars-info-interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  private userId: string | null = null;
  private skalarInfo$: Observable<SkalarInfoInterface> | null = null;
  // Lets cache basic skalar info on login, but updated if edit profile!
  // faster profile laod also, just have to get posts, pics..
  // things that are used lots, pp, username, name...

  constructor(
    // eslint-disable-next-line no-unused-vars
    private http: HttpClient,
    private authorizeService: AuthorizeService
  ) {
    this.userId = authorizeService.getUserId();
  }

  // grab skalar data
  getSkalarData() {
    if (!this.skalarInfo$) {
      const queryParams: HttpParams = new HttpParams({
        fromString: this.userId!
      });
      return this.http
        .get<SkalarInfoInterface>(
          // set up mock server to serve local host requests?
          'http://localhost:4200/api/skalars/selfInfo' ||
            'https://www.skalarly.com/api/skalars/selfInfo',
          {
            params: queryParams
          }
        )
        .pipe(
          shareReplay(1),
          catchError((err) => {
            throw 'error in grabbing skalars request' + err;
          })
        );
    } else {
      return this.skalarInfo$;
    }
  }
}
