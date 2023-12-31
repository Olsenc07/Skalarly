import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, combineLatest, debounceTime, distinctUntilChanged, startWith, map } from 'rxjs';
import { SocialMediaOptions } from './../reusable-inputs-misc.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import {  AsyncPipe } from '@angular/common';

type FormControlOrGroup = FormControl<string | null> | FormGroup;
interface media {
  name: string; placeholder: string; icon: string; 
}
@Component({
  selector: 'app-reusable-input-dynamic',
  standalone: true,
  imports: [AsyncPipe, MatInputModule, MatIconModule, 
    MatAutocompleteModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './reusable-input-dynamic.component.html',
  styleUrl: '../../reusable-inputs/reusable-inputs.component.scss'
})
export class ReusableInputDynamicComponent {
  typedFilter: FormControl<string | null> = new FormControl<string | null>('');
  @Input() inputsArray: FormArray<FormControlOrGroup> = new FormArray<FormControlOrGroup>([]); 
  @Input() controlType!: 'text' | 'url';
  @Input() title?: string;
  @Input() label?: string;
  @Input() hint?: string;
  @Input() error: string | null = null;
  @Input() placeholder!: string;
  @Input() List: string[] = [''];
  @Input() icon?: string;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  filteredList$: Observable<string[]> = 
  new Observable<string[]>; 
  newGroup: FormGroup | undefined;
  selectedOption: media| undefined;
  socialMediaOptions: media[] = [];
constructor() {
  if (this.controlType === 'text') {
    this.inputsArray.push(new FormControl<string>(''));
  } else if (this.controlType === 'url') {
    if (this.newGroup) {
      this.inputsArray.push(this.newGroup);
    }
  }
}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['List']) {
      this.setupFilteredList();
    }
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
    controlOrGroupText: FormControl<string | null> = new FormControl<string | null>('');
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
}
