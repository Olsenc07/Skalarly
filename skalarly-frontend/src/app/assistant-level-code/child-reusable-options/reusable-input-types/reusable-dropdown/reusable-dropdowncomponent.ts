import {
  BehaviorSubject,
  Subscription,
} from 'rxjs';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule
} from '@angular/material/autocomplete';
import { BoldPipe } from 'src/app/assistant-level-code/custom-architecture-aids/pipes/bold.pipe';
import { type InstitutionDataInterface } from 'src/app/assistant-level-code/custom-architecture-aids/interfaces/institution-interface';
import { RemoveSpacesPipe } from 'src/app/assistant-level-code/custom-architecture-aids/pipes/white-space.pipe';
import { TitleCasePipe } from '@angular/common';
import { InputImports } from '../input-imports';

@Component({
  standalone: true,
  selector: 'app-reusable-dropdown',
  templateUrl: './reusable-dropdown.component.html',
  styleUrls: ['./reusable-dropdown.component.scss'],
  imports: [
    BoldPipe,
    MatAutocompleteModule,
    InputImports,
    RemoveSpacesPipe,
    TitleCasePipe
  ]
})
export class ReusableDropDownComponent implements OnInit {
  // used to display drop down filtered options
  typedFilter: FormControl<string | null> = new FormControl<string | null>('');
  @Input() label: string | null = null;
  @Input() hint: string | null = null;
  @Input() icon?: string;

  @Input() List$!: string[];
  private listSub?: Subscription;
  // its own view
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  // initial list
  initialList$: BehaviorSubject<InstitutionDataInterface[]> =
    new BehaviorSubject<InstitutionDataInterface[]>([]);
  // Child to Parent
  @Output() selectedChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() difficultyFormControl: EventEmitter<string> =
    new EventEmitter<string>();
  constructor(
    private el: ElementRef
  ) {}
  ngOnInit(): void {
    // Filters list
    // startWith('') allows list to be displayed before typing
    // this.List$ = combineLatest([
    //   this.typedFilter.valueChanges.pipe(
    //     debounceTime(500),
    //     distinctUntilChanged(),
    //     startWith('')
    //   ),
    //   this.initialList$
    // ]).pipe(
    //   map(([typed, institute]) =>
    //     institute.filter(
    //       (category: InstitutionDataInterface) =>
    //         category.country.toLowerCase().indexOf(typed!.toLowerCase()) !== -1
    //     )
    //   )
    // );
  }
  // Selection has been made
  newSelection(entry: string) {
    // If choice came from difficulty drop down
    this.selectedChange.emit(entry);
  }
}
