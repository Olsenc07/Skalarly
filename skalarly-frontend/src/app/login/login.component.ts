import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  emailValidatorPattern,
  trimWhiteSpace
} from '../validators/email-pattern.validator';
import { AuthorizeService } from '../services/authorize.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';

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
        const query: string = this.email.value;
        this.emailFound$ = this.authorizeService.searchEmails(query.trim());
      }
    });
  }
}
