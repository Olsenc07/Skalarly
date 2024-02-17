import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterModule, TitleStrategy } from '@angular/router';
import { CustomTitleStrategy } from './assistant-level-code/custom-architecture-aids/services/router-strategies/title-strategy.service';
import { OrientationService } from './assistant-level-code/custom-architecture-aids/services/orientation.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavIconsComponent } from './nav-bar/nav-icons/nav-icons.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { scrollToggleDirective } from './assistant-level-code/custom-architecture-aids/directives/scroll-toggle.directive';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
    ])
  ],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
})
export class AppComponent  {
  marginState: 'withMargin' | 'withoutMargin' = 'withMargin';
  lines: Array<{ top: string, left: string }> = [
    { top: '90%', left: '83%' }, 
    { top: '1%', left: '83%' }, 
    { top: '65%', left: '87%' }, 
    { top: '35%', left: '5%' },
    { top: '5%', left: '10%' },
    { top: '80%', left: '10%' },
    { top: '60%', left: '0%' },
    { top: '40%', left: '80%' },
  ];

  constructor(protected orientationService: OrientationService){}
  onToggleHeader(show: boolean): void {
    this.marginState = show ? 'withMargin' : 'withoutMargin';
  }
}