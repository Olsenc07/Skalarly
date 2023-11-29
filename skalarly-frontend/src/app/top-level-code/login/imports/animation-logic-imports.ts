import { AnimationTriggerMetadata } from '@angular/animations';
import { authenticatingGlow } from '../../../assistant-level-code/custom-architecture-aids/animations/authenticatingGlow-animation';
import { fadeToggle } from '../../../assistant-level-code/custom-architecture-aids/animations/fadeToggle-animation';
import { fingerprintActivation } from 'src/app/assistant-level-code/custom-architecture-aids/animations/activateFingerPrint-animation';
import { lock } from '../../../assistant-level-code/custom-architecture-aids/animations/lock-animation';
import { rotate180 } from '../../../assistant-level-code/custom-architecture-aids/animations/rotate180-animation';
import { spinChange } from '../../../assistant-level-code/custom-architecture-aids/animations/spin-change-animation';

export const reusableLogicAnimations: AnimationTriggerMetadata[] = [
  authenticatingGlow,
  fingerprintActivation,
  lock,
  rotate180,
  spinChange,
  fadeToggle
];
