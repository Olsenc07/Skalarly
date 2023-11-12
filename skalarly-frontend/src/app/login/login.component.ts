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
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  takeUntil
} from 'rxjs';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { AuthorizeService } from '../custom-architecture-aids/services/authorize.service';
import { ErrorHandlerComponent } from '../custom-architecture-aids/error-handler/error-handler.component';
import { GlowBorderDirective } from '../custom-architecture-aids/directives/glow-border.directive';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ValidationAnimationDirective } from '../custom-architecture-aids/directives/login-validation-animation.directive';
import { fadeInOutAnimation } from '../custom-architecture-aids/animations/fade-animation';
import { passwordValidator } from '../custom-architecture-aids/validators/password.validator';
import { rotateAnimation } from '../custom-architecture-aids/animations/rotate180-animation';
import { spinChangeAnimation } from '../custom-architecture-aids/animations/spin-change-animation';

@Component({
  standalone: true,
  selector: 'app-login-format',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ErrorHandlerComponent,
    GlowBorderDirective,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    NgxSkeletonLoaderModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    ValidationAnimationDirective
  ],

  animations: [
    fadeInOutAnimation,
    trigger('skalarlyRiseAnimation', [
      state(
        'initial',
        style({
          opacity: 1,
          transform: 'translateY(0)'
        })
      ),
      transition('* => rise', [
        animate(
          '4s ease-in',
          keyframes([
            style({
              opacity: 1,
              transform: 'translateY(-15px)',
              offset: 0.7
            }),
            style({
              opacity: 0,
              transform: 'translateY(-15px)',
              offset: 1
            })
          ])
        )
      ])
    ]),
    // email validation
    spinChangeAnimation,
    // password validation
    trigger('lockAnimation', [
      state(
        'closed',
        style({ transform: 'rotate(0deg) scale(1)', color: '#333333' })
      ),
      state(
        'open',
        style({ transform: 'rotate(45deg) scale(1.2)', color: '#FFBF00' })
      ),
      transition(
        'closed => open',
        animate(
          '0.5s ease',
          keyframes([
            style({ transform: 'rotate(0deg) scale(1)', color: '#333333' }),
            style({ transform: 'rotate(15deg) scale(1.1)', color: '#B0B000' }),
            style({ transform: 'rotate(30deg) scale(1.15)', color: '#FFD700' }),
            style({ transform: 'rotate(45deg) scale(1.2)', color: '#FFB700' })
          ])
        )
      ),
      transition(
        'open => closed',
        animate(
          '0.5s ease',
          keyframes([
            style({ transform: 'rotate(45deg) scale(1.2)', color: '#FFBF00' }),
            style({ transform: 'rotate(30deg) scale(1.15)', color: '#FFD700' }),
            style({ transform: 'rotate(15deg) scale(1.1)', color: '#B0B000' }),
            style({ transform: 'rotate(0deg) scale(1)', color: '#333333' })
          ])
        )
      )
    ]),
    // visble password or not
    rotateAnimation,
    // login button able to click
    trigger('fingerprintActivation', [
      state(
        'normal',
        style({
          background:
            'linear-gradient(to top right, transparent 0%, transparent 100%)', // Start with a transparent gradient
          color: 'black'
        })
      ),
      state(
        'activated',
        style({
          background:
            'linear-gradient(to top right, rgb(238, 233, 233) 0%, #008080 100%)', // Change gradient from bottom left to top right when activated
          color: 'white'
        })
      ),
      transition('normal => activated', [animate('0.5s ease')]),
      transition('activated => normal', [animate('0.5s ease')])
    ]),
    // invalid login
    trigger('shakeAnimation', [
      state('initial', style({ transform: 'translateX(0)', color: 'initial' })),
      state(
        'left',
        style({
          transform: 'translateX(-10px)',
          color: '#FF5733'
        })
      ),
      state(
        'right',
        style({
          transform: 'translateX(10px)',
          color: '#FF5733'
        })
      ),
      transition('initial => left', animate('0.1s')),
      transition('left => right', animate('0.1s')),
      transition('right => initial', animate('0.1s'))
    ])
  ]
})
export class LoginComponent implements OnDestroy, OnInit, AfterViewInit {
  phraseInterval: number = NaN;
  get skeletonTheme(): {
    width: string;
    height: string;
  } {
    return {
      width: `56px`,
      height: `56px`
    };
  }
  // animation based
  loaded: boolean = false;
  welcomeText: { letter: string; visible: boolean }[] = [];
  joinText: { letter: string; visible: boolean }[] = [];
  skalarText: { letter: string; visible: boolean }[] = [];
  welcomeState: string | 'gone' = '';
  joinAnimation: boolean = false;
  skalarlyState: string = 'initial';
  joinLetters: string[] = [];
  joinSkalarly: string[] = [];
  wordPairs: string[] = [
    'the Enlightenment',
    'in Collaboration',
    'the Innovation',
    'our Synergy',
    'the Development',
    'in Education',
    'for Empowerment',
    'the Progress',
    'for Insight',
    'the Understanding',
    'in Knowledge',
    'the Unity',
    'the Discovery',
    'the Growth',
    'our Scholarship',
    'our Network',
    'the Wisdom',
    'the Advancement',
    'the Curiosity',
    'our Partnership',
    'the Exploration',
    'the Achievement',
    'the Learning',
    'to Nurture',
    'the Aspiration'
  ];
  randomWordPairs: string[] = [];
  currentPhraseIndex: number = 0;
  displayPhrase: string = '';
  phraseText: { letter: string; visible: boolean }[] = [];

  showJoinButton: boolean = false;
  disappearSkalarly: boolean = false;
  flip: boolean = false;
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
    this.titleService.setTitle('Skalarly Login');
    const text: string = 'Welcome To Skalarly';
    for (let i = 0; i < text.length; i++) {
      this.welcomeText.push({
        letter: text[i],
        visible: false
      });
    }
    const join: string = 'Join';
    for (let i = 0; i < join.length; i++) {
      this.joinText.push({ letter: join[i], visible: false });
    }
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
      this.randomizePairs();
    }, 1500);
    setTimeout(() => {
      this.skalarlyState = 'rise';
    }, 7000);
  }
  skalarlyRiseDone(): void {
    this.flip = true;
    this.displayPhrase = this.randomWordPairs[this.currentPhraseIndex];
    console.log('hey', this.displayPhrase);
    setTimeout(() => {
      this.updatePhrase();
    }, 3000);
    // Clear the existing phraseText before adding new letters
    for (let i = 0; i < this.displayPhrase.length; i++) {
      this.phraseText.push({
        letter: this.displayPhrase[i],
        visible: false
      });
    }
  }
  private randomizePairs(): void {
    const randomizedPair: string[] = [];
    const length: number = this.wordPairs.length;
    for (let i = 0; i < length; i++) {
      const randomize: number = Math.floor(
        Math.random() * this.wordPairs.length
      );
      const selectedQuestion: string = this.wordPairs.splice(randomize, 1)[0];
      randomizedPair.push(selectedQuestion[0]);
      this.randomWordPairs.push(selectedQuestion);
    }
  }
  updatePhrase(): void {
    this.currentPhraseIndex =
      (this.currentPhraseIndex + 1) % this.randomWordPairs.length;
    this.displayPhrase = this.randomWordPairs[this.currentPhraseIndex];
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
