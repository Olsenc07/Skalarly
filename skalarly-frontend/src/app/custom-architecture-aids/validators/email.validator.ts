// could be pulled from a data base of saved emails and use those paterns
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noWhiteSpaceValidator(
  control: AbstractControl
): ValidatorFn | null {
  // auto removes white space
  return (control: AbstractControl): { [key: string]: string } | null => {
    if (control.value && typeof control.value === 'string') {
      const trimmedValue = control.value.trim();
      // Update the control value with trimmed value
      control.setValue(trimmedValue, { emitEvent: false });
    }
    return null;
  };
}
