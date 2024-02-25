import { Routes, UrlSerializer, UrlTree } from '@angular/router';
import { AuthGuard } from './route-guards/auth.guard';
import { ConfirmGuard } from './route-guards/confirm.guard';
import { SaveSignUpGuard } from './route-guards/signup-guard';
import { UserProfileResolver } from '../assistant-level-code/custom-architecture-aids/resolvers/skalar-info-resolver.component';
import { inject } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'connections',
    canActivate: [() => inject(AuthGuard).canActivate],
    loadComponent: () =>
      import('../top-level-code/connections/connections.component').then(
        (mod) => mod.ConnectionsComponent
      )
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../top-level-code/login/login.component').then(
        (mod) => mod.LoginComponent
      )
  },
  {
    path: 'sign-up',
    canDeactivate: [() => inject(SaveSignUpGuard).canDeactivate()],
    loadComponent: () =>
      import('../top-level-code/signup/signup.component').then(
        (mod) => mod.SignUpComponent
      )
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import(
        '../top-level-code/forgot-password/forgot-password.component'
      ).then((mod) => mod.ForgotPasswordComponent)
  },
  {
    path: 'home',
    canActivate: [() => inject(AuthGuard).canActivate],
    loadComponent: () =>
      import('../top-level-code/home/home.component').then(
        (mod) => mod.HomeComponent
      )
  },
  {
    path: 'specific-feed',
    canActivate: [() => inject(AuthGuard).canActivate],
    loadComponent: () =>
      import(
        '../top-level-code/feed-folder/specific-feed-page/specific-feed-page.component'
      ).then((mod) => mod.SpecificFeedPageComponent)
  },
  {
    path: 'single-feed',
    canDeactivate: [() => inject(AuthGuard).canActivate],
    loadComponent: () =>
      import(
        '../top-level-code/feed-folder/single-feed-page/single-feed-page.component'
      ).then((mod) => mod.SingleFeedPageComponent)
  },
  {
    path: 'institutions',
    canActivate: [() => inject(AuthGuard).canActivate],
    loadComponent: () =>
      import('../top-level-code/institutions/institutions.component').then(
        (mod) => mod.InstitutionsComponent
      )
  },
  {
    path: 'messages',
    canActivate: [() => inject(AuthGuard).canActivate],
    loadComponent: () =>
      import('../top-level-code/messages/messages.component').then(
        (mod) => mod.MessagesComponent
      )
  },
  {
    path: 'notifications',
    canActivate: [() => inject(AuthGuard).canActivate],
    loadComponent: () =>
      import('../top-level-code/notifications/notifications.component').then(
        (mod) => mod.NotificationsComponent
      )
  },
  {
    path: 'profile',
    resolve: {
      userData: UserProfileResolver
    },
    canActivate: [() => inject(AuthGuard).canActivate],
    loadComponent: () =>
      import('../top-level-code/profiles/profile/profile.component').then(
        (mod) => mod.ProfileComponent
      )
    //   ,
    // children: [
    //   {
    //     loadChildren: () =>
    //       import(
    //         '../custom-architecture-aids/side-bar-info/side-bar-info.component'
    //       ).then((mod) => mod.SideBarInfoComponent),
    //     outlet: 'sideBarInfoOutlet'
    //   }
    // ]
  },
  // edit profile
  {
    path: 'edit-profile',
    canDeactivate: [() => inject(ConfirmGuard).canDeactivate()],
    loadComponent: () =>
      import('../top-level-code/edit-profile/edit-profile.component').then(
        (mod) => mod.EditProfileComponent
      )
  },
  {
    path: 'skalars/:id',
    canActivate: [() => inject(AuthGuard).canActivate],
    loadComponent: () =>
      import(
        '../top-level-code/profiles/others-profile/others-profile.component'
      ).then((mod) => mod.OthersProfileComponent),
    resolve: {
      userData: UserProfileResolver
    }
    // just load these in resolve!!
    // ,
    // children: [
    //   {
    //     loadChildren: () =>
    //       import(
    //         '../custom-architecture-aids/side-bar-info/side-bar-info.component'
    //       ).then((mod) => mod.SideBarInfoComponent),
    //     outlet: 'sideBarInfoOutlet'
    //   }
    // ]
  }
];

export function defaultMalformedUriErrorHandler(
  error: URIError,
  urlSerializer: UrlSerializer,
  url: string
): UrlTree {
  console.error(`Malformed URL error: ${error.message}`, url);
  return urlSerializer.parse('/'); // Redirect to the homepage or a specific error route
}
