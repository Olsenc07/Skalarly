import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appPullToRefresh]'
})
export class PullToRefreshDirective {
  @Output() deltaYChange: EventEmitter<number> = new EventEmitter<number>();

  @HostListener('window:wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (event.deltaY < 0) {
      this.deltaYChange.emit(event.deltaY);
    }
  }
}
