import { ActivatedRouteSnapshot, ResolveData } from '@angular/router';
import { GlobalDataService } from '../services/global-data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements ResolveData {
  constructor(private globalDataService: GlobalDataService) {}

  // Used for profile and skalars pages for
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const id: string = route.params['id'];
    return this.globalDataService(); // Replace with your data-fetching method
    // could be from a different service
    // but look up peurpose of resolve
  }
}
