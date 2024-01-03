import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
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
  private countriesState = signal<string[]>(['Canada', 'United States']);
  private regionsState = signal<string[]>(['']);
  private typesOfInstitution = signal<string[]>(['']);
  private institutionName = signal<string[]>(['']);
  private currentType = signal<string>('countriesState');

  private choices = signal({
    countriesState: this.countriesState,
    regionsState: this.regionsState,
    institutionName: this.institutionName,
    typesOfInstitution: this.typesOfInstitution,
  });

  // Define a computed property
  symbol = computed<string[]>(() => {
    const selectedType = this.currentType(); 
    const choice = this.choices(); 

    switch (selectedType) {
      case 'countriesState':
        return choice.countriesState();
      case 'regionsState':
        return choice.regionsState();
      case 'institutionName':
        return choice.institutionName();
      case 'typesOfInstitution':
        return choice.typesOfInstitution();
      default:
        return [];
    }

  });

  setCurrentType(type: string) {
    console.log('primarily', type);
    this.currentType.set(type);
  }

  constructor(private http: HttpClient) {}

  getSignalData(type: string): Signal<string[]> {
    switch (type) {
      case 'countries':
        return this.countriesState.asReadonly();
      case 'regions':
        return this.regionsState.asReadonly();
      case 'typesOfInstitutions':
        return this.typesOfInstitution.asReadonly();
      case 'institutions':
        return this.institutionName.asReadonly();
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  }

  getCountries(): void {
    // Directly set the array of countries
    const countryNames = ['Canada', 'United States'];
    this.countriesState.set(countryNames);
  }
  
  // If canada use db, or else use api 
  getStateProvinces(country: string): void {
    console.log('api', this.apiUrl);
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
            this.currentType.set('regionsState');
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
      this.currentType.set('regionsState');
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
            this.currentType.set('typesOfInstitution');
          },
          error: (error) => console.error('Error fetching school data:', error)
        });
    } else {
      this.cacheSchoolData.get(cacheKey)?.subscribe(schoolData => {
        this.typesOfInstitution.set(this.extractSchoolTypes());
        this.currentType.set('typesOfInstitution');
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
            this.currentType.set('institutionName');
          },
          error: (error) => console.error('Error fetching school data:', error)
        });
    } else {
      this.cacheSchoolNames.get(cacheKey)?.subscribe(schoolNames => {
        this.institutionName.set(schoolNames);
        this.currentType.set('institutionName');
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