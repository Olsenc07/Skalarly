import { Injectable } from '@angular/core';
import { SignUpFormStateService } from 'src/app/assistant-level-code/custom-architecture-aids/services/create-edit-account/signup-form-state.service';

@Injectable({
  providedIn: 'root'
})
export class SaveSignUpGuard {
  constructor(private formStateService: SignUpFormStateService) {}

  canDeactivate(): boolean {
    console.log('guard');
    if (this.formStateService.getUnsavedChanges()) {
      const confirmNavigation = window.confirm(
        'You have not completed creating your account, all progress will be lost. Do you want to continue?'
      );
      return confirmNavigation;
    }
    return true;
  }
}
