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
    '*',
    style({
      transform: 'scaleX(0) scale(1)', //  0 width, but full height
      transformOrigin: 'right',
      opacity: 0
    })
  ),
  state(
    'animate',
    style({
      transform: 'scaleX(1) scale(1)',
      opacity: 1
    })
  ),

  // Transition from 'noAnimate' to 'animate' with a pulse effect
  transition('* => animate', [
    animate(
      '1.0s ease-out',
      keyframes([
        style({ transform: 'scaleX(0) scale(1.0)', opacity: 0, offset: 0 }),
        style({
          transform: 'scaleX(1) scale(1.1)',
          opacity: 0.7,
          offset: 0.8
        }),
        style({ transform: 'scaleX(1) scale(1)', opacity: 1, offset: 1 })
      ])
    )
  ]),

  // Transition from 'animate' to 'noAnimate'
  transition('animate => *', [
    animate(
      '1.0s ease-in',
      keyframes([
        style({ transform: 'scaleX(1) scale(1.05)', opacity: 1, offset: 0 }),
        style({
          transform: 'scaleX(0.5) scale(1.05)',
          opacity: 0.5,
          offset: 0.5
        }),
        style({ transform: 'scaleX(0) scale(1)', opacity: 0, offset: 1 })
      ])
    )
  ])
]);
