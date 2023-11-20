import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSpecificService } from '../../custom-architecture-aids/services/login-validation/login-specific.service';
import { fadeOut } from 'src/app/assistant-level-code/custom-architecture-aids/animations/fadeOut-animation';

interface Letter {
  letter: string;
  delay: number;
}

@Component({
  standalone: true,
  selector: 'app-letter-by-letter',
  templateUrl: './letter-by-letter-display.component.html',
  styleUrls: ['./letter-by-letter-display.component.scss'],
  imports: [CommonModule],
  animations: [fadeOut]
})
export class LetterByLetterComponent implements OnChanges {
  @Input() message: string = '';
  @Input() customClass: 'small' | 'default' | 'large' = 'small';
  @Input() welcomeSouthPaw: boolean = false;
  @Input() autoGenerate: boolean = false;
  @Input() lastLetterAnimation: boolean = false;
  animatedText: Letter[] = [];
  autoGenerateInterval?: number;
  private renderCount: number = 0;
  private maxRenders: number = 7;
  constructor(private loginSpecificService: LoginSpecificService) {}

  // updates text
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      this.letterAnimation(this.message);
    }
    if (changes['autoGenerate'] && this.autoGenerate) {
      this.renderOn();
    }
  }
  getRandomClass(): string {
    const classes = [
      'magical-letter',
      'magical-letterflip',
      'magical-letterfade',
      'magical-letterslide' 
    ];
    const randomIndex = Math.floor(Math.random() * classes.length);
    return classes[randomIndex];
  }

  letterAnimation(message: string): void {
    const totalDuration: number = 1; // Total duration of the animation in seconds
    const delayIncrement: number = totalDuration / message.length; // Delay increment for each letter

    const letters: {
      letter: string;
      delay: number;
    }[] = message.split('').map((char, index) => {
      const delay: number = this.welcomeSouthPaw
        ? (message.length - index - 1) * delayIncrement // Right to left
        : index * delayIncrement; // Left to right
      return {
        letter: char,
        delay
      };
    });
    this.animatedText = letters;
  }

  renderOn(): void {
    if (this.renderCount < this.maxRenders) {
      this.message = this.loginSpecificService.updatePhrase();
      this.letterAnimation(this.message);
      this.renderCount++;
      setTimeout(() => this.renderOn(), 7000); // Schedule the next call
    } else {
      this.renderCount = 0;
    }
  }
}
