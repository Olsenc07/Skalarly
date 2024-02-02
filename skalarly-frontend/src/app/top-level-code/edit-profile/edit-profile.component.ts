import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { EditingService } from '../../assistant-level-code/custom-architecture-aids/services/editing.service';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  imports: [MatButtonModule, NgIf, AsyncPipe]
})
export class EditProfileComponent {
  // will reset to old value 
  name = new FormControl('current value', {nonNullable: true});
  change$: Observable<boolean> = new Observable<boolean>();
  constructor(
    private editingService: EditingService,
    private router: Router
  ) {}
  save() {
    // save data
    this.editingService.saveEditingProfile();
    // navigate skalar
    this.router.navigate(['/profile']);
  }
}
