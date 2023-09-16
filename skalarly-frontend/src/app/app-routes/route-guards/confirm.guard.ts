import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditingService } from 'src/app/services/editing.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable()
export class ConfirmGuard implements OnDestroy {
  private rootSub$: Subscription | undefined;
  private editingService: EditingService;
  private aRoute: ActivatedRoute;
  routeTitle: string | undefined;

  constructor(editingService: EditingService, aRoute: ActivatedRoute) {
    this.editingService = editingService;
    this.aRoute = aRoute;
  }
  canDeactivate(): boolean {
    this.rootSub$ = this.aRoute.title.subscribe((title: string | undefined) => {
      console.log('title', title);

      this.routeTitle = title;
      console.log('title of', typeof this.rootSub$);
    });
    try {
      // If leaving edit profile page
      if (this.routeTitle === 'edit-profile') {
        const isSaved: boolean = this.editingService.getIsSaved();
        if (!isSaved) {
          const result: boolean = window.confirm(
            'Do you want to save your changes?'
          );
          if (result) {
            // send data to service to make the change and then continue navigation
            this.editingService.saveEditingProfile();
            return true;
          } else {
            // continue navigation without saving
            return true;
          }
        } else {
          // already saved
          return true;
        }
      }

      // If leaving single feed page
      if (this.routeTitle === 'single-feed') {
        // have dialog pop up with nav options,
        // sign up...
        // must return true once one of these options are chosen
        // so need to track those events
        return false;
      }
    } catch {
      // have this a error pop up
      console.log('bad connnection!!');
    } finally {
      // Perform cleanup or other necessary actions here
    }
    return true;
  }

  ngOnDestroy(): void {
    // clean up subscription
    this.rootSub$?.unsubscribe();
  }
}
