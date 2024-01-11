import { Inject, Injectable, NgZone, PLATFORM_ID,  computed, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {
  private orientationState = signal<boolean>(false);
  
screen = computed<boolean>(() => this.orientationState());

  constructor(private ngZone: NgZone, 
    @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
    window.addEventListener('resize', () => {
      this.ngZone.run(() => {
        this.orientationState.set(false);
      });
    });
  }
  }
}
