
import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, Inject, signal, PLATFORM_ID, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LetterByLetterComponent } from '../../assistant-level-code/child-reusable-options/letter-by-letter-display/letter-by-letter-display.component';
import { LoginLogicComponent } from './login-logic/login-logic.component';
import { SkeletonLoaderLoginComponent } from './skeleton-loader-login/skeleton-loader-login.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ValidationAnimationDirective } from '../../assistant-level-code/custom-architecture-aids/directives/login-validation-animation.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { reusableAnimations } from './imports/animation-imports';
import { Router } from '@angular/router';
import { OrientationService } from 'src/app/assistant-level-code/custom-architecture-aids/services/orientation.service';
import { LoginSpecificService } from 'src/app/assistant-level-code/custom-architecture-aids/services/login-validation/login-specific.service';

@Component({
  selector: 'app-login-format',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login-responsive.component.scss'],
  animations: [...reusableAnimations],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    LetterByLetterComponent,
    LoginLogicComponent,
    SkeletonLoaderLoginComponent,
    ValidationAnimationDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, AfterViewInit {
   // mobile first
  orientation: WritableSignal<boolean> = signal(true);
  // animation based
  nextAnimations: boolean = false;
  toggle: boolean = false;
  skalarlyState: string = 'initial';
  join: string = 'Join';
  welcome: string = 'Welcome To Skalarly';

  constructor(
    private loginSpecificService: LoginSpecificService, // eslint-disable-next-line no-unused-vars
    protected orientationService: OrientationService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // randomize phrases
    this.loginSpecificService.randomizePairs();
    // if (isPlatformBrowser(this.platformId)) {
    //   // Browser-only code
    // }
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.skalarlyState = 'rise';
      }, 7000);
    }
  }
  navigate(): void {
    this.router.navigate(['/sign-up']);
  }
  // reusbale function
  welcomeRiseDone(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.nextAnimations = true;
      this.welcome = this.loginSpecificService.updatePhrase();
      this.toggle = true;
    }
  }
}


