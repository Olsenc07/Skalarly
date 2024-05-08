import {
  AnimationTriggerMetadata,
  animate,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations';
export const authenticatingGlow: AnimationTriggerMetadata = trigger(
  'authenticatingGlow',
  [
    transition('loading => complete', [
      animate(
        '1.5s',
        keyframes([
          style({ opacity: 0, transform: 'translateY(-20px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
        ])
      )
    ])
  ]
);
