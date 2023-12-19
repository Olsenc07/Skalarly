import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableInputsDynamicComponent } from './reusable-inputs-dynamic.component';

describe('ReusableInputsDynamicComponent', () => {
  let component: ReusableInputsDynamicComponent;
  let fixture: ComponentFixture<ReusableInputsDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableInputsDynamicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReusableInputsDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
