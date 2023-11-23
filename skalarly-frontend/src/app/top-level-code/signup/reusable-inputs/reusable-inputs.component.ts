import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith
} from 'rxjs';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule
} from '@angular/material/autocomplete';
import { BoldPipe } from 'src/app/assistant-level-code/custom-architecture-aids/pipes/bold.pipe';
import { CommonModule } from '@angular/common';
import { type InstitutionDataInterface } from 'src/app/assistant-level-code/custom-architecture-aids/interfaces/institution-interface';
import { InstitutionInfoService } from '../../../assistant-level-code/custom-architecture-aids/services/institution-info.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RemoveSpacesPipe } from 'src/app/assistant-level-code/custom-architecture-aids/pipes/white-space.pipe';
import { TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-reusable-inputs',
  templateUrl: './reusable-inputs.component.html',
  styleUrls: ['./reusable-inputs.component.scss'],
  imports: [
    BoldPipe,
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RemoveSpacesPipe,
    TitleCasePipe
  ]
})
export class ReusableInputsComponent implements OnInit {
  // used to display drop down filtered options
  typedFilter: FormControl<string | null> = new FormControl<string | null>('');
  @Input() label: string | null = null;
  labelFlexible: 'country' | 'name';
  @Input() hint: string | null = null;
  @Input() List$!: Observable<InstitutionDataInterface[]>;
  private listSub?: Subscription;
  // its own view
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  // initial list
  initialList$: BehaviorSubject<InstitutionDataInterface[]> =
    new BehaviorSubject<InstitutionDataInterface[]>([]);
  // Child to Parent
  @Output() selectedChange: EventEmitter<InstitutionDataInterface> =
    new EventEmitter<InstitutionDataInterface>();
  @Output() difficultyFormControl: EventEmitter<string> =
    new EventEmitter<string>();
  constructor(
    private el: ElementRef,
    private institutionInfoService: InstitutionInfoService
  ) {
    if (this.label === 'Country of study') {
      this.labelFlexible = 'country';
    } else {
      this.labelFlexible = 'name';
    }
  }
  ngOnInit(): void {
    this.listSub = this.List$.subscribe(
      (categories: InstitutionDataInterface[]) => {
        this.initialList$.next(categories);
      }
    );

    // Filters list
    // startWith('') allows list to be displayed before typing
    this.List$ = combineLatest([
      this.typedFilter.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith('')
      ),
      this.initialList$
    ]).pipe(
      map(([typed, institute]) =>
        institute.filter(
          (category: InstitutionDataInterface) =>
            category.country.toLowerCase().indexOf(typed!.toLowerCase()) !== -1
        )
      )
    );
  }

  // Selection has been made
  newSelection(entry: InstitutionDataInterface) {
    // If choice came from difficulty drop down
    this.selectedChange.emit(entry);
  }

}
