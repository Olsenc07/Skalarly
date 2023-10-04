import { Component, Input } from '@angular/core';
import { BoldPipe } from '../custom-architecture-aids/pipes/bold.pipe';
import { MatCardModule } from '@angular/material/card';
import { type SkalarInfoInterface } from '../custom-architecture-aids/interfaces/skalars-info-interface';

@Component({
  standalone: true,
  selector: 'app-skalar-card',
  templateUrl: './skalar-card.component.html',
  styleUrls: ['./skalar-card.component.scss'],
  imports: [BoldPipe, MatCardModule]
})
export class SkalarCardComponent {
  @Input() skalarInfo!: SkalarInfoInterface;
  @Input() searchSkalar: string | null = null;
}
