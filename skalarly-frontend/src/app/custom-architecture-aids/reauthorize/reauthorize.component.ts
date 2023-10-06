import {
  Component,
  Inject,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthorizeService } from '../services/authorize.service';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-reauthorize',
  templateUrl: './reauthorize.component.html',
  styleUrls: ['./reauthorize.component.scss'],
  imports: [DatePipe]
})
export class ReauthorizeComponent implements OnChanges {
  @Input() remainingTime: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ReauthorizeComponent>,
    private authorizeService: AuthorizeService
  ) {
    this.remainingTime = data.remainingTime;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.remainingTime === 0) {
      this.logOut();
    }
  }

  // Method to extend the session
  reAuthorize(): void {
    // Perform actions to extend the session
    // For example, make an API request to refresh the token
    // After successful extension, close the dialog
    this.dialogRef.close('extend');
    // as well
    // Token Expiration and Renewal:
    // JWTs often have expiration timestamps.
    // After the token expires, the user needs to
    // reauthenticate. Implement token renewal or refresh mechanisms
    // to keep users logged in without requiring frequent login.
  }

  // Method to log out
  logOut(): void {
    // Perform actions to log out
    // For example, navigate to the logout page
    this.dialogRef.close('logout');
  }
}
