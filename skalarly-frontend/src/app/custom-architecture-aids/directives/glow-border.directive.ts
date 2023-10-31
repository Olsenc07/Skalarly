import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';

@Directive({
  standalone: true,
  selector: '[appGlowBorder]'
})
export class GlowBorderDirective implements AfterViewInit {
  private matFormFieldWrapper: Element | null = null;
  private isGlowingError: boolean = false;
  private isGlowingDefault: boolean = false;
  private isGlowing: boolean = false;
  @Input() set appGlowBorder(isGlowing: boolean) {
    this.isGlowing = isGlowing;
    this.updateGlow();
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private matFormField: MatFormField
  ) {}
  ngAfterViewInit(): void {
    this.matFormFieldWrapper = this.el.nativeElement.querySelector(
      '.mat-mdc-text-field-wrapper'
    );
  }

  private updateGlow(): void {
    if (this.matFormFieldWrapper) {
      if (this.isGlowing) {
        if (
          this.matFormFieldWrapper.classList.contains('mat-form-field-invalid')
        ) {
          // Apply error animation only if it's not already applied
          this.renderer.addClass(this.matFormFieldWrapper, 'error-animation');
          this.renderer.removeClass(this.matFormFieldWrapper, 'glowAnimation');
        } else {
          // Apply default animation only if it's not already applied
          this.renderer.addClass(this.matFormFieldWrapper, 'glowAnimation');
          this.renderer.removeClass(
            this.matFormFieldWrapper,
            'error-animation'
          );
        }
      } else {
        // Remove both animations
        this.renderer.removeClass(this.matFormFieldWrapper, 'glowAnimation');
        this.renderer.removeClass(this.matFormFieldWrapper, 'error-animation');
      }
    }
  }

  @HostListener('focus', ['$event']) onFocus(event: FocusEvent) {
    this.updateGlow();
  }

  @HostListener('blur', ['$event']) onBlur(event: FocusEvent) {
    this.updateGlow();
  }
}
