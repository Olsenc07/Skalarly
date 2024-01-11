import { Inject, Injectable, NgZone, PLATFORM_ID,  computed, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {
  private orientationState = signal<boolean>(true);
  
screen = computed<boolean>(() => this.orientationState());

  constructor(private ngZone: NgZone, 
    @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.setOrientationState(); 
    window.addEventListener('resize', () => {
      this.ngZone.run(() => {
        const orientationType = window.screen.orientation.type;
        switch (orientationType) {
          case 'landscape-primary':
          case 'landscape-secondary':
            this.orientationState.set(false);
            break;
          case 'portrait-primary':
          case 'portrait-secondary':
            this.orientationState.set(true);
            break;
            default:
              this.orientationState.set(true);
            break;
        }
      });
    });
  }
  }
  private setOrientationState(): void {
    const orientationType = window.screen.orientation.type;
    switch (orientationType) {
      case 'landscape-primary':
      case 'landscape-secondary':
        this.orientationState.set(false);
        break;
      case 'portrait-primary':
      case 'portrait-secondary':
        this.orientationState.set(true);
        break;
      default:
        this.orientationState.set(true);
        break;
    }
  }

}
