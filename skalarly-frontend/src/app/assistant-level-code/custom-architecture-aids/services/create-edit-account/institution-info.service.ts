import { Injectable, Signal, signal } from '@angular/core';
import { ReplaySubject, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { BasicProvinceInterface, ProvinceSchoolTypes, basicinfo } from '../../interfaces/basic-province-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInfoService {
  private apiUrl = environment.apiUrl;
  // cache
  private apiSource: basicinfo | null = null;
  private cacheSchoolData: Map<string, ReplaySubject<ProvinceSchoolTypes>> = new Map();
  private cacheSchoolNames: Map<string, ReplaySubject<string[]>> = new Map();
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
      this.http.get<BasicProvinceInterface[]>(`${this.apiUrl}/province`)
        .pipe(take(1))
        .subscribe({
          next: (provincesData) => {
            // Extract province names using map and reduce
            const provinceNames = provincesData.reduce<string[]>((acc, curr) => {
              const names = curr.provinces.map(p => p.province);
              return acc.concat(names);
            }, []);
            
            this.regionsState.set(provinceNames);
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
  
  getSchoolTypes(region: string): void {
    const cacheKey = `${region}`;
    if (!this.cacheSchoolData.has(cacheKey)) {
      this.cacheSchoolData.set(cacheKey, new ReplaySubject<ProvinceSchoolTypes>(1));
      this.http.get<ProvinceSchoolTypes>(`${this.apiUrl}/canada/schoolData?province=${region}`)
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
  
  
  getSchoolNames(region: string, schoolType: string): void {
    const cacheKey = `${region}-${schoolType}`;
    if (!this.cacheSchoolNames.has(cacheKey)) {
      this.cacheSchoolNames.set(cacheKey, new ReplaySubject<string[]>(1));
      this.http.get<ProvinceSchoolTypes>(`${this.apiUrl}/canada/schoolData?province=${region}`)
        .pipe(take(1))
        .subscribe({
          next: (schoolData) => {
            const schoolNames = this.extractSchoolNames(schoolData, schoolType);
            this.cacheSchoolNames.get(cacheKey)?.next(schoolNames);
            this.institutionName.set(schoolNames);
          },
          error: (error) => console.error('Error fetching school data:', error)
        });
    } else {
      this.cacheSchoolNames.get(cacheKey)?.subscribe(schoolNames => {
        this.institutionName.set(schoolNames);
      });
    }
  }
  
  
  private extractSchoolNames(schoolData: ProvinceSchoolTypes, schoolType: string): string[] {
    let names: string[] = [];
    switch (schoolType) {
      case 'University':
        names = schoolData.schoolTypes.universities.map(school => school.name);
        break;
      case 'College':
        names = schoolData.schoolTypes.colleges.map(school => school.name);
        break;
      case 'Technical Institute':
        names = schoolData.schoolTypes.technicalInstitutes.map(school => school.name);
        break;
      case 'Theological School':
        names = schoolData.schoolTypes.theologicalSchools.map(school => school.name);
        break;
    }
    return names;
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