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
  private selectedCountry: string = '';
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
          'http://localhost:4200/countries' ||
            'https://www.skalarly.com/api/schools/countries'
        )
        .pipe(
          catchError((err) => {
            console.error('Error in country request:', err);
            return [];
          }),
          shareReplay(1) // cache countries
        );
    }
    return this.countries$;
  }
  // need to add another drop down of state/province if not null
  // to clean up how many universities are loaded.. over 3000 in usa
  // also can use this info later to display data from uni/college in same state/province as skalar
  // Function to fetch state-provinces based on the selected country
  fetchStateProvinces(selectedCountry: string) {
    this.stateProvinces$ = this.http.get<string[]>(
      `/countries/state-provinces?country=${selectedCountry}`
    );
  }

  // Function to fetch institutions based on the selected country and state-province
  fetchInstitutions(selectedCountry: string, selectedStateProvince?: string) {
    this.institutions$ = this.http.get<InstitutionDataInterface[]>(
      `/countries/country?country=${selectedCountry}&stateProvince=${selectedStateProvince}`
    );
  }

  // list of institutions from country--> state-province chosen
  getInstituitonsData(country: string): Observable<InstitutionDataInterface[]> {
    if (country === this.selectedCountry && this.cachedInstitutions[country]) {
      // return cached data for the same country
      return of(this.cachedInstitutions[country]);
    } else {
      return this.http
        .get<InstitutionDataInterface[]>(
          // this should just filter from the initial cache of this giant json file!
          // instead of making entirely new request
          `/countries/${country}`
        )
        .pipe(
          catchError((err) => {
            console.error('Error in institution request:', err);
            return [];
          }),
          map((cachedData) => {
            // Cache the fetched data for the country
            this.cachedInstitutions[country] = cachedData;
            this.selectedCountry = country; // Update the selected country
            return cachedData;
          })
        );
    }
  }
}
