import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, MatProgressSpinnerModule]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('welcome');
  }
}
