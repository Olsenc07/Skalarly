import { AnimationTriggerMetadata } from '@angular/animations';
import { bubble } from '../../../assistant-level-code/custom-architecture-aids/animations/bubble-animation';
import { fadeInGrow } from 'src/app/assistant-level-code/custom-architecture-aids/animations/fadeInGrow-animation';
import { welcomeRise } from '../../../assistant-level-code/custom-architecture-aids/animations/welcomeRise.animation';

export const reusableAnimations: AnimationTriggerMetadata[] = [
  bubble,
  fadeInGrow,
  welcomeRise
];
