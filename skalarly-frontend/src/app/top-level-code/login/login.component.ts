import {
  AfterRenderPhase,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  WritableSignal,
  afterNextRender,
  signal
} from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { LetterByLetterComponent } from '../../assistant-level-code/child-reusable-options/letter-by-letter-display/letter-by-letter-display.component'
import { LoginLogicComponent } from './login-logic/login-logic.component'
import { SkeletonLoaderLoginComponent } from './skeleton-loader-login/skeleton-loader-login.component'

import { MatButtonModule } from '@angular/material/button'
import { MatChipsModule } from '@angular/material/chips'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'
import { reusableAnimations } from './imports/animation-imports'
import { Router } from '@angular/router'
import { OrientationService } from '../../assistant-level-code/custom-architecture-aids/services/orientation.service'
import { LoginSpecificService } from '../../assistant-level-code/custom-architecture-aids/services/login-validation/login-specific.service'

@Component({
  selector: 'app-login-format',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', './login-responsive.component.scss'],
  animations: [...reusableAnimations],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    LetterByLetterComponent,
    LoginLogicComponent,
    SkeletonLoaderLoginComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  // mobile first
  orientation: WritableSignal<boolean> = signal(true)
  // animation based
  nextAnimations: boolean = false
  toggle: boolean = false
  skalarlyState: string = 'initial'
  join: string = 'Join'
  welcome: string = 'Welcome To Skalarly'

  constructor(
    private loginSpecificService: LoginSpecificService, // eslint-disable-next-line no-unused-vars
    protected orientationService: OrientationService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    afterNextRender(
      () => {
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.skalarlyState = 'rise'
          }, 7000)
        }
        if (!this.orientationService.screen()) {
          // Now you can use this.loginSpecificService
          this.loginSpecificService.randomizePairs()
        }
      },
      { phase: AfterRenderPhase.Read }
    )
  }
  navigate(): void {
    this.router.navigate(['/sign-up'])
  }
  // reusbale function
  welcomeRiseDone(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.nextAnimations = true
      this.welcome = this.loginSpecificService.updatePhrase()
      this.toggle = true
    }
  }
}
