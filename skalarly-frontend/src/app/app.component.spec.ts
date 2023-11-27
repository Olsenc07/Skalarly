import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      events: new Subject(),
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update routerUrl on navigation end', () => {
    const navigationEndEvent = new NavigationEnd(1, '/new-route', '/old-route');
    mockRouter.events.next(navigationEndEvent);
    expect(component.routerUrl).toBe('/new-route');
  });

  it('should handle onHoldDetected correctly', () => {
    component.onHoldDetected(true);
    expect(component.visible).toBeTrue();
  });
  type ReloadState = 'initial' | 'intermediate' | 'final' | null;
  const testCases: { input: number; expected: ReloadState }[] = [
    { input: 1, expected: 'initial' },
    { input: 2, expected: 'intermediate' }
  ];

  testCases.forEach((testCase) => {
    it(`should set reloadState to "${testCase.expected}" when onDeltaYChange receives ${testCase.input}`, () => {
      component.onDeltaYChange(testCase.input);
      expect(component.reloadState).toEqual(testCase.expected);
    });
  });

  // Separate test for the reload behavior
  it('should set reloadState to "final" and trigger reload when onDeltaYChange receives 3', fakeAsync(() => {
    spyOn<any>(window.location, 'reload');
    component.onDeltaYChange(3);
    tick(700); // Fast-forward the timeout
    expect(component.reloadState).toEqual('final');
    expect(window.location.reload).toHaveBeenCalled();
  }));
  // reload icon change global
  const iconTestCases = [
    { input: null, expected: 'cycle' },
    { input: 'final', expected: 'task_alt' },
    { input: 'intermediate', expected: 'published_with_changes' },
    { input: 'unknown', expected: 'cycle' } // 'unknown' should default to 'cycle'
  ];

  iconTestCases.forEach(({ input, expected }) => {
    it(`should return "${expected}" when getIcon is called with "${input}"`, () => {
      expect(component.getIcon(input)).toEqual(expected);
    });
  });
  it('should toggle search icon on toggleSearch', () => {
    component.toggleSearch(true);
    expect(component.searchIconClicked).toBeTrue();
  });
});
