import { Injectable, Signal, signal } from '@angular/core';
import { Observable, map, of, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InstitutionDataInterface } from '../../interfaces/institution-interface';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInfoService {
  private apiUrl = 'https://www.skalarly.com/api' || 'http://localhost:4200/api'; 
  // cache
  private cache: { [key: string]: string[] } = {};
  private countriesState = signal<string[]>(['']);
  private regionsState = signal<string[]>([]);
  private typesOfInstitution = signal<string[]>([]);
  private institutionName = signal<string[]>([]);

  // defalt value canada or usa
  get countries(): Signal<string[]> {
    return this.countriesState.asReadonly();
  }
  get regions(): Signal<string[]> {
    return this.regionsState.asReadonly();
  }
  get typesOfInstitutions(): Signal<string[]> {
    return this.typesOfInstitution.asReadonly();
  }
  get institutions(): Signal<string[]> {
    return this.institutionName.asReadonly();
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
getSchoolTypes(region: string): void {
  const cacheKey = `${region}`;
  if (this.cache[cacheKey]) {
    this.typesOfInstitution.set(this.cache[cacheKey]);
  } else {
    this.http.get<string[]>(`${this.apiUrl}/schoolType?province=${region}`)
      .pipe(take(1))
      .subscribe({
        next: (types) => {
          this.cache[cacheKey] = types;
          this.typesOfInstitution.set(types);
        },
        error: (error) => console.error('Error fetching school types:', error)
      });
  }
}

getSchoolNames(region: string, schoolType: string): void {
  const cacheKey = `${region}-${schoolType}`;
  if (this.cache[cacheKey]) {
    this.institutionName.set(this.cache[cacheKey]);
  } else {
    this.http.get<string[]>(`${this.apiUrl}/schoolName?province=${region}&schoolType=${schoolType}`)
      .pipe(take(1))
      .subscribe({
        next: (schools) => {
          this.cache[cacheKey] = schools;
          this.institutionName.set(schools);
        },
        error: (error) => console.error('Error fetching school names:', error)
      });
  }
}
getSchoolNamesEmails(institution: string): string[] {
  if (!this.apiSource) return [];
  const institutionData = this.apiSource.find(inst => inst.name === institution);
  return institutionData ? institutionData.emailExtensions : [];
}
  
}