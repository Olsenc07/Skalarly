import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fadeInOutAnimation: AnimationTriggerMetadata = trigger(
  'fadeInOut',
  [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.5s ease-out', style({ opacity: 1 }))
    ]),

    transition(':leave', [
      style({ opacity: 1 }),
      animate('.5s ease-out', style({ opacity: 0 }))
    ])
  ]
);
