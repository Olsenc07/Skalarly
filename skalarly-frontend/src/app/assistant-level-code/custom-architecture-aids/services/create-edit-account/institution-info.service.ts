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
  private institutionsState = signal<string[]>([]);

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
        map(data => data.filter(item => item.country === 'Canada' || item.country === 'United States')),
        tap(data => this.apiSource = data), // Cache the filtered data
        take(1)
      ).subscribe(filteredData => {
        const countryNames = Array.from(new Set(filteredData.map(item => item.country))); // Extract unique country names
        this.countriesState.set(countryNames);
      });
    } else {
         // Set countries from the cached data
         const countryNames = Array.from(new Set(this.apiSource.map(item => item.country)));
    this.countriesState.set(countryNames);
    }
  }
  getStateProvinces(country: string): void {
    if (!this.apiSource) {
      this.http.get<InstitutionDataInterface[]>(this.apiUrl).pipe(
        map(data => this.processStateProvinces(data, country)),
        take(1)
      ).subscribe(stateProvinces => {
        this.regionsState.set(stateProvinces);
      });
    } else {
      const stateProvinces = this.processStateProvinces(this.apiSource, country);
      this.regionsState.set(stateProvinces);
    }
  }
  private processStateProvinces(data: InstitutionDataInterface[], country: string): string[] {
    return Array.from(new Set(
      data.filter(u => u.country === country).map(u => u['state-province'])
    ));
  }
  getInstitutionDetails(region: string): void {
    if (!this.apiSource) {
      this.http.get<InstitutionDataInterface[]>(this.apiUrl)
        .pipe(
          tap(data => this.apiSource = data), // Cache the full fetched data
          take(1),
          map(data => data
            .filter(institution => institution['state-province'] === region)
            .map(institution => institution.name)
          )
        ).subscribe(institutions => {
          this.institutionsState.set(institutions);
        });
    } else {
      // Filter the cached data based on the region
      const institutions = this.apiSource
        .filter(institution => institution['state-province'] === region)
        .map(institution => institution.name);
      this.institutionsState.set(institutions);
    }
  }
  
  getInstitutionWebPages(institutionName: string): string[] {
    if (!this.apiSource) {
      return []; // Return empty if no data is cached
    } else {
    const institution = this.apiSource.find(inst => inst.name === institutionName);
    return institution ? institution.web_pages : [];
    }
  }
  
}