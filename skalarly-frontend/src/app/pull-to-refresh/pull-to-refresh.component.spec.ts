import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullToRefreshComponent } from './pull-to-refresh.component';

describe('PullToRefreshComponent', () => {
  let component: PullToRefreshComponent;
  let fixture: ComponentFixture<PullToRefreshComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PullToRefreshComponent]
    });
    fixture = TestBed.createComponent(PullToRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
