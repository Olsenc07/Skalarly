import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fakeAsync, tick } from '@angular/core/testing';
import { AuthorizeService } from 'src/app/assistant-level-code/custom-architecture-aids/services/authorize.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { LoginSpecificService } from 'src/app/assistant-level-code/custom-architecture-aids/services/login-validation/login-specific.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthorizeService: jasmine.SpyObj<AuthorizeService>;
  let mockLoginSpecificService: jasmine.SpyObj<LoginSpecificService>;

  beforeEach(waitForAsync(() => {
    mockAuthorizeService = jasmine.createSpyObj('AuthorizeService', [
      'login',
      'searchEmails'
    ]);
    mockLoginSpecificService = jasmine.createSpyObj('LoginSpecificService', [
      'randomizePairs',
      'updatePhrase'
    ]);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthorizeService, useValue: mockAuthorizeService },
        { provide: LoginSpecificService, useValue: mockLoginSpecificService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize observables correctly in ngOnInit', () => {
    spyOn(mockLoginSpecificService, 'randomizePairs');
    component.ngOnInit();

    expect(component.email$).toBeDefined();
    expect(component.password$).toBeDefined();
    expect(mockLoginSpecificService.randomizePairs).toHaveBeenCalled();
  });

  it('should update skalarlyState after view init', fakeAsync(() => {
    component.ngAfterViewInit();
    tick(7000); // Simulate the passage of 7 seconds

    expect(component.skalarlyState).toBe('rise');
  }));
  it('should toggle the visibility of the password', () => {
    const initialVisibility = component.visiblePassword;
    component.toggleVisibility();

    expect(component.visiblePassword).toBe(!initialVisibility);
  });
  it('should toggle the stayLoggedIn state', () => {
    const initialStayLoggedIn = component.stayLoggedIn;
    component.stayIn();

    expect(component.stayLoggedIn).toBe(!initialStayLoggedIn);
  });
  it('should set initial states on login', fakeAsync(() => {
    component.login();
    expect(component.progressState).toBe('loading');

    tick(); // Simulate the passage of time for the timeout
    expect(component.failedLoginAnimation).toBe('right');

    tick(100); // Simulate the passage of more time
    expect(component.failedLoginAnimation).toBe('initial');
    expect(component.progressState).toBe('default');
  }));
});
