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
  styleUrls: ['./letter-by-letter-display.component.scss'],
  imports: [CommonModule],
  animations: [fadeOut]
})
export class LetterByLetterComponent {
  @ViewChild('sparkle')
  containerElementRef!: ElementRef;
  @Input() message: string = '';
  @Input() welcomeSouthPaw: boolean = false;
  @Input() autoGenerate: boolean = false;
  animatedText: { letter: string; visible: boolean }[] = [];

  constructor(private loginSpecificService: LoginSpecificService) {}

  letterByLetter(message: string): void {
    this.animatedText = [];
    for (let i = 0; i < message.length; i++) {
      this.animatedText.push({
        letter: message[i],
        visible: false
      });
    }
  }
  renderOn(): void {
    this.createSparkles(10);
    this.message = this.loginSpecificService.updatePhrase();
    this.letterByLetter(this.message);
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
