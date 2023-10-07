import { AccountManagementService } from 'src/app/custom-architecture-aids/services/account-management.service';
import { Injectable } from '@angular/core';
import { SignUpComponent } from 'src/app/signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class SaveSignUpGuard {
  constructor(
    private signUpComponent: SignUpComponent,
    private accountManagementService: AccountManagementService
  ) {}
  canDeactivate(): boolean | Promise<boolean> {
    const useGuard: boolean = this.signUpComponent.getRouteGuardStatus();
    if (useGuard) {
      // User has interacted with the form,
      const confirmNavigation = window.confirm(
        "You have not completed creating you'r account, all progress will be lost. Do you want to continue?"
      );
      if (confirmNavigation) {
        // delete any saved values and navigate out
        // Delete any saved/cached data
        this.accountManagementService.clearData();
        return true;
      } else {
        return false;
      }
    } else {
      // User hasn't interacted with the form, allow navigation
      return true;
    }
  }
}
