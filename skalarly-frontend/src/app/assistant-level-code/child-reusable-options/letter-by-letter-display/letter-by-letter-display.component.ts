import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSpecificService } from '../../custom-architecture-aids/services/login-validation/login-specific.service';
import { fadeOut } from 'src/app/assistant-level-code/custom-architecture-aids/animations/fadeOut-animation';

@Component({
  standalone: true,
  selector: 'app-letter-by-letter',
  templateUrl: './letter-by-letter-display.component.html',
  styles: [
    `
      @keyframes sparkles {
        0% {
          opacity: 1;
          transform: translate3d(var(--sparkle-x, 0), var(--sparkle-y, 0), 0)
            scale(1.2) rotateZ(20deg);
        }
        100% {
          opacity: 1;
          transform: translate3d(var(--sparkle-x, 0), var(--sparkle-y, 0), 0)
            scale(1.2) rotateZ(20deg);
        }
      }
      @keyframes glow-animation {
        from {
          opacity: 0;
          transform: translateX(-100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .sparkle {
        position: absolute;
        animation: sparkles 2.4s ease-in;
      }
    `
  ],
  imports: [CommonModule],
  animations: [fadeOut]
})
export class LetterByLetterComponent implements OnChanges {
  @ViewChild('sparkle')
  containerElementRef!: ElementRef;
  @Input() message: string = '';
  @Input() customClass: 'small' | 'default' | 'large' = 'small';
  @Input() welcomeSouthPaw: boolean = false;
  @Input() autoGenerate: boolean = false;
  animatedText: {
    letter: string;
    visible: boolean;
    isLast: boolean;
    style: object;
  }[] = [];

  constructor(private loginSpecificService: LoginSpecificService) {}
  // updates text
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      this.letterByLetter(this.message);
    }
  }
  letterByLetter(message: string): void {
    this.animatedText = [];
    for (let i = 0; i < message.length; i++) {
      const delay: number = this.welcomeSouthPaw
        ? i * 0.15
        : (length - i - 1) * 0.15;
      this.animatedText.push({
        letter: message[i],
        visible: false,
        isLast: i === message.length - 1,
        // can now work with any length of characters
        style: {
          animation: 'glow-animation 0.25s forwards',
          background: `linear-gradient(45deg, var(--first), var(--second))`,
          transition: 'background 0.3s, color 0.3s',
          'background-clip': 'text',
          'white-space': 'nowrap',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'animation-delay': `${delay}s`
        }
      });
    }
  }

  renderOn(): void {
    this.createSparkles(10);
    this.message = this.loginSpecificService.updatePhrase();
    setTimeout(() => {
      this.renderOn();
    }, 2500);
  }

  createSparkles(numberOfSparkles: number): void {
    const container = this.containerElementRef.nativeElement;
    for (let i = 0; i < numberOfSparkles; i++) {
      const sparkle = document.createElement('span');
      sparkle.classList.add('sparkle');
      const x: number = Math.random() * 100;
      const y: number = Math.random() * 100;
      sparkle.style.setProperty('--sparkle-x', `${x}%`);
      sparkle.style.setProperty('--sparkle-y', `${y}%`);
      container.appendChild(sparkle);
    }
  }
}
