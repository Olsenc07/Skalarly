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
  private style: Element | null = null;
  private readonly styleClassMap: Record<string, boolean> = {};
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
    this.style = this.el.nativeElement.querySelector(
      '.mat-mdc-text-field-wrapper'
    );
    this.matFormFieldWrapper = this.matFormField._elementRef.nativeElement;
    console.log('cats', this.matFormFieldWrapper);
  }

  private updateGlow(): void {
    if (this.matFormFieldWrapper) {
      const isInvalid = this.matFormFieldWrapper.classList.contains(
        'mat-form-field-invalid'
      );
      this.toggleStyle('error-animation', isInvalid);
      this.toggleStyle('glowAnimation', !isInvalid);
    }
  }

  private toggleStyle(className: string, shouldApply: boolean): void {
    if (shouldApply && !this.styleClassMap[className]) {
      this.renderer.addClass(this.style, className);
      this.styleClassMap[className] = true;
    } else if (!shouldApply && this.styleClassMap[className]) {
      this.renderer.removeClass(this.style, className);
      this.styleClassMap[className] = false;
    }
  }

  @HostListener('focus', ['$event']) onFocus(event: FocusEvent) {
    this.updateGlow();
  }

  @HostListener('blur', ['$event']) onBlur(event: FocusEvent) {
    this.updateGlow();
  }
}
