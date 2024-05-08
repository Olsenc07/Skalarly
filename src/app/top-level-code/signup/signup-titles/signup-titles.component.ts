import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-signup-titles',
  standalone: true,
  imports: [],
  templateUrl: './signup-titles.component.html',
  styleUrl: './signup-titles.component.scss'
})
export class SignupTitlesComponent {
  @Input() title: string = '';
  @Input() intro: string = '';
}
