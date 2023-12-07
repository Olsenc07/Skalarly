import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSpecificService } from '../../custom-architecture-aids/services/login-validation/login-specific.service';
import { fadeOut } from 'src/app/assistant-level-code/custom-architecture-aids/animations/fadeOut-animation';

interface Letter {
  letter: string;
  delay: number;
  classAnimation: string;
}

@Component({
  standalone: true,
  selector: 'app-letter-by-letter',
  templateUrl: './letter-by-letter-display.component.html',
  styleUrl: './letter-by-letter-display.component.scss',
  imports: [CommonModule],
  animations: [fadeOut]
})
export class LetterByLetterComponent implements OnChanges {
  @Input() message: string = '';
  @Input() customClass: 'small' | 'default' | 'large' = 'default';
  @Input() welcomeSouthPaw: boolean = false;
  @Input() autoGenerate: boolean = false;
  @Input() lastLetterAnimation: boolean = false;
  animatedText: Letter[] = [];
  private renderCount: number = 0;
  private maxRenders: number = 7;

  // seven animations
  classes: string[] = [
    'magical-letter',
    'magical-letterpulse',
    'magical-letterfade',
    'magical-letterflip',
    'magical-letterslide',
    'magical-letterspin',
    'magical-letterbounce'
  ];
  shuffledClasses: string[] = [];
  currentClassIndex: number = 0;

  constructor(private loginSpecificService: LoginSpecificService) {
    this.shuffleClasses();
  }

  shuffleClasses(): void {
    this.shuffledClasses = [...this.classes];
    for (let i = this.shuffledClasses.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [this.shuffledClasses[i], this.shuffledClasses[j]] = [
        this.shuffledClasses[j],
        this.shuffledClasses[i]
      ];
    }
  }
  getNextClass(): string {
    const nextClass: string = this.shuffledClasses[this.currentClassIndex];
    this.currentClassIndex =
      (this.currentClassIndex + 1) % this.shuffledClasses.length;
    return nextClass;
  }

  // updates message with user interaction
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      this.letterAnimation(this.message);
    }
    if (changes['autoGenerate'] && this.autoGenerate) {
      this.renderOn();
      console.log('hey')
    }
  }

  letterAnimation(message: string): void {
    const totalDuration: number = 1; // Total duration of the animation in seconds
    const delayIncrement: number = totalDuration / message.length; // Delay increment for each letter
    const letters: {
      letter: string;
      delay: number;
      classAnimation: string;
    }[] = message.split('').map((char, index) => {
      const delay: number = this.welcomeSouthPaw
        ? (message.length - index - 1) * delayIncrement // Right to left
        : index * delayIncrement; // Left to right
      const isLastLetter = index === message.length - 1;
      const randomClass: string =
        isLastLetter && this.lastLetterAnimation ? this.getNextClass() : '';
      return {
        letter: char,
        delay,
        classAnimation: randomClass
      };
    });
    this.animatedText = letters;
  }

  renderOn(): void {
    if (this.renderCount < this.maxRenders) {
      this.message = this.loginSpecificService.updatePhrase();
      this.letterAnimation(this.message);
      this.renderCount++;
      setTimeout(() => this.renderOn(), 4000); // next call
    } else {
      this.renderCount = 0;
    }
  }
}
