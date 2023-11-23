import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
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
export class PullToRefreshDirective {
  @Output() deltaYChange: EventEmitter<{ state: number }> = new EventEmitter<{
    state: number;
  }>();
  @Output() holdDetected: EventEmitter<{ visible: boolean }> =
    new EventEmitter<{
      visible: boolean;
    }>();
  @Input() targetElementId!: string;
  private cycleCount: number = 0;
  private isCounting: boolean = false;
  private thresholdReached: boolean = false;
  private lastDeltaY: number | null = null;
  private lastEventTime: number | null = null;
  holdTimer: any;
  holdInterval: any;
  debounceTimer: any;

  // reusable code
  onDeltaYChange(cycleCount: number): void {
    if (cycleCount === 1) {
      this.deltaYChange.emit({ state: 1 });
    } else if (cycleCount === 2) {
      this.deltaYChange.emit({ state: 2 });
    } else if (cycleCount === 3) {
      this.deltaYChange.emit({ state: 3 });
    }
  }

  // Mobile touch events
  // .... may beable to reuse desktop code
  //  but user touch events to trigger it


  // wheel events for desktop
  // clean up the hold functionality because it
  // works for flick and hold rn but only want hold 3s trigger
  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    const currentScrollTop = window.scrollY;
    const currentTime = event.timeStamp;
    console.log('found', currentScrollTop);
    console.log('2', event.deltaY);
    const deltaYChange =
      this.lastDeltaY !== null ? Math.abs(this.lastDeltaY - event.deltaY) : 0;
    const timeChange =
      this.lastEventTime !== null ? currentTime - this.lastEventTime : 0;
    if (currentScrollTop === 0 && event.deltaY < -15) {
      if (!this.thresholdReached) {
        this.thresholdReached = true;
        this.lastDeltaY = event.deltaY;
        // Scrolling up (pulling down) and threshold exceeded
        if (!this.isCounting) {
          this.holdDetected.emit({ visible: true });
          this.startHoldCount();
        }
      } else {
        if (deltaYChange > 50 && timeChange < 100) {
          // Threshold for a 'flick' gesture
          // Implement debounce mechanism
          clearTimeout(this.debounceTimer);
          this.debounceTimer = setTimeout(() => {
            if (
              this.lastDeltaY !== null &&
              Math.abs(this.lastDeltaY - event.deltaY) > 2
            ) {
              console.log('deltaY changed, stop counting');
              this.stopHoldCount();
              this.thresholdReached = false;
            }
          }, 1000);
          this.lastDeltaY = event.deltaY;
        }
      }
      this.lastDeltaY = event.deltaY;
      this.lastEventTime = currentTime;
    }
  }
  private startHoldCount(): void {
    // Clear any existing timer
    this.isCounting = true;
    this.cycleCount = 0;
    this.holdTimer = setInterval(() => {
      // Increment count each second as long as the condition holds
      this.cycleCount++;
      this.onDeltaYChange(this.cycleCount);
    }, 1000);
  }

  private stopHoldCount(): void {
    // Immediately stop the hold count
    console.log('stop 2');
    this.thresholdReached = false;
    clearTimeout(this.debounceTimer);
    clearInterval(this.holdTimer);
    this.isCounting = false;
    this.holdDetected.emit({ visible: false });
  }
}
