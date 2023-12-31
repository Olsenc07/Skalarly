import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subject, debounceTime, filter, distinctUntilChanged, takeUntil, Observable, of } from 'rxjs';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PassWordInterface } from 'src/app/assistant-level-code/custom-architecture-aids/interfaces/password-interface';
import {MatAutocomplete, MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';
import { SocialMediaOptions } from './reusable-inputs-misc.component';
import { combineLatest, } from 'rxjs';
import {  map, startWith } from 'rxjs/operators';
import { BoldPipe } from '../../custom-architecture-aids/pipes/bold.pipe';
import { AlphabeticalPipe } from '../../custom-architecture-aids/pipes/alphabetical.pipe';
type FormControlOrGroup = FormControl<string | null> | FormGroup;
interface media {
  name: string; placeholder: string; icon: string; 
}
@Component({
  selector: 'app-reusable-inputs',
  standalone: true,
  imports: [
    AlphabeticalPipe,
    BoldPipe,
    CommonModule,
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
  typedFilter: FormControl<string | null> = new FormControl<string | null>('');
  @Input() inputsArray: FormArray<FormControlOrGroup> = new FormArray<FormControlOrGroup>([]); 
  @Input() default: boolean = true;
  @Input() dynamic: boolean = false;
  @Input() controlType: 'text' | 'password' | 'url' = 'text';
  visiblePassword: boolean = false;
  @Input() title?: string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() error: string | null = null;
  @Input() placeholder!: string;
  @Input() icon?: string;
  @Input() isValid: boolean = false;
  @Input() List: string[] = [''];
  filteredList$: Observable<string[]> = 
  new Observable<string[]>; 
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  newGroup: FormGroup | undefined;
  selectedOption: media| undefined;
  socialMediaOptions: media[] = []
  @Output() selectedChange: EventEmitter<string> =
  new EventEmitter<string>();
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>(); 
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor() {
    this.input.valueChanges.pipe(
      debounceTime(300),
      filter((value): value is string => value !== null && value.trim() !== ''), // Type guard to ensure value is string
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$) // Take until this.unsubscribe$ emits
    ).subscribe(value => {
      this.valueChange.emit(value);
    });
  }
ngOnChanges(changes: SimpleChanges): void {
  if (changes['List']) {
    this.setupFilteredList();
  }
    if (this.dynamic) {
      this.socialMediaOptions = SocialMediaOptions;
      this.selectedOption = SocialMediaOptions.find(
        option => option.name === this.selectedSocialMedia?.value
      );
      if (this.selectedOption) {
        this.newGroup = new FormGroup({
          control: new FormControl<string | null>(null),
          socialMedia: new FormControl(this.selectedOption)
        });
      }
    }
  }
  private setupFilteredList(): void {
    const list$ = of(this.List);
    this.filteredList$ = combineLatest([
      this.typedFilter.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith('')
      ),
      list$
    ]).pipe(
      map(([typed, institute]) =>
        institute
          .filter((category: string) => category && category.toLowerCase().includes((typed || '').toLowerCase()))
          .sort((a, b) => a.localeCompare(b))
      )
    );
  }
  newSelection(entry: string): void {
    this.selectedChange.emit(entry);
  }
  controlOrGroupText: FormControl<string | null> = new FormControl<string | null>('');

  private initializeInputArray(): void {
    if (this.controlType === 'text') {
      this.inputsArray.push(new FormControl<string>(''));
    } else if (this.controlType === 'url') {
      if (this.newGroup) {
        this.inputsArray.push(this.newGroup);
      }
    }
  }

  selectedSocialMedia = new FormControl('');

  addInput(): void {
    if (this.controlType === 'text') {
      this.inputsArray.push(new FormControl<string>(''));
    } else if (this.controlType === 'url') {
      if (this.selectedOption && this.newGroup) {
        this.inputsArray.push(this.newGroup);
      }
    }
  }

  removeInput(index: number): void {
    this.inputsArray.removeAt(index);
  }
// password conforming
toggleVisibility(): void {
  this.visiblePassword = !this.visiblePassword;
  this.controlType = this.visiblePassword ? 'text' : 'password';
}
isFormControl(controlOrGroup: FormControlOrGroup): controlOrGroup is FormControl<string | null> {
  console.log('hey 1', controlOrGroup);
  return controlOrGroup instanceof FormControl;
}

isFormGroup(controlOrGroup: FormControlOrGroup): controlOrGroup is FormGroup {
  console.log('hey 2', controlOrGroup);

  return controlOrGroup instanceof FormGroup;
}
getFormControl(control: AbstractControl): FormControl {
  console.log('hey 3', control);

  return control as FormControl;
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
