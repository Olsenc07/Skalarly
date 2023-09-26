import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { SkalarCardComponent } from '../skalar-card/skalar-card.component';
import { SkalarsService } from '../custom-architecture-aids/services/skalars.service';
@Component({
  standalone: true,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [
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
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(-100%)' })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ])
  ]
})
export class SearchBarComponent implements OnInit {
  skalars$: Observable<any[]>;
  searchSkalar: FormControl = new FormControl<string | null>(null);
  // mobile first
  // Recieve data from parent for animation
  @Input({ required: true }) orientation!: boolean;
  // Child to parent for animation
  @Output() backEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  showResults: 'in' | 'out' = 'out';

  constructor(private skalarsService: SkalarsService) {
    this.skalarsService = skalarsService;
    this.skalars$ = this.searchSkalar.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((input: string) => this.skalarsService.getSkalars(input))
    );
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
