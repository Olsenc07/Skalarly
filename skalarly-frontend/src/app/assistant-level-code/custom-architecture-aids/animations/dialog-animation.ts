// dialog-animation.ts
import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

export const dialog: AnimationTriggerMetadata = trigger('dialog', [
  transition('* <=> *', [
    style({
      opacity: 0,
      transform: 'translateY(100%)' // start from below the page
    }),
    animate(
      '1s ease',
      style({
        opacity: 1,
        transform: 'translateY(0%)' // move to the middle of the page
      })
    )
  ])
]);
