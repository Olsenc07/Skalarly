import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
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
export class LetterByLetterComponent implements AfterViewInit, OnChanges {
  @Input() message: string = '';
  @Input() welcomeSouthPaw: boolean = false;
  @Input() autoGenerate: boolean = false;
  animatedText: { letter: string; visible: boolean }[] = [];
  @ViewChildren('letterSpan') letterSpan: QueryList<ElementRef> =
    new QueryList();
  constructor(private loginSpecificService: LoginSpecificService) {}
  ngAfterViewInit() {
    this.letterSpan.changes.subscribe((spans: QueryList<ElementRef>) => {
      const lastSpan = spans.last;
      if (lastSpan && this.welcomeSouthPaw) {
        this.renderOn(lastSpan.nativeElement);
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      this.letterByLetter(this.message);
    }
  }
  letterByLetter(message: string): void {
    this.animatedText = [];
    for (let i = 0; i < message.length; i++) {
      this.animatedText.push({
        letter: message[i],
        visible: false
      });
    }
  }
  renderOn(targetElement: HTMLElement): void {
    this.createSparkles(10, targetElement);
    this.message = this.loginSpecificService.updatePhrase();
    this.letterByLetter(this.message);
  }

  createSparkles(numberOfSparkles: number, targetElement: HTMLElement) {
    for (let i = 0; i < numberOfSparkles; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      const x: number = Math.random() * 100;
      const y: number = Math.random() * 100;
      sparkle.style.setProperty('--sparkle-x', `${x}%`);
      sparkle.style.setProperty('--sparkle-y', `${y}%`);
      targetElement.appendChild(sparkle);
    }
  }
}
