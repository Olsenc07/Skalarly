import { Injectable, computed, signal } from '@angular/core';
import { map, shareReplay, take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InstitutionInfoService {
  private apiUrl: string = environment.apiUrl;
  headers: HttpHeaders;
  private cacheSchoolCountry: Map<string, string> = new Map();
  private cacheSchoolNames: Map<string, string[]> = new Map();
  private cacheSchoolEmails: Map<string, string[]> = new Map();

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

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.headers = new HttpHeaders({
      'X-Current-Route': this.router.url
    });
  }

  getCountries(): void {
    const countryNames = ['Canada', 'United States'];
    this.countriesState.set(countryNames);
  }

  // If canada use db, or else use api
  getStateProvinces(country: string): void {
    const cacheKey = `country-${country}`;
    if (country === 'Canada' && !this.cacheSchoolCountry.has(cacheKey)) {
      console.log('this.apiUrl', this.apiUrl);
      this.http
        .get<{ data: string[]; message: string }>(
          `${this.apiUrl}/canada/province?country=${country}`,
          { headers: this.headers }
        )
        .pipe(
          take(1),
          shareReplay(1),
          map((response) => response.data)
        )
        .subscribe({
          next: (provinceNames) => {
            const provinces: string[] = provinceNames;
            console.log('s', provinces);
            this.regionsState.set(provinces);
          },
          error: (error) => console.error('Error fetching provinces:', error)
        });
    } else if (country === 'United States') {
      // Simulate an API call for US states with mock data
      const mockUSStates: string[] = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
      ];
      this.regionsState.set(mockUSStates);
    }
  }

  getSchoolTypes(): void {
    this.typesOfInstitution.set(this.extractSchoolTypes());
  }
  extractSchoolTypes(): string[] {
    return ['University', 'College', 'Technical', 'Theological'];
  }

  getSchoolNames(region: string, type: string): void {
    const cacheKey = `names-${region}-${type}`;
    console.log('wake up', this.apiUrl);

    if (!this.cacheSchoolNames.has(cacheKey)) {
      this.http
        .get<string[]>(
          `${this.apiUrl}/canada/names?country=Canada&province=${region}&type=${type}`,
          { headers: this.headers }
        )
        .pipe(take(1), shareReplay(1))
        .subscribe({
          next: (names) => {
            this.cacheSchoolNames.set(cacheKey, names);
            this.institutionName.set(names);
          },
          error: (error) => {
            console.error('Error fetching emails:', error);
          }
        });
    } else {
      this.cacheSchoolNames.get(cacheKey);
    }
  }

  getSchoolEmails(region: string, type: string, names: string): void {
    const cacheKey = `emails-${region}-${type}-${names}`;
    if (!this.cacheSchoolEmails.has(cacheKey)) {
      this.http
        .get<any>(
          `${this.apiUrl}/canada/emails?country=Canada&province=${region}&type=${type}&name=${names}`,
          { headers: this.headers }
        )
        .pipe(take(1), shareReplay(1))
        .subscribe({
          next: (emails) => {
            console.log('eeeee', emails);
            this.cacheSchoolEmails.set(cacheKey, emails);
            this.institutionEmails.set(emails);
          },
          error: (error) => {
            console.error('Error fetching emails:', error);
          }
        });
    } else {
      this.cacheSchoolEmails.get(cacheKey);
    }
  }
}
