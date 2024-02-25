import { AuthorizeService } from 'src/app/assistant-level-code/custom-architecture-aids/services/authorize.service';
import { GlobalDataService } from 'src/app/assistant-level-code/custom-architecture-aids/services/global-data.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { ErrorHandlerComponent } from 'src/app/assistant-level-code/child-reusable-options/error-handler/error-handler.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthorizeService,
    private dialog: MatDialog,
    private globalService: GlobalDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  canActivate: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const isAuth: boolean = this.authService.getIsAuth();
    if (!isAuth) {
      this.authService.redirectUrl = state.url;
      const dialogRef = this.dialog.open(ErrorHandlerComponent);
      dialogRef.afterClosed().subscribe(() => {
        const snackBarRef = this.snackBar.open(
          "Skalarly requries an account to access it's content.",
          "Create an account to see what you'r missing.",
          {
            duration: 3500
          }
        );
      });
      const blocked: boolean = this.globalService.getBlockedValue();
      if (blocked) {
        this.snackBar.open('This Skalar has blocked you', '', {
          duration: 3000
        });
        return false;
      } else {
        return isAuth;
      }
    } else {
      return true;
    }
  };
}
