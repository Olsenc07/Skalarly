import { LoginSpecificService } from './login-specific.service';

describe('LoginSpecificService', () => {
  let service: LoginSpecificService;

  beforeEach(() => {
    service = new LoginSpecificService();
    // Mock data for the randomWordPairs array for the updatePhrase test
    service.randomWordPairs = [
      'the Enlightenment',
      'in Collaboration',
      'the Innovation',
      'our Synergy',
      'the Development',
      'in Education',
      'for Empowerment'
    ];
  });

  it('should update the display phrase correctly', () => {
    for (let i = 0; i < service.randomWordPairs.length; i++) {
      const expectedPhrase = service.randomWordPairs[i];
      const updatedPhrase = service.updatePhrase();

      expect(updatedPhrase)
        .withContext(`Failed at iteration ${i}`)
        .toBe(expectedPhrase);
      expect(service.currentPhraseIndex)
        .withContext(`Index mismatch at iteration ${i}`)
        .toBe(i % service.randomWordPairs.length);
    }

    // Test cycling back to the start
    const firstPhrase = service.randomWordPairs[0];
    expect(service.updatePhrase()).toBe(firstPhrase);
  });

  it('should randomize word pairs array', () => {
    service.randomizePairs();
    const randomizedArray = service.randomWordPairs;
    const originalArray = [...service.wordPairs]; // Copy the original array before it's modified
    let isDifferent = false;

    for (let i = 0; i < originalArray.length; i++) {
      if (originalArray[i] !== randomizedArray[i]) {
        isDifferent = true;
        break;
      }
    }

    expect(isDifferent).toBeTrue();
  });
});
