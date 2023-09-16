import { Component, type OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { type PostInterface } from 'src/app/interfaces/post-interface';

@Component({
  standalone: true,
  selector: 'app-specific-feed-page',
  templateUrl: './specific-feed-page.component.html',
  styleUrls: ['./specific-feed-page.component.scss'],
  imports: [NgFor, NgIf, MatCardModule, MatButtonModule]
})
export class SpecificFeedPageComponent implements OnInit {
  scrolled = 0;
  posts: PostInterface[] | undefined;

  ngOnInit(): void {
    // fetch posts
    console.log('posts');
  }

  // check scroll position
  scrolling(): void {
    this.scrolled = window.screenY;
  }

  // scroll to top
  scrollToTop(): void {
    const element = document.getElementById('0');
    element!.scrollIntoView({ behavior: 'smooth' });
  }

  // efficent rendering
  trackByPosts(index: number, post: any): string {
    return post;
  }
}
