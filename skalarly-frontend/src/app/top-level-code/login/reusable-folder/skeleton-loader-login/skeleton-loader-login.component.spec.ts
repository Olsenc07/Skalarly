import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLoaderLoginComponent } from './skeleton-loader-login.component';

describe('SkeletonLoaderLoginComponent', () => {
  let component: SkeletonLoaderLoginComponent;
  let fixture: ComponentFixture<SkeletonLoaderLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeletonLoaderLoginComponent]
    });
    fixture = TestBed.createComponent(SkeletonLoaderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
