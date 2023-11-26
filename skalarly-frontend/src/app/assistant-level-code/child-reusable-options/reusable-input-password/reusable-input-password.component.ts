import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { type PassWordInterface } from '../../custom-architecture-aids/interfaces/password-interface';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reusable-input-password',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  templateUrl: './reusable-input-password.component.html',
  styleUrl: './reusable-input-password.component.scss'
})
export class ReusableInputPasswordComponent {
  @Input() label?: string;
  @Input() control!: FormControl;
  @Input() controlType!: 'text' | 'password';
  @Input() placeholder!: string;
  @Input() icon?: string;
  @Output() controlValueChanged: EventEmitter<string> =
    new EventEmitter<string>();

  visiblePassword: boolean = false;
  toggleVisibility(): void {
    this.visiblePassword = !this.visiblePassword;
    this.controlType = this.visiblePassword ? 'text' : 'password';
  }
  private calculatePasswordRequirements(password: string): PassWordInterface {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      special: /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)
    };
  }
  passwordRequirements: {
    key: string;
    text: string;
  }[] = [
    { key: 'digit', text: 'At least one digit (0-9)' },
    { key: 'length', text: 'At least 8 characters' },
    { key: 'lowercase', text: 'At least one lowercase letter (a-z)' },
    {
      key: 'special',
      text: 'At least one special character (e.g., "&#64;"#$%^&+=!)'
    },
    { key: 'uppercase', text: 'At least one uppercase letter (A-Z)' }
  ];
}
