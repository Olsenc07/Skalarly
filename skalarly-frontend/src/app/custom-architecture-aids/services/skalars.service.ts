import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkalarsService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  getSkalars(input: string): Observable<any> {
    const queryParams: HttpParams = new HttpParams({ fromString: input });
    return this.http.get<boolean>(
      // set up mock server to serve local host requests?
      'http://localhost:4200' ||
        'https://www.skalarly.com/api/skalars/skalarsFound',
      {
        params: queryParams
      }
    );
  }
}
