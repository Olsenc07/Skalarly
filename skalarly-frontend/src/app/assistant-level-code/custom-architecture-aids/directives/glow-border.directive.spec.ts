// import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
// import { GlowBorderDirective } from './glow-border.directive';

// @Component({
//   template: `<input [appGlowBorder]="true" />`
// })
// class TestComponent {
//   @ViewChild(GlowBorderDirective) directive!: GlowBorderDirective;
// }

// describe('GlowBorderDirective', () => {
//   let component: TestComponent;
//   let fixture: ComponentFixture<TestComponent>;
//   let mockNgControl: Partial<NgControl>;

//   beforeEach(() => {
//     mockNgControl = {
//       control: jasmine.createSpyObj('control', ['valueChanges']),
//       value: 'test'
//     };

//     TestBed.configureTestingModule({
//       declarations: [GlowBorderDirective, TestComponent],
//       imports: [FormsModule, ReactiveFormsModule],
//       providers: [{ provide: NgControl, useValue: mockNgControl }, Renderer2]
//     });

//     fixture = TestBed.createComponent(TestComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create an instance', () => {
//     expect(component.directive).toBeTruthy();
//   });
// });
