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
  // institution data
  private institutions$: Observable<string[]> | null = null;

  constructor(private http: HttpClient) {}
  institutionInfo() {
    if (!this.countries$) {
      this.countries$ = this.http
        .get<InstitutionDataInterface[]>(
          'http://localhost:4200/api/schools/countries' ||
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
  fetchStateProvinces(selectedCountry: string): Observable<string[]> {
    return this.http
      .get<InstitutionDataInterface[]>(
        `http://localhost:4200/api/countries/state-provinces?country=${selectedCountry}` ||
          `https://www.skalarly.com/api/countries/state-provinces?country=${selectedCountry}`
      )
      .pipe(
        map((data) => {
          // Filter the state-provinces that are not null
          return data
            .map((item) => item['state-province'])
            .filter((stateProvince) => stateProvince !== null);
        })
      );
  }

  // list of institutions from country--> state-province chosen
  getInstituitonsData(
    country: string,
    stateProvince?: string
  ): Observable<InstitutionDataInterface[]> {
    const region = stateProvince ? `${country}_${stateProvince}` : country;

    if (region === this.selectedCountry && this.cachedInstitutions[region]) {
      // Return cached data for the same country and state-province
      return of(this.cachedInstitutions[region]);
    } else {
      return this.http
        .get<InstitutionDataInterface[]>(
          // this should just filter from the initial cache of this giant json file!
          // instead of making entirely new request
          `http://localhost:4200/api/countries/${country}${
            stateProvince ? `/${stateProvince}` : ''
          }` ||
            `https://www.skalarly.com/api/countries/${country}${
              stateProvince ? `/${stateProvince}` : ''
            }`
        )
        .pipe(
          catchError((err) => {
            console.error('Error in institution request:', err);
            return [];
          }),
          map((cachedData) => {
            // Cache the fetched data for the country
            this.cachedInstitutions[region] = cachedData;
            this.selectedCountry = region; // Update the selected country
            return cachedData;
          })
        );
    }
  }
  // specific info of institute
  getInstitutionDetails(
    country: string,
    institutionName: string
  ): Observable<InstitutionDataInterface> {
    return this.http
      .get<InstitutionDataInterface>(
        `http://localhost:4200/api/institutions/details?country=${country}&name=${institutionName}` ||
          `https://www.skalarly.com/api/institutions/details?country=${country}&name=${institutionName}`
      )
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching institution details:', error);
          throw 'Failed to fetch institution details' + error;
        })
      );
  }
}
