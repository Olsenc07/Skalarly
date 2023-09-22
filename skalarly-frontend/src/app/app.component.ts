import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  NavigationEnd,
  Event as NavigationEvent,
  Router,
  RouterModule
} from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Observable, map, of, switchMap, withLatestFrom } from 'rxjs';
import { BoldPipe } from './custom-architecture-aids/pipes/bold.pipe';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SkalarsService } from './custom-architecture-aids/services/skalars.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    BoldPipe,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    NgClass,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AppComponent implements OnInit {
  routerUrl: string | undefined;
  orientation: boolean | undefined;
  skalars$: Observable<any[]>;
  searchSkalar: FormControl = new FormControl<string | null>(null);

  constructor(
    private router: Router,
    private skalarsService: SkalarsService
  ) {
    this.router = router;
    this.skalarsService = skalarsService;
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
    // add rxjs that triggers only if new value and.. like have in old skalarly log in i beleive
    this.skalars$ = this.searchSkalar.valueChanges.pipe(
      withLatestFrom(this.skalarsService.getSkalars(this.searchSkalar.value)), // Combine with latest list of skalars
      // input is form control value of 'searchSkalar'
      // list is from the get api
      // felt I should add switchMap to prevent data leaks etc
      // But that may already be done with withLatestFrom so could be unneeded
      switchMap(([input, list]) =>
        of(list).pipe(
          // toLowerCase allows for case insensitive search
          // If the substring is not found, it returns -1
          map((skalarList) =>
            skalarList.filter(
              (s) =>
                s.username.toLowerCase().indexOf(input.toLowerCase()) !== -1
            )
          )
        )
      )
    );
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
