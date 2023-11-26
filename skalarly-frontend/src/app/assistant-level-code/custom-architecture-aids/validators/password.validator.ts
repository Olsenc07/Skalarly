import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
// Define password validation rules here
const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
// Custom password validator function
export function passwordValidator(): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{ [key: string]: boolean } | null> => {
    return control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((value) => {
        if (!value) {
          return null;
        }
        if (!passwordRegex.test(control.value)) {
          return { invalidPassword: true };
        }
        // Password meets the criteria
        return null;
      })
    );
  };
}
