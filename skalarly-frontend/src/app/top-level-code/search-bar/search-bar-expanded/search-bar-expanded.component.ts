import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar-expanded',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule,
    MatIconModule, MatInputModule],
  templateUrl: './search-bar-expanded.component.html',
  styleUrl: '../search-bar.component.scss'
})
export class SearchBarExpandedComponent {

}
