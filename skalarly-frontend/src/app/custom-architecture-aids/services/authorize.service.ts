import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {
  private isAuthenticated = false;
  private userId: string | undefined;
  getUserId(): string | undefined {
    return this.userId;
  }

  constructor(private http: HttpClient) {
    this.http = http;
  }

  // check authorization
  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  // Login
  login(email: string, password: string, stayLoggedIn: boolean): any {
    const authData: AuthData = { email, password, stayLoggedIn };
    console.log('stayLoggedIn', stayLoggedIn);
    const sub = this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        'https://www.skalarly.com/api/user/login',
        authData
      )
      .subscribe({
        next: (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            this.router.navigate(['/search']);
            this.snackBar.open('Welcome Fellow Skalar🎓', '', {
              duration: 3000,
            });
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener$.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration);

            this.saveAuthData(token, expirationDate, this.userId);
            sub.unsubscribe();
            console.log('love you 78');
          }
        },
        error: (error) => {
          this.authStatusListener$.next(false);
          // this.snackBar.open('Failed to login, please try again', 'Will do!!', {
          //     duration: 4000
          // });
        },
      });
  }

  // search email
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
