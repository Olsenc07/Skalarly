import { Component, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-inputs-dynamic',
  templateUrl: './reusable-inputs-dynamic.component.html'
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

