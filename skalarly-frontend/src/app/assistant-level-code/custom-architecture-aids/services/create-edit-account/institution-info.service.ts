import { Injectable, Signal, signal } from '@angular/core';
import { Observable, map, of, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InstitutionDataInterface } from '../../interfaces/institution-interface';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInfoService {
  private apiUrl = 'https://www.skalarly.com/api'; // grabs all data once
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
    // Directly set the array of countries
    const countryNames = ['Canada', 'United States'];
    this.countriesState.set(countryNames);
  }
  // If canada use db, or else use api 
  getStateProvinces(country: string): void {
    if (country === 'Canada') {
      // Fetch Canadian provinces from the database
      this.http.get<string[]>(this.apiUrl + '/province').pipe(
        take(1)
      ).subscribe(provinceNames => {
        this.regionsState.set(provinceNames);
      });
    } else if (country === 'United States') {
      // Simulate an API call for US states with mock data
      const mockUSStates: string[] = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas',
        'California', 'Colorado', 'Connecticut', 'Delaware',
        'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas',
        'Kentucky', 'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
        'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah',
        'Vermont', 'Virginia', 'Washington', 'West Virginia',
        'Wisconsin', 'Wyoming'
    ];
    
      this.regionsState.set(mockUSStates);
    }
  }
  
// get list of specific schools
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