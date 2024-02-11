import type {
  InitialAccountInterface,
} from '../interfaces/skalars-info-interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, of, switchMap } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { InstitutionInfoService } from './create-edit-account/institution-info.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  private apiUrl = environment.apiUrl;
  headers: HttpHeaders;
  private newAccountEmail: string | null = null;
  username: string | undefined;
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    protected institutionInfoService: InstitutionInfoService,
    private router: Router
  ) { 
    this.headers = new HttpHeaders({
    'X-Current-Route': this.router.url 
  });}
  //   make sure username and email aren't used yet
  uniqueEmail(email: string): Observable<boolean> {
    const queryParams: HttpParams = new HttpParams({ fromString: email });
    return this.http.get<boolean>(
      // set up mock server to serve local host requests?
      this.apiUrl + '/accountManagement/emailValidation',
      {
        headers: this.headers,
        params: queryParams
       }
    );
  }
  uniqueUserName(username: string): Observable<boolean> {
    console.log('username',username)
    const queryParams: HttpParams = new HttpParams({ fromString: username });
    return this.http.get<boolean>(
      this.apiUrl + '/accountManagement/uniqueUserName', 
      {
        headers: this.headers,
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
        this.apiUrl + '/accountManagement/createAccount', 
        {
          headers: this.headers,
          params: queryParams
         }
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
      this.apiUrl + '/accountManagement/validateEmail', 
      {
        headers: this.headers,
        params: queryParams
       }
    );
  }
  addSkalarInfo(infoForm: FormGroup): Observable<boolean> {
    const queryParams: HttpParams = new HttpParams({
      fromObject: { ...infoForm.value, username: this.username }
    });
    // i wamnt to pass the values in the form group as well as the username that was saved from create Account function
    return this.http
      .post<InitialAccountInterface>(
        this.apiUrl + '/accountManagement/createAccount', 
        {
          headers: this.headers,
          params: queryParams
         }
      )
      .pipe(
        map((data: InitialAccountInterface) => {
          // Save the username when the account is created successfully
          if (data) {
            // Do something with the 'data' if needed
            this.newAccountEmail = data.email;
            return true;
          } else {
            return false;
          }
        })
      );
  }
  //may not need this if i just cache email, username and password and
  // not actually create then in db
  clearData(): void {
    const messageWithIcon = `
    <span>
      All data has been cleared
    <i class="fa-regular fa-circle-check"></i> 
    </span>`;
    const deleteUrl =
      this.apiUrl + '/accountManagement/deleteUncompletedSignUp'

    if (typeof this.newAccountEmail === 'string') {
      // Assuming newAccount$ contains the necessary data for the request
      this.http
        .delete(deleteUrl, {
          body: { email: this.newAccountEmail},
            headers: this.headers
          })
        .subscribe(() => {
          // handle success
          this.snackBar.open(messageWithIcon, '', {
            duration: 3000,
            panelClass: ['snackbar-cleared-icon'] // add styling
          });
        });
    } else {
      console.warn('newAccount$ is null or undefined');
      // account wasn't made correctly so didn't have to delete it
      // have popup saying account data has been cleared
      this.snackBar.open(messageWithIcon, '', {
        duration: 3000,
        panelClass: ['snackbar-cleared-icon'] // add styling
      });
    }
  }
}
