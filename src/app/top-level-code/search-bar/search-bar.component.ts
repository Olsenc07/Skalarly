import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap
} from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SkalarCardComponent } from '../skalar-card/skalar-card.component';
import { type SkalarInfoInterface } from '../../../../shared/interfaces/skalars-info-interface';
import { SkalarsService } from '../../assistant-level-code/custom-architecture-aids/services/skalars.service';
import { OrientationService } from '../../assistant-level-code/custom-architecture-aids/services/orientation.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    SkalarCardComponent,
    MatInputModule
  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(-100%)' })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class SearchBarComponent implements OnInit {
  // skalars$: Observable<SkalarInfoInterface[]>;
  searchSkalarForm: FormControl<string | null> = new FormControl<string | null>(
    ''
  );
  // Child to parent for animation
  @Output() backEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  showResults: 'in' | 'out' = 'out';

  // eslint-disable-next-line no-unused-vars
  constructor(
    private skalarsService: SkalarsService,
    protected orientationService: OrientationService
  ) {
  //   this.skalars$ = this.searchSkalarForm.valueChanges.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     filter((input: string | null) => !!input), // Skip if input is null or empty
  //     switchMap((input: string | null) =>
  //       this.skalarsService.getSkalars(input || '')
  //     )
  //   );
  }

  ngOnInit(): void {
    this.showResults = 'in';
  }

  iconBackClicked() {
    // closes search screen
    this.backEvent.emit(false);
    this.showResults = 'out';
  }
}
