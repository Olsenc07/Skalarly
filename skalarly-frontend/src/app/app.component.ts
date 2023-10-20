import {
  NavigationEnd,
  Event as NavigationEvent,
  Router,
  RouterModule
} from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
    MatToolbarModule,
    NgClass,
    NgIf,
    RouterModule,
    PullToRefreshDirective,
    SearchBarComponent
  ],
  animations: [
    trigger('iconChange', [
      state('initial', style({ transform: 'rotate(0) scale(1)' })),
      state(
        'final',
        style({ transform: 'rotate(360deg) scale(2)', color: 'green' })
      ),
      transition('initial => final', animate('300ms ease-in-out')),
      transition('final => initial', animate('300ms ease-in-out'))
    ])
  ]
})
export class AppComponent {
  iconState: string = '';
  reload: number = 0;
  showIcons: boolean = false;
  routerUrl: string | undefined;
  // mobile first
  orientation: boolean = true;
  searchIconClicked: boolean = false;

  constructor(private router: Router) {
    // tracking skalars current page
    this.router = router;
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.routerUrl = event.url;
      }
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
    console.log('bridges', reload); // Handle the reload value here
    console.log('icons', this.showIcons);
    this.reload = reload;
    if (this.reload < -2) {
      this.showIcons = true;
      this.iconState = 'initial';
      // start to show continue to scroll icon to refresh
      if (this.reload <= -50) {
        // User has pulled down by a certain threshold
        // You can display an icon, perform actions, or trigger a refresh
        console.log('Pulled down enough for a refresh');
        location.reload();
      }
      // this.showIcons = false; add this when this.reload goes back to -1 or 0
    }
  }

  // mobile functions
  toggleSearch(toggle: boolean): void {
    this.searchIconClicked = toggle;
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
