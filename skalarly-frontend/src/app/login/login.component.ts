import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  emailValidatorPattern,
  trimWhiteSpace
} from '../validators/email-pattern.validator';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    // MatCardModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    NgOptimizedImage
  ]
})
export class LoginComponent implements OnInit {
  emailFound: boolean = false;
  constructor() {}

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
        const query: string = this.email.value;
        this.authService.searchEmails(query.trim());
        this.authService
          .getEmail()
          // .pipe(map((testing) => {}))
          // filter using operators
          // test subjects here and needing to
          .subscribe((results) => {
            if (results === true) {
              console.log('results baby', results);
              // this shou;ld be with an async pipe and not called with each function
              this.emailMatches = results;
            } else {
              console.log('nuts', results);
              this.emailMatches = false;
            }
          });
      }
    });
  }
}
