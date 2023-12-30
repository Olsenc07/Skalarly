import { Component, WritableSignal, signal, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from './../top-level-code/search-bar/search-bar.component';
import { OrientationService } from '../assistant-level-code/custom-architecture-aids/services/orientation.service';
// import { PullToRefreshDirective } from './../assistant-level-code/custom-architecture-aids/directives/pull-to-refresh.directive';
// import { dialog } from './../assistant-level-code/custom-architecture-aids/animations/dialog-animation';
// import { refresh } from './../assistant-level-code/custom-architecture-aids/animations/refresh-animation';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [ 
    MatButtonModule,
     MatToolbarModule,
     MatIconModule,
     SearchBarComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  @Input() routeUrl: string | undefined;
  visible: boolean = false;
  reloadState: 'initial' | 'intermediate' | 'final' = 'initial';
  routerUrl: string | undefined;
  orientation: WritableSignal<boolean> = signal(true);
  searchIconClicked: boolean = false;

  constructor(
    protected orientationService: OrientationService
    ) {}
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
}