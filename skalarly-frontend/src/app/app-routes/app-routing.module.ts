import { AuthGuard } from './route-guards/auth.guard';
import { ConfirmGuard } from './route-guards/confirm.guard';
import { Routes } from '@angular/router';
import { UserProfileResolver } from '../custom-architecture-aids/resolvers/skalar-info-resolver.component';
import { inject } from '@angular/core';

// lazy loading of standalone components
// hence loadComponent
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // authenticate skalar by login
  {
    path: 'login',
    loadComponent: () =>
      import('../login/login.component').then((mod) => mod.LoginComponent)
  },
  // create an new account
  {
    path: 'sign-up',
    loadComponent: () =>
      import('../signup/signup.component').then((mod) => mod.SignUpComponent)
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
    path: 'profile/:id',
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import('../profiles/profile/profile.component').then(
        (mod) => mod.ProfileComponent
      ),
    // needs userId
    resolve: {
      userData: UserProfileResolver
    },
    children: [
      {
        loadChildren: () =>
          import(
            '../custom-architecture-aids/side-bar-info/side-bar-info.component'
          ).then((mod) => mod.SideBarInfoComponent),
        outlet: 'sideBarInfoOutlet'
      }
    ]
  },
  // edit profile
  {
    path: 'edit-profile',
    title: 'edit-profile',
    canDeactivate: [() => inject(ConfirmGuard).canDeactivate()],
    loadComponent: () =>
      import('../edit-profile/edit-profile.component').then(
        (mod) => mod.EditProfileComponent
      )
  },
  // other skalar's profile
  {
    path: 'skalars/:id',
    canActivate: [() => inject(AuthGuard).canActivate()],
    loadComponent: () =>
      import('../profiles/others-profile/others-profile.component').then(
        (mod) => mod.OthersProfileComponent
      ),
    resolve: {
      userData: UserProfileResolver
    },
    children: [
      {
        loadChildren: () =>
          import(
            '../custom-architecture-aids/side-bar-info/side-bar-info.component'
          ).then((mod) => mod.SideBarInfoComponent),
        outlet: 'sideBarInfoOutlet'
      }
    ]
  }
];
