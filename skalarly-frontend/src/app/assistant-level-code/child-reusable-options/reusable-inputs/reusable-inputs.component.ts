import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, filter, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reusable-inputs',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  templateUrl: './reusable-inputs.component.html',
  styleUrl: './reusable-inputs.component.scss'
})
export class ReusableInputsComponent implements OnDestroy {
  input: FormControl<string | null> = new FormControl<string | null>('');
  @Input() default: boolean = true;
  @Input() title?: string;
  @Input() label?: string;
  @Input() error: string | null = null;
  @Input() placeholder!: string;
  @Input() icon?: string;
  @Input() isValid: boolean = false;

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
  
    ngOnDestroy() {
      this.unsubscribe$.next(); 
      this.unsubscribe$.complete(); 
    }
  
}
