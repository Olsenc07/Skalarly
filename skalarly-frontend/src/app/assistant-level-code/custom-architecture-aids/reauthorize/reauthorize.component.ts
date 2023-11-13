import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations';
import { AuthorizeService } from '../services/authorize.service';
import { DatePipe } from '@angular/common';
import { dialogAnimation } from '../animations/dialog-animation';

@Component({
  standalone: true,
  selector: 'app-reauthorize',
  templateUrl: './reauthorize.component.html',
  styleUrls: ['./reauthorize.component.scss'],
  imports: [DatePipe],
  animations: [
    dialogAnimation,
    trigger('loadingBar', [
      transition(':increment', [
        animate(
          '1s',
          keyframes([
            style({ width: '0%' }),
            style({ width: '{{ progress }}%' })
          ])
        )
      ])
    ])
  ]
})
export class ReauthorizeComponent implements OnInit {
  @Input() remainingTime: number;
  loadingBarState: number = 100;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ReauthorizeComponent>,
    private authorizeService: AuthorizeService
  ) {
    this.remainingTime = data.remainingTime;
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(): void {
    const interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.loadingBarState = (this.remainingTime / 30) * 100; // 30-second countdown
      } else {
        clearInterval(interval);
        // Session expired, perform logout
        this.logOut();
      }
    }, 1000);
  }

  // Method to extend the session
  reAuthorize(): void {
    this.dialogRef.close('extend');
    this.authorizeService.stayLoggedIn();
  }

  // Method to log out
  logOut(): void {
    this.dialogRef.close('logout');
  }
}
