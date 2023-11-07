import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

export const toggleAnimation: AnimationTriggerMetadata = trigger(
  'toggleAnimation',
  [
    // Define states if needed, for example, a 'void' state could be when the element is not attached to the view
    transition(':enter', [
      // ':enter' is an alias for 'void => *'
      style({ opacity: 0 }), // Start with the element being completely transparent
      animate('0.5s ease-in', style({ opacity: 1 })) // Animate to fully opaque
    ]),
    transition(':leave', [
      // ':leave' is an alias for '* => void'
      animate('0.5s ease-out', style({ opacity: 0 })) // Animate from fully opaque to transparent
    ])
  ]
);
