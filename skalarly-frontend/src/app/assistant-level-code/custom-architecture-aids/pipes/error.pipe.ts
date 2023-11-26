import { Pipe, PipeTransform } from '@angular/core';
type ErrorMessages = {
  required: string;
  uniqueUserNameError: string;
  patternUserNameError: string;
  uniqueEmailError: string;
  patternEmailError: string;
  [key: string]: string; // allows indexing with any string key
};
@Pipe({ name: 'errorPipe' })
export class ErrorPipe implements PipeTransform {
  transform(value: string): string {
    const errorMessages: ErrorMessages = {
      required: 'This field is required.',
      uniqueUserNameError: 'Username is already in use. Please try another.',
      patternUserNameError:
        'Only letters, numbers, and underscores are allowed.',
      uniqueEmailError: 'Email is already in use. Please try another.',
      patternEmailError:
        'This email does not match the format of the institute you have chosen.'
      // Add other error messages here
    };
    return errorMessages[value] || 'Invalid field.';
  }
}
