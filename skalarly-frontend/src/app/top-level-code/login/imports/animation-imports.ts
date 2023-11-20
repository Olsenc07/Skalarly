import { authenticatingGlow } from '../../../assistant-level-code/custom-architecture-aids/animations/authenticatingGlow-animation';
import { bubble } from '../../../assistant-level-code/custom-architecture-aids/animations/bubble-animation';
import { fadeInGrow } from 'src/app/assistant-level-code/custom-architecture-aids/animations/fadeInGrow-animation';
import { fadeToggle } from '../../../assistant-level-code/custom-architecture-aids/animations/fadeToggle-animation';
import { fingerprintActivation } from 'src/app/assistant-level-code/custom-architecture-aids/animations/activateFingerPrint-animation';
import { lock } from '../../../assistant-level-code/custom-architecture-aids/animations/lock-animation';
import { rotate180 } from '../../../assistant-level-code/custom-architecture-aids/animations/rotate180-animation';
import { shake } from '../../../assistant-level-code/custom-architecture-aids/animations/shake-animation';
import { spinChange } from '../../../assistant-level-code/custom-architecture-aids/animations/spin-change-animation';
import { welcomeRise } from '../../../assistant-level-code/custom-architecture-aids/animations/welcomeRise.animation';

export const reusableAnimations = [
  authenticatingGlow,
  bubble,
  fadeInGrow,
  fingerprintActivation,
  lock,
  rotate180,
  shake,
  spinChange,
  fadeToggle,
  welcomeRise
];
