import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [
      CommonModule,
      MatButtonModule,
      MatCardModule,
      MatDatepickerModule,
      MatIconModule,
      MatInputModule,
      MatStepperModule,
      MatSlideToggleModule,
      MatSelectModule,
      MatNativeDateModule,
      ReactiveFormsModule,
      HttpClientModule
    ]
  })
  export class SignUpImports {}