import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterModule, TitleStrategy } from '@angular/router';
import { CustomTitleStrategy } from './assistant-level-code/custom-architecture-aids/services/router-strategies/title-strategy.service';
import { OrientationService } from './assistant-level-code/custom-architecture-aids/services/orientation.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavIconsComponent } from './nav-bar/nav-icons/nav-icons.component';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    RouterModule
  ],
  providers: [{ provide: TitleStrategy, useClass: CustomTitleStrategy }]
})
export class AppComponent  {
  constructor(protected orientationService: OrientationService){}
}