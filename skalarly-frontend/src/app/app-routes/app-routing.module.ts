import { Routes, UrlTree } from '@angular/router';
import { AuthGuard } from './route-guards/auth.guard';
import { ConfirmGuard } from './route-guards/confirm.guard';
import { SaveSignUpGuard } from './route-guards/signup-guard';
import { UrlSerializer } from '@angular/router';
import { UserProfileResolver } from '../assistant-level-code/custom-architecture-aids/resolvers/skalar-info-resolver.component';
import { inject } from '@angular/core';
// lazy loading of standalone components
// hence loadComponent
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // authenticate skalar by login
  {
    path: 'login',
    loadComponent: () =>
      import('../top-level-code/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
    data: { title: 'Skalarly Login' }
  },
  // create an new account
  {
    path: 'sign-up',
    canDeactivate: [() => inject(SaveSignUpGuard).canDeactivate()],
    loadComponent: () =>
      import('../top-level-code/signup/signup.component').then(
        (mod) => mod.SignUpComponent
      ),
    data: { title: 'Skalarly Sign Up' }
  },
  // forgot password
  {
    path: 'forgot-password',
    loadComponent: () =>
      import(
        '../top-level-code/forgot-password/forgot-password.component'
      ).then((mod) => mod.ForgotPasswordComponent),
    data: { title: 'Forgot Password' }
  },
  // first page loaded on login
  {
    path: 'home',
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import('../top-level-code/home/home.component').then(
        (mod) => mod.HomeComponent
      ),
    data: { title: 'Home Page' }
  },
  // specific page within a category requested with multiple posts
  {
    path: 'specific-feed',
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import(
        '../top-level-code/feed-folder/specific-feed-page/specific-feed-page.component'
      ).then((mod) => mod.SpecificFeedPageComponent),
    // title should be ttitle of post
    data: { title: 'Skalarly Feed' }
  },
  // one single post, able to be viewed by viewers without skalarly accounts
  // any navigation away from this page will require authentication
  {
    path: 'single-feed',
    title: 'single-feed',
    canDeactivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import(
        '../top-level-code/feed-folder/single-feed-page/single-feed-page.component'
      ).then((mod) => mod.SingleFeedPageComponent),
    data: { title: 'Skalarly Specific Feed' }
  },
  // skalar profile
  {
    path: 'profile',
    // pathMatch: 'full',
    resolve: {
      userData: UserProfileResolver
    },
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import('../top-level-code/profiles/profile/profile.component').then(
        (mod) => mod.ProfileComponent
      ),
     // title should be skalars username
    data: { title: 'Profile' }
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
    title: 'edit-profile',
    canDeactivate: [() => inject(ConfirmGuard).canDeactivate()],
    loadComponent: () =>
      import('../top-level-code/edit-profile/edit-profile.component').then(
        (mod) => mod.EditProfileComponent
      ),
    data: { title: 'Edit Profile' }
  },
  // other skalar's profile
  {
    path: 'skalars/:id',
    pathMatch: 'full',
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import(
        '../top-level-code/profiles/others-profile/others-profile.component'
      ).then((mod) => mod.OthersProfileComponent),
    data: { title: 'Skalars Profile' },
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
