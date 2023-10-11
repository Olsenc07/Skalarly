import { Observable, catchError, map, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInfoService {
  private countries$: Observable<string[]> | null = null;
  constructor(private http: HttpClient) {}
  institutionInfo() {
    if (!this.countries$) {
      this.countries$ = this.http
        .get<string[]>('http://universities.hipolabs.com/search?country')
        .pipe(
          map((countries: string[]) => {
            // Find the indices of Canada and USA
            const canadaIndex = countries.findIndex(
              (country) => country === 'Canada'
            );
            const usaIndex = countries.findIndex(
              (country) => country === 'United States'
            );
            if (canadaIndex >= 0 && usaIndex >= 0) {
              // Swap Canada and USA with the first two countries
              [countries[0], countries[canadaIndex]] = [
                countries[canadaIndex],
                countries[0]
              ];
              [countries[1], countries[usaIndex]] = [
                countries[usaIndex],
                countries[1]
              ];
            }

            return countries;
          }),
          shareReplay(1),
          catchError((err) => {
            throw 'error in country request' + err;
          })
        );
    }
    return this.countries$;
  }
}
