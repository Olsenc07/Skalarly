import { trigger, state, style, transition, animate, keyframes, AnimationTriggerMetadata } from '@angular/animations';

function fadeInOutKeyframes(scaleStart: number, scaleEnd: number, rotation: string = '') {
    return keyframes([
      style({ opacity: 0, transform: `scale(${scaleStart}) ${rotation}`, offset: 0 }),
      style({ opacity: 1, transform: `scale(${scaleEnd}) ${rotation}`, offset: 1 })
    ]);
  }
  export const iconFade: AnimationTriggerMetadata = trigger('iconFade', [
    transition('* => default', animate('1s ease-in-out', fadeInOutKeyframes(0.5, 1))),
    transition('default => loading', animate('1s ease-in', fadeInOutKeyframes(1.2, 1))),
    transition('loading => declined', animate('0.5s ease-out', fadeInOutKeyframes(1, 0, 'rotate(10deg)'))),
    transition('loading => approved', animate('0.8s ease-in-out', fadeInOutKeyframes(0.8, 1.2))),
    transition('declined => default', animate('0.7s ease-in', fadeInOutKeyframes(1, 1)))
  ]);
  
      