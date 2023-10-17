import { AuthorizeService } from 'src/app/custom-architecture-aids/services/authorize.service';
import { GlobalDataService } from 'src/app/custom-architecture-aids/services/global-data.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthorizeService,
    private globalService: GlobalDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  canActivate(): boolean {
    const isAuth: boolean = this.authService.getIsAuth();
    let hasNavigated: boolean = false;
    if (!isAuth) {
      const snackBarRef = this.snackBar.open(
        "Skalarly requries an account to access it/'s content.",
        "Create an account to see what you/'r missing.",
        {
          duration: 2500
        }
      );
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/sign-up']);
        hasNavigated = true;
      });
      snackBarRef.afterDismissed().subscribe(() => {
        if (!hasNavigated) {
          const currentURL = window.location.href;
          if (
            currentURL !== 'https://www.skalarly.com/login' &&
            currentURL !== 'http://localhost:4200/login'
          ) {
            this.router.navigate(['/login']);
          }
        }
      });
    }
    const blocked: boolean = this.globalService.getBlockedValue();
    if (blocked) {
      this.snackBar.open('This Skalar has blocked you', '', {
        duration: 3000
      });
      return false;
    } else {
      return isAuth;
    }
  }
}
