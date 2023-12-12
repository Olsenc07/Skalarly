import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const refresh: AnimationTriggerMetadata = trigger('refresh', [
  state('initial', style({
    transform: 'scale(.8) rotate(-120deg)',
  })),
  state('intermediate', style({
    transform: 'scale(1.05) rotate(-60deg)',
  })),
  state('final', style({
    transform: 'scale(1.2) rotate(0deg)',
  })),
  transition('initial => intermediate', animate('1000ms ease-in')),
  transition('intermediate => final', animate('1000ms ease-out'))
]);