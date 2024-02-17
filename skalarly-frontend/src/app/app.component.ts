import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterModule, TitleStrategy } from '@angular/router';
import { CustomTitleStrategy } from './assistant-level-code/custom-architecture-aids/services/router-strategies/title-strategy.service';
import { OrientationService } from './assistant-level-code/custom-architecture-aids/services/orientation.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavIconsComponent } from './nav-bar/nav-icons/nav-icons.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { scrollToggleDirective } from './assistant-level-code/custom-architecture-aids/directives/scroll-toggle.directive';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MatToolbarModule,
    NavBarComponent,
    NgClass,
    NavIconsComponent,
    RouterModule,
    scrollToggleDirective
  ], 
  animations: [
    trigger('fadeMargin', [
      state('withMargin', style({
        marginTop: '3.3rem'
      })),
      state('withoutMargin', style({
        marginTop: '0rem'
      })),
      transition('withMargin <=> withoutMargin', animate('300ms ease-in-out')),
    ]),
    trigger('lineAnimation', [
      // Define states for each line with unique styles
      state('line0', style({ top: '10%', left: '0%'})),
      state('line1', style({ top: '37%', left: '25%'})),
      state('line2', style({ top: '50%', left: '45%'})),
      state('line3', style({ top: '85%', left: '60%' })),
      state('line4', style({ top: '90%', left: '85%' })),
      transition('* => *', [ 
        animate('1.5s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-50%)' }), 
          style({ opacity: 1, transform: 'translateX(0)' }), 
        ]))
    ]),
    ])
  ],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
})
export class AppComponent  {
  marginState: 'withMargin' | 'withoutMargin' = 'withMargin';
  lines = new Array(5);
  constructor(protected orientationService: OrientationService){}
  onToggleHeader(show: boolean): void {
    this.marginState = show ? 'withMargin' : 'withoutMargin';
  }
}