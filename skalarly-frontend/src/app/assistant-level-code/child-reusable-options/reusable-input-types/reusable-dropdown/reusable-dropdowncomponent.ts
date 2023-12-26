import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
} from 'rxjs';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule
} from '@angular/material/autocomplete';
import { AlphabeticalPipe } from '../../../custom-architecture-aids/pipes/alphabetical.pipe';
import { BoldPipe } from '../../../custom-architecture-aids/pipes/bold.pipe';
import { RemoveSpacesPipe } from '../../../custom-architecture-aids/pipes/white-space.pipe';
import { TitleCasePipe } from '@angular/common';
import { InputImports } from '../input-imports';

@Component({
  standalone: true,
  selector: 'app-reusable-dropdown',
  templateUrl: './reusable-dropdown.component.html',
  styleUrls: ['./reusable-dropdown.component.scss'],
  imports: [
    AlphabeticalPipe,
    BoldPipe,
    MatAutocompleteModule,
    InputImports,
    RemoveSpacesPipe,
    TitleCasePipe
  ]
})
export class ReusableDropDownComponent implements OnChanges {
  // used to display drop down filtered options
  typedFilter: FormControl<string | null> = new FormControl<string | null>('');
  @Input() label: string | null = null;
  @Input() hint: string | null = null;
  @Input() icon?: string;
  @Input() List: string[] = [''];
  filteredList$: Observable<string[]> = 
  new Observable<string[]>; 
  // its own view
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  // initial list
  initialList$: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>([]);
  // Child to Parent
  @Output() selectedChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() difficultyFormControl: EventEmitter<string> =
    new EventEmitter<string>();
  constructor(
    private el: ElementRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['List']) {
      this.setupFilteredList();
    }
  }

  private setupFilteredList(): void {
    const list$ = of(this.List);
    this.filteredList$ = combineLatest([
      this.typedFilter.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith('')
      ),
      list$
    ]).pipe(
      map(([typed, institute]) =>
        institute
          .filter((category: string) => category && category.toLowerCase().includes((typed || '').toLowerCase()))
          .sort((a, b) => a.localeCompare(b))
      )
    );
  }
  // Selection has been made
  newSelection(entry: string) {
    // If choice came from difficulty drop down
    this.selectedChange.emit(entry);
  }
}
