import { Component, Input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OrientationService } from 'src/app/assistant-level-code/custom-architecture-aids/services/orientation.service';
import { MatChipsModule } from '@angular/material/chips';

interface NavItem {
  url: string;
  activeIcon: string;
  defaultIcon: string;
  description: string;
}
@Component({
  selector: 'app-nav-icons',
  standalone: true,
  imports: [MatButtonModule, MatChipsModule, MatIconModule, RouterModule],
  templateUrl: './nav-icons.component.html',
  styleUrl: './nav-icons.component.scss'
})
export class NavIconsComponent {
  @Input() currentUrl: string | undefined;
  constructor( protected orientationService: OrientationService){
  }
  navIcon: NavItem[] = [
    { url: '/institutions', activeIcon: 'stadium', defaultIcon: 'things_to_do', description: 'Schools' },
    { url: '/connections', activeIcon: 'hub', defaultIcon: 'share', description: 'Network' },
    { url: '/home', activeIcon: 'cottage', defaultIcon: 'home', description: 'Home' },
    { url: '/messages', activeIcon: 'forum', defaultIcon: 'chat', description: 'Messages' },
    { url: '/notifications', activeIcon: 'notifications_active', defaultIcon: 'notifications', description: 'Updates' },
  ];
}
