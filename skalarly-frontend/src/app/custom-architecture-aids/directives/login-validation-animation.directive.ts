import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appValidationAnimation]'
})
export class ValidationAnimationDirective {
  @HostBinding('@loginBtnAnimation')
  animationState: 'normal' | 'hovered' = 'normal';

  @Input() set appValidationAnimation(valid: boolean) {
    this.animationState = valid ? 'hovered' : 'normal';
  }
}
