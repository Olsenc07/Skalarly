import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
type FormControlOrGroup = FormControl<string | null> | FormGroup;
@Component({
  standalone: true,
  selector: 'app-inputs-dynamic',
  templateUrl: './reusable-inputs-dynamic.component.html',
  imports: [
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class ReusableInputsDynamicComponent {
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

  selectedSocialMedia = new FormControl('');

  addInput(): void {
    if (this.controlType === 'text') {
      this.inputsArray.push(new FormControl<string>(''));
    } else if (this.controlType === 'url') {
      const selectedOption = this.socialMediaOptions.find(
        option => option.name === this.selectedSocialMedia.value
      );
      if (selectedOption) {
        const newGroup = new FormGroup({
          control: new FormControl<string | null>(null),
          socialMedia: new FormControl(selectedOption)
        });
        this.inputsArray.push(newGroup);
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

