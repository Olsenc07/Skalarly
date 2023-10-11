import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-pull-to-refresh',
  templateUrl: './pull-to-refresh.component.html',
  styleUrls: ['./pull-to-refresh.component.scss']
})
export class PullToRefreshComponent {
  private startY: number | null = null;
  private refreshContainer: HTMLElement | null;
  constructor() {
    this.refreshContainer = document.getElementById('refreshContainer');
  }
  //  pull page reload
  startRefresh(event: MouseEvent) {
    this.startY = event.clientY;
    if (this.refreshContainer) {
      this.refreshContainer.style.transform = 'translate(0, 0)';
    }
  }

  endRefresh(event: MouseEvent) {
    if (this.startY) {
      const deltaY = event.clientY - this.startY;
      // Check if the user pulled down by a certain threshold (e.g., 50 pixels)
      if (deltaY >= 50) {
        this.refreshPage();
      }
      // Reset the container to its original position
      if (this.refreshContainer) {
        this.refreshContainer.style.transform = 'translate(0, 0)';
        this.startY = null;
      }
    }
  }

  refreshPage() {
    // Reload the page or perform any refresh action here
    location.reload();
  }
}
