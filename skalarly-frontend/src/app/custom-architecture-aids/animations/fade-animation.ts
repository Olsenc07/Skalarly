import {
  AnimationTriggerMetadata,
  animate,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fadeInOutAnimation: AnimationTriggerMetadata = trigger(
  'fadeInOut',
  [
    // Enter transition with smoother easing
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0.3s ease-in-out', style({ opacity: 1 })) // Adjusted duration and easing
    ]),

    // Leave transition with smoother staggering
    transition(':leave', [
      query(
        ':leave',
        stagger('30ms', [
          // Adjusted stagger timing
          animate('0.3s ease-in-out', style({ opacity: 0 })) // Adjusted duration and easing
        ]),
        { optional: true }
      )
    ])
  ]
);
