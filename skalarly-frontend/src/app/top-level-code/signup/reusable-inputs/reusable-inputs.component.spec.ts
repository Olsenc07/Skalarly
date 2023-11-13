import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableInputsComponent } from './reusable-inputs.component';

describe('ReusableInputsComponent', () => {
  let component: ReusableInputsComponent;
  let fixture: ComponentFixture<ReusableInputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReusableInputsComponent]
    });
    fixture = TestBed.createComponent(ReusableInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
