import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterByLetterComponent } from '../letter-by-letter-display/letter-by-letter-display.component';

@NgModule({
  imports: [LetterByLetterComponent, CommonModule],
  exports: [LetterByLetterComponent]
})
export class LetterByLetterComponentShared {}
