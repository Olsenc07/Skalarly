import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('welcome');
  }
}
