import type {
  AccountCredentials,
  InitialAccountInterface,
  SkalarInfoInterface
} from '../interfaces/skalars-info-interface';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReauthorizeComponent } from '../reauthorize/reauthorize.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  private newAccount$: Observable<InitialAccountInterface> | null = null;
  username: string | undefined;
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
    );
  }

  createAccount(signUpForm: FormGroup): Observable<boolean> {
    const queryParams: HttpParams = new HttpParams({
      fromObject: signUpForm.value
    });
    return this.http
      .post<InitialAccountInterface>(
        'http://localhost:4200/api/accountManagement/createAccount' ||
          'https://www.skalarly.com/api/accountManagement/createAccount',
        queryParams
      )
      .pipe(
        switchMap((data: InitialAccountInterface) => {
          // Save the username when the account is created successfully
          if (data) {
            this.username = signUpForm.get('username')?.value;
            return of(true);
          } else {
            return of(false);
          }
        })
      );
  }
  validateAccount(code: string): Observable<boolean> {
    // matches a seven digit code sent to email
    const queryParams: HttpParams = new HttpParams({ fromString: code });
    return this.http.get<boolean>(
      'http://localhost:4200/api/accountManagement/validateEmail' ||
        'https://www.skalarly.com/api/accountManagement/validateEmail',
      {
        params: queryParams
      }
    );
  }
  addSkalarInfo(infoForm: FormGroup): Observable<boolean> {
    const queryParams: HttpParams = new HttpParams({
      fromObject: { ...infoForm.value, username: this.username }
    });
    // i wamnt to pass the values in the form group as well as the username that was saved from create Account function
    this.newAccount$ = this.http
      .post<InitialAccountInterface>(
        'http://localhost:4200/api/accountManagement/createAccount' ||
          'https://www.skalarly.com/api/accountManagement/createAccount',
        queryParams
      )
      .pipe(
        map((data: InitialAccountInterface) => {
          // Save the username when the account is created successfully
   
            return data;
          }
        })
      return of(true)
  }
  //may not need this if i just cache email, username and password and
  // not actually create then in db
  clearData(): void {
    const deleteUrl =
      'http://localhost:4200/api/accountManagement/deleteUncompletedSignUp' ||
      'https://www.skalarly.com/api/accountManagement/deleteUncompletedSignUp';

    if (this.newAccount$) {
      this.newAccount$.subscribe((data: InitialAccountInterface) => {
        // Assuming newAccount$ contains the necessary data for the request
        this.http
          .delete(deleteUrl, {
            body: { email: data } // Provide the payload here
          })
          .subscribe(() => {
            // handle success
          });
      });
    } else {
      console.warn('newAccount$ is null or undefined');
    }
  }
}
