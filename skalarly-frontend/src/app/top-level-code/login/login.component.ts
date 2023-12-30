import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  signal
} from '@angular/core';
import { ErrorHandlerComponent } from '../../assistant-level-code/child-reusable-options/error-handler/error-handler.component';
import { LetterByLetterComponent } from '../../assistant-level-code/child-reusable-options/letter-by-letter-display/letter-by-letter-display.component';
import { LoginLogicComponent } from './login-logic/login-logic.component';
import { LoginSpecificService } from '../../assistant-level-code/custom-architecture-aids/services/login-validation/login-specific.service';
import { NgOptimizedImage } from '@angular/common';
import { SkeletonLoaderLoginComponent } from './skeleton-loader-login/skeleton-loader-login.component';
import { MatCardModule } from '@angular/material/card';
import { loginSharedImports } from './imports/login-imports-shared';
import { ValidationAnimationDirective } from '../../assistant-level-code/custom-architecture-aids/directives/login-validation-animation.directive';
import { reusableAnimations } from './imports/animation-imports';
import { Router } from '@angular/router';
import { OrientationService } from 'src/app/assistant-level-code/custom-architecture-aids/services/orientation.service';
@Component({
  standalone: true,
  selector: 'app-login-format',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login-responsive.component.scss'],
  animations: [...reusableAnimations],
  imports: [
    loginSharedImports,
    LetterByLetterComponent,
    LoginLogicComponent,
    ErrorHandlerComponent,
    MatCardModule,
    NgOptimizedImage,
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
