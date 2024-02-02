import { Injectable, Signal, computed, signal } from '@angular/core';
import { ReplaySubject, map, shareReplay, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { ProvinceSchoolTypes, basicinfo } from '../../interfaces/basic-province-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInfoService {
  private apiUrl: string = environment.apiUrl;
  private cacheSchoolData: Map<string, ReplaySubject<basicinfo[] | string[]>> = new Map();
  private countriesState = signal<string[]>(['Canada', 'United States']);
  private regionsState = signal<string[]>(['']);
  private typesOfInstitution = signal<string[]>(['']);
  private institutionName = signal<string[]>(['']);
  private institutionEmails = signal<string[]>(['']);


  countries = computed<string[]>(() => this.countriesState());
  region = computed<string[]>(() => this.regionsState());
  typesOfInst = computed<string[]>(() => this.typesOfInstitution());
  instName = computed<string[]>(() => this.institutionName());
  instEmails = computed<string[]>(() => this.institutionEmails());


  constructor(private http: HttpClient) {}

  getCountries(): void {
    const countryNames = ['Canada', 'United States'];
    this.countriesState.set(countryNames);
  }
  
  // If canada use db, or else use api 
  getStateProvinces(country: string): void {
  // Check if the country is 'Canada' and if the data is already cached
  if (country === 'Canada' ) {
    // If not cached, create a new ReplaySubject for caching and fetch the data
    console.log('country', country);
      this.http.get<{data: string[]; message: string}>(`${this.apiUrl}/canada/province?country=${country}`)
        .pipe(
          take(1),
         map(response => response.data)
         )
        .subscribe({
          next: (provinceNames) => {
            const provinces: string[] = provinceNames;
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
    const cacheKey = `schools-${region}-${type}`;

    if (!this.cacheSchoolData.has(cacheKey)) {
      const schoolTypes$ = new ReplaySubject<basicinfo[] | string[]>(1);
      this.cacheSchoolData.set(cacheKey, schoolTypes$);
      this.http.get<basicinfo[]>(`${this.apiUrl}/canada/schoolTypes?country=Canada&province=${region}&type=${type}`)
        .pipe(take(1))
        .subscribe({
          next: (schoolData) => {
            schoolTypes$.next(schoolData);
            const schoolNames = schoolData.map(school => school.name);
          this.institutionName.set(schoolNames);
          },
          error: (error) => console.error('Error fetching school data:', error)
        });
    } else {
      this.cacheSchoolData.get(cacheKey)?.subscribe(schoolData => {
        this.institutionName.set(this.extractSchoolTypes());
      });
    }
  }
   extractSchoolTypes(): string[] {
    return ['University', 'College', 'Technical Institute', 'Theological School'];
  }
  
  
  getSchoolNamesEmails(region: string, type: string, institution: string): void {
    const cacheKey = `emails-${region}-${type}-${institution}`;

    if (!this.cacheSchoolData.has(cacheKey)) {
      const emails$ = new ReplaySubject<basicinfo[] | string[]>(1);
      this.cacheSchoolData.set(cacheKey, emails$);
      this.http.get<string[]>(`${this.apiUrl}
      /canada/schoolTypes?country=Canada&province=${region}&type=${type}&name=${institution}`)
      .pipe(  take(1),
      shareReplay(1) 
    )
      .subscribe({
        next: (emails) => {
          console.log('emails', emails)
          emails$.next(emails);
      this.institutionEmails.set(emails);
        },
        error: (error) => {
          console.error('Error fetching emails:', error);
        }
    });
  } else {
    this.cacheSchoolData.get(cacheKey)?.asObservable().subscribe(this.institutionEmails);
  }
}
  
}