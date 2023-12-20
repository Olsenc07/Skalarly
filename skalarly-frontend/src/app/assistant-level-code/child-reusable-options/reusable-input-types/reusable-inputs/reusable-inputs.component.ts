import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, debounceTime, filter, distinctUntilChanged, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InputImports } from '../input-imports';

@Component({
  selector: 'app-reusable-inputs',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    InputImports
  ],
  templateUrl: './reusable-inputs.component.html',
  styleUrl: './reusable-inputs.component.scss'
})
export class ReusableInputsComponent implements OnDestroy {
  input: FormControl<string | null> = new FormControl<string | null>('');
  @Input() default: boolean = true;
  @Input() title?: string;
  @Input() label?: string;
  @Input() hint?: string;
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
