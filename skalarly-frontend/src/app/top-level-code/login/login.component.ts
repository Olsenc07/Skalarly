import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild
} from '@angular/core';
import {
  EmailInterface,
  PasswordInterface
} from 'src/app/assistant-level-code/custom-architecture-aids/interfaces/login-interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Observable,
  concat,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap
} from 'rxjs';
import { AuthorizeService } from '../../assistant-level-code/custom-architecture-aids/services/authorize.service';
import { ErrorHandlerComponent } from '../../assistant-level-code/child-reusable-options/error-handler/error-handler.component';
import { GlowBorderDirective } from '../../assistant-level-code/custom-architecture-aids/directives/glow-border.directive';
import { LetterByLetterComponent } from '../../assistant-level-code/child-reusable-options/letter-by-letter-display/letter-by-letter-display.component';
import { LoginSpecificService } from '../../assistant-level-code/custom-architecture-aids/services/login-validation/login-specific.service';
import { MatButton } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { SkeletonLoaderLoginComponent } from './skeleton-loader-login/skeleton-loader-login.component';
import { ValidationAnimationDirective } from '../../assistant-level-code/custom-architecture-aids/directives/login-validation-animation.directive';
import { loginImports } from './imports/login-imports';
import { passwordValidator } from '../../assistant-level-code/custom-architecture-aids/validators/password.validator';
import { reusableAnimations } from './imports/animation-imports';
@Component({
  standalone: true,
  selector: 'app-login-format',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [...reusableAnimations],
  imports: [
    loginImports,
    LetterByLetterComponent,
    ErrorHandlerComponent,
    GlowBorderDirective,
    NgOptimizedImage,
    ReactiveFormsModule,
    ValidationAnimationDirective,
    SkeletonLoaderLoginComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, AfterViewInit {
  // animation based
  nextAnimations: boolean = false;
  skalarlyState: string = 'initial';
  join: string = 'Join';
  stayLogIn: string = 'Stay logged In';
  forgot: string = 'Forgot Password?';
  welcome: string = 'Welcome To Skalarly';
  visiblePassword: boolean = false;
  isGlowing: boolean = false;
  progressState: 'default' | 'loading' | 'complete' = 'default';
  @ViewChild('loginButton', { static: false }) loginButton: MatButton | null =
    null;
  // email
  email$: Observable<EmailInterface> = new Observable<EmailInterface>();
  // password
  password$: Observable<PasswordInterface> =
    new Observable<PasswordInterface>();
  @ViewChild('skalarlyPassword', { static: false })
  skalarlyPassword: ElementRef = new ElementRef(null);
  // login
  stayLoggedIn: boolean = false;
  failedLoginAnimation: 'initial' | 'left' | 'right' = 'initial';
  // form function
  private createControlObservable<T, R>(
    controlName: string,
    debounce: number,
    startWithState: R,
    validateFn: (value: T) => boolean,
    switchMapFn: (value: T, isValid: boolean) => Observable<R>
  ): Observable<R> {
    return this.loginForm.controls[controlName].valueChanges.pipe(
      debounceTime(debounce),
      distinctUntilChanged(),
      startWith(startWithState),
      map((value) => {
        const controlValue: T = this.loginForm.controls[controlName].value;
        return [controlValue, validateFn(controlValue)] as [T, boolean];
      }),
      switchMap(([value, isValid]) => switchMapFn(value, isValid))
    );
  }
  // Switch map function for email
  private emailSwitchMapFn(
    email: string,
    isValid: boolean
  ): Observable<{ emailFound: boolean; emailState: string; error?: string }> {
    if (email === '') {
      return of({ emailFound: false, emailState: 'initial' });
    } else if (isValid) {
      return concat(
        of({ emailFound: false, emailState: 'loading' }),
        this.authorizeService.searchEmails(email).pipe(
          map((emailFound) => ({
            emailFound,
            emailState: emailFound ? 'check' : 'initial'
          }))
        )
      );
    } else {
      return of({
        emailFound: false,
        emailState: 'initial',
        error: 'notFound'
      });
    }
  }
  // Switch map function to handle changes in password
  private handlePasswordChange(
    password: string,
    isValid: boolean
  ): Observable<{
    isPasswordValid: boolean;
    lockState: string;
    error?: string;
  }> {
    if (password === '') {
      return of({ isPasswordValid: false, lockState: 'closed' });
    } else if (isValid) {
      return of({ isPasswordValid: true, lockState: 'open' });
    } else {
      return of({
        isPasswordValid: false,
        lockState: 'closed',
        error: 'notFound'
      });
    }
  }

  constructor(
    private authorizeService: AuthorizeService, // eslint-disable-next-line no-unused-vars
    private loginSpecificService: LoginSpecificService, // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
    @Optional() public dialogRef: MatDialogRef<LoginComponent>,
    // eslint-disable-next-line no-unused-vars
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private readonly router: Router
  ) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      passwordValidator()
    ])
  });

  ngOnInit(): void {
    // randomize phrases
    this.loginSpecificService.randomizePairs();

    // email
    this.email$ = this.createControlObservable(
      'email',
      500,
      { emailFound: false, emailState: 'initial', error: '' },
      this.isEmailValid.bind(this),
      this.emailSwitchMapFn
    );

    // password
    this.password$ = this.createControlObservable(
      'password',
      500,
      { isPasswordValid: false, lockState: 'closed' },
      this.isPasswordValid.bind(this), // Updated
      this.handlePasswordChange
    );
  }
  isEmailValid(value: string): boolean {
    return this.loginForm.controls['email'].valid;
  }

  isPasswordValid(value: string): boolean {
    return this.loginForm.controls['password'].valid;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.skalarlyState = 'rise';
    }, 7000);
  }
  // reusbale function
  welcomeRiseDone(): void {
    this.nextAnimations = true;
    this.welcome = this.loginSpecificService.updatePhrase();
  }
  // toggle password visbility
  toggleVisibility(): void {
    this.visiblePassword = !this.visiblePassword;
  }
  // remain logged in
  stayIn(): void {
    this.stayLoggedIn = !this.stayLoggedIn;
  }
  login(): void {
    this.progressState = 'loading';
    setTimeout(() => {
      this.failedLoginAnimation = 'right';
      setTimeout(() => {
        this.failedLoginAnimation = 'initial'; // Reset to the initial state
        this.progressState = 'default';
      }, 100);
    });
    // when success this.progressState = 'complete';

    // this.authorizeService
    //   .login(
    //     this.loginForm.controls['email'].value,
    //     this.loginForm.controls['password'].value
    //   )
    //   .subscribe({
    //     next: (progress: boolean) => {
    //       if (progress) {
    //         this.progressState = 'complete';
    //         // navigate to home page
    //       } else {
    //         this.progressState = 'default';
    //         this.failedLoginAnimation = 'left';
    //         // Reset the animation after a short delay
    //         setTimeout(() => {
    // if (this.intervalId) {
    //   clearInterval(this.intervalId);
    // }
    //           this.failedLoginAnimation = 'right';
    //           setTimeout(() => {
    //             this.failedLoginAnimation = 'initial'; // Reset to the initial state
    //           }, 100);
    //         }, 100);
    //       }
    //     },
    //     error: (error) => {
    //       // Handle any errors that occurred during login
    //       this.progressState = 'default'; // Hide the loading button in case of an error
    //     }
    //   });
  }
  // ability to login using enter click
  enterClicked(): void {
    if (this.loginForm.valid) {
      this.login();
    }
  }
  // forgot password
  navigate(): void {
    this.router.navigate(['/forgot-password']);
  }
}
