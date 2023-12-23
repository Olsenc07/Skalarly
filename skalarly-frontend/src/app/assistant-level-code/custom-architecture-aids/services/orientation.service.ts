import { Injectable, NgZone, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {
  private orientationState = signal<boolean>(window.matchMedia('(orientation: portrait)').matches);

  get orientation(): Signal<boolean> {
    return this.orientationState.asReadonly();
  }
  
  constructor(private ngZone: NgZone) {
    window.addEventListener('resize', () => {
      this.ngZone.run(() => {
        this.orientationState.set(window.matchMedia('(orientation: portrait)').matches);
      });
    });
  }
}
