// import {
//   ActivatedRouteSnapshot,
//   ResolveData,
//   RouterStateSnapshot
// } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthorizeService } from '../services/authorize.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { type SkalarInfoInterface } from '../interfaces/skalars-info-interface';

@Injectable({
  providedIn: 'root'
})
export class SkalarsService {
  userId: string | null;

  constructor(
    // eslint-disable-next-line no-unused-vars
    private http: HttpClient,
    private authorizeService: AuthorizeService
  ) {
    this.userId = authorizeService.getUserId();
  }
  // If api is going to retrive the same thing us pipe(
  // shareReplay(1) // Cache the latest response
  // but if new search credentials are given then allow api call and cache new
  // could cache users recent search results so dont have to save in data base
  //lists recent searches
  // but still gives a nice ux when on the page for a while
  // like youtube!

  getSkalars(input: string): Observable<SkalarInfoInterface[]> {
    // fetch userId from auth service that stores id after login
    const queryParams = {
      input: input,
      userId: this.userId!
    };
    const params: HttpParams = new HttpParams({ fromObject: queryParams });
    return this.http.get<SkalarInfoInterface[]>(
      // set up mock server to serve local host requests?
      'http://localhost:4200' ||
        'https://www.skalarly.com/api/skalars/skalarsInfo',
      {
        params
      }
    );
  }
}
