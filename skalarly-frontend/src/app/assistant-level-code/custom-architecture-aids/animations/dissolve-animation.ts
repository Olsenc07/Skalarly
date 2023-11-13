import {
  AnimationTriggerMetadata,
  animate,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations';

export const dissolve: AnimationTriggerMetadata = trigger('dissolve', [
  transition('default => loading', [
    animate(
      '1s',
      keyframes([
        style({ opacity: 1, transform: 'scale(1)', offset: 0 }),
        style({ opacity: 0.5, transform: 'scale(1.2)', offset: 0.5 }),
        style({ opacity: 0, transform: 'scale(0)', offset: 1 })
      ])
    )
  ])
]);
