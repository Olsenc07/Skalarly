import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, combineLatest, debounceTime, distinctUntilChanged, startWith, map } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SocialMediaOptions } from './../reusable-inputs-misc.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {  AsyncPipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
interface socialLinks {
  name: string; 
  url: string; 
}
@Component({
  selector: 'app-reusable-input-dynamic',
  standalone: true,
  imports: [AsyncPipe, MatInputModule, MatIconModule, MatChipsModule,
    MatAutocompleteModule, MatFormFieldModule, MatMenuModule,
    MatButtonModule, ReactiveFormsModule],
  templateUrl: './reusable-input-dynamic.component.html',
  styleUrl: '../../reusable-inputs/reusable-inputs.component.scss'
})
export class ReusableInputDynamicComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  inputsStrings: FormControl<string[] | null> = new FormControl(['']);
  inputsLinks: FormControl<socialLinks[] | null> = new FormControl([]);
  @Input() controlType!: 'text' | 'url';
  @Input() title?: string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() error: string | null = null;
  @Input() placeholder!: string;
  @Input() List: string[] = [''];
  @Input() icon?: string;


  // auto correct only for socialLinks 
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  filteredList$: Observable<socialLinks[]> = 
  new Observable<socialLinks[]>; 
  @Output() inputChange: EventEmitter<string[]> =
  new EventEmitter<string[]>();
  @Output() inputChangeUrl: EventEmitter<socialLinks[]> =
  new EventEmitter<socialLinks[]>();
  // when inputsStrings value changes, and stoppedtyping,
  // emit that formcontrol
  // on change emitSelectedChange(selectedValue: string): void {
  // this.selectedChange.emit(selectedValue);

// resetFilter(): void {
//   this.typedFilter.reset();
//   this.selectedChange.emit('');
// }
// selected(event: MatAutocompleteSelectedEvent): void {
//   this.fruits.push(event.option.viewValue);
//   this.fruitInput.nativeElement.value = '';
//   this.fruitCtrl.setValue(null);
// }

// private _filter(value: string): string[] {
//   const filterValue = value.toLowerCase();

//   return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
// }
searchControl = new FormControl();

ngOnInit() {
  this.filteredList$ = this.searchControl.valueChanges.pipe(
    startWith(''),
    map(value => this.filterSocialMediaOptions(value))
  );
}

private filterSocialMediaOptions(value: string): socialLinks[] {
  const filterValue = value.toLowerCase();
  return SocialMediaOptions.filter(option => 
    option.name.toLowerCase().includes(filterValue)
  );
}
    add(event: MatChipInputEvent): void {
      const value: string = (event.value || '').trim();
      if (!value) {
        return;
      }
      if (this.controlType === 'text') {
        const currentInputs = (this.inputsStrings.value || []) as string[];
        this.inputsStrings.setValue([...currentInputs, value]);
      } else if (this.controlType === 'url') {
        const currentInputs = (this.inputsLinks.value || []) as socialLinks[];
        this.inputsLinks.setValue([...currentInputs, { name: value, url: value }]);
      }
  
      event.chipInput!.clear();
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
    removeUrl(index: number): void {
        const currentInputs = this.inputsLinks.value;
        if (currentInputs && index >= 0 && index < currentInputs.length) {
          const updatedInputs = currentInputs.slice(0, index).concat(currentInputs.slice(index + 1));
         if (Array.isArray(updatedInputs) && updatedInputs.every(item => typeof item === 'object')) {
          this.inputsLinks.setValue(updatedInputs as socialLinks[]);

      }
    }
    }
    edit(input: string, event: MatChipEditedEvent, index: number): void {
      const value: string = event.value.trim();
      if (!value) {
        this.remove(index);
        return;
      } else 
      if (this.controlType === 'text') {
        const currentInputs: string[] | null = this.inputsStrings.value;
        if (typeof input === 'string' && currentInputs) {
          const updatedInputs: string[] = [...currentInputs];
          updatedInputs[index] = value;
          this.inputsStrings.setValue(updatedInputs);
        }
      }
    }
    editLinks(input:  socialLinks, event: MatChipEditedEvent, index: number): void {
      const value: string = event.value.trim();
      if (!value) {
        this.remove(index);
        return;
      } else
    if (this.controlType === 'url') {
      const currentInputs: socialLinks[] | null = this.inputsLinks.value;
      if (typeof input === 'object' && currentInputs) {
        const updatedInputs: socialLinks[] = [...currentInputs];
        updatedInputs[index] = { ...input, name: value, url: value };
        this.inputsLinks.setValue(updatedInputs);
      }
    }}
  }
