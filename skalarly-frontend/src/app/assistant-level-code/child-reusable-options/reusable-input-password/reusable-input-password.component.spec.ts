import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableInputPasswordComponent } from './reusable-input-password.component';

describe('ReusableInputPasswordComponent', () => {
  let component: ReusableInputPasswordComponent;
  let fixture: ComponentFixture<ReusableInputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableInputPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReusableInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
