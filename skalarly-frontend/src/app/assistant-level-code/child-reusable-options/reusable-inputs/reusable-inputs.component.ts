import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime, filter, distinctUntilChanged, takeUntil, Observable} from 'rxjs';
import { FormControl,  ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe, AsyncPipe } from '@angular/common';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PassWordInterface } from 'src/app/assistant-level-code/custom-architecture-aids/interfaces/password-interface';
import { BoldPipe } from '../../custom-architecture-aids/pipes/bold.pipe';
import { AlphabeticalPipe } from '../../custom-architecture-aids/pipes/alphabetical.pipe';

@Component({
  selector: 'app-reusable-inputs',
  standalone: true,
  imports: [
    AlphabeticalPipe,
    AsyncPipe,
    BoldPipe,
    TitleCasePipe,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
    ],
  templateUrl: './reusable-inputs.component.html',
  styleUrl: './reusable-inputs.component.scss'
})
export class ReusableInputsComponent implements OnDestroy {
  typedFilter: FormControl<string | null> = new FormControl<string | null>('');
  input: FormControl<string | null> = new FormControl<string | null>('');
  @Input() default: boolean = true;
  @Input() List: string[] = [''];
  @Input() controlType: 'text' | 'password' = 'text';
  visiblePassword: boolean = false;
  @Input() title?: string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() error: string | null = null;
  @Input() placeholder!: string;
  @Input() icon?: string;
  @Input() isValid: boolean = false;

  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  @Output() selectedChange: EventEmitter<string> =
  new EventEmitter<string>();
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>(); 
  
  private unsubscribe$: Subject<void> = new Subject<void>();
  filteredList$: Observable<string[]> = 
  new Observable<string[]>; 

  constructor() {
    this.input.valueChanges.pipe(
      debounceTime(300),
      filter((value): value is string => value !== null && value.trim() !== ''), // Type guard to ensure value is string
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$) 
    ).subscribe(value => {
      this.valueChange.emit(value);
    });
  }

  newSelection(entry: string): void {
    this.selectedChange.emit(entry);
  }

// password conforming
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
resetFilter(): void {
  this.typedFilter.reset();
  this.selectedChange.emit('');
}
ngOnDestroy() {
  this.unsubscribe$.next(); 
  this.unsubscribe$.complete(); 
}
}
