import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { ErrorHandlerComponent } from '../../assistant-level-code/child-reusable-options/error-handler/error-handler.component';
import { LetterByLetterComponent } from '../../assistant-level-code/child-reusable-options/letter-by-letter-display/letter-by-letter-display.component';
import { LoginLogicComponent } from './login-logic/login-logic.component';
import { LoginSpecificService } from '../../assistant-level-code/custom-architecture-aids/services/login-validation/login-specific.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgOptimizedImage } from '@angular/common';
import { SkeletonLoaderLoginComponent } from './skeleton-loader-login/skeleton-loader-login.component';

import { ValidationAnimationDirective } from '../../assistant-level-code/custom-architecture-aids/directives/login-validation-animation.directive';
import { reusableAnimations } from './imports/animation-imports';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-login-format',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [...reusableAnimations],
  imports: [
    LetterByLetterComponent,
    LoginLogicComponent,
    ErrorHandlerComponent,
    MatButtonModule,
    MatTooltipModule,
    NgOptimizedImage,
    SkeletonLoaderLoginComponent,
    ValidationAnimationDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, AfterViewInit {
  // animation based
  nextAnimations: boolean = false;
  toggle: boolean = false;
  skalarlyState: string = 'initial';
  join: string = 'Join';
  welcome: string = 'Welcome To Skalarly';

  constructor(
    private loginSpecificService: LoginSpecificService, // eslint-disable-next-line no-unused-vars
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    // randomize phrases
    this.loginSpecificService.randomizePairs();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.skalarlyState = 'rise';
    }, 7000);
  }
  navigate(): void {
    this.router.navigate(['/sign-up']);
  }
  // reusbale function
  welcomeRiseDone(): void {
    this.nextAnimations = true;
    this.welcome = this.loginSpecificService.updatePhrase();
    this.toggle = true;
  }
}
