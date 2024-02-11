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
  inputsString: FormControl<string | null> = new FormControl('');
  inputsEntered: FormControl<string[] | null> = new FormControl([]);
  @Input() label?: string;
  @Input() filler?: string;
  @Output() inputChange: EventEmitter<string[]> =
  new EventEmitter<string[]>();
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
    add(event: MatChipInputEvent): void {
      const value: string = (event.value || '').trim();
      if (value) {
        const currentInputs = this.inputsEntered.value || []
        currentInputs.push(value);
        this.inputsEntered.setValue(currentInputs);
        this.inputChange.emit(currentInputs);
        this.inputsString.reset();
      }
    }

    remove(index: number): void {
      const currentInputs = this.inputsEntered.value || [];
      currentInputs.splice(index, 1); 
      this.inputsEntered.setValue(currentInputs); 
      this.inputChange.emit(currentInputs); 
    }
  
    edit(changedChip: string, event: MatChipEditedEvent, index: number): void {
      console.log('edit', changedChip);
      console.log('edit 3', event.value);
      const editedValue = event.value.trim();
      if (editedValue) {
        const currentInputs = this.inputsEntered.value || [];
        currentInputs[index] = editedValue;
        this.inputsEntered.setValue(currentInputs);
        this.inputChange.emit(currentInputs);
      }
    }
}
