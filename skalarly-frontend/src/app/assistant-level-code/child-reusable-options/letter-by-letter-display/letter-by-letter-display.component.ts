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
export class LetterByLetterComponent implements OnChanges {
  @Input() message: string = '';
  @Input() customClass: 'small' | 'default' | 'large' = 'small';
  @Input() welcomeSouthPaw: boolean = false;
  @Input() autoGenerate: boolean = false;
  animatedText: Letter[] = [];
  autoGenerateInterval?: number;

  constructor(private loginSpecificService: LoginSpecificService) {}

  // updates text
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      this.letterAnimation(this.message);
    }
    if (changes['autoGenerate']) {
      if (this.autoGenerate) {
        setTimeout(() => {
          this.renderOn();
        }, 7000);
      }
    }
  }
  letterAnimation(message: string): void {
    const letters = message.split('').map((char, index) => ({
      letter: char,
      isLast: index === message.length - 1
    }));
    this.animatedText = this.welcomeSouthPaw ? letters.reverse() : letters;
  }

  renderOn(): void {
    this.message = this.loginSpecificService.updatePhrase();
    this.letterAnimation(this.message);
  }
}
