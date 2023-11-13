import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
export const fadeOutAnimation: AnimationTriggerMetadata = trigger(
  'fadeOutAnimation',
  [
    transition(':leave', [
      // :leave is alias for '* => void'
      animate('500ms', style({ opacity: 0 }))
    ])
  ]
);
