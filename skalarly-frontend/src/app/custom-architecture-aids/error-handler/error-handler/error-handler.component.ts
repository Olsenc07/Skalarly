import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  standalone: true,
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./login/login.component.scss'],
  imports: [MatDialogModule]
})
export class ErrorHandlerComponent {
  constructor(  data: { message: string }) {}
}
