import { Injectable, Signal, computed, signal } from '@angular/core';
import { ReplaySubject, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { ProvinceSchoolTypes, basicinfo } from '../../interfaces/basic-province-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInfoService {
  private apiUrl: string = environment.apiUrl;
  private apiSource: basicinfo | null = null;
  private cacheSchoolData: Map<string, ReplaySubject<ProvinceSchoolTypes>> = new Map();
  private countriesState = signal<string[]>(['Canada', 'United States']);
  private regionsState = signal<string[]>(['']);
  private typesOfInstitution = signal<string[]>(['']);
  private institutionName = signal<string[]>(['']);

  countries = computed<string[]>(() => this.countriesState());
  region = computed<string[]>(() => this.regionsState());
  typesOfInst = computed<string[]>(() => this.typesOfInstitution());
  instName = computed<string[]>(() => this.institutionName());

  constructor(private http: HttpClient) {}

  getCountries(): void {
    const countryNames = ['Canada', 'United States'];
    this.countriesState.set(countryNames);
  }
  
  // If canada use db, or else use api 
  getStateProvinces(country: string): void {
    console.log('api', this.apiUrl);
    if (country === 'Canada') {
    console.log('country', country);
      this.http.get<{data: string[]; message: string}>(`${this.apiUrl}/canada/province?country=${country}`)
        .pipe(
          take(1),
         map(response => response.data)
         )
        .subscribe({
          next: (provinceNames) => {
            const provinces: string[] = provinceNames
            console.log('s', provinces)
            this.regionsState.set(provinces);
          },
          error: (error) => console.error('Error fetching provinces:', error)
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
  
  getSchoolTypes(): void {
        this.typesOfInstitution.set(this.extractSchoolTypes());
  }

  getSpecificSchool(region:string, type: string): void {
    const cacheKey = `${region}-${type}`;
    if (!this.cacheSchoolData.has(cacheKey)) {
      this.cacheSchoolData.set(cacheKey, new ReplaySubject<ProvinceSchoolTypes>(1));
      this.http.get<ProvinceSchoolTypes>(`${this.apiUrl}/canada/schoolTypes?country=Canada&province=${region}&type=${type}`)
        .pipe(take(1))
        .subscribe({
          next: (schoolData) => {

            this.cacheSchoolData.get(cacheKey)?.next(schoolData);
            this.typesOfInstitution.set(this.extractSchoolTypes());
          },
          error: (error) => console.error('Error fetching school data:', error)
        });
    } else {
      this.cacheSchoolData.get(cacheKey)?.subscribe(schoolData => {
        this.typesOfInstitution.set(this.extractSchoolTypes());
      });
    }
  }
   extractSchoolTypes(): string[] {
    return ['University', 'College', 'Technical Institute', 'Theological School'];
  }
  
  
  getSchoolNamesEmails(institution: string): string[] {
    if (!this.apiSource) return [];
    // Check if the name of the apiSource matches the institution
    if (this.apiSource.name === institution) {
      return this.apiSource.emailExtensions;
    }
    return []; 
  }
  
  
}