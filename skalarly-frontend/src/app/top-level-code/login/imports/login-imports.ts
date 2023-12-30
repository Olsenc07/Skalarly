// Only case to use ngModule!
// want cleaner .ts files
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LetterByLetterComponent } from '../../../assistant-level-code/child-reusable-options/letter-by-letter-display/letter-by-letter-display.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports:[LetterByLetterComponent],
  exports: [
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    LetterByLetterComponent,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ]
})
export class loginImports {}
