import {
  AnimationTriggerMetadata,
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';

export const refresh: AnimationTriggerMetadata = trigger('refresh', [
  transition(
    '* => *',
    [
      style({
        transform: '{{ transformStyle }}',
        opacity: '{{ opacityStyle }}'
      }),
      animate('{{ duration }}')
    ],
    {
      params: {
        transformStyle: 'scale(1) rotate(0deg)',
        opacityStyle: 1,
        duration: '500ms'
      }
    }
  )
]);
