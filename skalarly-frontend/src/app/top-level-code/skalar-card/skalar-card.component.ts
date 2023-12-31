import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, debounceTime, distinctUntilChanged, map  } from 'rxjs';
import { BoldPipe } from '../../assistant-level-code/custom-architecture-aids/pipes/bold.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { type SkalarInfoInterface } from '../../assistant-level-code/custom-architecture-aids/interfaces/skalars-info-interface';

@Component({
  standalone: true,
  selector: 'app-skalar-card',
  templateUrl: './skalar-card.component.html',
  styleUrls: ['./skalar-card.component.scss'],
  imports: [BoldPipe, MatButtonModule, MatCardModule, AsyncPipe],
  // animations: [
  //   trigger('cardOptionsAnimation', [
  //     state('open', style({ height: '*' })), // Options are open
  //     state('closed', style({ height: '0' })), // Options are closed
  //     transition('closed => open', animate('0.3s ease-in-out')),
  //     transition('open => closed', animate('0.3s ease-in-out'))
  //   ]),
  //   trigger('openOptionsAnimation', [
  //     state('rest', style({ transform: 'rotate(0deg)', color: 'black' })),
  //     state(
  //       'clicked',
  //       style({ transform: 'rotate(180deg)', color: 'lightblue' })
  //     ),
  //     transition('rest <=> clicked', animate('500ms ease-in-out'))
  //   ]),
  //   trigger('closeOptionsAnimation', [
  //     state('rest', style({ transform: 'rotate(0deg)', color: 'black' })),
  //     state(
  //       'clicked',
  //       style({ transform: 'rotate(180deg)', color: 'lightblue' })
  //     ),
  //     transition('clicked <=> rest', animate('500ms ease-in-out'))
  //   ])
  // ]
})
export class SkalarCardComponent implements OnChanges {
  // From search-bar
  @Input() searchSkalar: FormControl<string | null> = new FormControl<string>('');
  @Input() skalarInfo!: SkalarInfoInterface;
  @Input() skalars$: Observable<SkalarInfoInterface[]> = new  Observable<SkalarInfoInterface[]>;

  // Define an initial list as a BehaviorSubject
  initialList$: BehaviorSubject<SkalarInfoInterface[]> = new BehaviorSubject<
    SkalarInfoInterface[]
  >([]);

  // state of skalars interaction options to be displayed
  toggledInfoOf: number | null = null;
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

  displayOptions(i: number): void {
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
}
