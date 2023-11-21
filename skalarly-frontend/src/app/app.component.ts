import { Component, OnDestroy } from '@angular/core';
import {
  NavigationEnd,
  Router,
  Event as RouterEvent,
  RouterModule,
  TitleStrategy
} from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CustomTitleStrategy } from './assistant-level-code/custom-architecture-aids/services/router-strategies/title-strategy.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PullToRefreshDirective } from './assistant-level-code/custom-architecture-aids/directives/pull-to-refresh.directive';
import { SearchBarComponent } from './top-level-code/search-bar/search-bar.component';
import { dialog } from './assistant-level-code/custom-architecture-aids/animations/dialog-animation';
import { fadeToggle } from './assistant-level-code/custom-architecture-aids/animations/fadeToggle-animation';
import { refresh } from './assistant-level-code/custom-architecture-aids/animations/refresh-animation';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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
  animations: [dialog, fadeToggle, refresh]
})
export class AppComponent implements OnDestroy {
  pullProgress: number = 0;
  private routeSub$: Subject<void> = new Subject<void>();
  iconState: string = '';
  routerUrl: string | undefined;
  // mobile first
  orientation: boolean = true;
  searchIconClicked: boolean = false;
  animationParams:
    | {
        transformStyle: string;
        opacityStyle: number;
        duration: string;
      }
    | undefined;

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
    if (reload > 9) {
    this.updateAnimationParams(reload);
    if (!reset) {
      this.pullProgress = reload;
    } else {
      // released
      if (reload <= -75) {
        location.reload();
      }
      // reset screen, reload wasn't reached
      this.pullProgress = 0;
    }
  }
  }
  updateAnimationParams(pullValue: number) {
    // Calculate the scale, rotation, opacity, and duration based on pullValue
    const scale: number = 1 + pullValue / 100; // Example calculation
    const rotate: number = pullValue * 2; // Example calculation
    const opacity: number = 1 - pullValue / 200; // Example calculation
    const duration: string = `${Math.max(500 - pullValue * 2, 200)}ms`; // Example calculation
    // Set the animation parameters
    this.animationParams = {
      transformStyle: `scale(${scale}) rotate(${rotate}deg)`,
      opacityStyle: opacity,
      duration: duration
    };
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
}
