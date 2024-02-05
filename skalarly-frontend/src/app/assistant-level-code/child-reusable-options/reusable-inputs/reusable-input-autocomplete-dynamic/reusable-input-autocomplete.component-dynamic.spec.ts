import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableInputAutocompleteComponent } from './reusable-input-autocomplete.component-dynamic';

describe('ReusableInputAutocompleteComponent', () => {
  let component: ReusableInputAutocompleteComponent;
  let fixture: ComponentFixture<ReusableInputAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReusableInputAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReusableInputAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
