import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
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
import { AuthorizeService } from '../../../assistant-level-code/custom-architecture-aids/services/authorize.service';
import { CommonModule } from '@angular/common';
import { GlowBorderDirective } from '../../../assistant-level-code/custom-architecture-aids/directives/glow-border.directive';
import { LetterByLetterComponent } from '../../../assistant-level-code/child-reusable-options/letter-by-letter-display/letter-by-letter-display.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { loginImports } from '../imports/login-imports';
import { passwordValidator } from 'src/app/assistant-level-code/custom-architecture-aids/validators/password.validator';
import { reusableLogicAnimations } from './../imports/animation-logic-imports';
interface IconConfig {
  icon: string;
  class: string;
  animation: string;
}
@Component({
  selector: 'app-login-logic',
  standalone: true,
  animations: [...reusableLogicAnimations],
  imports: [
    loginImports,
    CommonModule,
    GlowBorderDirective,
    LetterByLetterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login-logic.component.html',
  styleUrl: './login-logic.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginLogicComponent implements OnInit {
  @Input() alwaysVertical?: boolean = false;
  // animated
  stayLogIn: string = 'Stay logged In';
  forgot: string = 'Forgot Password?';
  isGlowing: boolean = false;
  progressState: 'default' | 'loading' | 'declined' | 'complete' = 'default';
  // email
  email$: Observable<EmailInterface> = new Observable<EmailInterface>();
  // password
  password$: Observable<PasswordInterface> =
    new Observable<PasswordInterface>();
  @ViewChild('skalarlyPassword', { static: false })
  skalarlyPassword: ElementRef = new ElementRef(null);
  visiblePassword: boolean = false;
  // login
  stayLoggedIn: boolean = false;
  @ViewChild('loginButton', { static: false }) loginButton: MatButton | null =
    null;
  constructor(
    private authorizeService: AuthorizeService, // eslint-disable-next-line no-unused-vars
    private readonly router: Router,
    private cdr: ChangeDetectorRef
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
  ngOnInit(): void {
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
  isEmailValid(): boolean {
    return this.loginForm.controls['email'].valid;
  }

  isPasswordValid(): boolean {
    return this.loginForm.controls['password'].valid;
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
    this.cdr.detectChanges(); // Detect changes immediately

  setTimeout(() => {
    this.progressState = 'declined';
    this.cdr.detectChanges(); // Detect changes when state changes to 'declined'

    setTimeout(() => {
      this.progressState = 'default';
      this.cdr.detectChanges(); // Detect changes when state resets to 'default'
    }, 3000); // Wait 3 seconds before returning to default
  }, 3000);
   // 2 seconds to go to 'declined'
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
  getIconConfig(progressState: string): IconConfig{
    switch (progressState) {
      case 'default':
        return { icon: 'fingerprint', class: 'initial', animation: 'fingerprint-border-initial' };
      case 'loading':
        return { icon: 'fingerprint', class: 'loading', animation: 'fingerprint-border' };
      case 'complete':
        return { icon: 'approval_delegation', class: 'approved', animation: 'fingerprint-border-approved' };
        case 'declined':
        return { icon: 'block', class: 'declined', animation: 'fingerprint-border-declined' };
      default:
        return { icon: 'fingerprint', class: '', animation: '' };
    }
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
