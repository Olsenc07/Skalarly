import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-child-login',
  templateUrl: '../login.component.html',
  styleUrls: ['../login.component.scss'],
  imports: [CommonModule]
})
export class ChildLoginComponent {
  @Input() message: string = '';
  animatedText: { letter: string; visible: boolean }[] = [];
  letterByLetter(expression: string): void {
    for (let i = 0; i < expression.length; i++) {
      this.animatedText.push({
        letter: expression[i],
        visible: false
      });
    }
  }
}
