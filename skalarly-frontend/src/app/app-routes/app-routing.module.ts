import { AuthGuard } from './route-guards/auth.guard';
import { ConfirmGuard } from './route-guards/confirm.guard';
import { Routes } from '@angular/router';
import { SaveSignUpGuard } from './route-guards/signup-guard';
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
      import('../top-level-code/login/login.component').then((mod) => mod.LoginComponent)
  },
  // create an new account
  {
    path: 'sign-up',
    canDeactivate: [() => inject(SaveSignUpGuard).canDeactivate()],
    loadComponent: () =>
      import('../signup/signup.component').then((mod) => mod.SignUpComponent)
  },
  // forgot password
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('../forgot-password/forgot-password.component').then(
        (mod) => mod.ForgotPasswordComponent
      )
  },
  // first page loaded on login
  {
    path: 'home',
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import('../home/home.component').then((mod) => mod.HomeComponent)
  },
  // specific page within a category requested with multiple posts
  {
    path: 'specific-feed',
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import(
        '../feed-folder/specific-feed-page/specific-feed-page.component'
      ).then((mod) => mod.SpecificFeedPageComponent)
  },
  // one single post, able to be viewed by viewers without skalarly accounts
  // any navigation away from this page will require authentication
  {
    path: 'single-feed',
    title: 'single-feed',
    canDeactivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import('../feed-folder/single-feed-page/single-feed-page.component').then(
        (mod) => mod.SingleFeedPageComponent
      )
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
      import('../profiles/profile/profile.component').then(
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
    title: 'edit-profile',
    canDeactivate: [() => inject(ConfirmGuard).canDeactivate()],
    loadComponent: () =>
      import('../top-level-code/edit-profile/edit-profile.component').then(
        (mod) => mod.EditProfileComponent
      )
  },
  // other skalar's profile
  {
    path: 'skalars/:id',
    pathMatch: 'full',
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import('../profiles/others-profile/others-profile.component').then(
        (mod) => mod.OthersProfileComponent
      ),
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
