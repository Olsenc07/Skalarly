import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizeService {
  private isAuthenticated = false;
  constructor(private http: HttpClient) {
    this.http = http;
  }

  // check authorization
  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  // login
  login(): boolean {
    return (this.isAuthenticated = true);
  }

  // search email
  searchEmails(email: string): Observable<boolean> {
    const queryParams: HttpParams = new HttpParams({ fromString: email });
    return this.http.get<boolean>(
      'http://localhost:4200/login' ||
        'https://www.skalarly.com/api/authorize/emailValidation',
      {
        params: queryParams
      }
    );
  }
}
