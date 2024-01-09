import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormArray,
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import type {
  InitialAccountInterface,
  SkalarInfoInterface
} from '../../assistant-level-code/custom-architecture-aids/interfaces/skalars-info-interface';
import {
  Subject,
  combineLatest,
  takeUntil,
  tap, map, Observable, of 
} from 'rxjs';
import { ReusableInputDynamicComponent } from '../../assistant-level-code/child-reusable-options/reusable-inputs/reusable-input-dynamic/reusable-input-dynamic.component';
import { AccountManagementService } from '../../assistant-level-code/custom-architecture-aids/services/account-management.service';
import { ErrorPipe } from '../../assistant-level-code/custom-architecture-aids/pipes/error.pipe';

import { emailUsernameValidator } from '../../assistant-level-code/custom-architecture-aids/validators/email-username.validator';
import { InstitutionInfoService } from '../../assistant-level-code/custom-architecture-aids/services/create-edit-account/institution-info.service';
import { passwordValidator } from '../../assistant-level-code/custom-architecture-aids/validators/password.validator';
import { ReusableInputsComponent } from '../../assistant-level-code/child-reusable-options/reusable-inputs/reusable-inputs.component';
import { SignUpFormStateService } from '../../assistant-level-code/custom-architecture-aids/services/create-edit-account/signup-form-state.service';
import { OrientationService } from 'src/app/assistant-level-code/custom-architecture-aids/services/orientation.service';

import { SkeletonLoaderSignupComponent } from './skeleton-loader-signup/skeleton-loader-signup.component';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider'
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';


@Component({
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  imports: [
    SkeletonLoaderSignupComponent,
    ReusableInputsComponent,
    ReusableInputDynamicComponent,
    ErrorPipe,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignUpComponent implements OnInit, OnDestroy {
  initialList$: Observable<string[]> = new Observable<string[]>;
  title: string = 'Which country do you study in?';
  selectedFile: File | undefined;
  imagePreview: string | ArrayBuffer | null = '';
  instituitionForm: FormGroup;
  signUpForm: FormGroup;
  personalForm: FormGroup;
  private values$: Subject<void> = new Subject<void>();
  private accountSub$: Subject<void> = new Subject<void>();
  // second major stage
  userInteracted: boolean = false;
  visiblePassword: boolean = false;
  domain: string[] | undefined = undefined;
  // skalar info form
  infoForm: FormGroup = new FormGroup({
    club: new FormControl<SkalarInfoInterface['club']>(null, [
      Validators.required
    ]),
    domains: new FormControl<SkalarInfoInterface['domains']>(
      [''],
      [Validators.required]
    ),
    sport: new FormControl<SkalarInfoInterface['sport']>(null, [
      Validators.required
    ]),
    major: new FormControl<SkalarInfoInterface['major']>(null, [
      Validators.required
    ]),
    minor: new FormControl<SkalarInfoInterface['minor']>(null, [
      Validators.required
    ]),
    name: new FormControl<SkalarInfoInterface['name']>('', [
      Validators.required
    ]),
    region: new FormControl<SkalarInfoInterface['region']>('', [
      Validators.required
    ]),
    institution: new FormControl<SkalarInfoInterface['institution']>('', [
      Validators.required
    ]),
    webPages: new FormControl<SkalarInfoInterface['webPages']>(
      [''],
      [Validators.required]
    )
  });

    // final major stage
    skalarInfoForm: FormGroup = new FormGroup({
      major: new FormArray([]),
      minor: new FormArray([]),
      sport: new FormArray([]),
      club: new FormArray([]),
      coursesCompleted: new FormArray([]),
      coursesPursing: new FormArray([]),
      links: new FormArray([])
    });

  // Helper method to get the FormArray
  getArray(name: string): FormArray {
    return this.skalarInfoForm.get(name) as FormArray;
  }

  constructor(
    private accountManagementService: AccountManagementService,
    protected institutionInfoService: InstitutionInfoService,
    private formStateService: SignUpFormStateService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    protected orientationService: OrientationService
  ) {
    this.instituitionForm = new FormGroup({
      country: new FormControl<string>(''),
      region: new FormControl<string>(''),
      type: new FormControl<string>(''),
      institution: new FormControl<string>(''),
      webpages: new FormControl<Array<string>>([''])
    });
    this.signUpForm = new FormGroup({
      username: new FormControl<InitialAccountInterface['username']>(
        '',
        [
          Validators.required,
          emailUsernameValidator(this.accountManagementService, true)
        ]
      ),
      email: new FormControl<InitialAccountInterface['email']>(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          emailUsernameValidator(
            this.accountManagementService,
            false,
            this.domain
          )
        ])
      ),
      password: new FormControl<InitialAccountInterface['password']>(
        '',
        {
          validators: [Validators.required],
          asyncValidators: [passwordValidator()]
        }
      )
    });
    this.personalForm = new FormGroup({});
  }
  get usernameControl(): FormControl {
    return this.signUpForm.get('username') as FormControl;
  }

  get emailControl(): FormControl {
    return this.signUpForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signUpForm.get('password') as FormControl;
  }
  getError(controlName: string): string | null {
    const controlErrors: ValidationErrors | null | undefined =
      this.signUpForm.get(controlName)?.errors;
    if (controlErrors) {
      return Object.keys(controlErrors)[0];
    }
    return null;
  }
  ngOnInit(): void {
    this.titleService.setTitle('Skalarly - Signup');
    this.initialList$ = of(this.institutionInfoService.symbol());
    // intitial call
    combineLatest([
      this.signUpForm.get('username')!.valueChanges,
      this.signUpForm.get('email')!.valueChanges,
      this.signUpForm.get('password')!.valueChanges
    ])
      .pipe(
        map(
          ([username, email, password]) => !!username || !!email || !!password
        ),
        tap((hasValue) => this.formStateService.setUnsavedChanges(hasValue)),
        takeUntil(this.values$)
      )
      // eslint-disable-next-line rxjs-angular/prefer-async-pipe
      .subscribe();
  }
handleValueChange(controlName: string, value: string): void {
    const control = this.signUpForm.get(controlName);
    control?.setValue(value);
  }
// Common method for setting form value or resetting based on condition
private updateFormValue(formControlName: string, value: string | null, newTitle: string): void {
  if (value) {
    this.instituitionForm.get(formControlName)?.setValue(value);
  } else {
    this.instituitionForm.get(formControlName)?.reset();
  }
  this.title = newTitle;
}
updateCountrySelection(country: string): void {
  this.updateFormValue('country', country, country ? 'Which region of the country?' : 'Which country do you study in?');
  if (country) {
    console.log('country', country);
    this.institutionInfoService.getStateProvinces(country);
    this.initialList$ = of(this.institutionInfoService.symbol());
  }
}
regionSelection(stateProvince: string): void {
  this.updateFormValue('region', stateProvince, stateProvince ? 'What type of school?' : 'Which region of the country?');
  if (stateProvince) {
    // Assuming you have a method to fetch the types of institutions
    this.institutionInfoService.getSchoolTypes(stateProvince);
    // this.initialList$ = of(this.institutionInfoService.symbol());
  }
}
typeInstituition(type: string): void {
  this.updateFormValue('type', type, 'What is the school’s name?');
  if (type) {
    this.institutionInfoService.getSchoolNames(this.instituitionForm.get('region')?.value, type);
    // this.initialList$ = of(this.institutionInfoService.symbol());
  }
}
chosenInstituition(institution: string): void {
  this.updateFormValue('institution', institution, 'What is the schools name?');
  if(institution){
    this.domain = this.institutionInfoService.getSchoolNamesEmails(institution);
  }
}

  // toggle password visbility
  toggleVisibility(): void {
    this.visiblePassword = !this.visiblePassword;
  }
  // request to use route guard
  getRouteGuardStatus(): boolean {
    return this.userInteracted;
  }
  // save initial credentials
  firstSubmit(): void {
    // if successfully saved
    console.log('email sent no validate account');
    this.accountManagementService.createAccount(this.signUpForm);
  }
  // initial submit
  createAccount(): void {
    this.accountManagementService
      .createAccount(this.signUpForm)
      .pipe(takeUntil(this.accountSub$))
      .subscribe((success) => {
        if (success) {
          // navigate to next page
        } else {
          // handle failed creation
          // try again
        }
      });
  }
  validate(code: string): void {
    // this is triggered as soon as seventh code input as been typed in
    this.accountManagementService.validateAccount(code).subscribe((success) => {
      if (success) {
        // if successful
        // allow further signup
      } else {
        // handle failed validation
        // try again
      }
    });
  }

// Account Info
isValid = false; // Validity status

onValueChange(value: string) {
  // Perform validation and update isValid
  this.isValid = this.validateValue(value);
}

validateValue(value: string): boolean {
  // Custom validation logic
  return value.length > 3; // Example: valid if length is greater than 3
}
// Inside your Angular component
onFileSelected(event: Event) {
  if (isPlatformBrowser(this.platformId)) {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement && inputElement.files && inputElement.files.length > 0) {
    const file = inputElement.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
}
onCameraClick() {
  if (isPlatformBrowser(this.platformId)) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('Media Devices API or getUserMedia is not supported in this browser.');
    return;
  }

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      // You'll need to handle the stream here.
      // For example, you could display it in a video element for the user to take a picture.
    })
    .catch(err => {
      console.error('Error accessing the camera:', err);
    });
  }
}

  // final submit
  addSkalarInfo(): void {
    this.router.navigate(['/home']);

  //   this.accountManagementService
  //     .createAccount(this.infoForm)
  //     .pipe(takeUntil(this.skalarInfoSub$))
  //     .subscribe((success) => {
  //       if (success) {
  //         const messageWithIcon = `
  //   <h2>
  //   <i class="fa-solid fa-graduation-cap"></i>
  //     Welcome to Skalarly!
  //     <i class="fa-solid fa-graduation-cap"></i>
  //   </h2>
  //   <br>
  //  <span>
  //  We're delighted to have you kick-start your academic journey with us. 
  //  Here you're an esteemed member of our vibrant educational community.
  //   Get ready to connect with fellow learners, explore enriching content, and embark on a shared academic adventure.
  //  </span> `;
  //         this.updateProgress(100);
  //         // display message
  //         this.snackBar.open(messageWithIcon, '', {
  //           duration: 5000,
  //           panelClass: ['snackbar-cleared-icon'] // add styling
  //         });
  //         // navigate to home page
  //         this.router.navigate(['/home']);
  //       } else {
  //         // handle failed creation
  //         // try again
  //       }
  //     });
  }

  // clean up
  navigate(): void {
    this.router.navigate(['/login']);
  }
  // if skalar trys to close entire browser before cpmpleting,delete saved content
  ngOnDestroy(): void {
    this.values$.next(); 
    this.values$.complete();
    this.accountSub$.next();
    this.accountSub$.complete();
  }
}
