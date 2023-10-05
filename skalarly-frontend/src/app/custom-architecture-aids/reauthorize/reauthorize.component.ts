import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-reauthorize',
  templateUrl: './reauthorize.component.html',
  styleUrls: ['./reauthorize.component.scss'],
  imports: []
})
export class ReauthorizeComponent {
  @Input() remainingTime: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ReauthorizeComponent>
  ) {
    this.remainingTime = data.remainingTime;
  }
  // Method to extend the session
  reAuthorize(): void {
    // Perform actions to extend the session
    // For example, make an API request to refresh the token
    // After successful extension, close the dialog
    this.dialogRef.close('extend');
  }

  // Method to log out
  logOut(): void {
    // Perform actions to log out
    // For example, navigate to the logout page
    this.dialogRef.close('logout');
  }
}
