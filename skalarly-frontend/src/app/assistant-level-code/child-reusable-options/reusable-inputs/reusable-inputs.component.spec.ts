import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableInputsComponent } from './reusable-inputs.component';

describe('ReusableInputsComponent', () => {
  let component: ReusableInputsComponent;
  let fixture: ComponentFixture<ReusableInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableInputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReusableInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
