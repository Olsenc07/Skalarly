import { Injectable } from '@angular/core';
import { SignUpComponent } from 'src/app/signup/signup.component';

@Injectable()
export class SaveSignUpGuard {
  constructor(private signUpComponent: SignUpComponent) {}
  canDeactivate(): boolean | Promise<boolean> {
    const useGuard: boolean = this.signUpComponent.getRouteGuardStatus();
    if (useGuard) {
      // User has interacted with the form,
      const confirmNavigation = window.confirm(
        "You have not completed creating you'r account, all progress will be lost. Do you want to continue?"
      );
      if (confirmNavigation) {
        // delete any saved values and navigate out
        
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
