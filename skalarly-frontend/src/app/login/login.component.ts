import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs';
import {
  emailValidatorPattern,
  trimWhiteSpace
} from '../custom-architecture-aids/validators/email-pattern.validator';
import { AuthorizeService } from '../custom-architecture-aids/services/authorize.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    NgOptimizedImage
  ]
})
export class LoginComponent implements OnInit {
  emailFound$: Observable<boolean> = new Observable<boolean>();
  constructor(private authorizeService: AuthorizeService) {
    this.authorizeService = authorizeService;
  }

  email: FormControl = new FormControl<string | null>(null, [
    emailValidatorPattern,
    trimWhiteSpace()
  ]);
  password: FormControl = new FormControl<string | null>(null, [
    Validators.minLength(8),
    trimWhiteSpace()
  ]);

  ngOnInit() {
    console.log('log in');
    // dont search email unless pattern is proper
    this.email.statusChanges.subscribe((Event) => {
      if (Event === 'VALID') {
        this.emailFound$ = this.email.valueChanges.pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((query) => this.authorizeService.searchEmails(query))
        );
      }
    });
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
