import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged
} from 'rxjs';
import { AccountManagementService } from '../custom-architecture-aids/services/account-management.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { type InstitutionDataInterface } from '../custom-architecture-aids/interfaces/institution-interface';
import { InstitutionInfoService } from '../custom-architecture-aids/services/institution-info.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { type PassWordInterface } from '../custom-architecture-aids/interfaces/password-interface';
import { ReusableInputsComponent } from './reusable-inputs/reusable-inputs.component';
import { SaveSignUpGuard } from './../app-routes/route-guards/signup-guard';
import { emailUsernameValidator } from '../custom-architecture-aids/validators/email-username.validator';
import { passwordValidator } from '../custom-architecture-aids/validators/password.validator';
@Component({
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    ReusableInputsComponent
  ]
})
export class SignUpComponent implements OnInit, OnChanges, OnDestroy {
  signUpForm: FormGroup;
  userInteracted: boolean = false;
  visiblePassword: boolean = false;
  country$: Observable<InstitutionDataInterface[]> = new Observable<
    InstitutionDataInterface[]
  >();
  private usernameSub?: Subscription;
  // Choosing institution
  institutions$: Observable<InstitutionDataInterface[]> = new Observable<
    InstitutionDataInterface[]
  >();
  private institutionsSub?: Subscription;
  institutionsLoaded: boolean = false;

  // skalar info forms
  infoForm: FormGroup = new FormGroup({
    institution: new FormControl<string | null>('', [Validators.required])
  });
  institutions: InstitutionDataInterface[] = [];
  domain: string[] = [];

  constructor(
    private accountManagementService: AccountManagementService,
    private institutionInfoService: InstitutionInfoService,
    private saveSignUpGuard: SaveSignUpGuard
  ) {
    this.signUpForm = new FormGroup({
      username: new FormControl<string | null>(null, [
        Validators.required,
        emailUsernameValidator(this.accountManagementService, true)
      ]),
      email: new FormControl<string | null>(
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
      password: new FormControl<string | null>(null, [
        Validators.required,
        passwordValidator
      ])
    });
  }

  // look over username suff
  ngOnInit() {
    // get country/institute/email data
    this.country$ = this.institutionInfoService.institutionInfo();
    // username check
    this.usernameSub = this.signUpForm
      .get('username')
      ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((username: string | null) => {
        if (username !== null) {
          const errors = emailUsernameValidator(
            this.signUpForm.get('username')?.value,
            true
          );
          this.signUpForm.get('username')?.setErrors(errors);
        }
      });
  }
  updateCountrySelection(country: InstitutionDataInterface): void {
    // get institutions from that country chosen
    this.institutions$ = this.institutionInfoService.getInstituitonsData(
      country.country
    );
  }
  // assign institution fomr control
  // and then cache domain options and pass values to email validation
  chosenInstituition(institution: InstitutionDataInterface): void {
    this.infoForm.get('institution')!.setValue(institution);
    // Fetch domains for email validation based on the selected institution
    const selectedInstitution: InstitutionDataInterface | undefined =
      this.institutions.find((item) => item.name === institution.name);
    if (selectedInstitution) {
      // Cache domains from the selected institution
      this.domain = Array.isArray(selectedInstitution.domains)
        ? selectedInstitution.domains
        : [selectedInstitution.domains];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['signUpForm'] && !changes['signUpForm'].firstChange) {
      this.signUpForm.valueChanges.subscribe(() => {
        this.userInteracted = true;
      });
    }
    // password check
    if (changes['signUpForm'].currentValue.get('password')) {
      this.signUpForm
        .get('password')
        ?.valueChanges.subscribe((newValue: string) => {
          const password: string = newValue;
          const requirements: PassWordInterface = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            digit: /\d/.test(password),
            special: /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)
          };

          // Update the style of each requirement element based on whether it's met
          if (requirements.length) {
            document?.getElementById('length')?.classList.add('condition-met');
          } else {
            document
              ?.getElementById('length')
              ?.classList.remove('condition-met');
          }
          // uppercase letter
          if (requirements.uppercase) {
            document
              ?.getElementById('uppercase')
              ?.classList.add('condition-met');
          } else {
            document
              ?.getElementById('uppercase')
              ?.classList.remove('condition-met');
          }
          // lowercase letter
          if (requirements.lowercase) {
            document
              ?.getElementById('lowercase')
              ?.classList.add('condition-met');
          } else {
            document
              ?.getElementById('lowercase')
              ?.classList.remove('condition-met');
          }
          // digit
          if (requirements.digit) {
            document?.getElementById('digit')?.classList.add('condition-met');
          } else {
            document
              ?.getElementById('digit')
              ?.classList.remove('condition-met');
          }
          // special
          if (requirements.special) {
            document?.getElementById('special')?.classList.add('condition-met');
          } else {
            document
              ?.getElementById('special')
              ?.classList.remove('condition-met');
          }
        });
    }
  }
  // request to use route guard
  getRouteGuardStatus(): boolean {
    return this.userInteracted;
  }
  // save initial credentials
  firstSubmit(): void {
    // if successfully saved

    // un sub when usernameis completed
    this.usernameSub?.unsubscribe();
    this.institutionsSub?.unsubscribe();
  }
  // toggle password visbility
  // toggle password visbility
  toggleVisibility(): void {
    this.visiblePassword = !this.visiblePassword;
  }

  // clean up
  // if skalar trys to close entire browser before cpmpleting,delete saved content
  ngOnDestroy(): void {
    this.saveSignUpGuard.canDeactivate();
    // if not alreayd unsubbed
    this.usernameSub?.unsubscribe();
    this.institutionsSub?.unsubscribe();
  }
}
