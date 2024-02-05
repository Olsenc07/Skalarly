import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {  MatChipInputEvent, MatChipsModule, MatChipEditedEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, debounceTime, distinctUntilChanged, startWith, map } from 'rxjs';
import { FormControl,  ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SocialMediaOptions } from '../reusable-inputs-misc.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BoldPipe } from 'src/app/assistant-level-code/custom-architecture-aids/pipes/bold.pipe';
interface socialLinks {
  name: string; 
  url: string; 
}
@Component({
  selector: 'app-reusable-input-autocomplete',
  standalone: true,
  imports: [AsyncPipe, BoldPipe, MatButtonModule, MatAutocompleteModule, 
    MatFormFieldModule, MatChipsModule,
    MatIconModule, MatInputModule, 
    ReactiveFormsModule, TitleCasePipe
  ],
  templateUrl: './reusable-input-autocomplete-dynamic.component.html',
  styleUrl: '../reusable-inputs.component.scss'
})
export class ReusableInputAutocompleteDynamicComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  inputObjects: FormControl<socialLinks[] | null> = new FormControl(null);
  filterControl: FormControl<string | null> = new FormControl(null);
  @Input() label?: string;
  @Input() icon?: string;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  filteredList$: Observable<socialLinks[]> = 
  new Observable<socialLinks[]>; 

  @Output() inputChangeObject: EventEmitter<socialLinks[]> =
  new EventEmitter<socialLinks[]>();

  ngOnInit(): void {
    this.filteredList$ = this.filterControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      startWith(''),
      map(typedValue => typedValue ? this.filterSocialMediaOptions(typedValue) : SocialMediaOptions)
    );
  }
  private filterSocialMediaOptions(value: string ): socialLinks[] {
    const filterValue = value.toLowerCase();
    return SocialMediaOptions.filter(option => 
      option.name.toLowerCase().includes(filterValue)
    );
  }
  capitalizeFirstLetterEachWord(str: string): string {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  emitSelectedChange(event: MatAutocompleteSelectedEvent): void {
    const selectedOption: socialLinks = event.option.value;
    const currentLinks: socialLinks[] = this.inputObjects.value || [];
    if (!currentLinks.some(link => link.name === selectedOption.name && link.url === selectedOption.url)) {
      const updatedLinks = [...currentLinks, selectedOption];
      this.inputObjects.setValue(updatedLinks);
      this.inputChangeObject.emit(updatedLinks);
    }
  }
  add(event: MatChipInputEvent): void {
    const value: string = (event.value || '').trim();
    if (!value) {
      return;
    }else {
    const currentInputs = (this.inputObjects.value || []) as socialLinks[];
    this.inputObjects.setValue([...currentInputs, { name: value, url: value }]);
  }
  event.chipInput!.clear();
}
 
  remove(index: number): void {
    const currentInputs = this.inputObjects.value;
    if (currentInputs && index >= 0 && index < currentInputs.length) {
      const updatedInputs = currentInputs.slice(0, index).concat(currentInputs.slice(index + 1));
     if (Array.isArray(updatedInputs) && updatedInputs.every(item => typeof item === 'object')) {
      this.inputObjects.setValue(updatedInputs as socialLinks[]);
     }
  }}
  edit(input: socialLinks, event: MatChipEditedEvent, index: number): void {
    const value: string = event.value.trim();
    if (!value) {
      this.remove(index);
      return;
    } else {
    const currentInputs: socialLinks[] | null = this.inputObjects.value;
    if (currentInputs) {
      const updatedInputs: socialLinks[] = [...currentInputs];
      updatedInputs[index] = { ...input, name: value, url: value };
      this.inputObjects.setValue(updatedInputs);
  }}
}
}
