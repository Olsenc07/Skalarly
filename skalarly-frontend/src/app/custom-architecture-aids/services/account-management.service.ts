import type {
  AccountCredentials,
  SkalarInfoInterface
} from '../interfaces/skalars-info-interface';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReauthorizeComponent } from '../reauthorize/reauthorize.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  private newAccount$: Observable<string> | null = null;
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  //   make sure username and email aren't used yet
  uniqueEmail(email: string): Observable<boolean> {
    const queryParams: HttpParams = new HttpParams({ fromString: email });
    return this.http.get<boolean>(
      // set up mock server to serve local host requests?
      'http://localhost:4200/api/accountManagement/emailValidation' ||
        'https://www.skalarly.com/api/account-management/emailValidation',
      {
        params: queryParams
      }
    );
  }
  uniqueUserName(username: string): Observable<boolean> {
    const queryParams: HttpParams = new HttpParams({ fromString: username });
    return this.http.get<boolean>(
      'http://localhost:4200/api/accountManagement/uniqueUserName' ||
        'https://www.skalarly.com/api/accountManagement/uniqueUserName',
      {
        params: queryParams
      }
    )
  }
//    should be the first form control group of username, email, password
  createAccount(): Observable<AccountCredentials> {
    const queryParams: HttpParams = new HttpParams({ fromObject: credentials });
    this.newAccount$ = this.http
      .post<{ username: string; email: string; password: string }>(
        'http://localhost:4200/api/accountManagement/createAccount' ||
        'https://www.skalarly.com/api/accountManagement/createAccount',
        params: queryParams
      )
     .pipe(
        map((data: AccountCredentials) => data.email), shareReplay(1))

  }
  validateAccount(): void {}
  addSkalarInfo(): void {
    // cache any
  }
  //may not need this if i just cache email, username and password and
  // not actually create then in db
  clearData(): void {
    const deleteUrl =
    'http://localhost:4200/api/accountManagement/deleteUncompletedSignUp' ||
    'https://www.skalarly.com/api/accountManagement/deleteUncompletedSignUp';

  if (this.newAccount$) {
    this.newAccount$.subscribe((data: string) => {
      // Assuming newAccount$ contains the necessary data for the request
      this.http
        .delete(deleteUrl, {
          body: { email: data }, // Provide the payload here
        })
    });
  } else {
    console.warn('newAccount$ is null or undefined');
  }
  }
}
