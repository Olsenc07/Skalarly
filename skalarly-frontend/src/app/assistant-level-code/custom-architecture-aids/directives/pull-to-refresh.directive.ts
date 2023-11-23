import {
  Directive,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

// compatible for mobile and desktoptype scrolling
// need to only allow when skalar is at top of a scrollable page
@Directive({
  standalone: true,
  selector: '[appPullToRefresh]'
})
export class PullToRefreshDirective implements OnInit, OnDestroy {
  @Output() deltaYChange: EventEmitter<{ state: number }> = new EventEmitter<{
    state: number;
  }>();
  @Output() holdDetected: EventEmitter<void> = new EventEmitter<void>();
  private isWaiting: boolean = false;
  // Class properties
  private steps: number = 0;
  private lastScrollTop: number = 0;

  // Mobile touch events
  // use window touch three. start, hold, end
  // unless below works for both
  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll.bind(this), true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll.bind(this), true);
  }

  onScroll = (): void => {
    // Your existing scroll logic
    if (currentScrollTop < this.lastScrollTop) {
      // Start or reset the hold timer
      clearTimeout(this.holdTimer);
      this.holdTimer = setTimeout(() => {
        this.cycleCount++;

  onDeltaYChange(state: number): void {

    if (state === 1) { // Assuming state 1 indicates a pull-down action

    } 
    if (this.cycleCount = 1) {
      this.deltaYChange.emit({ state: 1 });

    }

    if (this.cycleCount = 2) {
      this.deltaYChange.emit({ state: 2 });

    }
  }
        this.holdDetected.emit(); // Emit event after hold duration
      }, 1000); // Adjust the hold duration as needed
    } else {
      clearTimeout(this.holdTimer); // Clear timer if user scrolls up
    }
    // Rest of your logic
  };
}
