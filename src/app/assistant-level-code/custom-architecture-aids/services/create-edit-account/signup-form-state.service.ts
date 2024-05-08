import { Injectable } from '@angular/core';

// Shared service to manage the sign-up form state
@Injectable({ providedIn: 'root' })
export class SignUpFormStateService {
  private hasUnsavedChanges: boolean = false;
  setUnsavedChanges(state: boolean): void {
    console.log('check 1?', state);
    this.hasUnsavedChanges = state;
  }

  // Method to check form state
  getUnsavedChanges(): boolean {
    console.log('unsaved?', this.hasUnsavedChanges);
    return this.hasUnsavedChanges;
  }
}
