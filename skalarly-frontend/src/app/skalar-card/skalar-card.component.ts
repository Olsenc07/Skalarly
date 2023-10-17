import {
  BehaviorSubject,
  Observable,
  Subscription,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map
} from 'rxjs';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
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
  imports: [BoldPipe, CommonModule, MatButtonModule, MatCardModule],
  animations: [
    trigger('cardOptionsAnimation', [
      state('open', style({ height: '*' })), // Options are open
      state('closed', style({ height: '0' })), // Options are closed
      transition('closed => open', animate('0.3s ease-in-out')),
      transition('open => closed', animate('0.3s ease-in-out'))
    ]),
    trigger('openOptionsAnimation', [
      state('rest', style({ transform: 'rotate(0deg)', color: 'black' })),
      state(
        'clicked',
        style({ transform: 'rotate(180deg)', color: 'lightblue' })
      ),
      transition('rest <=> clicked', animate('500ms ease-in-out'))
    ]),
    trigger('closeOptionsAnimation', [
      state('rest', style({ transform: 'rotate(0deg)', color: 'black' })),
      state(
        'clicked',
        style({ transform: 'rotate(180deg)', color: 'lightblue' })
      ),
      transition('clicked <=> rest', animate('500ms ease-in-out'))
    ])
  ]
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
  iconState: 'clicked' | 'rest' = 'rest';

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
    this.iconState = 'clicked';
    // clear old index
    this.toggledInfoOf = null;
    // only should display that cards options
    // to interact that matches this index
    this.toggledInfoOf = i;
  }
  closeOptions(): void {
    this.toggledInfoOf = null;
    this.iconState = 'rest';
  }

  // add animations
  // Interaction Options
  blockSkalar(id: string): void {
    // Implement the blockUser logic here
    console.log('block skalar', id);
  }

  sendMessage(id: string): void {
    // Implement the sendMessage logic here
    // have a popup to display a quick message,
    // or to naviagte to main chat page
    console.log('message skalar', id);
  }

  followSkalar(id: string): void {
    // Implement the followSkalar logic here
    // have animation that changes from follow -> pending/followed
    console.log('follow skalar', id);
  }

  // efficent rendering
  trackBySkalar(i: number, skalar: SkalarInfoInterface): string {
    return skalar.username;
  }
  //clean up
  ngOnDestroy(): void {
    // if Subscription has been made
    this.skalarSub?.unsubscribe();
    this.initialList$.complete();
  }
}
