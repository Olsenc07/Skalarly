import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appValidationAnimation]'
})
export class ValidationAnimationDirective {
  @HostBinding('@fingerprintActivation')
  animationState: 'normal' | 'activated' = 'normal';

  @Input() set appValidationAnimation(valid: boolean) {
    this.animationState = valid ? 'activated' : 'normal';
  }
}
