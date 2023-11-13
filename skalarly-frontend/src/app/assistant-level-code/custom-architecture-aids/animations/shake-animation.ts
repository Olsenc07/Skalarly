import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
export const shake: AnimationTriggerMetadata = trigger('shake', [
  state('initial', style({ transform: 'translateX(0)', color: 'initial' })),
  state(
    'left',
    style({
      transform: 'translateX(-10px)',
      color: '#FF5733'
    })
  ),
  state(
    'right',
    style({
      transform: 'translateX(10px)',
      color: '#FF5733'
    })
  ),
  transition('initial => left', animate('0.1s')),
  transition('left => right', animate('0.1s')),
  transition('right => initial', animate('0.1s'))
]);
