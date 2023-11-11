import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
export const flipAnimation: AnimationTriggerMetadata = trigger(
  'flipAnimation',
  [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }), // Start from slightly below and transparent
      animate('.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })) // Fade in and move to original position
    ]),

    transition(':leave', [
      style({ opacity: 1, transform: 'translateY(0)' }), // Start from the original position and opaque
      animate(
        '.5s ease-out',
        style({ opacity: 0, transform: 'translateY(-20px)' })
      ) // Fade out and move up slightly
    ])
  ]
);
