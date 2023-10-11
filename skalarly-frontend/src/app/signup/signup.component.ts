import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
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
import { SaveSignUpGuard } from './../app-routes/route-guards/signup-guard';
import { emailUsernameValidator } from '../custom-architecture-aids/validators/email-username.validator';
import { passwordValidator } from '../custom-architecture-aids/validators/password.validator';
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
export class SignUpComponent implements OnInit, OnChanges, OnDestroy {
  userInteracted: boolean = false;
  visiblePassword: boolean = false;
  private usernameSub?: Subscription;
  // route guard is trying to leave without finishing, warning content will be lost
  // then delete email or any account info made
  // must validate email as soon as password and email validate is sent
  // must match 7 digits given from email
  //then when email is validated, go to next pg
  // password visibility

  constructor(private saveSignUpGuard: SaveSignUpGuard) {}

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, [trimWhiteSpace()]),
    email: new FormControl<string | null>(null, [
      Validators.required,
      emailValidatorPattern,
      trimWhiteSpace()
    ]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
      passwordValidator,
      trimWhiteSpace()
    ])
  });

  // look over username suff
  ngOnInit() {
// get country/institute/email data
this.country$ = this.quizCategoriesDataService.getCategoryData();
    // username check
    this.usernameSub = this.signUpForm
      .get('username')
      ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((username: string | null) => {
        if (username !== null) {
          const errors = emailUsernameValidator(
            this.signUpForm.get('username')?.value,
            true
          );
          this.signUpForm.get('username')?.setErrors(errors);
        }
      });
    // password check
    this.signUpForm
      .get('password')
      ?.valueChanges.subscribe((newValue: string) => {
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
          document
            ?.getElementById('special')
            ?.classList.remove('condition-met');
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.signUpForm.valueChanges.subscribe(() => {
      this.userInteracted = true;
    });

    // un sub when usernameis completed
    this.usernameSub?.unsubscribe();
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

  // clean up
  // if skalar trys to close entire browser before cpmpleting,delete saved content
  ngOnDestroy(): void {
    this.saveSignUpGuard.canDeactivate();
  }
}
