import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeOut } from 'src/app/assistant-level-code/custom-architecture-aids/animations/fadeOut-animation';

@Component({
  standalone: true,
  selector: 'app-letter-by-letter',
  templateUrl: './letter-by-letter-display.component.html',
  styleUrls: ['/src/app/top-level-code/login/login-animations.component.scss'],
  imports: [CommonModule],
  animations: [fadeOut]
})
export class LetterByLetterComponent implements AfterViewInit, OnChanges {
  @Input() message: string = '';
  @Input() welcomeSouthPaw: boolean = false;
  animatedText: { letter: string; visible: boolean }[] = [];
  @Output() newPhrase: EventEmitter<void> = new EventEmitter();
  @ViewChildren('letterSpan') letterSpan: QueryList<ElementRef> = new QueryList();
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
    console.log('one', message);
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
    // tell the parent to send phrase
    this.newPhrase.emit();
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
