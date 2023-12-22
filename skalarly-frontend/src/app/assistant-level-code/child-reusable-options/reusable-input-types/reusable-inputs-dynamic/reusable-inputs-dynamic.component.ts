import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { InputImports } from '../input-imports';

type FormControlOrGroup = FormControl<string | null> | FormGroup;
@Component({
  standalone: true,
  selector: 'app-inputs-dynamic',
  templateUrl: './reusable-inputs-dynamic.component.html',
  styleUrl: './reusable-inputs-dynamic.component.scss',
  imports: [
    MatButtonModule,
    MatSelectModule,
    InputImports
  ]
})
export class ReusableInputsDynamicComponent implements OnChanges {
  socialMediaOptions = [
    { name: 'LinkedIn', placeholder: 'LinkedIn URL', icon: 'linkedin' },
    { name: 'Twitter', placeholder: 'Twitter URL', icon: 'twitter' },
    { name: 'Instagram', placeholder: 'Instagram URL', icon: 'instagram' },
    { name: 'Facebook', placeholder: 'Facebook URL', icon: 'facebook' },
    { name: 'YouTube', placeholder: 'YouTube URL', icon: 'youtube' },
    { name: 'Pinterest', placeholder: 'Pinterest URL', icon: 'pinterest' },
    { name: 'Snapchat', placeholder: 'Snapchat URL', icon: 'snapchat' },
    { name: 'TikTok', placeholder: 'TikTok URL', icon: 'tiktok' },
    { name: 'Reddit', placeholder: 'Reddit URL', icon: 'reddit' },
    { name: 'Tumblr', placeholder: 'Tumblr URL', icon: 'tumblr' },
    { name: 'Flickr', placeholder: 'Flickr URL', icon: 'flickr' },
    { name: 'Spotify', placeholder: 'Spotify URL', icon: 'spotify' },
    { name: 'GitHub', placeholder: 'GitHub URL', icon: 'github' },
    { name: 'Vimeo', placeholder: 'Vimeo URL', icon: 'vimeo' },
    { name: 'Dribbble', placeholder: 'Dribbble URL', icon: 'dribbble' },
    { name: 'Behance', placeholder: 'Behance URL', icon: 'behance' },
    { name: 'Medium', placeholder: 'Medium URL', icon: 'medium' },
    { name: 'SoundCloud', placeholder: 'SoundCloud URL', icon: 'soundcloud' },
    { name: 'Goodreads', placeholder: 'Goodreads URL', icon: 'goodreads' },
    { name: 'Skype', placeholder: 'Skype URL', icon: 'skype' }
];

  @Input() inputsArray: FormArray<FormControlOrGroup> = new FormArray<FormControlOrGroup>([]); 
  @Input() placeholder?: string;
  @Input() icon?: string;
  @Input() controlType: 'text' | 'url' = 'text';
  selectedOption = this.socialMediaOptions.find(
    option => option.name === this.selectedSocialMedia?.value
  );
  newGroup = new FormGroup({
    control: new FormControl<string | null>(null),
    socialMedia: new FormControl(this.selectedOption)
  });
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['controlType']) {
      this.initializeInputArray();
    }
  }
  // then combine controlOrGroupText & controlOrGroup
  // then combine controlOrGroupUrl & controlOrGroup
  controlOrGroupText: FormControl<string | null> = new FormControl<string | null>('')
  controlOrGroupUrl = new FormGroup({
    control: new FormControl<string | null>(null),
    socialMedia: new FormControl(this.selectedOption)
  });

private initializeInputArray(): void {
    if (this.controlType === 'text') {
        this.inputsArray.push(
            new FormControl<string>(''));
    } else if (this.controlType === 'url') {
        this.inputsArray.push(this.newGroup);
    }
}
  selectedSocialMedia = new FormControl('');

  addInput(): void {
    if (this.controlType === 'text') {
      this.inputsArray.push(new FormControl<string>(''));
    } else if (this.controlType === 'url') {
      
      if (this.selectedOption) {
    
        this.inputsArray.push(this.newGroup);
      }
    }
  }
  
  removeInput(index: number): void {
    this.inputsArray.removeAt(index);
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
}

