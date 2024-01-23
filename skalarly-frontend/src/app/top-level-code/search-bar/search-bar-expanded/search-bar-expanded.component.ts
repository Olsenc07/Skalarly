import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-search-bar-expanded',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './search-bar-expanded.component.html',
  styleUrl: '../search-bar.component.scss'
})
export class SearchBarExpandedComponent {

}
