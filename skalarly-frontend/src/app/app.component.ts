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
  private routeSub$: Subject<void> = new Subject<void>();
  visible: boolean = false;
  reloadState: 'initial' | 'intermediate' | 'final' = 'initial';
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
  onHoldDetected(display: boolean): void {
    this.visible = display; // Show icon when hold is detected
  }
  onDeltaYChange(reload: number): void {
    if (reload == 1) {
      this.reloadState = 'initial';
    }
    if (reload == 2) {
      this.reloadState = 'intermediate';
    }
    if (reload === 3) {
      this.reloadState = 'final';
      // Special case for a 3-second hold, trigger a reload
      setTimeout(() => location.reload(), 700);
    }
  }
  getIcon(reloadState: string | null): string {
    if (reloadState === null) {
      return 'cycle';
    }
    switch (reloadState) {
      case 'final':
        return 'task_alt';
      case 'intermediate':
        return 'published_with_changes';
      default:
        return 'cycle';
    }
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
