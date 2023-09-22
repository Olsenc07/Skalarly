import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { EditingService } from '../custom-architecture-aids/services/editing.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  imports: [MatButtonModule, NgIf, AsyncPipe],
})
export class EditProfileComponent {
  change$: Observable<boolean> = new Observable<boolean>();
  constructor(private editingService: EditingService, private router: Router) {}
  save() {
    // save data
    this.editingService.saveEditingProfile();
    // navigate skalar
    this.router.navigate(['/profile']);
  }

  ngOnChanges(): void {
    // changes$ gets assigned when a formcontrol value changes from its
    // default which would be the filled in retieved data
  }
}
