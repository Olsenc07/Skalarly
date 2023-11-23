import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const refresh: AnimationTriggerMetadata = trigger('refresh', [
  state(
    'initial',
    style({
      transform: 'scale(0.5) rotate(0deg)',
      opacity: 0.7
    })
  ),
  state(
    'intermediate',
    style({
      transform: 'scale(1.05) rotate(60deg)',
      opacity: 0.85
    })
  ),
  state(
    'final',
    style({
      transform: 'scale(1.2) rotate(120deg)',
      opacity: 1
    })
  ),
  transition('* => *', animate('1000ms ease-in'))
]);
