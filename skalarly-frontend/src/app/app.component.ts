import { Component, OnDestroy, WritableSignal, signal, PLATFORM_ID, Inject, afterRender, AfterRenderPhase } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  NavigationEnd,
  Router,
  Event as RouterEvent,
  RouterModule,
  TitleStrategy
} from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { CustomTitleStrategy } from './assistant-level-code/custom-architecture-aids/services/router-strategies/title-strategy.service';
import { OrientationService } from './assistant-level-code/custom-architecture-aids/services/orientation.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterModule,
    NavBarComponent
  ],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
})
export class AppComponent implements OnDestroy {
  private routeSub$: Subject<void> = new Subject<void>();
  routerUrl: string | undefined;

  orientation: WritableSignal<boolean> = signal(true);
  constructor(private router: Router,
    protected orientationService: OrientationService,
    @Inject(PLATFORM_ID) private platformId: Object) {
      // SSR
      if (isPlatformBrowser(this.platformId)) {
        afterRender(() => {
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
    }, { phase: AfterRenderPhase.Read })
  }}

  ngOnDestroy(): void {
    this.routeSub$.next();
    this.routeSub$.complete();
  }
}