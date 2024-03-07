import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms'
import type {
  InitialAccountInterface,
  SkalarInfoInterface
} from '../../../../../shared/interfaces/skalars-info-interface'
import { Subject, Subscription, combineLatest, map, takeUntil, tap } from 'rxjs'
import { ReusableInputDynamicComponent } from '../../assistant-level-code/child-reusable-options/reusable-inputs/reusable-input-dynamic/reusable-input-dynamic.component'
import { AccountManagementService } from '../../assistant-level-code/custom-architecture-aids/services/account-management.service'
import { ErrorPipe } from '../../assistant-level-code/custom-architecture-aids/pipes/error.pipe'

import { emailUsernameValidator } from '../../assistant-level-code/custom-architecture-aids/validators/email-username.validator'
import { InstitutionInfoService } from '../../assistant-level-code/custom-architecture-aids/services/create-edit-account/institution-info.service'
import { passwordValidator } from '../../assistant-level-code/custom-architecture-aids/validators/password.validator'
import { ReusableInputsComponent } from '../../assistant-level-code/child-reusable-options/reusable-inputs/reusable-inputs.component'
import { SignUpFormStateService } from '../../assistant-level-code/custom-architecture-aids/services/create-edit-account/signup-form-state.service'
import { OrientationService } from '../../assistant-level-code/custom-architecture-aids/services/orientation.service'

import { SkeletonLoaderSignupComponent } from './skeleton-loader-signup/skeleton-loader-signup.component'
import { Router } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatStepperModule } from '@angular/material/stepper'
import { HttpClientModule } from '@angular/common/http'
import { isPlatformBrowser } from '@angular/common'
import { SignupTitlesComponent } from './signup-titles/signup-titles.component'
import { ImagePreviewComponent } from '../../assistant-level-code/child-reusable-options/image-preview/image-preview.component'

@Component({
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  imports: [
    ErrorPipe,
    ImagePreviewComponent,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ReusableInputsComponent,
    ReusableInputDynamicComponent,
    SkeletonLoaderSignupComponent,
    SignupTitlesComponent,
    HttpClientModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit, OnDestroy {
  userInteracted: boolean = false
  title: string = 'Where is your institution located?'
  intro: string = "Let's find where you study"

  title2: string = 'Provide an email that is recognized by your school.'
  intro2: string = 'Validate enrollment'

  title3: string = 'This cannot be changed later.'
  intro3: string = 'Choose a unique username'

  title4: string = 'This will be displayed on your profile.'
  intro4: string = 'Basic information'

  title5: string = 'This is used to help connect you with others.'
  intro5: string = 'Main focuses'

  selectedFile: File | undefined
  imagePreview: string | ArrayBuffer | null = ''
  instituitionForm: FormGroup
  signUpForm: FormGroup
  personalForm: FormGroup
  private activatedSubscription$: Subscription
  private values$: Subject<void> = new Subject<void>()
  private accountSub$: Subject<void> = new Subject<void>()
  // second major stage
  visiblePassword: boolean = false
  // skalar info form
  infoForm: FormGroup = new FormGroup({
    club: new FormControl<SkalarInfoInterface['club']>([]),
    domains: new FormControl<SkalarInfoInterface['domains']>(
      [''],
      [Validators.required]
    ),
    sport: new FormControl<SkalarInfoInterface['sport']>([]),
    major: new FormControl<SkalarInfoInterface['major']>([]),
    minor: new FormControl<SkalarInfoInterface['minor']>([]),
    completedCourses: new FormControl<SkalarInfoInterface['completedCourses']>(
      []
    ),
    pursuingCourses: new FormControl<SkalarInfoInterface['pursuingCourses']>(
      []
    ),
    photo: new FormControl<SkalarInfoInterface['photo']>(''),
    name: new FormControl<SkalarInfoInterface['name']>('', [
      Validators.required
    ]),
    region: new FormControl<SkalarInfoInterface['region']>('', [
      Validators.required
    ]),
    institution: new FormControl<SkalarInfoInterface['institution']>('', [
      Validators.required
    ]),
    webPages: new FormControl<SkalarInfoInterface['webPages']>([])
  })

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
      country: new FormControl<string>('Canada'),
      region: new FormControl<string>(''),
      type: new FormControl<string>(''),
      institution: new FormControl<string>(''),
      webpages: new FormControl<Array<string>>([''])
    })
    this.signUpForm = new FormGroup({
      username: new FormControl<InitialAccountInterface['username']>('', [
        Validators.required,
        emailUsernameValidator(this.accountManagementService, true)
      ]),
      email: new FormControl<InitialAccountInterface['email']>(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          emailUsernameValidator(
            this.accountManagementService,
            false,
            this.institutionInfoService.instEmails()
          )
        ])
      ),
      password: new FormControl<InitialAccountInterface['password']>('', {
        validators: [Validators.required],
        asyncValidators: [passwordValidator()]
      })
    })
    this.personalForm = new FormGroup({})
    // eslint-disable-next-line rxjs-angular/prefer-async-pipe
    this.activatedSubscription$ = this.signUpForm.valueChanges.subscribe(() => {
      this.userInteracted = true
    })
  }

  getRouteGuardStatus(): boolean {
    return this.userInteracted
  }
  getError(controlName: string): string | null {
    const controlErrors: ValidationErrors | null | undefined =
      this.signUpForm.get(controlName)?.errors
    if (controlErrors) {
      return Object.keys(controlErrors)[0]
    }
    return null
  }
  ngOnInit(): void {
    this.titleService.setTitle('Skalarly - Signup')
    // intitially call canada data
    this.institutionInfoService.getStateProvinces(
      this.instituitionForm.get('country')!.value
    )
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
      .subscribe()
  }
  handleValueChange(controlName: string, value: string): void {
    const control = this.signUpForm.get(controlName)
    control?.setValue(value)
  }
  updateCountrySelection(country: string): void {
    this.updateFormValue('country', country)
    if (country) {
      console.log('1', country)
      this.institutionInfoService.getStateProvinces(country)
    }
  }
  regionSelection(stateProvince: string): void {
    this.updateFormValue('region', stateProvince)
    this.institutionInfoService.getSchoolTypes()
  }
  typeInstituition(type: string): void {
    this.updateFormValue('type', type)
    if (type) {
      this.institutionInfoService.getSchoolNames(
        this.instituitionForm.get('region')!.value,
        type
      )
    }
  }
  chosenInstituition(institution: string): void {
    this.updateFormValue('institution', institution)
    if (institution) {
      this.institutionInfoService.getSchoolEmails(
        this.instituitionForm.get('region')!.value,
        this.instituitionForm.get('type')!.value,
        institution
      )
    }
  }
  // 2nd page
  emailFiller(): string {
    const institutionValue: string =
      this.infoForm.get('institution')?.value ?? null
    if (institutionValue.length > 0) {
      return `Academic email from ${institutionValue}`
    } else {
      return `Academic email from ...`
    }
  }
  getStyledEmailHint(): string {
    if (this.institutionInfoService.instEmails()) {
      const emails: string = this.institutionInfoService.instEmails().join(', ')
      return `Validate email extensions include: ${emails} `
    } else {
      return `This school doesn't have any emails to validate from.`
    }
  }
  updateUrl(socialLinks: string[]): void {
    console.log('webpage', socialLinks)
    this.infoForm.get('webPages')?.setValue(socialLinks)
  }
  clearPreview(): void {
    this.instituitionForm.get('photo')?.reset()
  }
  editPreview(editedPhoto: string): void {
    this.infoForm.get('photo')?.setValue(editedPhoto)
  }
  updateFormValue(fieldName: string, value: any): void {
    const control = this.infoForm.get(fieldName)
    if (control) {
      control.setValue(value)
      console.log(`${fieldName} updated`, value)
    } else {
      console.error(`Form control '${fieldName}' not found`)
    }
  }
  updateForm(fieldName: string, value: string[]): void {
    this.updateFormValue(fieldName, value)
  }

  // toggle password visbility
  toggleVisibility(): void {
    this.visiblePassword = !this.visiblePassword
  }
  // save initial credentials
  firstSubmit(): void {
    // if successfully saved
    console.log('email sent no validate account')
    this.accountManagementService.createAccount(this.signUpForm)
  }
  // initial submit
  createAccount(): void {
    this.accountManagementService
      .createAccount(this.signUpForm)
      .pipe(takeUntil(this.accountSub$))
      // eslint-disable-next-line rxjs-angular/prefer-async-pipe
      .subscribe((success) => {
        if (success) {
          // navigate to next page
        } else {
          // handle failed creation
          // try again
        }
      })
  }
  validate(code: string): void {
    // this is triggered as soon as seventh code input as been typed in
    // eslint-disable-next-line rxjs-angular/prefer-async-pipe
    this.accountManagementService.validateAccount(code).subscribe((success) => {
      if (success) {
        // if successful
        // allow further signup
      } else {
        // handle failed validation
        // try again
      }
    })
  }

  // Account Info
  isValid = false // Validity status

  onValueChange(value: string) {
    // Perform validation and update isValid
    this.isValid = this.validateValue(value)
  }

  validateValue(value: string): boolean {
    // Custom validation logic
    return value.length > 3 // Example: valid if length is greater than 3
  }
  // Inside your Angular component
  onFileSelected(event: Event) {
    // if (isPlatformBrowser(this.platformId)) {
    //   const inputElement = event.target as HTMLInputElement
    //   if (inputElement && inputElement.files && inputElement.files.length > 0) {
    //     const file = inputElement.files[0]
    //     const reader = new FileReader()
    //     reader.onload = () => {
    //       this.imagePreview = reader.result
    //     }
    //     reader.readAsDataURL(file)
    //   }
    // }
  }
  onCameraClick() {
    //   if (isPlatformBrowser(this.platformId)) {
    //     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    //       console.log(
    //         'Media Devices API or getUserMedia is not supported in this browser.'
    //       )
    //       return
    //     }
    //     navigator.mediaDevices
    //       .getUserMedia({ video: true })
    //       .then((stream: MediaStream) => {
    //         // You'll need to handle the stream here.
    //         // For example, you could display it in a video element for the user to take a picture.
    //       })
    //       .catch((err) => {
    //         console.log('Error accessing the camera:', err)
    //       })
    //   }
  }

  // final submit
  addSkalarInfo(): void {
    this.router.navigate(['/home'])

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
    this.router.navigate(['/login'])
  }
  // if skalar trys to close entire browser before cpmpleting,delete saved content
  ngOnDestroy(): void {
    if (this.activatedSubscription$) {
      this.activatedSubscription$.unsubscribe()
    }
    this.values$.next()
    this.values$.complete()
    this.accountSub$.next()
    this.accountSub$.complete()
  }
}
