import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
interface NavItem {
  url: string;
  activeIcon: string;
  defaultIcon: string;
}
@Component({
  selector: 'app-nav-icons',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './nav-icons.component.html',
  styleUrl: './nav-icons.component.scss'
})
export class NavIconsComponent {
  @Input() currentUrl: string | undefined;
  navIcon: NavItem[] = [
    { url: 'connections', activeIcon: 'stadium', defaultIcon: 'things_to_do' },
    { url: 'connections', activeIcon: 'hub', defaultIcon: 'share' },
    { url: 'home', activeIcon: 'cottage', defaultIcon: 'home' },
    { url: 'messages', activeIcon: 'forum', defaultIcon: 'chat' },
    { url: 'notifications', activeIcon: 'notifications_active', defaultIcon: 'notifications' },
  ];
}
