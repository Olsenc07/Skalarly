import { Injectable, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { EditingService } from '../../assistant-level-code/custom-architecture-aids/services/editing.service'
import { Subscription } from 'rxjs/internal/Subscription'

@Injectable({
  providedIn: 'root'
})
export class ConfirmGuard implements OnDestroy {
  private rootSub$: Subscription | undefined
  private editingService: EditingService
  private aRoute: ActivatedRoute
  routeTitle: string | undefined = ''

  constructor(editingService: EditingService, aRoute: ActivatedRoute) {
    this.editingService = editingService
    this.aRoute = aRoute
  }
  canDeactivate(): boolean {
    this.rootSub$ = this.aRoute.title.subscribe((title: string | undefined) => {
      this.routeTitle = title
    })
    // If leaving edit profile page
    if (this.routeTitle === 'edit-profile') {
      const isSaved: boolean = this.editingService.getIsSaved()
      if (!isSaved) {
        let result: boolean = true // Default to true for SSR
        console.log('save cahnges')

        if (result) {
          // Send data to service to make the change and then continue navigation
          this.editingService.saveEditingProfile()
          return true
        } else {
          // Continue navigation without saving
          return true
        }
      } else {
        // Already saved
        return true
      }
    } else {
      return true
    }
  }
  // // If leaving single feed page
  // if (this.routeTitle === 'single-feed') {
  //   // have dialog pop up with nav options,
  //   // sign up...
  //   // must return true once one of these options are chosen
  //   // so need to track those events
  //   return false
  // }
  ngOnDestroy(): void {
    // clean up subscription
    this.rootSub$?.unsubscribe()
  }
}
