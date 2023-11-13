import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeOutAnimation } from 'src/app/custom-architecture-aids/animations/fadeOut-animation';

@Component({
  standalone: true,
  selector: 'app-child-login',
  templateUrl: './child-login.component.html',
  styleUrls: ['../login.component.scss'],
  imports: [CommonModule],
  animations: [fadeOutAnimation]
})
export class ChildLoginComponent implements OnChanges {
  @Input() message: string = '';
  @Input() welcomeSouthPaw: boolean = false;
  animatedText: { letter: string; visible: boolean }[] = [];
  @Output() newPhrase: EventEmitter<void> = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    console.log('4', this.message);

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
  ngOnChanges(changes: SimpleChanges): void {
  animatin completiion
    // tell the parent to send phrase
    this.newPhrase.emit();
  }
}
}
