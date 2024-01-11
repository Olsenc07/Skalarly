import { Component, HostListener, Inject, PLATFORM_ID, type OnInit } from '@angular/core';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { type PostInterface } from 'src/app/assistant-level-code/custom-architecture-aids/interfaces/post-interface';

@Component({
  standalone: true,
  selector: 'app-specific-feed-page',
  templateUrl: './specific-feed-page.component.html',
  styleUrls: ['./specific-feed-page.component.scss'],
  imports: [NgFor, NgIf, MatCardModule, MatButtonModule]
})
export class SpecificFeedPageComponent implements OnInit {
  posts: PostInterface[] | undefined;

  constructor( @Inject(PLATFORM_ID) private platformId: Object){}
  ngOnInit(): void {
    // fetch posts
    console.log('posts');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Add logic to show/hide the scroll button based on scroll position
    if (isPlatformBrowser(this.platformId)) {
    const scrollToTopElement: HTMLElement | null =
      document.getElementById('scrollToTop');
    if (scrollToTopElement) {
      if (window.scrollY > 100) {
        // Adjust this value based on your needs
        scrollToTopElement.style.display = 'block';
      } else {
        scrollToTopElement.style.display = 'none';
      }
    }
  }
  }

  // scroll to top
  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // efficent rendering
  trackByPosts(index: number, post: any): string {
    return post;
  }
}
