// could be pulled from a data base of saved emails and use those paterns
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidatorPattern(
  control: AbstractControl
): ValidationErrors | null {
  const email: string = control.value;

  // example of an academic email
  const UOfToronto: RegExp = /^[a-zA-Z0-9._%+-]+@mail.utoronto\.ca/;
  // test pattern
  const Test: boolean = UOfToronto.test(email);
  // once a lot of emails are added, add loop for condition
  if (Test) {
    // make codition to check uniqueness!!

    return null;
  } else {
    // validation failed
    return { incorrectPattern: true };
  }
}
// auto removes white space
export function trimWhiteSpace(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    if (control.value && typeof control.value === 'string') {
      const trimmedValue = control.value.trim();
      // Update the control value with trimmed value
      control.setValue(trimmedValue, { emitEvent: false });
    }
    return null;
  };
}
