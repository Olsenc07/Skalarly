import { AuthGuard } from './route-guards/auth.guard';
import { ConfirmGuard } from './route-guards/confirm.guard';
import { Routes } from '@angular/router';
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
    loadComponent: () =>
      import('../home/home.component').then((mod) => mod.HomeComponent),
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  // specific page within a category requested with multiple posts
  {
    path: 'specific-feed',
    loadComponent: () =>
      import(
        '../feed-folder/specific-feed-page/specific-feed-page.component'
      ).then((mod) => mod.SpecificFeedPageComponent),
    canActivate: [() => inject(AuthGuard).canActivate()]
  },
  // one single post, able to be viewed by viewers without skalarly accounts
  // any navigation away from this page will require authentication
  {
    path: 'single-feed',
    title: 'single-feed',
    loadComponent: () =>
      import('../feed-folder/single-feed-page/single-feed-page.component').then(
        (mod) => mod.SingleFeedPageComponent
      ),
    canDeactivate: [() => inject(AuthGuard).canActivate()]
  },
  // skalar profile
  {
    path: 'profile',
    loadComponent: () =>
      import('../profiles/profile/profile.component').then(
        (mod) => mod.ProfileComponent
      ),
    canActivate: [() => inject(AuthGuard).canActivate()],
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
    loadComponent: () =>
      import('../edit-profile/edit-profile.component').then(
        (mod) => mod.EditProfileComponent
      ),
    canDeactivate: [() => inject(ConfirmGuard).canDeactivate()]
  },
  // other skalar's profile
  {
    path: 'skalars/:id',
    loadComponent: () =>
      import('../profiles/others-profile/others-profile.component').then(
        (mod) => mod.OthersProfileComponent
      ),
    canActivate: [() => inject(AuthGuard).canActivate()],
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
