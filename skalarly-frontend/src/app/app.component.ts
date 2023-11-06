import { Component, Input, OnDestroy } from '@angular/core';
import {
  NavigationEnd,
  Router,
  Event as RouterEvent,
  RouterModule
} from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { Subject, filter, takeUntil } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PullToRefreshDirective } from './custom-architecture-aids/directives/pull-to-refresh.directive';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    NgClass,
    NgIf,
    RouterModule,
    PullToRefreshDirective,
    SearchBarComponent
  ],
  animations: [
    trigger('refreshAnimation', [
      transition(
        '* => *',
        [
          style({
            transform: 'scale({{scale}}) rotate({{rotation}}deg)',
            'box-shadow': '{{boxShadow}}'
          }),
          animate('200ms')
        ],
        {
          params: {
            scale: 1,
            rotation: 0,
            boxShadow: '0 0 5px rgba(0, 255, 0, 0.5)'
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
  reload: number = 0;
  rotationDegree = 0;
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
  onDeltaYChange(reload: number): void {
    console.log('test y', reload);
    this.pullProgress = reload;
    if (this.pullProgress < -2) {
      this.showIcons = true;
      this.rotationDegree = -this.pullProgress;
      if (this.reload <= -101) {
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
  getGlowEffect(): string {
    const intensity: number =
      Math.min(Math.max(this.pullProgress, 0), 100) / 100; // Normalize between 0 and 1
    const boxShadowIntensity: number = 5 + intensity * 20; // Calculate intensity of shadow
    return `0 0 ${boxShadowIntensity}px rgba(0, 255, 0, ${
      0.5 + 0.4 * intensity
    })`;
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
