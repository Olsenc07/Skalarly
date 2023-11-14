import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  standalone: true,
  selector: 'app-skeleton-loader-login',
  templateUrl: './skeleton-loader-login.component.html',
  styleUrls: ['./skeleton-loader-login.component.scss'],
  imports: [NgxSkeletonLoaderModule]
})
export class SkeletonLoaderLoginComponent {
  get skeletonTheme(): {
    width: string;
    height: string;
  } {
    return {
      width: `56px`,
      height: `56px`
    };
  }
}
