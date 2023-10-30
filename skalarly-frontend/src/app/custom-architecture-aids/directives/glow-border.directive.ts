import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appGlowBorder]'
})
export class GlowBorderDirective implements AfterViewInit {
  private isGlowing = false;
  matFormField: Element | null = null;
  @Input() set appGlowBorder(isGlowing: boolean) {
    this.isGlowing = isGlowing;
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  ngAfterViewInit(): void {
    this.matFormField = this.el.nativeElement.closest(
      '.mat-mdc-text-field-wrapper'
    );
  }
  @HostListener('focus', ['$event']) onFocus(event: FocusEvent) {
    this.renderer.addClass(this.matFormField, 'glowAnimation');
  }

  @HostListener('blur', ['$event']) onBlur(event: FocusEvent) {
    this.renderer.removeClass(this.matFormField, 'glowAnimation');
  }
}
