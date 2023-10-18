import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil
} from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
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
  emailFound: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  loginState: boolean = false;

  constructor(
    private authorizeService: AuthorizeService, // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
    @Optional() public dialogRef: MatDialogRef<LoginComponent>,
    // eslint-disable-next-line no-unused-vars
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string | null>(null, [passwordValidator])
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
    // need to be found first before turned valid
    this.loginForm.controls['email'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => this.authorizeService.searchEmails(query)),
        takeUntil(this.destroy$)
      )
      .subscribe((emailFound: boolean) => {
        if (emailFound) {
          this.loginForm.controls['email'].setErrors(null); // Set the control as valid
        } else {
          this.loginForm.controls['email'].setErrors({ emailNotFound: true }); // Set an error to indicate it's invalid
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
