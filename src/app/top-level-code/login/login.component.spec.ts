// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { fakeAsync, tick } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { LoginSpecificService } from 'src/app/assistant-level-code/custom-architecture-aids/services/login-validation/login-specific.service';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let mockLoginSpecificService: jasmine.SpyObj<LoginSpecificService>;

//   beforeEach(async () => {
//     mockLoginSpecificService = jasmine.createSpyObj('LoginSpecificService', [
//       'randomizePairs',
//       'updatePhrase'
//     ]);

//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       providers: [
//         { provide: LoginSpecificService, useValue: mockLoginSpecificService }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should call randomizePairs on ngOnInit', () => {
//     component.ngOnInit();
//     expect(mockLoginSpecificService.randomizePairs).toHaveBeenCalled();
//   });
//   it('should update skalarlyState after view init', fakeAsync(() => {
//     component.ngAfterViewInit();
//     tick(7000); // Simulate the passage of 7 seconds

//     expect(component.skalarlyState).toBe('rise');
//   }));
//   it('should update nextAnimations and welcome when welcomeRiseDone is called', () => {
//     mockLoginSpecificService.updatePhrase.and.returnValue('New Phrase');

//     component.welcomeRiseDone();

//     expect(component.nextAnimations).toBeTrue();
//     expect(component.welcome).toBe('New Phrase');
//     expect(mockLoginSpecificService.updatePhrase).toHaveBeenCalled();
//   });
// });
