import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appPullToRefresh]'
})
export class PullToRefreshDirective {
  private cycleCount: number = 0;
  private isCounting: boolean = false;
  private thresholdReached = false;
  private lastDeltaY: number | null = null;
  private lastEventTime: number | null = null;
  private touchStartY = 0;
  private isTouching = false;
  private holdTimer: any;
  private debounceTimer: any;

  @Output() deltaYChange: EventEmitter<{
    state: number;
  }> = new EventEmitter<{ state: number }>();
  @Output() holdDetected: EventEmitter<{
    visible: boolean;
  }> = new EventEmitter<{ visible: boolean }>();

  // desktop
  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    this.handleInteraction(event.deltaY, window.scrollY, event.timeStamp);
  }
  // mobile
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0].clientY;
    this.isTouching = true;
  }
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (this.isTouching) {
      const touchY = event.touches[0].clientY;
      this.handleInteraction(
        touchY - this.touchStartY,
        window.scrollY,
        event.timeStamp
      );
    }
  }
  @HostListener('touchend')
  onTouchEnd(): void {
    this.isTouching = false;
    this.stopHoldCount();
  }
  // reusable functions
  private handleInteraction(
    deltaY: number,
    scrollTop: number,
    timeStamp: number
  ): void {
    if (this.isAtTopOfPage(scrollTop) && this.isPullingDown(deltaY)) {
      this.handlePullDownStart();
    } else if (this.thresholdReached) {
      this.handlePotentialStop(deltaY, timeStamp);
    }
    this.lastDeltaY = deltaY;
    this.lastEventTime = timeStamp;
  }

  private handlePullDownStart(): void {
    if (!this.thresholdReached) {
      this.thresholdReached = true;
      this.holdDetected.emit({ visible: true });
      this.startHoldCount();
    }
  }

  private handlePotentialStop(deltaY: number, timeStamp: number): void {
    const deltaYChange = this.calculateDeltaYChange(deltaY);
    const timeChange = this.calculateTimeChange(timeStamp);

    if (deltaYChange > 50 && timeChange < 100) {
      // 'Flick' gesture threshold
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        if (deltaYChange > 2) {
          this.stopHoldCount();
          this.thresholdReached = false;
        }
      }, 1000);
    }
  }

  onDeltaYChange(cycleCount: number): void {
    if (cycleCount === 1) {
      this.deltaYChange.emit({ state: 1 });
    } else if (cycleCount === 2) {
      this.deltaYChange.emit({ state: 2 });
    } else if (cycleCount === 3) {
      this.deltaYChange.emit({ state: 3 });
    }
  }
  private calculateDeltaYChange(currentDeltaY: number): number {
    return this.lastDeltaY !== null
      ? Math.abs(this.lastDeltaY - currentDeltaY)
      : 0;
  }

  private calculateTimeChange(currentTime: number): number {
    return this.lastEventTime !== null ? currentTime - this.lastEventTime : 0;
  }

  private isAtTopOfPage(scrollTop: number): boolean {
    return scrollTop === 0;
  }

  private isPullingDown(deltaY: number): boolean {
    return deltaY < -15; // Threshold for pulling down
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
