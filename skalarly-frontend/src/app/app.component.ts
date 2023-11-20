import { Component, OnDestroy } from '@angular/core';
import {
  NavigationEnd,
  Router,
  Event as RouterEvent,
  RouterModule,
  TitleStrategy
} from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
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
  animations: [
    fadeToggle,
    trigger('refresh', [
      state(
        'initial',
        style({
          transform: 'scale(1)',
          opacity: 1
        })
      ),
      state(
        'pulling',
        style({
          transform: 'scale(1.1) rotate(25deg)',
          opacity: 0.7
        })
      ),
      transition('initial => pulling', animate('500ms ease-out')),
      transition('pulling => initial', animate('500ms ease-in'))
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