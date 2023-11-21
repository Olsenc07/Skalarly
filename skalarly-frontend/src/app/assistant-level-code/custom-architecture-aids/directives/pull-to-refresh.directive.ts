import {
  Directive,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output
} from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

// compatible for mobile and desktoptype scrolling
// need to only allow when skalar is at top of a scrollable page
@Directive({
  standalone: true,
  selector: '[appPullToRefresh]'
})
export class PullToRefreshDirective implements OnDestroy {
  @Output() deltaYChange: EventEmitter<{ deltaY: number; reset: boolean }> =
    new EventEmitter<{ deltaY: number; reset: boolean }>();
  @Output() refreshStop: EventEmitter<void> = new EventEmitter<void>();
  private touchStartY: number | null = null;
  private lastTouchY: number | null = null;
  private scrollEndEvents: Subject<void> = new Subject<void>();

  constructor() {
    // Emit event after a period of inactivity
    this.scrollEndEvents
      .pipe(
        debounceTime(1000) // Adjust debounceTime as needed
      )
      .subscribe(() => this.deltaYChange.emit({ deltaY: 0, reset: false })); //Indicates stopped scrolling
  }
  // non mobile
  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    // starts reload and shows icon
    if (event.deltaY < -30) {
      this.scrollEndEvents.next();
      this.deltaYChange.emit({ deltaY: event.deltaY, reset: false });
    }
  }
  // mobile
  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    // Prevent the default scroll behavior to allow for drag interaction
    event.preventDefault();
    // Calculate the change in the Y position
    const touch: number = event.touches[0].clientY;
    //emit chnages for animation to occur
    const value: number = Math.abs(touch - this.touchStartY!);
    // if(value > -30){ page will be refreshed
    this.deltaYChange.emit({ deltaY: value, reset: false });
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    // this should give the last y value
    this.lastTouchY = event.touches[0].clientY;
    const value: number = Math.abs(this.lastTouchY - this.touchStartY!);
    // threshold hans't been reached and pull is done so reset screen
    if (value > -75) {
      this.deltaYChange.emit({ deltaY: value, reset: true });
      // Reset the start and last Y position
      this.touchStartY = null;
      this.lastTouchY = null;
    }
  }
  // clean up
  ngOnDestroy(): void {
    this.scrollEndEvents?.unsubscribe();
  }
}
