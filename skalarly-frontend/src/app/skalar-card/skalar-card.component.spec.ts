import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkalarCardComponent } from './skalar-card.component';

describe('SkalarCardComponent', () => {
  let component: SkalarCardComponent;
  let fixture: ComponentFixture<SkalarCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkalarCardComponent]
    });
    fixture = TestBed.createComponent(SkalarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
