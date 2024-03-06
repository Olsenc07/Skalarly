// import {
//   ActivatedRouteSnapshot,
//   ResolveData,
//   RouterStateSnapshot
// } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthorizeService } from './authorize.service';
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

  // could cache users recent search results so dont have to save in data base
  //lists recent searches
  // but still gives a nice ux when on the page for a while
  // like youtube!

  // triggered by search bar input
  getSkalars(input: string): Observable<SkalarInfoInterface[]> | void {
  //   // fetch userId from auth service that stores id after login
  //   const queryParams = {
  //     input: input,
  //     userId: this.userId!
  //   };
    // const params: HttpParams = new HttpParams({ fromObject: queryParams });
    // return this.http.get<SkalarInfoInterface[]>(
    //   this.apiUrl + '/skalars/skalarsInfoSearch',
    //   {
    //     params
    //   }
    // );
    return;
  }
}
