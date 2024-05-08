// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { fakeAsync, tick } from '@angular/core/testing';
// import { LoginLogicComponent } from './login-logic.component';
// import { Observable } from 'rxjs';

// describe('LoginLogicComponent', () => {
//   let component: LoginLogicComponent;
//   let fixture: ComponentFixture<LoginLogicComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [LoginLogicComponent]
//       // Add any modules or providers needed by the component
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginLogicComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should initialize email$ and password$ observables in ngOnInit', () => {
//     component.ngOnInit();
//     expect(component.email$).toBeInstanceOf(Observable);
//     expect(component.password$).toBeInstanceOf(Observable);
//   });
//   it('should toggle the visibility of the password', () => {
//     const initialVisibility = component.visiblePassword;
//     component.toggleVisibility();
//     expect(component.visiblePassword).toBe(!initialVisibility);
//   });
//   it('should toggle the stayLoggedIn state', () => {
//     const initialStayLoggedIn = component.stayLoggedIn;
//     component.stayIn();
//     expect(component.stayLoggedIn).toBe(!initialStayLoggedIn);
//   });
//   it('should update progressState correctly during login process', fakeAsync(() => {
//     component.login();
//     expect(component.progressState).toBe('loading');

//     tick(2000); // Simulate 2 seconds
//     expect(component.progressState).toBe('declined');

//     tick(1000); // Simulate additional 1 second
//     expect(component.progressState).toBe('default');
//   }));
//   it('should validate email correctly', () => {
//     component.loginForm.controls['email'].setValue('test@example.com');
//     expect(component.isEmailValid()).toBeTrue();
//   });

//   it('should validate password correctly', () => {
//     component.loginForm.controls['password'].setValue('ValidPassword123');
//     expect(component.isPasswordValid()).toBeTrue();
//   });
//   it('should call login function when enter is clicked and form is valid', () => {
//     spyOn(component, 'login');
//     component.loginForm.setValue({
//       email: 'test@example.com',
//       password: 'ValidPassword123'
//     });
//     component.enterClicked();
//     expect(component.login).toHaveBeenCalled();
//   });
// });
