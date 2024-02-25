import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-skeleton-loader-signup',
  standalone: true,
  templateUrl: './skeleton-loader-signup.component.html',
  styleUrl: './skeleton-loader-signup.component.scss',
  imports: [NgxSkeletonLoaderModule]
})
export class SkeletonLoaderSignupComponent {}
