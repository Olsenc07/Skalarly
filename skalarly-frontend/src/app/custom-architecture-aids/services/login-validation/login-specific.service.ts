import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginSpecificService {
  randomWordPairs: string[] = [];
  displayPhrase: string = '';
  currentPhraseIndex: number = 0;
  wordPairs: string[] = [
    'the Enlightenment',
    'in Collaboration',
    'the Innovation',
    'our Synergy',
    'the Development',
    'in Education',
    'for Empowerment',
    'the Progress',
    'for Insight',
    'the Understanding',
    'in Knowledge',
    'the Unity',
    'the Discovery',
    'the Growth',
    'our Scholarship',
    'our Network',
    'the Wisdom',
    'the Advancement',
    'the Curiosity',
    'our Partnership',
    'the Exploration',
    'the Achievement',
    'the Learning',
    'to Nurture',
    'the Aspiration'
  ];
  randomizePairs(): void {
    const randomizedPair: string[] = [];
    const length: number = this.wordPairs.length;
    for (let i = 0; i < length; i++) {
      const randomize: number = Math.floor(
        Math.random() * this.wordPairs.length
      );
      const selectedQuestion: string = this.wordPairs.splice(randomize, 1)[0];
      randomizedPair.push(selectedQuestion[0]);
      this.randomWordPairs.push(selectedQuestion);
    }
  }
  //   this gets triggered every 3.5seconds from login ts
  updatePhrase(): void {
    this.currentPhraseIndex =
      (this.currentPhraseIndex + 1) % this.randomWordPairs.length;
    this.displayPhrase = this.randomWordPairs[this.currentPhraseIndex];
  }
}
