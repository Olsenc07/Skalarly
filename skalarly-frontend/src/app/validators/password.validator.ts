import { AbstractControl, ValidatorFn } from '@angular/forms';

// Custom password validator function
export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) {
      // Return null if the control value is empty (e.g., the user hasn't entered a password)
      return null;
    }

    // Define password validation rules here
    const passwordRegex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
    // have a nice display of when these condtions are met
    //  should just be for signup
    if (!passwordRegex.test(control.value)) {
      // Password does not meet the criteria
      return { invalidPassword: true };
    }

    // Password meets the criteria
    return null;
  };
}
