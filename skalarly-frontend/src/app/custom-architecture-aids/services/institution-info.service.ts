import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  shareReplay
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstitutionDataInterface } from '../interfaces/institution-interface';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInfoService {
  private cachedInstitutions: {
    [country: string]: InstitutionDataInterface[];
  } = {};
  // countries
  private countries$: Observable<InstitutionDataInterface[]> | null = null;
  private filteredCountries$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  private pageSize: number = 7;
  // institution data
  private institutions$: Observable<string[]> | null = null;

  constructor(private http: HttpClient) {}
  institutionInfo() {
    if (!this.countries$) {
      this.countries$ = this.http
        .get<InstitutionDataInterface[]>(
          'http://localhost:4200/universities' ||
            'https://www.skalarly.com/api/schools/universities'
        )
        .pipe(
          map((countries: InstitutionDataInterface[]) => {
            // cache entire json file and use this for picking insts!!
            // recieved as json format!!

            // display each country once
            let uniqueCountries: string[] = [
              ...new Set(
                countries.map((item: InstitutionDataInterface) => item.country)
              )
            ];
            uniqueCountries.sort(); // Sort countries alphabetically

            // Find the indices of Canada and USA
            const canadaIndex: number = uniqueCountries.findIndex(
              (country) => country === 'Canada'
            );
            const usaIndex: number = uniqueCountries.findIndex(
              (country) => country === 'USA'
            );

            if (canadaIndex >= 0 && usaIndex >= 0) {
              // Move Canada and USA to the beginning
              uniqueCountries.splice(canadaIndex, 1);
              uniqueCountries.splice(usaIndex, 1);
              uniqueCountries = ['Canada', 'USA', ...uniqueCountries];
            }
            this.filteredCountries$.next(
              uniqueCountries.slice(0, this.pageSize)
            ); // Initial display (first 7 countries)
            return uniqueCountries;
          }),
          shareReplay(1),
          catchError((err) => {
            console.error('Error in country request:', err);
            return [];
          })
        );
    }
    return this.countries$;
  }
  // infinite scroll
  loadMoreCountries() {
    if (this.countries$) {
      const currentLength = this.filteredCountries$.value.length;
      const nextCountries = this.countries$.value.slice(
        currentLength,
        currentLength + this.pageSize
      );
      this.filteredCountries$.next([
        ...this.filteredCountries$.value,
        ...nextCountries
      ]);
    }
  }
  // list of institutions from country chosen
  getInstituitonsData(country: string): Observable<InstitutionDataInterface[]> {
    if (this.cachedInstitutions[country]) {
      return of(this.cachedInstitutions[country]);
    } else {
      return this.http
        .get<InstitutionDataInterface[]>(
          // this should just filter from the initial cahce of this giant json file!
          // instead of making entirely new request
          `/universities/${country}`
        )
        .pipe(
          catchError((err) => {
            console.error('Error in institution request:', err);
            return [];
          }),
          map((cachedData) => {
            // Cache the fetched data for the country
            this.cachedInstitutions[country] = cachedData;
            return cachedData;
          })
        );
    }
  }
}
