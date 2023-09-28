import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Router } from '@angular/router';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService implements OnDestroy {
  // Subjects
  private tokenSubject$: BehaviorSubject<string | null> = new BehaviorSubject<
  string | null
  >(null);
  private userIdSubject$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  private authStatusSubject$: BehaviorSubject<boolean | null> = new BehaviorSubject<
  boolean | null
  >(null);
  // Observables 
  token$: Observable<string | null> = this.tokenSubject$.pipe(shareReplay(1));
  userId$: Observable<string | null> = this.userIdSubject$.pipe(shareReplay(1));
  isAuthenticated$: Observable<boolean | null> = this.authStatusSubject$.pipe(shareReplay(1));

  // path of url
  private currentRoute: string = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
 
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
  // Login
  login(email: string, password: string, stayLoggedIn?: boolean): boolean {
    const authData: any = { email, password, stayLoggedIn };
    console.log('stayLoggedIn', stayLoggedIn);
    return this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        'https://www.skalarly.com/api/user/login',
        authData
      )
      .subscribe({
        next: (response) => {
          if(response.token){
          this.tokenSubject$.next(response.token);
          this.userIdSubject$.next(response.userId)
          this.authStatusSubject$.next(true);

            
          //  look over and add clean up for subjects and obs

            this.setAuthTimer(response.expiresIn);
            const expirationDate = new Date(new Date().getTime() + response.expiresIn);
            this.saveAuthData(response.token, expirationDate, response.userId);
            // last step
            this.router.navigate(['/search']);
            this.snackBar.open('Welcome Fellow Skalar🎓', '', {
              duration: 3000
          }
        }
        },
        error: (error) => {
          this.tokenSubject$.next(null);
          this.userIdSubject$.next(null)
          this.authStatusSubject$.next(false);
          // this.snackBar.open('Failed to login, please try again', 'Will do!!', {
          //     duration: 4000
          // });
        }
      });
  }

  // Should have a warning when 30s left to have the reauth popup displayed
  // as a dialogRef    private dialogRef: MatDialogRef<ReAuthorizeComponent> in app.compon in old
  private setAuthTimer(duration: number): void {
      setTimeout(() => {
      // give option to increase duration time
      // using pop screen reauthorize
      console.log('timeout');
      this.triggerReAuth$.next('reAuth');
      // this.logout();
    }, duration);
  }

  // access
  // needs to be triggered whenever one of these values change
  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string
  ): void {
    // should hash or encrpyt when soring and retrieving
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }
  public getAuthData(): any {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (expirationDate === '0') {
      this.logout();
      this.snackBar.open('Validation Expired', 'Please Relogin', {
        duration: 3000,
      });
    } else {
      if (!token || !expirationDate) {
        this.logout();
        this.snackBar.open('Welcome To Skalarly 🎓', '', {
          duration: 3000,
        });
      }
      return {
        token,
        expirationDate: new Date(expirationDate),
        userId,
      };
    }
  }
// access removal
private clearAuthData(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('userId');
}

// clean up
logout(): void {
  this.currentRoute = document.URL;
  console.log('current url', this.currentRoute);
  if (
    this.currentRoute !== 'http://localhost:4200/login' &&
    this.currentRoute !== 'https://www.skalarly.com/login'
  ) {
    this.router.navigate(['/login']);
  }
  this.tokenSubject.next(null);
  this.isAuthenticated = false;
  this.authStatusListener$.next(false);
  this.authStatusListener$.complete();
  this.userId = null;
  // change activity status to false

  // clear local storage
  this.clearAuthData();
}

ngOnDestroy() {
  this.authStatusListener$.complete();
  this.destroy$.next();
  this.destroy$.complete();
}
 
}
