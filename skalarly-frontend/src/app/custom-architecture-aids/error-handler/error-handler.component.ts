import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';

@Component({
  standalone: true,
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['../../login/login.component.scss'],
  imports: [LoginComponent, MatDialogModule]
})
export class ErrorHandlerComponent {
  constructor(
    // eslint-disable-next-line no-unused-vars
    public dialogRef: MatDialogRef<ErrorHandlerComponent>,
    // eslint-disable-next-line no-unused-vars
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
}
