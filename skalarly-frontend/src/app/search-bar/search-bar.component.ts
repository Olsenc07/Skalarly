import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, of, switchMap, withLatestFrom } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { BoldPipe } from '../custom-architecture-aids/pipes/bold.pipe';
import { MatButtonModule } from '@angular/material/button';
import { SkalarCardComponent } from '../skalar-card/skalar-card.component';
import { SkalarsService } from '../custom-architecture-aids/services/skalars.service';
@Component({
  standalone: true,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [
    BoldPipe,
    CommonModule,
    MatButtonModule,
    NgClass,
    NgIf,
    NgFor,
    ReactiveFormsModule,
    SkalarCardComponent
  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      state('out', style({ transform: 'translateY(-100%)' })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class SearchBarComponent implements OnChanges {
  skalars$: Observable<any[]>;
  searchSkalar: FormControl = new FormControl<string | null>(null);
  // mobile first
  // Recieve data from parent
  @Input() searchIconClicked!: boolean;
  // Child to parent
  @Output() backEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  showResults: 'in' | 'out' = 'out';

  constructor(private skalarsService: SkalarsService) {
    this.skalarsService = skalarsService;
    this.skalars$ = this.searchSkalar.valueChanges.pipe(
      withLatestFrom(this.skalarsService.getSkalars(this.searchSkalar.value)), // Combine with latest list of skalars
      // input is form control value of 'searchSkalar'
      // list is from the get api
      // felt I should add switchMap to prevent data leaks etc
      // But that may already be done with withLatestFrom so could be unneeded
      switchMap(([input, list]) =>
        of(list).pipe(
          // toLowerCase allows for case insensitive search
          // If the substring is not found, it returns -1
          map((skalarList) =>
            skalarList.filter(
              (s: { username: string }) =>
                s.username.toLowerCase().indexOf(input.toLowerCase()) !== -1
            )
          )
        )
      )
    );
  }
  // recieved value from parent
  ngOnChanges(): void {
    if (this.searchIconClicked === true) {
      this.showResults = 'in';
    }
  }

  iconBackClicked() {
    // closes search screen
    this.backEvent.emit(false);
    this.showResults = 'out';
  }
}
