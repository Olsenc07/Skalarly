import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlerParentComponent } from '../error-handler-parent/error-handler-parent.component';
import { LoginLogicComponent } from 'src/app/top-level-code/login/login-logic/login-logic.component';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrl: './error-handler.component.scss',
  imports: [MatButtonModule, LoginLogicComponent, NgIf]
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
  navigate(): void {
    this.router.navigate(['/sign-up']);
  }
}
