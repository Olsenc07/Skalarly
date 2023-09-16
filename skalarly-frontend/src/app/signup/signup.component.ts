import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { type PassWordInterface } from '../interfaces/password-interface';
import { passwordValidator } from '../validators/password.validator';
import { trimWhiteSpace } from '../validators/email-pattern.validator';
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
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ]
})
export class SignUpComponent implements OnInit {
  // password visibility
  passwordVisbile: boolean = true;
  constructor() {}

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

  // toggle password visbility
  toggleVisibilty(): void {
    const c: HTMLInputElement = document.getElementById(
      'createPassword'
    ) as HTMLInputElement;
    if (this.passwordVisbile) {
      // show password
      c.type = 'text';
      this.passwordVisbile = !this.passwordVisbile;
    } else {
      // hide password
      c.type = 'password';
      this.passwordVisbile = !this.passwordVisbile;
    }
  }
}
