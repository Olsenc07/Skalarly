import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const rotate180: AnimationTriggerMetadata = trigger('rotate180', [
  state('true', style({ transform: 'rotate(0deg)' })),
  state('false', style({ transform: 'rotate(180deg)' })),
  transition('true <=> false', animate('200ms ease-in-out'))
]);
