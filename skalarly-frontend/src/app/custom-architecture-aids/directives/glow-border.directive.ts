import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appGlowBorder]'
})
export class GlowBorderDirective implements AfterViewInit, OnDestroy {
  @Input() appGlowBorder: boolean = false;
  private statusSubscription: Subscription | null = null;
  private isGlowing: boolean = false;
  private hasError: boolean = false;
  formFieldElement: Element | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngControl: NgControl
  ) {}
  ngAfterViewInit(): void {
    this.formFieldElement = this.el.nativeElement.closest(
      '.mat-mdc-text-field-wrapper'
    );
    if (this.ngControl.statusChanges) {
      this.statusSubscription = this.ngControl.statusChanges.subscribe(
        (status: string) => {
          this.updateGlow(status === 'INVALID');
        }
      );
    }
  }

  private updateGlow(isInvalid: boolean): void {
    if (isInvalid) {
      this.hasError = !this.ngControl.untouched;
      if (this.hasError) {
        this.renderer.addClass(this.formFieldElement, 'error-animation');
      } else {
        this.renderer.addClass(this.formFieldElement, 'glow-animation');
        this.isGlowing = true;
      }
    }
    // If the field is valid, add the 'glowAnimation' and remove 'error-animation' if it exists
    else {
      if (!this.isGlowing && !this.hasError) {
        this.renderer.addClass(this.formFieldElement, 'glow-animation');
        this.isGlowing = true;
      } else {
        this.renderer.removeClass(this.formFieldElement, 'error-animation');
        this.hasError = true;
      }
    }
  }

  @HostListener('focus')
  onFocus(): void {
    this.updateGlow(this.ngControl?.invalid ?? false);
  }

  @HostListener('blur')
  onBlur(): void {
    // Only remove the styles that were added on focus
    if (this.hasError) {
      this.renderer.removeClass(this.formFieldElement, 'error-animation');
      this.hasError = false; // Reset the flag after removing
    }
    if (this.isGlowing) {
      this.renderer.removeClass(this.formFieldElement, 'glow-animation');
      this.isGlowing = false; // Reset the flag after removing
    }
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription?.unsubscribe();
    }
  }
}
