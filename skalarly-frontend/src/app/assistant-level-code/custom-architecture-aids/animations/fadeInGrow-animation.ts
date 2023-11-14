import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fadeInGrow: AnimationTriggerMetadata = trigger('fadeInGrow', [
  transition(':enter', [
    // ':enter' is alias for 'void => *'
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);
