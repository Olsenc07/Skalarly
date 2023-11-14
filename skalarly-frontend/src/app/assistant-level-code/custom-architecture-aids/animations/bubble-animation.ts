import {
  AnimationTriggerMetadata,
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const bubble: AnimationTriggerMetadata = trigger('bubble', [
  // State when the element is not visible initially
  state(
    'noAnimate',
    style({
      transform: 'scaleX(0)', // Scaled down to 0
      transformOrigin: 'center', // Scaling from the center
      opacity: 0
    })
  ),

  // State when the element is fully visible
  state(
    'animate',
    style({
      transform: 'scaleX(1)', // Scaled to full size
      opacity: 1
    })
  ),

  // Transition from 'noAnimate' to 'animate' with a pulse effect
  transition('noAnimate => animate', [
    animate(
      '1.7s ease-out',
      keyframes([
        style({ transform: 'translateX(100%)', opacity: 0, offset: 0 }),
        style({ transform: 'translateX(0)', opacity: 1, offset: 0.7 }),
        style({ transform: 'scale(1.05)', offset: 0.9 }),
        style({ transform: 'scale(1)', offset: 1 })
      ])
    )
  ]),
  transition('animate => noAnimate', animate('1.7s ease-in'))
]);
