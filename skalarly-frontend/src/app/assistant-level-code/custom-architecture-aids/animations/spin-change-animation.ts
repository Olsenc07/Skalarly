import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
export const spinChange: AnimationTriggerMetadata = trigger('spinAndChange', [
  state('initial', style({ transform: 'rotate(0deg)' })),
  state('spinning', style({ transform: 'rotate(360deg)' })),
  state('check', style({ transform: 'rotate(360deg)' })),
  transition('initial <=> spinning', animate('1s ease')) // Spin animation with reverse
]);
