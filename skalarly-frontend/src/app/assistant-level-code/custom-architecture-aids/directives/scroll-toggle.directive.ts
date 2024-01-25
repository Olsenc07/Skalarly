import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[scrollToggle]'
})
export class scrollToggleDirective {
    private lastTouchY: number | undefined;
    private isHidden: boolean = false;
    @Output() toggleHeader: EventEmitter<boolean> = new EventEmitter();
    constructor(private el: ElementRef, private renderer: Renderer2) {}

  
    // Desktop
    @HostListener('window:wheel', ['$event'])
    onWheel(event: WheelEvent): void {
      this.handleScroll(event.deltaY);
    }
  
    // Mobile
    @HostListener('window:touchmove', ['$event'])
    onTouchMove(event: TouchEvent): void {
      //  determine the direction of the touch move
      const touch = event.touches[0] || event.changedTouches[0];
      const currentY = touch.clientY;
  
      //  previous Y-position to compare with
      if (this.lastTouchY && currentY !== this.lastTouchY) {
        // determine the scroll direction based on touch movement
        const deltaY = this.lastTouchY - currentY;
        this.handleScroll(deltaY);
      }
  
      // update the last Y-position for next move
      this.lastTouchY = currentY;
    }
  
    private handleScroll(deltaY: number): void {
      if (deltaY > 0) {
        this.hideElement();
        this.toggleHeader.emit(false);
      } else {
        this.showElement();
        this.toggleHeader.emit(true);
      }
    }
  
    private hideElement(): void {
      if (!this.isHidden) {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-100%)');
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s');
        this.isHidden = true;
      }
    }
  
    private showElement(): void {
      if (this.isHidden) {
        this.renderer.removeStyle(this.el.nativeElement, 'transform');
        this.isHidden = false;
      }
    }
    
}