import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlerParentComponent } from '../error-handler-parent/error-handler-parent.component';
import { LoginComponent } from 'src/app/top-level-code/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrl: './error-handler.component.scss',
  imports: [MatButtonModule, MatDividerModule, LoginComponent, NgIf]
})
export class ErrorHandlerComponent {
  constructor(
    // eslint-disable-next-line no-unused-vars
    public dialogRef: MatDialogRef<ErrorHandlerParentComponent>,
    // eslint-disable-next-line no-unused-vars
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string },
    private readonly router: Router
  ) {}
}
