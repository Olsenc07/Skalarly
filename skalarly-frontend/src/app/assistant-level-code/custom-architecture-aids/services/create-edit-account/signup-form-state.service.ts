import { Injectable } from '@angular/core';

// Shared service to manage the sign-up form state
@Injectable({ providedIn: 'root' })
export class SignUpFormStateService {
  private hasUnsavedChanges: boolean = false;
  setUnsavedChanges(state: boolean): void {
    this.hasUnsavedChanges = state;
  }

  // Method to check form state
  getUnsavedChanges(): boolean {
    return this.hasUnsavedChanges;
  }
}
