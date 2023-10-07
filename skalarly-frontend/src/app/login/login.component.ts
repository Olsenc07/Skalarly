import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  emailValidatorPattern,
  trimWhiteSpace
} from '../custom-architecture-aids/validators/email-pattern.validator';
import { AuthorizeService } from '../custom-architecture-aids/services/authorize.service';
import { ErrorHandlerComponent } from '../custom-architecture-aids/error-handler/error-handler.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { passwordValidator } from '../custom-architecture-aids/validators/password.validator';

@Component({
  standalone: true,
  selector: 'app-login-format',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ErrorHandlerComponent,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  animations: [
    trigger('welcomeAnimation', [
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      state('hidden', style({ opacity: 0, transform: 'translateX(-100%)' })),
      transition('hidden => visible', animate('1s ease-in')),
      transition('visible => hidden', animate('1s ease-out'))
    ]),
    trigger('shakeAnimation', [
      state('initial', style({ transform: 'translateX(0)', color: 'initial' })),
      state('left', style({ transform: 'translateX(-5px)', color: 'red' })),
      state('right', style({ transform: 'translateX(5px)', color: 'red' })),
      transition('initial => left', animate('0.1s')),
      transition('left => right', animate('0.1s')),
      transition('right => initial', animate('0.1s'))
    ]),
    trigger('toggleAnimation', [
      state('true', style({ transform: 'rotate(0deg)' })),
      state('false', style({ transform: 'rotate(180deg)' })),
      transition('true <=> false', animate('200ms ease-in-out'))
    ])
  ]
})
export class LoginComponent implements OnChanges, OnInit, OnDestroy {
  // welcome text
  animationState: 'hidden' | 'visible' = 'hidden';
  visiblePassword: boolean = false;
  showPasswordError: boolean = false;
  passwordErrorSub?: Subscription;
  isLoading: boolean = false;
  failedLoginAnimation: 'initial' | 'left' | 'right' = 'initial';
  emailFound$: Observable<boolean> = new Observable<boolean>();
  loginState: boolean = false;
  constructor(private authorizeService: AuthorizeService) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string | null>(null, [
      emailValidatorPattern,
      trimWhiteSpace()
    ]),
    password: new FormControl<string | null>(null, [
      passwordValidator,
      trimWhiteSpace()
    ])
  });

  ngOnInit(): void {
    // Set a timeout to trigger the animation of welcome text
    setTimeout(() => {
      this.animationState = 'visible';
      // Set another timeout inside this one to hide the animation after 3 seconds
      setTimeout(() => {
        this.animationState = 'hidden';
      }, 3000);
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // don't search email unless pattern is proper
    this.loginForm.controls['email'].statusChanges.subscribe((Event) => {
      if (Event === 'VALID') {
        this.emailFound$ = this.loginForm.controls['email'].valueChanges.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((query) => this.authorizeService.searchEmails(query))
        );
      }
    });
    if (this.loginForm.controls['password'].dirty) {
      // don't give password error until attempted
      this.passwordErrorSub = this.loginForm.controls['password'].valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe(() => {
          // Validate the password and set the error flag
          this.showPasswordError = this.loginForm.controls['password'].invalid;
        });
    }
  }

  login(): void {
    // if this fails then
    this.loginState = this.authorizeService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    );
    // login failed so reset animation
    if (!this.loginState) {
      this.isLoading = false;
      this.failedLoginAnimation = 'left';
      // Reset the animation after a short delay
      setTimeout(() => {
        this.failedLoginAnimation = 'right';

        setTimeout(() => {
          this.failedLoginAnimation = 'initial'; // Reset to the initial state
        }, 100);
      }, 100);
    }
  }
  // ability to login using enter click
  enterClicked(): void {
    if (this.loginForm.valid) {
      this.login();
    }
  }
  // toggle password visbility
  toggleVisibility(): void {
    this.visiblePassword = !this.visiblePassword;
  }
  // clean up
  ngOnDestroy(): void {
    this.passwordErrorSub?.unsubscribe();
  }
}
