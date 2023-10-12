import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  shareReplay
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstitutionDataInterface } from '../interfaces/institution-interface';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInfoService {
  private countries$: Observable<string[]> | null = null;
  private filteredCountries$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  private pageSize: number = 7;
  constructor(private http: HttpClient) {}
  institutionInfo() {
    if (!this.countries$) {
      this.countries$ = this.http
        .get<InstitutionDataInterface[]>(
          'http://universities.hipolabs.com/search?country'
        )
        .pipe(
          map((countries: InstitutionDataInterface[]) => {
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
  filterCountries(filter: string) {
    if (this.countries$) {
      const countries = this.filteredCountries$.value.filter((country) =>
        country.toLowerCase().includes(filter.toLowerCase())
      );
      this.filteredCountries$.next(countries.slice(0, this.pageSize));
    }
  }

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

  getFilteredCountries(): Observable<string[]> {
    return this.filteredCountries$.asObservable();
  }
}
