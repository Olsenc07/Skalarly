import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
// eslint-disable-next-line sort-imports
import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map
} from 'rxjs';
import { BoldPipe } from '../custom-architecture-aids/pipes/bold.pipe';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { type SkalarInfoInterface } from '../custom-architecture-aids/interfaces/skalars-info-interface';

@Component({
  standalone: true,
  selector: 'app-skalar-card',
  templateUrl: './skalar-card.component.html',
  styleUrls: ['./skalar-card.component.scss'],
  imports: [BoldPipe, MatButtonModule, MatCardModule, CommonModule]
})
export class SkalarCardComponent implements OnInit, OnDestroy, OnChanges {
  // From search-bar
  @Input() searchSkalar!: FormControl<string | null>;
  @Input() skalarInfo!: SkalarInfoInterface;
  @Input() skalars$!: Observable<SkalarInfoInterface[]>;
  private skalarSub?: Subscription;
  // Define an initial list as a BehaviorSubject
  initialList$: BehaviorSubject<SkalarInfoInterface[]> = new BehaviorSubject<
    SkalarInfoInterface[]
  >([]);

  // state of skalars interaction options to be displayed
  toggledInfoOf: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    // a Change in an input property
    if (changes['searchSkalar']) {
      console.log('InputValue changed:', changes['searchSkalar'].currentValue);
      // Filters list
      this.skalars$ = combineLatest([
        this.searchSkalar.valueChanges.pipe(
          debounceTime(500),
          distinctUntilChanged()
        ),
        this.initialList$
      ]).pipe(
        map(([typed, skalarList]) =>
          skalarList.filter(
            (skalar: SkalarInfoInterface) =>
              skalar.username.toLowerCase().indexOf(typed!.toLowerCase()) !== -1
          )
        )
      );
    }
  }
  ngOnInit(): void {
    this.skalarSub = this.skalars$.subscribe(
      (skalars: SkalarInfoInterface[]) => {
        this.initialList$.next(skalars);
      }
    );
  }

  displayOptions(i: string): void {
    // clear old index
    this.toggledInfoOf = null;
    // only should display that cards options
    // to interact that matches this index
    this.toggledInfoOf = i;
  }
  closeOptions(): void {
    this.toggledInfoOf = null;
  }


  // add animations
  // Interaction Options
  blockSkalar(id: string): void {
    // Implement the blockUser logic here
  }

  sendMessage(id: string): void {
    // Implement the sendMessage logic here
  }

  followSkalar(id: string): void {
    // Implement the followSkalar logic here
  }

  // efficent rendering
  trackBySkalar(i: number, skalar: SkalarInfoInterface): string {
    return skalar.id;
  }
  //clean up
  ngOnDestroy(): void {
    // if Subscription has been made
    this.skalarSub?.unsubscribe();
    this.initialList$.complete();
  }
}
