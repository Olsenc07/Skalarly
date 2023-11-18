import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSpecificService } from '../../custom-architecture-aids/services/login-validation/login-specific.service';
import { fadeOut } from 'src/app/assistant-level-code/custom-architecture-aids/animations/fadeOut-animation';

interface Letter {
  letter: string;
  isLast: boolean;
}

@Component({
  standalone: true,
  selector: 'app-letter-by-letter',
  templateUrl: './letter-by-letter-display.component.html',
  styleUrls: ['./letter-by-letter-display.component.scss'],
  imports: [CommonModule],
  animations: [fadeOut]
})
export class LetterByLetterComponent implements OnChanges, OnDestroy {
  @ViewChild('sparkle')
  containerElementRef!: ElementRef;
  @Input() message: string = '';
  @Input() customClass: 'small' | 'default' | 'large' = 'small';
  @Input() welcomeSouthPaw: boolean = false;
  @Input() autoGenerate: boolean = false;
  animatedText: Letter[] = [];
  private renderTimeout: any;
  constructor(private loginSpecificService: LoginSpecificService) {}

  // updates text
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      this.letterAnimation(this.message);
    }
  }
  letterAnimation(message: string): void {
    const length = message.length;
    this.animatedText = message.split('').map((char, index) => ({
      letter: char,
      isLast: index === length - 1
    }));
  }
  renderOn(): void {
    // this.createSparkles(10);
    this.message = this.loginSpecificService.updatePhrase();
    // Clear previous timeout to avoid memory leaks
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }
    this.renderTimeout = setTimeout(() => {
      this.renderOn();
    }, 2500);
    // Example loop to create sparkles for each letter
    this.animatedText.forEach((item, index) => {
      const letterElement: Element | null = document.querySelector(
        `#letter-${index}`
      );
      if (letterElement) {
        this.createSparkles(10, letterElement as HTMLElement);
      }
    });
  }

  createSparkles(numberOfSparkles: number, letterElement: HTMLElement): void {
    for (let i = 0; i < numberOfSparkles; i++) {
      const sparkle = document.createElement('span');
      sparkle.classList.add('sparkle');
      // Position each sparkle relative to the letter
      const rect = letterElement.getBoundingClientRect();
      sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
      sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;

      // Set a random delay for each sparkle to create a trailing effect
      document.body.appendChild(sparkle); // Append to body or a specific container
      this.containerElementRef.nativeElement.appendChild(sparkle);
      sparkle.addEventListener('animationend', () => {
        sparkle.remove();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }
  }
}
