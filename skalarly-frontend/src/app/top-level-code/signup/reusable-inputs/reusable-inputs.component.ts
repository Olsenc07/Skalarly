import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reusable-inputs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reusable-inputs.component.html',
  styleUrl: './reusable-inputs.component.scss'
})
export class ReusableInputsComponent {
  @Input() label?: string;
  @Input() control?: FormControl;
  @Input() controlType?: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder?: string;
  @Input() icon?: string;
}
