import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  Observable,
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

@Component({
  standalone: true,
  selector: 'app-login-format',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ErrorHandlerComponent,
    MatFormFieldModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
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
    ])
  ]
})
export class LoginComponent implements OnInit {
  animationState: 'hidden' | 'visible' = 'hidden';
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
      Validators.minLength(8),
      trimWhiteSpace()
    ])
  });

  ngOnInit(): void {
    // Set a timeout to trigger the animation
    setTimeout(() => {
      this.animationState = 'visible';
      // Set another timeout inside this one to hide the animation after 3 seconds
      setTimeout(() => {
        this.animationState = 'hidden';
      }, 3000);
    }, 100);
    // dont search email unless pattern is proper
    this.loginForm.controls['email'].statusChanges.subscribe((Event) => {
      if (Event === 'VALID') {
        this.emailFound$ = this.loginForm.controls['email'].valueChanges.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((query) => this.authorizeService.searchEmails(query))
        );
      }
    });
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

  // Use Switch map
  // HTTP Requests: When you make multiple HTTP requests based on some user interactions, you often want to ignore the responses from previous requests if new interactions occur. switchMap is used to cancel the ongoing HTTP request and switch to a new one when a new interaction happens.
  //   Autocomplete/Search: In autocomplete or search functionality, as a user types, you may want to cancel the ongoing search for previous input and only consider the results for the latest input.
  // User Authentication: When a user logs in or out, you might want to cancel any ongoing operations associated with their previous login state and initiate new operations based on their new login state.
  // Real-time Data: In applications that display real-time data (e.g., chat applications), you can use switchMap to switch to a new stream of data whenever the user changes the conversation.
  // this.userInput$.pipe(
  // switchMap(searchTerm => this.http.get(`/api/search?term=${searchTerm}`))
  // ).subscribe(result => {
  // Handle the result of the latest HTTP request
  // });
}
