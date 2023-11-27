import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ReusableInputsComponent } from './reusable-inputs.component';

describe('ReusableInputsComponent', () => {
  let component: ReusableInputsComponent;
  let fixture: ComponentFixture<ReusableInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReusableInputsComponent],
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReusableInputsComponent);
    component = fixture.componentInstance;

    // Mock inputs
    component.label = 'Test Label';
    component.control = new FormControl('');
    component.error = 'Error message';
    component.controlType = 'text';
    component.placeholder = 'Enter text';
    component.icon = 'test-icon';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
