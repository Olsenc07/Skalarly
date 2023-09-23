import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  standalone: true,
  selector: 'app-skalar-card',
  templateUrl: './skalar-card.component.html',
  styleUrls: ['./skalar-card.component.scss'],
  imports: [MatCardModule]
})
export class SkalarCardComponent {}
