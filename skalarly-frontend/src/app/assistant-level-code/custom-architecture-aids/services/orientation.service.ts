import { Injectable, NgZone, Signal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {
  private orientationState = signal<boolean>(window.matchMedia('(orientation: portrait)').matches);
  
screen = computed<boolean>(() => this.orientationState());

  constructor(private ngZone: NgZone) {
    console.log('changed')
    window.addEventListener('resize', () => {
      this.ngZone.run(() => {
        this.orientationState.set(window.matchMedia('(orientation: portrait)').matches);
      });
    });
  }
}
