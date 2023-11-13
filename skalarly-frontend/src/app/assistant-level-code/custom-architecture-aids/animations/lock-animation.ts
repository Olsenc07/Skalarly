import {
  AnimationTriggerMetadata,
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const lock: AnimationTriggerMetadata = trigger('lock', [
  state(
    'closed',
    style({ transform: 'rotate(0deg) scale(1)', color: '#333333' })
  ),
  state(
    'open',
    style({ transform: 'rotate(45deg) scale(1.2)', color: '#FFBF00' })
  ),
  transition(
    'closed => open',
    animate(
      '0.5s ease',
      keyframes([
        style({ transform: 'rotate(0deg) scale(1)', color: '#333333' }),
        style({ transform: 'rotate(15deg) scale(1.1)', color: '#B0B000' }),
        style({ transform: 'rotate(30deg) scale(1.15)', color: '#FFD700' }),
        style({ transform: 'rotate(45deg) scale(1.2)', color: '#FFB700' })
      ])
    )
  ),
  transition(
    'open => closed',
    animate(
      '0.5s ease',
      keyframes([
        style({ transform: 'rotate(45deg) scale(1.2)', color: '#FFBF00' }),
        style({ transform: 'rotate(30deg) scale(1.15)', color: '#FFD700' }),
        style({ transform: 'rotate(15deg) scale(1.1)', color: '#B0B000' }),
        style({ transform: 'rotate(0deg) scale(1)', color: '#333333' })
      ])
    )
  )
]);
