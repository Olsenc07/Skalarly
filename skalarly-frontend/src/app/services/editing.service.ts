import { Injectable } from '@angular/core';

@Injectable()
export class EditingService {
  private isSaved = false;
  constructor() {}

  //check authorization
  getIsSaved(): boolean {
    return this.isSaved;
  }

  // save profile
  saveEditingProfile() {
    return (this.isSaved = true);
  }
}
