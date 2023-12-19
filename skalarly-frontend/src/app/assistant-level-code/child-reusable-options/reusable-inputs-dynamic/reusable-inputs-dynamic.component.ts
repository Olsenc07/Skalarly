import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-inputs-dynamic',
  templateUrl: './reusable-inputs-dynamic.component.html',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class ReusableInputsDynamicComponent {
  @Input() inputsArray!: FormArray<FormControl<string | null>>;
  @Input() placeholder: string | undefined;
  @Input() icon: string | undefined;

  addInput() {
    this.inputsArray.push(new FormControl<string>(''));
  }

  removeInput(index: number) {
    this.inputsArray.removeAt(index);
  }
}

