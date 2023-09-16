import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Event as NavigationEvent,
  Router,
  RouterModule
} from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    NgClass,
    NgIf,
    MatToolbarModule
  ]
})
export class AppComponent implements OnInit {
  routerUrl: string | undefined;
  orientation: boolean | undefined;
  private router: Router;
  constructor(router: Router) {
    this.router = router;
    // tracking skalars current page
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.routerUrl = event.url;
      }
    });
    // Determing device orientation
    window
      .matchMedia('(orientation: portrait)')
      .addEventListener('change', (e) => {
        // true is portrait
        this.orientation = e.matches;
        if (this.orientation) {
          // mobile, small tablets
        } else {
          // desktop, large tablets
        }
      });
  }

  ngOnInit(): void {
    console.log('app load');
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
