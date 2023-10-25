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
      // add alum/alumni after @ for each domain
      // example @alum.utoronto.ca
      if (domains) {
       
        const domainMatches = domains.some((domain) => email.endsWith(domain));
        if (!domainMatches) {
        const index: number = email.indexOf('@');
          if (index !== -1) {
            const localPart = email.slice(0, index);
            const domainPart = email.slice(index + 1);
          }
        //  only wanna dd this test if the input email is somewhat close to this domain without alum
           const newDomainPart = `alum.${domain}`;
          //  const new2DomainPart = `alumni.${domain}`; test this to and then condense
          // code with regex to get any pattern from alum to alumni

          //  then ree match the input to this

          const alumDomainMatches = domains.some((newDomainPart) => email.endsWith(newDomainPart));
          if( !alumDomainMatches){
            return of({ patternEmailError: true });
          }
        }
      // const newDomainPart = `alum.${domainPart}`;
      
      // Reconstruct the modified email address
      // const modifiedEmail = `${localPart}@${newDomainPart}`;
        // and if still no mactehs then

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
    // Default return value for control
    return of(null);
  };
}
