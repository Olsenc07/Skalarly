import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../profiles.component.scss'],
  imports: [MatButtonModule, MatCardModule, MatTabsModule, MatIconModule]
})
export class ProfileComponent {
  profilePic: string = 'assets/profile.jpg'; // Replace with actual image path
  name: string = 'Chase Olsen';
  major: string = 'Computer Science';
  minor: string = 'Mathematics';
  sport: string = 'Soccer';
  club: string = 'Chess Club';
  bio: string = 'Being educated is the best way to achieve contempment and success.';
  followersCount: number = 1000;
  followingCount: number = 500;
  socialMediaLinks: { name: string, url: string }[] = [
    { name: 'Facebook', url: 'https://www.facebook.com/johndoe' },
    { name: 'Twitter', url: 'https://twitter.com/johndoe' },
    { name: 'Instagram', url: 'https://www.instagram.com/johndoe' }
  ];

  // chat bot that can explain each course when clicked
  completedCourses: string[] = ['Calculus I', 'Linear Algebra', 'Data Structures'];
  pursuingCourses: string[] = ['Machine Learning', 'Artificial Intelligence', 'Software Engineering'];

  constructor() { }
};