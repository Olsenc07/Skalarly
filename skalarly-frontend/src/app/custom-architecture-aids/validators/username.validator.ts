// check for unique username/email
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { AccountManagementService } from '../services/account-management.service';

// Define a regular expression pattern for the username
const usernamePattern = /^[a-zA-Z0-9_]+$/; // Allows letters (both cases), numbers, and underscores

// Custom validator function
export function usernameValidator(
  accountManagementService: AccountManagementService
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const username = control.value;
    // Check if the username matches the pattern
    if (!usernamePattern.test(username)) {
      const uniqueSub: Subscription = accountManagementService
        .uniqueUserName(username)
        .pipe(take(1))
        .subscribe((isUnique: boolean) => {
          const unique: boolean = isUnique;
          if (unique) {
            control.setErrors({ uniqueUsernNameError: true });
          } else {
            control.setErrors({ uniqueUsernNameError: false });
          }
        });
      control.valueChanges
        .pipe(take(1))
        .subscribe(() => uniqueSub.unsubscribe());
    } else {
      control.setErrors({ patternUsernNameError: true });
    }
    return null;
  };
}


// look at hat gdp,may not nened to sub