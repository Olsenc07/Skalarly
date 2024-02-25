import { AnimationTriggerMetadata } from '@angular/animations';
import { lock } from '../../../assistant-level-code/custom-architecture-aids/animations/lock-animation';
import { rotate180 } from '../../../assistant-level-code/custom-architecture-aids/animations/rotate180-animation';
import { spinChange } from '../../../assistant-level-code/custom-architecture-aids/animations/spin-change-animation';

export const reusableLogicAnimations: AnimationTriggerMetadata[] = [
  lock,
  rotate180,
  spinChange
];
