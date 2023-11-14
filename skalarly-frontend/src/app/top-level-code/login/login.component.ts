import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  takeUntil
} from 'rxjs';
import { AuthorizeService } from '../../assistant-level-code/custom-architecture-aids/services/authorize.service';
import { ErrorHandlerComponent } from '../../assistant-level-code/custom-architecture-aids/error-handler/error-handler.component';
import { GlowBorderDirective } from '../../assistant-level-code/custom-architecture-aids/directives/glow-border.directive';
import { LetterByLetterComponent } from '../../assistant-level-code/child-reusable-options/letter-by-letter-display/letter-by-letter-display.component';
import { LoginSpecificService } from '../../assistant-level-code/custom-architecture-aids/services/login-validation/login-specific.service';
import { MatButton } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { SkeletonLoaderLoginComponent } from './skeleton-loader-login/skeleton-loader-login.component';
import { Title } from '@angular/platform-browser';
import { ValidationAnimationDirective } from '../../assistant-level-code/custom-architecture-aids/directives/login-validation-animation.directive';
import { loginImports } from './imports/login-imports';
import { passwordValidator } from '../../assistant-level-code/custom-architecture-aids/validators/password.validator';
import { reusableAnimations } from './imports/animation-imports';

@Component({
  standalone: true,
  selector: 'app-login-format',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    reusableAnimations
    //  welcome to skalarly rise 'welcomeRise',
    // join button animation 'bubble',
    // email validation on icon 'spinChange',
    // password validation on icon 'lock',
    // visible password or not 'rotate',
    // login button able to click
    // dissapearing finger print 'dissolve',
    // valid login 'authenticatingGlow',
    // invalid login 'shake'
    // activated fingerprint
  ],
  imports: [
    loginImports,
    LetterByLetterComponent,
    ErrorHandlerComponent,
    GlowBorderDirective,
    NgOptimizedImage,
    ReactiveFormsModule,
    ValidationAnimationDirective,
    SkeletonLoaderLoginComponent
  ]
})
export class LoginComponent implements OnDestroy, OnInit, AfterViewInit {
  // animation based
  loaded: boolean = false;
  welcomeState: string | 'gone' = '';
  flip: boolean = false;
  skalarlyState: string = 'initial';
  private isAnimationDone: boolean = false;
  join: string = 'Join';
  welcome: string = 'Welcome To Skalarly';

  isGlowing: boolean = false;
  progressState: 'default' | 'load' | 'complete' = 'default';
  @ViewChild('loginButton', { static: false }) loginButton: MatButton | null =
    null;
  // email validity
  emailState: 'initial' | 'spinning' | 'check' = 'initial';
  // email
  emailFound: boolean = false;
  private emailSub$: Subject<void> = new Subject<void>();
  // password
  isPasswordValid: boolean = false;
  visiblePassword: boolean = false;
  showPasswordError: boolean = false;
  private passwordSub$: Subject<void> = new Subject<void>();
  lockState: 'closed' | 'open' = 'closed';
  @ViewChild('skalarlyPassword', { static: false })
  skalarlyPassword: ElementRef = new ElementRef(null);
  // login
  stayLoggedIn: boolean = false;
  failedLoginAnimation: 'initial' | 'left' | 'right' = 'initial';
  constructor(
    private authorizeService: AuthorizeService, // eslint-disable-next-line no-unused-vars
    private loginSpecificService: LoginSpecificService, // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-unused-vars
    @Optional() public dialogRef: MatDialogRef<LoginComponent>,
    // eslint-disable-next-line no-unused-vars
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private readonly router: Router,
    private titleService: Title
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
    this.titleService.setTitle('Skalarly Login');
    // email
    this.loginForm.controls['email'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => {
          this.emailState = 'spinning';
          // don't search email unless pattern is proper
          if (this.loginForm.controls['email'].valid) {
            return this.authorizeService.searchEmails(query);
          } else {
            return of(false);
          }
        }),
        takeUntil(this.emailSub$)
      )
      .subscribe((emailFound: boolean) => {
        if (emailFound) {
          this.emailState = 'check';
          this.emailFound = emailFound;
          this.loginForm.controls['email'].setErrors(null); // Set the control as valid
        } else {
          this.emailState = 'initial';
          this.loginForm.controls['email'].setErrors({ emailNotFound: true }); // Set an error to indicate it's invalid
        }
      });
    // password
    // Subscribe to password changes
    this.loginForm
      .get('password')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.passwordSub$)
      ) // Use takeUntil for this subscription
      .subscribe((password: string) => {
        // check validity and then trigger animation
        this.isPasswordValid = this.loginForm.get('password')!.valid;
        if (this.isPasswordValid) {
          this.lockState = 'open';
        } else {
          // Password is empty or invalid, reset the animation
          this.lockState = 'closed';
        }
      });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loaded = true;
    }, 1500);
    setTimeout(() => {
      this.skalarlyState = 'rise';
    }, 7000);
  }
  // reusbale function
  skalarlyRiseDone(): void {
    if (!this.isAnimationDone) {
      this.flip = true;
      // This block will be executed only once after the animation is done.
      this.isAnimationDone = true;
      this.welcome = this.loginSpecificService.updatePhrase();
    }
  }
  updatePhrase(): void {
    console.log('again');
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
    this.progressState = 'load';
    setTimeout(() => {
      this.failedLoginAnimation = 'right';
      setTimeout(() => {
        this.failedLoginAnimation = 'initial'; // Reset to the initial state
      }, 100);
    });
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
  // efficent rendering
  trackByLetter(
    index: number,
    item: { letter: string; visible: boolean }
  ): string {
    return item.letter;
  }

  //clean up
  ngOnDestroy(): void {
    this.emailSub$.next();
    this.emailSub$.complete();
    // password
    this.passwordSub$.next();
    this.passwordSub$.complete();
  }
}
