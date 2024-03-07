import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, shareReplay } from 'rxjs';
import { AuthorizeService } from './authorize.service';
import { Injectable } from '@angular/core';
import { SkalarInfoInterface } from '../../../../../../shared/interfaces/skalars-info-interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  private apiUrl = environment.apiUrl;
  private userId: string | null = null;
  private skalarInfo$: Observable<SkalarInfoInterface> | null = null;
  private isBlocked: boolean = false;
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

  setBlockedValue(value: boolean) {
    this.isBlocked = value;
  }
  getBlockedValue(): boolean {
    const value: boolean = this.isBlocked;
    this.isBlocked = false; // reset the value after accessing it
    return value;
  }
  // grab this skalars data
  getSkalarData(): Observable<SkalarInfoInterface> {
    if (!this.skalarInfo$) {
      const queryParams: HttpParams = new HttpParams({
        fromString: this.userId!
      });
      return this.http
        .get<SkalarInfoInterface>(
          // set up mock server to serve local host requests?
          this.apiUrl + '/skalars/selfInfo',
          {
            params: queryParams
          }
        )
        .pipe(
          shareReplay(1),
          catchError((err) => {
            throw `Error in grabbing your info request: ${err}`;
          })
        );
    } else {
      return this.skalarInfo$;
    }
  }
  // grab skalars data
  fetchSkalarsData(id: string): Observable<SkalarInfoInterface | null> {
    const queryParams = {
      id: id,
      userId: this.userId!
    };
    const params: HttpParams = new HttpParams({ fromObject: queryParams });
    return this.http
      .get<SkalarInfoInterface | boolean | null>(
        this.apiUrl + '/skalars/skalarsInfo',
        {
          params
        }
      )
      .pipe(
        catchError((err) => {
          throw `Error in grabbing Skalars request: ${err}`;
        }),
        map((data: SkalarInfoInterface | boolean | null) => {
          // Check if the received data is a boolean
          if (typeof data === 'boolean') {
            // this skalar has blocked you, no data for you
            return null;
          } else {
            // Return the data as is
            return data;
          }
        })
      );
  }
}
