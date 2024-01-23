import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reusable-input-dynamic',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatChipsModule,
   MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './reusable-input-dynamic.component.html',
  styleUrl: '../../reusable-inputs/reusable-inputs.component.scss'
})
export class ReusableInputDynamicComponent  {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  inputsStrings: FormControl<string[] | null> = new FormControl([]);
  @Input() label?: string;
  @Input() icon?: string;

  @Output() inputChange: EventEmitter<string[]> =
  new EventEmitter<string[]>();
    add(event: MatChipInputEvent): void {
      const value: string = (event.value || '').trim();
      if (!value) {
        return;
      } else{
        const currentInputs = (this.inputsStrings.value || []) as string[];
        this.inputsStrings.setValue([...currentInputs, value]);
      event.chipInput!.clear();
      }
    }
    remove(index: number): void {
      const currentInputs = this.inputsStrings.value;
      if (currentInputs && index >= 0 && index < currentInputs.length) {
        const updatedInputs = currentInputs.slice(0, index).concat(currentInputs.slice(index + 1));
        if (Array.isArray(updatedInputs) && updatedInputs.every(item => typeof item === 'string')) {
          this.inputsStrings.setValue(updatedInputs as string[]);
        }
      }
   
    }
  
    edit(input: string, event: MatChipEditedEvent, index: number): void {
      const value: string = event.value.trim();
      if (!value) {
        this.remove(index);
        return;
      } else {
        const currentInputs: string[] | null = this.inputsStrings.value;
        if (typeof input === 'string' && currentInputs) {
          const updatedInputs: string[] = [...currentInputs];
          updatedInputs[index] = value;
          this.inputsStrings.setValue(updatedInputs);
        }}
  }}
