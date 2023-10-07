import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  emailValidatorPattern,
  trimWhiteSpace
} from '../custom-architecture-aids/validators/email.validator';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { type PassWordInterface } from '../custom-architecture-aids/interfaces/password-interface';
import { passwordValidator } from '../custom-architecture-aids/validators/password.validator';
import { usernameValidator } from '../custom-architecture-aids/validators/username.validator';
// import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    // MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    CommonModule
  ]
})
export class SignUpComponent implements OnInit, OnChanges {
  userInteracted: boolean = false;
  visiblePassword: boolean = false;
  // route guard is trying to leave without finishing, warning content will be lost
  // then delete email or any account info made
  // must validate email as soon as password and email validate is sent
  // must match 7 digits given from email
  //then when email is validated, go to next pg
  // password visibility

  constructor() {}

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, [
      usernameValidator,
      trimWhiteSpace()
    ]),
    email: new FormControl<string | null>(null, [
      emailValidatorPattern,
      trimWhiteSpace()
    ]),
    password: new FormControl<string | null>(null, [
      passwordValidator,
      trimWhiteSpace()
    ])
  });
  // have a nice ux that checks off when then password validtors are met
  createPassword: FormControl = new FormControl<string | null>(null, [
    passwordValidator,
    trimWhiteSpace()
  ]);

  ngOnInit() {
    this.createPassword.valueChanges.subscribe((newValue: string) => {
      const password: string = newValue;
      const requirements: PassWordInterface = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        digit: /\d/.test(password),
        special: /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)
      };

      // Update the style of each requirement element based on whether it's met
      // min length 8
      if (requirements.length) {
        document?.getElementById('length')?.classList.add('condition-met');
      } else {
        document?.getElementById('length')?.classList.remove('condition-met');
      }
      // uppercase letter
      if (requirements.uppercase) {
        document?.getElementById('uppercase')?.classList.add('condition-met');
      } else {
        document
          ?.getElementById('uppercase')
          ?.classList.remove('condition-met');
      }
      // lowercase letter
      if (requirements.lowercase) {
        document?.getElementById('lowercase')?.classList.add('condition-met');
      } else {
        document
          ?.getElementById('lowercase')
          ?.classList.remove('condition-met');
      }
      // digit
      if (requirements.digit) {
        document?.getElementById('digit')?.classList.add('condition-met');
      } else {
        document?.getElementById('digit')?.classList.remove('condition-met');
      }
      // special
      if (requirements.special) {
        document?.getElementById('special')?.classList.add('condition-met');
      } else {
        document?.getElementById('special')?.classList.remove('condition-met');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.signUpForm.valueChanges.subscribe(() => {
      this.userInteracted = true;
    });
  }
  // request to use route guard
  getRouteGuardStatus(): boolean {
    return this.userInteracted;
  }

  // toggle password visbility
  // toggle password visbility
  toggleVisibility(): void {
    this.visiblePassword = !this.visiblePassword;
  }
}
