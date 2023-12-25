import { CommonModule, TitleCasePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoldPipe } from '../../../custom-architecture-aids/pipes/bold.pipe';
import { InstitutionInfoService } from '../../../custom-architecture-aids/services/create-edit-account/institution-info.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RemoveSpacesPipe } from '../../../custom-architecture-aids/pipes/white-space.pipe';
import { ReusableDropDownComponent } from './reusable-dropdowncomponent';

describe('ReusableDropDownComponent', () => {
  let component: ReusableDropDownComponent;
  let fixture: ComponentFixture<ReusableDropDownComponent>;

  // Mock service and pipes if necessary
  const mockInstitutionInfoService = jasmine.createSpyObj(
    'InstitutionInfoService',
    ['fetchCountries', 'getCountriesSignal']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReusableDropDownComponent,
        BoldPipe,
        RemoveSpacesPipe,
        TitleCasePipe
      ],
      imports: [
        CommonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: InstitutionInfoService,
          useValue: mockInstitutionInfoService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReusableDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Additional tests...
});
