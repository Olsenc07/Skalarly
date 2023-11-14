import { Component, OnDestroy } from '@angular/core';
import {
  NavigationEnd,
  Router,
  Event as RouterEvent,
  RouterModule,
  TitleStrategy
} from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { CustomTitleStrategy } from './assistant-level-code/custom-architecture-aids/services/router-strategies/title-strategy.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PullToRefreshDirective } from './assistant-level-code/custom-architecture-aids/directives/pull-to-refresh.directive';
import { SearchBarComponent } from './top-level-code/search-bar/search-bar.component';
import { fadeToggle } from './assistant-level-code/custom-architecture-aids/animations/fadeToggle-animation';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    PullToRefreshDirective,
    SearchBarComponent
  ],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }],
  animations: [
    fadeToggle,
    trigger('refreshAnimation', [
      transition(
        '* => *',
        [
          style({
            transform: 'scale({{scale}}) rotate({{rotation}}deg)',
            'border-radius': '50%',
            'border-style': 'dashed',
            'border-width': '5px', // Adjust as needed
            'border-color': 'transparent', // Hide the actual border
            position: 'relative', // Needed for the pseudo-element
            'background-image':
              'linear-gradient({{gradientRotation}}deg, transparent, transparent)',
            'background-size': '100% 200%', // Adjust based on the pseudo element's size
            'background-position': 'center bottom',
            'z-index': '1'
          }),
          animate(
            '1s',
            style({
              transform: 'scale({{endScale}}) rotate({{endRotation}}deg)',
              'background-position': '{{gradientPosition}}'
            })
          )
        ],
        {
          params: {
            scale: 1,
            rotation: 0,
            endScale: 1,
            endRotation: 360,
            gradientRotation: 0,
            gradientPosition: 'center bottom'
          }
        }
      )
    ])
  ]
})
export class AppComponent implements OnDestroy {
  pullProgress: number = 0;
  private routeSub$: Subject<void> = new Subject<void>();
  iconState: string = '';
  showIcons: boolean = false;
  routerUrl: string | undefined;
  // mobile first
  orientation: boolean = true;
  searchIconClicked: boolean = false;

  constructor(private router: Router) {
    // tracking skalars current page
    this.router.events
      .pipe(
        filter(
          (event: RouterEvent): event is NavigationEnd =>
            event instanceof NavigationEnd
        ),
        takeUntil(this.routeSub$)
      )
      // eslint-disable-next-line rxjs-angular/prefer-async-pipe
      .subscribe((event: NavigationEnd) => {
        this.routerUrl = event.url;
      });
    // Determing device orientation
    window
      .matchMedia('(orientation: portrait)')
      .addEventListener('change', (e: MediaQueryListEvent) => {
        // true is portrait
        this.orientation = e.matches;
        if (this.orientation) {
          // mobile, small tablets
        } else {
          // desktop, large tablets
        }
      });
  }
  onDeltaYChange(reload: number, reset: boolean): void {
    if (!reset) {
      this.pullProgress = reload;
      this.showIcons = true;
      if (reload <= -100) {
        location.reload();
      }
    }
  }
  getScale(): number {
    return 1 + this.pullProgress / 100;
  }
  getRotation(): number {
    return this.pullProgress * 3.6;
  }
  getGradientPosition(): string {
    const progress = this.getRotationProgress(); // You would need to create this method
    // Return a string for the background position based on the progress
    return `center ${100 - progress}%`;
  }

  // Define the new method for gradient rotation
  getGradientRotation(): number {
    // Return the current rotation or any transformation of it needed for the gradient
    return this.getRotation(); // Or however you wish to calculate this
  }

  // A method to get rotation progress, which you will need to implement
  getRotationProgress(): number {
    // Calculate the progress of the rotation in terms of percentage
    // This is an example, adjust it according to your needs
    const rotation = this.getRotation();
    return ((rotation % 360) / 360) * 100;
  }
  interpolateColor(
    startColor: string,
    endColor: string,
    progress: number
  ): string {
    // Extract the red, green, and blue components of the start color
    const startRGB = this.hexToRgb(startColor);
    const endRGB = this.hexToRgb(endColor);

    // Calculate the current color components based on the progress
    const currentRGB = {
      r: this.interpolateValue(startRGB.r, endRGB.r, progress),
      g: this.interpolateValue(startRGB.g, endRGB.g, progress),
      b: this.interpolateValue(startRGB.b, endRGB.b, progress)
    };

    // Return the current color in hex format
    return this.rgbToHex(currentRGB.r, currentRGB.g, currentRGB.b);
  }

  interpolateValue(
    startValue: number,
    endValue: number,
    progress: number
  ): number {
    return Math.round(startValue + (endValue - startValue) * (progress / 100));
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result: RegExpExecArray | null =
      /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : { r: 0, g: 0, b: 0 };
  }

  rgbToHex(r: number, g: number, b: number): string {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }

  getGradient(rotation: number): string {
    // Calculate the progress based on rotation.
    const progress: number = Math.abs(rotation % 360) / 360;

    // Calculate the gradient colors based on the progress.
    const color1 = this.interpolateColor('#6dd5ed', '#23d5ab', progress);
    const color2 = this.interpolateColor('#2193b0', '#23d5ab', progress);
    const color3 = this.interpolateColor('#23a6d5', '#23d5ab', progress);
    const color4 = this.interpolateColor('#23d5ab', '#23d5ab', progress);

    // Return the CSS gradient string, adjusting the angle to match the rotation for a spinning effect.
    return `linear-gradient(${rotation}deg, ${color1}, ${color2}, ${color3}, ${color4})`;
  }

  // mobile functions
  toggleSearch(toggle: boolean): void {
    this.searchIconClicked = toggle;
  }
  ngOnDestroy(): void {
    // Trigger the unsubscribe$ to complete the subscription
    this.routeSub$.next();
    this.routeSub$.complete();
  }
  // <!-- Terminal -->
  // <!-- <div class="terminal" [ngSwitch]="selection.value">
  //   <pre *ngSwitchDefault>ng generate component xyz</pre>
  //   <pre *ngSwitchCase="'material'">ng add @angular/material</pre>
  //   <pre *ngSwitchCase="'pwa'">ng add @angular/pwa</pre>
  //   <pre *ngSwitchCase="'dependency'">ng add _____</pre>
  //   <pre *ngSwitchCase="'test'">ng test</pre>
  //   <pre *ngSwitchCase="'build'">ng build</pre>
  // </div> -->
}
