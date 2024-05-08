import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bold',
  standalone: true
})
export class BoldPipe implements PipeTransform {
  // list is from whichever api call that is being matched
  // input is from formcontrol value inputed by skalar
  transform(list: string, input: string): string {
    // Create a regular expression object for pattern matching
    //  g is global and i is case-insensitive
    const matchOptions: RegExp = new RegExp(input, 'gi');
    const boldedValueInList = (item: string) =>
      item.replace(matchOptions, (match: string) => `<b>${match}</b>`);
    return boldedValueInList(list);
  }
}
