import {
  AnimationTriggerMetadata,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fadeInAnimation: AnimationTriggerMetadata = trigger('fadeIn', [
  // Define the starting state of your animation, in this case, fully transparent
  state('void', style({ opacity: 0 })),
  // Transition from void state to any state
  transition(':enter', [
    // Animate to an opacity of 1 (fully opaque) over 300ms
    animate('3000ms ease-out', style({ opacity: 1 }))
  ])
]);
