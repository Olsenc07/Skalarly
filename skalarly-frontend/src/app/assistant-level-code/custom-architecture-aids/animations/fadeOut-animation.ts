import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
export const fadeOut: AnimationTriggerMetadata = trigger('fadeOut', [
  transition('* => active', [
    animate(
      '0.5s ease-in',
      style({
        opacity: 0,
        transform: 'scale(0.8)'
      })
    )
  ]),
  transition('* => inactive', [])
]);
