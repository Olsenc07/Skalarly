import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { dialog } from '../../custom-architecture-aids/animations/dialog-animation';

@Component({
  selector: 'app-error-handler-parent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-handler-parent.component.html',
  styleUrl: './error-handler-parent.component.scss',
  animations: [dialog]
})
export class ErrorHandlerParentComponent {}
