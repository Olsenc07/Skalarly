import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { Observable, map, of, take } from 'rxjs';
import { AccountManagementService } from '../services/account-management.service';

// Define a regular expression pattern for the username
const usernamePattern: RegExp = /^[a-zA-Z0-9_]+$/; // Allows letters (both cases), numbers, and underscores

// Custom validator function
export function emailUsernameValidator(
  accountManagementService: AccountManagementService,
  isUserName: boolean,
  domains?: string[]
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (isUserName) {
      const username = control.value;
      // Check if the username matches the pattern
      if (!usernamePattern.test(username)) {
        return accountManagementService.uniqueUserName(username).pipe(
          take(1),
          map((isUnique: boolean) => {
            if (isUnique) {
              return null;
            } else {
              return { uniqueUsernNameError: true };
            }
          })
        );
      } else {
        return of({ patternUsernNameError: true });
      }
    } else {
      // match email pattern options for school chosen
      const email = control.value;
      // Check email domains if provided
      if (domains) {
        const domainMatches = domains.some((domain) => email.endsWith(domain));
        if (!domainMatches) {
          return of({ patternEmailError: true });
        }

        return accountManagementService.uniqueEmail(email).pipe(
          take(1),
          map((isUnique: boolean) => {
            if (isUnique) {
              return null;
            } else {
              return { uniqueEmailError: true };
            }
          })
        );
      }
    }
  };
}
