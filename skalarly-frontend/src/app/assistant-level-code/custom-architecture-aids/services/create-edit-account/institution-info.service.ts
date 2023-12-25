import { Injectable, Signal, signal } from '@angular/core';
import { Observable, map, of, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InstitutionDataInterface } from '../../interfaces/institution-interface';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInfoService {
  private apiUrl = 'http://universities.hipolabs.com/search'; // grabs all data once
  // cache
  private apiSource: InstitutionDataInterface[] | null = null; 
  private countriesState = signal<string[]>(['']);
  private regionsState = signal<string[]>([]);
  private institutionsState = signal<string[]>(['']);

  // defalt value canada or usa
  get countries(): Signal<string[]> {
    return this.countriesState.asReadonly();
  }
  get regions(): Signal<string[]> {
    return this.regionsState.asReadonly();
  }
  get institutions(): Signal<string[]> {
    return this.institutionsState.asReadonly();
  }
  constructor(private http: HttpClient) {}

  getCountries(): void {
    if (!this.apiSource) {
      this.http.get<InstitutionDataInterface[]>(this.apiUrl).pipe(
        tap(data => this.apiSource = data), // Cache the full data
        map(data => this.processCountries(data)), 
        take(1)
      ).subscribe(countries => {
        this.countriesState.set(countries);
      });
    } else {
         // Set countries from the cached data
         const countries: string[] = this.processCountries(this.apiSource);
         this.countriesState.set(countries);
    }
  }
  private processCountries(universitiesData: any[]): string[] {
    const countriesSet = new Set(universitiesData.map((u) => u.country));
    let countries = Array.from(countriesSet);
    countries.sort((a, b) => {
      if (a === 'Canada' || a === 'United States') return -1;
      if (b === 'Canada' || b === 'United States') return 1;
      return a.localeCompare(b);
    });
    return countries;
  }
  getStateProvinces(country: string): void {
    if (this.apiSource) {
      const stateProvinces = this.processStateProvinces(this.apiSource, country);
      this.regionsState.set(stateProvinces);
    } else {
      this.http.get<InstitutionDataInterface[]>(this.apiUrl).pipe(
        map(data => this.processStateProvinces(data, country)),
        take(1)
      ).subscribe(stateProvinces => {
        this.regionsState.set(stateProvinces);
      });
    }
  }
  
  private processStateProvinces(data: InstitutionDataInterface[], country: string): string[] {
    return Array.from(new Set(
      data.filter(u => u.country === country).map(u => u['state-province'])
    ));
  }
  
  // getInstitutionDetails(country: string, name: string): {domains:string[], web_pages: string[]} {
  //   return this.http
  //     .get<InstitutionDataInterface[]>(this.apiUrl, { params: { country, name } })
  //     .pipe(
  //       map((data) =>
  //         data.find((item) => item.country === country && item.name === name)
  //       )
  //     );
  // }
  // need to add another drop down of state/province if not null
  // to clean up how many universities are loaded.. over 3000 in usa
  // also can use this info later to display data from uni/college in same state/province as skalar
  // Function to fetch state-provinces based on the selected country


  // // list of institutions from country--> state-province chosen
  // getInstituitonsData(
  //   country: string,
  //   stateProvince?: string
  // ): Observable<InstitutionDataInterface[]> {
  //   const region = stateProvince ? `${country}_${stateProvince}` : country;

  //   if (region === this.selectedCountry && this.cachedInstitutions[region]) {
  //     // Return cached data for the same country and state-province
  //     return of(this.cachedInstitutions[region]);
  //   } else {
  //     return this.http
  //       .get<InstitutionDataInterface[]>(
  //         // this should just filter from the initial cache of this giant json file!
  //         // instead of making entirely new request
  //         `http://localhost:4200/api/countries/${country}${
  //           stateProvince ? `/${stateProvince}` : ''
  //         }` ||
  //           `https://www.skalarly.com/api/countries/${country}${
  //             stateProvince ? `/${stateProvince}` : ''
  //           }`
  //       )
  //       .pipe(
  //         catchError((err) => {
  //           console.error('Error in institution request:', err);
  //           return [];
  //         }),
  //         map((cachedData) => {
  //           // Cache the fetched data for the country
  //           this.cachedInstitutions[region] = cachedData;
  //           this.selectedCountry = region; // Update the selected country
  //           return cachedData;
  //         })
  //       );
  //   }
  // }

}
