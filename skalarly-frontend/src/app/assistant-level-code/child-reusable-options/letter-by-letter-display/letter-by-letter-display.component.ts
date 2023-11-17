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
import { letterByLetter } from 'src/app/assistant-level-code/custom-architecture-aids/animations/letterByLetter-animation';

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
  animations: [letterByLetter, fadeOut]
})
export class LetterByLetterComponent implements OnChanges {
  @ViewChild('sparkle')
  containerElementRef!: ElementRef;
  @Input() message: string = '';
  @Input() customClass: 'small' | 'default' | 'large' = 'small';
  @Input() welcomeSouthPaw: boolean = false;
  @Input() autoGenerate: boolean = false;
  animatedText: Letter[] = [];

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
