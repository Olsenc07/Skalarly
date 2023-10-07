// check for unique username/email
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Define a regular expression pattern for the username
const usernamePattern = /^[a-zA-Z0-9_]+$/; // Allows letters (both cases), numbers, and underscores

// Custom validator function
export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const username = control.value;

    // Check if the username matches the pattern
    // and test if this has been used after pattern match
    if (!usernamePattern.test(username)) {
      // Return an error object if the pattern is not matched
      return { usernamePattern: true };
    }

    // Return null if the pattern is matched (no errors)
    return null;
  };
}
