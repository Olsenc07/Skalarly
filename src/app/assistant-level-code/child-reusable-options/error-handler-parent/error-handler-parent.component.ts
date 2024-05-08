import { Component } from '@angular/core';
import { ErrorHandlerComponent } from '../error-handler/error-handler.component';
import { dialog } from '../../custom-architecture-aids/animations/dialog-animation';

@Component({
  selector: 'app-error-handler-parent',
  standalone: true,
  imports: [ErrorHandlerComponent],
  templateUrl: './error-handler-parent.component.html',
  animations: [dialog]
})
export class ErrorHandlerParentComponent {}
