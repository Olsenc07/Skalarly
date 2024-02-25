import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SearchBarComponent } from './../top-level-code/search-bar/search-bar.component';
import { OrientationService } from '../assistant-level-code/custom-architecture-aids/services/orientation.service';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { NavIconsComponent } from './nav-icons/nav-icons.component';
import { SearchBarExpandedComponent } from '../top-level-code/search-bar/search-bar-expanded/search-bar-expanded.component';
// import { PullToRefreshDirective } from './../assistant-level-code/custom-architecture-aids/directives/pull-to-refresh.directive';
// import { dialog } from './../assistant-level-code/custom-architecture-aids/animations/dialog-animation';
// import { refresh } from './../assistant-level-code/custom-architecture-aids/animations/refresh-animation';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    NavIconsComponent,
    SearchBarComponent,
    SearchBarExpandedComponent
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  rotationAngle: number = 0;
  visible: boolean = false;
  reloadState: 'initial' | 'intermediate' | 'final' = 'initial';
  searchIconClicked: boolean = false;

  constructor(
    private router: Router,
    protected orientationService: OrientationService
  ) {}
  onHoldDetected(display: boolean): void {
    this.visible = display;
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
  rotateIcon(): void {
    this.rotationAngle += 60;
  }
  navigate(): void {
    // if(this.currentUrl !== '/signup'){
    // this.router.navigate(['/home']);
    // }
    // else{
    //   console.log('hey', this.currentUrl)
    this.router.navigate(['/login']);
    // }
  }
}
