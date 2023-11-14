import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fingerprintActivation: AnimationTriggerMetadata = trigger(
  'fingerprintActivation',
  [
    state(
      'normal',
      style({
        background:
          'linear-gradient(to top right, transparent 0%, transparent 100%)',
        color: 'black',
        'box-shadow': '0px 0px 5px 1px #5284c9'
      })
    ),
    state(
      'activated',
      style({
        background:
          'linear-gradient(to top right, rgb(238, 233, 233) 0%, #008080 100%)',
        color: 'white'
      })
    ),
    transition('normal => activated', [animate('0.5s ease')]),
    transition('activated => normal', [animate('0.5s ease')])
  ]
);
