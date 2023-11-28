import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ErrorHandlerComponent } from '../error-handler/error-handler.component';
import { LoginComponent } from 'src/app/top-level-code/login/login.component';
import { dialog } from '../../custom-architecture-aids/animations/dialog-animation';

@Component({
  selector: 'app-error-handler-parent',
  standalone: true,
  imports: [CommonModule, ErrorHandlerComponent, LoginComponent],
  templateUrl: './error-handler-parent.component.html',
  animations: [dialog]
})
export class ErrorHandlerParentComponent {}
