import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dialogAnimation } from '../animations/dialog-animation';

@Component({
  standalone: true,
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['../../login/login.component.scss'],
  animations: [dialogAnimation]
})
export class ErrorHandlerComponent {
  constructor(
    // eslint-disable-next-line no-unused-vars
    public dialogRef: MatDialogRef<ErrorHandlerComponent>,
    // eslint-disable-next-line no-unused-vars
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
}
