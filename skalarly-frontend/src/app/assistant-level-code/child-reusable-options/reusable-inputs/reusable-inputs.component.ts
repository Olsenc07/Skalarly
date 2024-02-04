import { Component, EventEmitter, Input, OnChanges, OnDestroy,  Output, ViewChild } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, Observable, map, startWith, combineLatest, of} from 'rxjs';
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

@Component({
  selector: 'app-reusable-inputs',
  standalone: true,
  imports: [
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
export class ReusableInputsComponent implements OnChanges, OnDestroy {
  input: FormControl<string | null> = new FormControl<string | null>('');
  visiblePassword: boolean = false;
  listItems: string[] = [];
  @Input() default: boolean = true;  
  @Input() filler?: string;  
  @Input() controlType: 'text' | 'password' = 'text';
  @Input() title?: string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() error: string | null = null;
  @Input() icon?: string;
  @Input() isValid: boolean = false;
  @Input() initialList: string[] = [''];

  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  auto: MatAutocomplete | undefined; 
  @Output() selectedChange: EventEmitter<string> =
  new EventEmitter<string>();
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>(); 
  
  private unsubscribe$: Subject<void> = new Subject<void>();
  filteredList$: Observable<string[]> = new Observable<string[]>;

  ngOnChanges(): void {
    console.log('list', this.initialList)
    this.filteredList$ = combineLatest([
      this.input.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      startWith('')),
      of(this.initialList)
      ]).pipe(
        map(([typed, list]) => {
          const filteredList = list.filter(item => item != null);
          if (!typed) {
            return filteredList.map(item => this.capitalizeFirstLetterEachWord(item.toLowerCase()));
          }
          return filteredList
            .filter(item => item.toLowerCase().includes(typed.toLowerCase()))
            .map(item => this.capitalizeFirstLetterEachWord(item.toLowerCase()));
        })
      );
}
capitalizeFirstLetterEachWord(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
onAutocompleteOpened(): void {
  console.log('open')
  document.body.style.overflow = 'hidden'; // Disable body scrolling to hide header
}

onAutocompleteClosed(): void {
  document.body.style.overflow = ''; // Re-enable body scrolling
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

emitSelectedChange(selectedValue: string): void {
  this.selectedChange.emit(selectedValue);
}

reset(): void {
  this.input.reset()
  this.selectedChange.emit('');
}
ngOnDestroy() {
  this.unsubscribe$.next(); 
  this.unsubscribe$.complete(); 
}
}
