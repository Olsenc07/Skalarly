import {
  AnimationTriggerMetadata,
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const welcomeRise: AnimationTriggerMetadata = trigger('welcomeRise', [
  state(
    'initial',
    style({
      opacity: 1,
      transform: 'translateY(0)'
    })
  ),
  transition('* => rise', [
    animate(
      '4s ease-in',
      keyframes([
        style({
          opacity: 1,
          transform: 'translateY(-15px)',
          offset: 0.7
        }),
        style({
          opacity: 0,
          transform: 'translateY(-15px)',
          offset: 1
        })
      ])
    )
  ])
]);
