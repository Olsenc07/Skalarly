import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {
  private isAuthenticated = false;
  private userId: string | undefined;
  getUserId(): string | undefined {
    return this.userId;
  }

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.http = http;
    this.snackBar = snackBar;
    this.router = router;
  }

  // check authorization
  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  // If api is going to retrive the same thing us pipe(
  // shareReplay(1) // Cache the latest response
  // but if new search credentials are given then allow api call and cache new
  // could cache users recent search results so dont have to save in data base
  // but still gives a nice ux when on the page for a while
  // like youtube!
  // Login
  login(
    email: string,
    password: string,
    stayLoggedIn?: boolean
  ): boolean {
    const authData: any = { email, password, stayLoggedIn };
    console.log('stayLoggedIn', stayLoggedIn);
    // return this.http
    //   .post<{ token: string; expiresIn: number; userId: string }>(
    //     'https://www.skalarly.com/api/user/login',
    //     authData
    //   )
    // if(login was good)
    // then trigger the caching of token .. and have is laoding reset if failure
        next: (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            this.router.navigate(['/search']);
            this.snackBar.open('Welcome Fellow Skalar🎓', '', {
              duration: 3000
            });
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener$.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration);

            this.saveAuthData(token, expirationDate, this.userId);
          }
        },
        error: (error) => {
          this.authStatusListener$.next(false);
          // this.snackBar.open('Failed to login, please try again', 'Will do!!', {
          //     duration: 4000
          // });
        }
      });
  }

  // save auth data
  private saveAuthData(
    // cahce this token!!
    token: string,
    expirationDate: Date,
    userId: string
  ): any {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  // search email on login
  searchEmails(email: string): Observable<boolean> {
    const queryParams: HttpParams = new HttpParams({ fromString: email });
    return this.http.get<boolean>(
      // set up mock server to serve local host requests?
      'http://localhost:4200/login' ||
        'https://www.skalarly.com/api/authorize/emailValidation',
      {
        params: queryParams
      }
    );
  }
}
