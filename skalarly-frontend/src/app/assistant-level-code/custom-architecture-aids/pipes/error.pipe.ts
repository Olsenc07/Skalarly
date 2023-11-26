import { Pipe, PipeTransform } from '@angular/core';
type ErrorMessages = {
  required: string;
  uniqueUserNameError: string;
  patternUserNameError: string;
  uniqueEmailError: string;
  patternEmailError: string;
};
@Pipe({ name: 'errorPipe', standalone: true })
export class ErrorPipe implements PipeTransform {
  transform(value: string | null): string {
    if (value === null) {
      return ''; // Or any default message you see fit
    } else {
      const errorMessages: ErrorMessages = {
        required: 'This field is required.',
        uniqueUserNameError: 'Username is already in use. Please try another.',
        patternUserNameError:
          'Only letters, numbers, and underscores are allowed.',
        uniqueEmailError: 'Email is already in use. Please try another.',
        patternEmailError:
          'This email does not match the format of the institution you have chosen.'
      };
      return errorMessages[value as keyof ErrorMessages] || 'Invalid field.';
    }
  }
}
