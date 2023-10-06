// dialog-animation.ts
import { animate, style, transition, trigger } from '@angular/animations';

export const dialogAnimation = trigger('dialogAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(100%)' // start from below the page
    }),
    animate(
      '300ms ease-out',
      style({
        opacity: 1,
        transform: 'translateY(0%)' // move to the middle of the page
      })
    )
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      transform: 'translateY(0%)' // start from the middle of the page
    }),
    animate(
      '300ms ease-in',
      style({
        opacity: 0,
        transform: 'translateY(100%)' // move below the page
      })
    )
  ])
]);
