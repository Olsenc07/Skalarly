import { ActivatedRouteSnapshot, ResolveData } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { GlobalDataService } from '../services/global-data.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkalarInfoInterface } from '../../../../../shared/interfaces/skalars-info-interface';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements ResolveData {
  constructor(
    private globalDataService: GlobalDataService,
    private snackBar: MatSnackBar
  ) {}

  // Used for profile and skalars pages for
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<SkalarInfoInterface | SkalarInfoInterface[]> | void {
    const url: string | undefined = route.routeConfig!.path; // Get the URL of the current route
    if (url === 'profile/:info') {
      return this.globalDataService.getSkalarData(); // Replace with your data-fetching method
    } else {
      // path: 'skalars/:id',
      const id: string = route.params['id'];
      this.globalDataService.fetchSkalarsData(id).pipe(
        map((data) => {
          // Check if data is true and set the 'blocked' value accordingly
          // Which is accessed by canActivate nav guard and will stop nav and
          // display message
          if (typeof data === 'boolean') {
            this.globalDataService.setBlockedValue(data === true);
            return null;
          } else {
            return data;
          }
        }),
        catchError((error) => {
          this.snackBar.open(
            'An error occurred while fetching Skalar data',
            '',
            {
              duration: 3000
            }
          );
          return of(null);
        })
      );
    }
  }
}
