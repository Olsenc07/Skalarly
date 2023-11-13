import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

export const toggle: AnimationTriggerMetadata = trigger('toggle', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s ease-in', style({ opacity: 1 }))
  ]),
  transition(':leave', [animate('0.5s ease-out', style({ opacity: 0 }))])
]);
