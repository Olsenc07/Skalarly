"use strict";
(self["webpackChunkskalarly_fs"] = self["webpackChunkskalarly_fs"] || []).push([["main"],{

/***/ 641:
/*!**************************************************!*\
  !*** ./src/app/app-routes/app-routing.module.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultMalformedUriErrorHandler: () => (/* binding */ defaultMalformedUriErrorHandler),
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _route_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./route-guards/auth.guard */ 6468);
/* harmony import */ var _route_guards_confirm_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route-guards/confirm.guard */ 8986);
/* harmony import */ var _route_guards_signup_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route-guards/signup-guard */ 327);
/* harmony import */ var _assistant_level_code_custom_architecture_aids_resolvers_skalar_info_resolver_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assistant-level-code/custom-architecture-aids/resolvers/skalar-info-resolver.component */ 2230);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);





const routes = [{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
}, {
  path: 'connections',
  canActivate: [() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_route_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard).canActivate],
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_top-level-code_connections_connections_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/connections/connections.component */ 3730)).then(mod => mod.ConnectionsComponent)
}, {
  path: 'login',
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_material_fesm2022_chips_mjs"), __webpack_require__.e("default-node_modules_ngx-skeleton-loader_fesm2022_ngx-skeleton-loader_mjs"), __webpack_require__.e("src_app_top-level-code_login_login_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/login/login.component */ 3897)).then(mod => mod.LoginComponent)
}, {
  path: 'sign-up',
  canDeactivate: [() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_route_guards_signup_guard__WEBPACK_IMPORTED_MODULE_2__.SaveSignUpGuard).canDeactivate()],
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_material_fesm2022_divider_mjs-node_modules_angular_material_fesm-c0162a"), __webpack_require__.e("default-node_modules_ngx-skeleton-loader_fesm2022_ngx-skeleton-loader_mjs"), __webpack_require__.e("src_app_top-level-code_signup_signup_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/signup/signup.component */ 1008)).then(mod => mod.SignUpComponent)
}, {
  path: 'forgot-password',
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_top-level-code_forgot-password_forgot-password_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/forgot-password/forgot-password.component */ 2875)).then(mod => mod.ForgotPasswordComponent)
}, {
  path: 'home',
  canActivate: [() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_route_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard).canActivate],
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_top-level-code_home_home_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/home/home.component */ 6738)).then(mod => mod.HomeComponent)
}, {
  path: 'specific-feed',
  canActivate: [() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_route_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard).canActivate],
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_material_fesm2022_card_mjs"), __webpack_require__.e("src_app_top-level-code_feed-folder_specific-feed-page_specific-feed-page_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/feed-folder/specific-feed-page/specific-feed-page.component */ 4711)).then(mod => mod.SpecificFeedPageComponent)
}, {
  path: 'single-feed',
  canDeactivate: [() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_route_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard).canActivate],
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_top-level-code_feed-folder_single-feed-page_single-feed-page_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/feed-folder/single-feed-page/single-feed-page.component */ 4619)).then(mod => mod.SingleFeedPageComponent)
}, {
  path: 'institutions',
  canActivate: [() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_route_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard).canActivate],
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_top-level-code_institutions_institutions_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/institutions/institutions.component */ 8044)).then(mod => mod.InstitutionsComponent)
}, {
  path: 'messages',
  canActivate: [() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_route_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard).canActivate],
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_top-level-code_messages_messages_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/messages/messages.component */ 5630)).then(mod => mod.MessagesComponent)
}, {
  path: 'notifications',
  canActivate: [() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_route_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard).canActivate],
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_top-level-code_notifications_notifications_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/notifications/notifications.component */ 9864)).then(mod => mod.NotificationsComponent)
}, {
  path: 'profile',
  resolve: {
    userData: _assistant_level_code_custom_architecture_aids_resolvers_skalar_info_resolver_component__WEBPACK_IMPORTED_MODULE_3__.UserProfileResolver
  },
  canActivate: [() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_route_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard).canActivate],
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_top-level-code_profiles_profile_profile_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/profiles/profile/profile.component */ 4040)).then(mod => mod.ProfileComponent)
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
  canDeactivate: [() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_route_guards_confirm_guard__WEBPACK_IMPORTED_MODULE_1__.ConfirmGuard).canDeactivate()],
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_top-level-code_edit-profile_edit-profile_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/edit-profile/edit-profile.component */ 6262)).then(mod => mod.EditProfileComponent)
}, {
  path: 'skalars/:id',
  canActivate: [() => (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_route_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard).canActivate],
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_top-level-code_profiles_others-profile_others-profile_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../top-level-code/profiles/others-profile/others-profile.component */ 115)).then(mod => mod.OthersProfileComponent),
  resolve: {
    userData: _assistant_level_code_custom_architecture_aids_resolvers_skalar_info_resolver_component__WEBPACK_IMPORTED_MODULE_3__.UserProfileResolver
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
}];
function defaultMalformedUriErrorHandler(error, urlSerializer, url) {
  console.error(`Malformed URL error: ${error.message}`, url);
  return urlSerializer.parse('/'); // Redirect to the homepage or a specific error route
}

/***/ }),

/***/ 6468:
/*!*******************************************************!*\
  !*** ./src/app/app-routes/route-guards/auth.guard.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthGuard: () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var src_app_assistant_level_code_child_reusable_options_error_handler_error_handler_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/assistant-level-code/child-reusable-options/error-handler/error-handler.component */ 6371);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_assistant_level_code_custom_architecture_aids_services_authorize_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/assistant-level-code/custom-architecture-aids/services/authorize.service */ 5614);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var src_app_assistant_level_code_custom_architecture_aids_services_global_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/assistant-level-code/custom-architecture-aids/services/global-data.service */ 8860);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/snack-bar */ 9409);







class AuthGuard {
  authService;
  dialog;
  globalService;
  router;
  snackBar;
  constructor(authService, dialog, globalService, router, snackBar) {
    this.authService = authService;
    this.dialog = dialog;
    this.globalService = globalService;
    this.router = router;
    this.snackBar = snackBar;
  }
  canActivate = (next, state) => {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.authService.redirectUrl = state.url;
      const dialogRef = this.dialog.open(src_app_assistant_level_code_child_reusable_options_error_handler_error_handler_component__WEBPACK_IMPORTED_MODULE_0__.ErrorHandlerComponent);
      dialogRef.afterClosed().subscribe(() => {
        const snackBarRef = this.snackBar.open("Skalarly requries an account to access it's content.", "Create an account to see what you'r missing.", {
          duration: 3500
        });
      });
      const blocked = this.globalService.getBlockedValue();
      if (blocked) {
        this.snackBar.open('This Skalar has blocked you', '', {
          duration: 3000
        });
        return false;
      } else {
        return isAuth;
      }
    } else {
      return true;
    }
  };
  static ɵfac = function AuthGuard_Factory(t) {
    return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](src_app_assistant_level_code_custom_architecture_aids_services_authorize_service__WEBPACK_IMPORTED_MODULE_1__.AuthorizeService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](src_app_assistant_level_code_custom_architecture_aids_services_global_data_service__WEBPACK_IMPORTED_MODULE_2__.GlobalDataService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__.MatSnackBar));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: AuthGuard,
    factory: AuthGuard.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 8986:
/*!**********************************************************!*\
  !*** ./src/app/app-routes/route-guards/confirm.guard.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmGuard: () => (/* binding */ ConfirmGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_assistant_level_code_custom_architecture_aids_services_editing_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/assistant-level-code/custom-architecture-aids/services/editing.service */ 7109);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);



class ConfirmGuard {
  rootSub$;
  editingService;
  aRoute;
  routeTitle;
  constructor(editingService, aRoute) {
    this.editingService = editingService;
    this.aRoute = aRoute;
  }
  canDeactivate() {
    this.rootSub$ = this.aRoute.title.subscribe(title => {
      this.routeTitle = title;
    });
    try {
      // If leaving edit profile page
      if (this.routeTitle === 'edit-profile') {
        const isSaved = this.editingService.getIsSaved();
        if (!isSaved) {
          const result = window.confirm('Do you want to save your changes?');
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
  ngOnDestroy() {
    // clean up subscription
    this.rootSub$?.unsubscribe();
  }
  static ɵfac = function ConfirmGuard_Factory(t) {
    return new (t || ConfirmGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](src_app_assistant_level_code_custom_architecture_aids_services_editing_service__WEBPACK_IMPORTED_MODULE_0__.EditingService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ConfirmGuard,
    factory: ConfirmGuard.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 327:
/*!*********************************************************!*\
  !*** ./src/app/app-routes/route-guards/signup-guard.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SaveSignUpGuard: () => (/* binding */ SaveSignUpGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_assistant_level_code_custom_architecture_aids_services_create_edit_account_signup_form_state_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/assistant-level-code/custom-architecture-aids/services/create-edit-account/signup-form-state.service */ 5604);


class SaveSignUpGuard {
  formStateService;
  constructor(formStateService) {
    this.formStateService = formStateService;
  }
  canDeactivate() {
    console.log('guard');
    if (this.formStateService.getUnsavedChanges()) {
      const confirmNavigation = window.confirm('You have not completed creating your account, all progress will be lost. Do you want to continue?');
      return confirmNavigation;
    }
    return true;
  }
  static ɵfac = function SaveSignUpGuard_Factory(t) {
    return new (t || SaveSignUpGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](src_app_assistant_level_code_custom_architecture_aids_services_create_edit_account_signup_form_state_service__WEBPACK_IMPORTED_MODULE_0__.SignUpFormStateService));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: SaveSignUpGuard,
    factory: SaveSignUpGuard.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 6401:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _assistant_level_code_custom_architecture_aids_services_router_strategies_title_strategy_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assistant-level-code/custom-architecture-aids/services/router-strategies/title-strategy.service */ 6280);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ 2484);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/animations */ 2501);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _assistant_level_code_custom_architecture_aids_services_orientation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assistant-level-code/custom-architecture-aids/services/orientation.service */ 6030);







const AppComponent_Defer_2_DepsFn = () => [Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_material_fesm2022_chips_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_divider_mjs-node_modules_angular_material_fesm-c0162a"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_card_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_nav-bar_nav-bar_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./nav-bar/nav-bar.component */ 8401)).then(m => m.NavBarComponent), Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @angular/common */ 6575)).then(m => m.NgClass), Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_material_fesm2022_chips_mjs"), __webpack_require__.e("common")]).then(__webpack_require__.bind(__webpack_require__, /*! ./nav-bar/nav-icons/nav-icons.component */ 645)).then(m => m.NavIconsComponent), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet, __webpack_require__.e(/*! import() */ "src_app_assistant-level-code_custom-architecture-aids_directives_scroll-toggle_directive_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./assistant-level-code/custom-architecture-aids/directives/scroll-toggle.directive */ 1659)).then(m => m.scrollToggleDirective)];
function AppComponent_Defer_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "app-nav-bar", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("toggleHeader", function AppComponent_Defer_0_Conditional_2_Template_app_nav_bar_toggleHeader_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r4.onToggleHeader($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function AppComponent_Defer_0_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "footer");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-nav-icons");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function AppComponent_Defer_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 1)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, AppComponent_Defer_0_Conditional_2_Template, 1, 0, "app-nav-bar", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, AppComponent_Defer_0_Conditional_5_Template, 2, 0, "footer");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx_r0.orientationService.url() == ("/login" || 0) ? "" : "content-container");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵconditional"](2, ctx_r0.orientationService.url() !== ("/login" || 0) ? 2 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@fadeMargin", ctx_r0.marginState);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵconditional"](5, ctx_r0.orientationService.screen() && ctx_r0.orientationService.url() !== ("/login" || 0) ? 5 : -1);
  }
}
function AppComponent_DeferLoading_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, " Skalarly ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
class AppComponent {
  orientationService;
  marginState = 'withMargin';
  constructor(orientationService) {
    this.orientationService = orientationService;
  }
  onToggleHeader(show) {
    this.marginState = show ? 'withMargin' : 'withoutMargin';
  }
  static ɵfac = function AppComponent_Factory(t) {
    return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_assistant_level_code_custom_architecture_aids_services_orientation_service__WEBPACK_IMPORTED_MODULE_1__.OrientationService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
    type: AppComponent,
    selectors: [["app-root"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([{
      provide: _angular_router__WEBPACK_IMPORTED_MODULE_2__.TitleStrategy,
      useClass: _assistant_level_code_custom_architecture_aids_services_router_strategies_title_strategy_service__WEBPACK_IMPORTED_MODULE_0__.CustomTitleStrategy
    }]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
    decls: 4,
    vars: 0,
    consts: [[300], [3, "ngClass"], ["scrollToggle", ""], ["t", ""], ["scrollToggle", "", 3, "toggleHeader"], [1, "initial-load"], ["src", "assets/images/Skalar_Hat_Icon.svg", "width", "82", "height", "60.5", "sizes", "15vw", "alt", "Skalarly Grad Wizard Hat Icon"]],
    template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, AppComponent_Defer_0_Template, 6, 4)(1, AppComponent_DeferLoading_1_Template, 4, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefer"](2, 0, AppComponent_Defer_2_DepsFn, 1, null, null, 0, null, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdeferEnableTimerScheduling"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdeferOnIdle"]();
      }
    },
    dependencies: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__.MatToolbarModule, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule],
    styles: [".content-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n  width: 100%;\n  height: 100vh;\n  box-sizing: border-box;\n}\n\napp-nav-bar[scrollToggle][_ngcontent-%COMP%] {\n  z-index: 4;\n  position: fixed;\n  width: 100%;\n}\n\nfooter[_ngcontent-%COMP%] {\n  box-shadow: 0px -4px;\n  background-color: var(--basicText);\n  border-top-left-radius: 8px;\n  border-top-right-radius: 8px;\n  position: sticky;\n  bottom: 0;\n  z-index: 4;\n  width: 100%;\n}\n\n.initial-load[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  height: 50vh;\n}\n\n.mobile-fade-overlay[_ngcontent-%COMP%] {\n  position: relative;\n}\n.mobile-fade-overlay[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: var(--bolder);\n  z-index: -1;\n}\n\n.glow-effect[_ngcontent-%COMP%] {\n  box-shadow: 0 0 10px 5px var(--pairingColor);\n  transition: box-shadow 0.3s ease;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9hc3Npc3RhbnQtbGV2ZWwtY29kZS91bml2ZXJzYWwtcmV1c2FibGUtc3R5bGVzL2NvbW1vbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VDQUksYURDcUI7RUNBckIsOEJBQUE7RUFDQSxzQkREMEM7RUNJMUMsV0FEb0I7RUFFcEIsYUFGbUM7RUFHbkMsc0JBQUE7QURESjs7QUFGQTtFQUNFLFVBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtBQUtGOztBQUhBO0VBQ0Usb0JBQUE7RUFDQSxrQ0FBQTtFQUNBLDJCQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtBQU1GOztBQUpBO0VDbkJJLGFBRGlCO0VBRWpCLHVCQUZpQztFQUdqQyxzQkFIb0Q7RURzQnRELG1CQUFBO0VBQ0EsWUFBQTtBQVNGOztBQVBBO0VBQ0ksa0JBQUE7QUFVSjtBQVRJO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtBQVdOOztBQVJBO0VBQ0UsNENBQUE7RUFDQSxnQ0FBQTtBQVdGIiwic291cmNlc0NvbnRlbnQiOlsiQHVzZSAnLi9hc3Npc3RhbnQtbGV2ZWwtY29kZS91bml2ZXJzYWwtcmV1c2FibGUtc3R5bGVzL2NvbW1vbicgYXMgY29tbW9uO1xuLmNvbnRlbnQtY29udGFpbmVye1xuICBAaW5jbHVkZSBjb21tb24uY29tbW9uKGZsZXgsIHNwYWNlLWJldHdlZW4sIGNvbHVtbik7XG4gIEBpbmNsdWRlIGNvbW1vbi5wYWdlU2l6ZTtcbn1cbmFwcC1uYXYtYmFyW3Njcm9sbFRvZ2dsZV17XG4gIHotaW5kZXg6IDQ7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgd2lkdGg6IDEwMCU7XG59XG5mb290ZXJ7XG4gIGJveC1zaGFkb3c6IDBweCAtNHB4IDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFzaWNUZXh0KTtcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogOHB4O1xuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogOHB4O1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICBib3R0b206IDA7XG4gIHotaW5kZXg6IDQ7XG4gIHdpZHRoOiAxMDAlXG59XG4uaW5pdGlhbC1sb2Fke1xuICBAaW5jbHVkZSAgY29tbW9uLmNvbW1vbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiA1MHZoO1xufVxuLm1vYmlsZS1mYWRlLW92ZXJsYXkge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAmOjpiZWZvcmUge1xuICAgICAgY29udGVudDogXCJcIjtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWJvbGRlcik7IFxuICAgICAgei1pbmRleDogLTE7XG4gICAgfVxuICB9XG4uZ2xvdy1lZmZlY3Qge1xuICBib3gtc2hhZG93OiAwIDAgMTBweCA1cHggdmFyKC0tcGFpcmluZ0NvbG9yKTtcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAwLjNzIGVhc2U7IFxufVxuLy8gLmRlc2t0b3B7XG4vLyAgIGRpc3BsYXk6IGZsZXg7XG4vLyAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4vLyByb3V0ZXItb3V0bGV0W2NvbnRlbnRdIHtcbi8vICAgb3JkZXI6IDI7XG4vLyAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4vLyAgIGZsZXg6IDE7IFxuLy8gfVxuLy8gYXBwLW5hdi1iYXJ7XG4vLyAgIG9yZGVyOiAxO1xuLy8gfVxuLy8gfVxuLy8gLm1vYmlsZXtcbi8vICAgZGlzcGxheTogZmxleDtcbi8vICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbi8vICAgcm91dGVyLW91dGxldFtjb250ZW50XSB7XG4vLyAgICAgb3JkZXI6IDE7XG4vLyAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbi8vICAgICBmbGV4OiAxOyBcbi8vICAgICBwYWRkaW5nLWJvdHRvbTogNGVtO1xuLy8gICB9XG4vLyAgIGFwcC1uYXYtYmFye1xuLy8gICAgIG9yZGVyOiAyO1xuLy8gICB9XG4vLyAgIH0iLCJAbWl4aW4gY29tbW9uKCRmbGV4OiBmbGV4LCAkY29udGVudDogY2VudGVyLCAkcG9ydHJhaXQ6IGNvbHVtbil7XG4gICAgZGlzcGxheTogJGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiAkY29udGVudDtcbiAgICBmbGV4LWRpcmVjdGlvbjogJHBvcnRyYWl0O1xufVxuQG1peGluIHBhZ2VTaXplKCR3aWR0aDogMTAwJSwgJGhlaWdodDogMTAwdmgpe1xuICAgIHdpZHRoOiAkd2lkdGg7XG4gICAgaGVpZ2h0OiAkaGVpZ2h0O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"],
    data: {
      animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.trigger)('fadeMargin', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.state)('withMargin', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.style)({
        marginTop: '3.3rem'
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.state)('withoutMargin', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.style)({
        marginTop: '0rem'
      })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.transition)('withMargin <=> withoutMargin', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.animate)('300ms ease-in-out'))])]
    }
  });
}

/***/ }),

/***/ 6371:
/*!******************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/child-reusable-options/error-handler/error-handler.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorHandlerComponent: () => (/* binding */ ErrorHandlerComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var src_app_top_level_code_login_login_logic_login_logic_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/top-level-code/login/login-logic/login-logic.component */ 718);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 7947);







class ErrorHandlerComponent {
  dialogRef;
  data;
  router;
  constructor(
  // eslint-disable-next-line no-unused-vars
  dialogRef,
  // eslint-disable-next-line no-unused-vars
  data, router) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.router = router;
  }
  navigate() {
    this.router.navigate(['/sign-up']);
  }
  static ɵfac = function ErrorHandlerComponent_Factory(t) {
    return new (t || ErrorHandlerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: ErrorHandlerComponent,
    selectors: [["app-error-handler"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 10,
    vars: 2,
    consts: [[1, "error-screen"], ["title", ""], ["body", ""], [3, "alwaysVertical", "hideBorder"], ["mat-button", "", 3, "click"]],
    template: function ErrorHandlerComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Skalarly");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "app-login-logic", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "footer")(6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ErrorHandlerComponent_Template_button_click_6_listener() {
          return ctx.navigate();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, " No account? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " Join Skalarly ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("alwaysVertical", true)("hideBorder", true);
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, src_app_top_level_code_login_login_logic_login_logic_component__WEBPACK_IMPORTED_MODULE_0__.LoginLogicComponent],
    styles: [".error-screen[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 7%;\n}\n.error-screen[_ngcontent-%COMP%]   div[title][_ngcontent-%COMP%] {\n  text-align: center;\n  font-weight: bold;\n  background-clip: text;\n  -webkit-background-clip: text;\n  color: transparent;\n  background-image: linear-gradient(45deg, var(--bolder), var(--firstChoice), var(--bolder));\n  background-size: 200% 200%;\n  animation: _ngcontent-%COMP%_gradient-flow 7s linear infinite;\n}\n@media (min-width: 0px) {\n  .error-screen[_ngcontent-%COMP%]   div[title][_ngcontent-%COMP%] {\n    \n\n    font-size: 1.4rem;\n    line-height: 2.24rem;\n  }\n}\n@media (min-width: 600px) {\n  .error-screen[_ngcontent-%COMP%]   div[title][_ngcontent-%COMP%] {\n    \n\n    font-size: 1.5rem;\n    line-height: 2.325rem;\n  }\n}\n@media (min-width: 768px) {\n  .error-screen[_ngcontent-%COMP%]   div[title][_ngcontent-%COMP%] {\n    \n\n    font-size: 1.7rem;\n    line-height: 2.55rem;\n  }\n}\n@media (min-width: 992px) {\n  .error-screen[_ngcontent-%COMP%]   div[title][_ngcontent-%COMP%] {\n    \n\n    font-size: 1.7rem;\n    line-height: 2.465rem;\n  }\n}\n@media (min-width: 1200px) {\n  .error-screen[_ngcontent-%COMP%]   div[title][_ngcontent-%COMP%] {\n    \n\n    font-size: 1.8rem;\n    line-height: 2.52rem;\n  }\n}\n@keyframes _ngcontent-%COMP%_gradient-flow {\n  0% {\n    background-position: 200% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n}\n.error-screen[_ngcontent-%COMP%]   div[body][_ngcontent-%COMP%] {\n  margin: 0% 2%;\n  width: 100%;\n}\n.error-screen[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n  padding: 0% 5%;\n}\n.error-screen[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--firstChoice);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXNzaXN0YW50LWxldmVsLWNvZGUvY2hpbGQtcmV1c2FibGUtb3B0aW9ucy9lcnJvci1oYW5kbGVyL2Vycm9yLWhhbmRsZXIuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2Fzc2lzdGFudC1sZXZlbC1jb2RlL3VuaXZlcnNhbC1yZXVzYWJsZS1zdHlsZXMvcmVzcG9uc2l2ZS1taXhpbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVdBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7QUFWRjtBQVdBO0VBRUksa0JBQUE7RUFDQSxpQkFBQTtFQUNBLHFCQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtFQUNBLDBGQUFBO0VBQ0EsMEJBQUE7RUFFQSwyQ0FBQTtBQVhKO0FDRUk7RURESjtJQ1lVLGlCQUFBO0lBQ0EsaUJBWG1CO0lBWW5CLG9CQUFBO0VEVFI7QUFDRjtBQ0xJO0VEREo7SUNZVSxpQkFBQTtJQUNBLGlCQVhtQjtJQVluQixxQkFBQTtFREZSO0FBQ0Y7QUNaSTtFRERKO0lDWVUsaUJBQUE7SUFDQSxpQkFYbUI7SUFZbkIsb0JBQUE7RURLUjtBQUNGO0FDbkJJO0VEREo7SUNZVSxpQkFBQTtJQUNBLGlCQVhtQjtJQVluQixxQkFBQTtFRFlSO0FBQ0Y7QUMxQkk7RURESjtJQ1lVLGlCQUFBO0lBQ0EsaUJBWG1CO0lBWW5CLG9CQUFBO0VEbUJSO0FBQ0Y7QUFqREE7RUFDRTtJQUNFLDZCQUFBO0VBbURGO0VBakRBO0lBQ0UsMkJBQUE7RUFtREY7QUFDRjtBQTlCSTtFQUNFLGFBQUE7RUFDQSxXQUFBO0FBZ0NOO0FBOUJJO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBZ0NOO0FBOUJRO0VBQ0EseUJBQUE7QUFnQ1IiLCJzb3VyY2VzQ29udGVudCI6WyJAdXNlICcuLi8uLi91bml2ZXJzYWwtcmV1c2FibGUtc3R5bGVzL3Jlc3BvbnNpdmUtbWl4aW4nIGFzIHJlc3BvbnNpdmU7XG5AbWl4aW4gZ3JhZGllbnRGbG93IHtcbkBrZXlmcmFtZXMgZ3JhZGllbnQtZmxvdyB7XG4gIDAle1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDIwMCUgNTAlO1xuICB9XG4gIDEwMCUge1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAlIDUwJTtcbiAgfVxufVxufVxuLmVycm9yLXNjcmVlbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiA3JTtcbmRpdlt0aXRsZV0ge1xuICAgIEBpbmNsdWRlIHJlc3BvbnNpdmUucmVzcG9uc2l2ZUZvbnRTaXplKCdsYXJnZScpO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBiYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gICAgLXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gICAgY29sb3I6IHRyYW5zcGFyZW50OyBcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIHZhcigtLWJvbGRlciksIHZhcigtLWZpcnN0Q2hvaWNlKSwgdmFyKC0tYm9sZGVyKSk7XG4gICAgYmFja2dyb3VuZC1zaXplOiAyMDAlIDIwMCU7IFxuICAgIEBpbmNsdWRlIGdyYWRpZW50RmxvdztcbiAgICBhbmltYXRpb246IGdyYWRpZW50LWZsb3cgN3MgbGluZWFyIGluZmluaXRlOyBcbiAgICB9XG4gICAgZGl2W2JvZHlde1xuICAgICAgbWFyZ2luOiAwJSAyJTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgICBmb290ZXJ7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgcGFkZGluZzogMCUgNSU7XG4gICAgICBidXR0b257XG4gICAgICAgIHNwYW57XG4gICAgICAgIGNvbG9yOiB2YXIoLS1maXJzdENob2ljZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0iLCIgQHVzZSAnLi4vdW5pdmVyc2FsLXJldXNhYmxlLXN0eWxlcy9icmVhay1wb2ludHMnIGFzIGRldmljZTtcbiBcbkBtaXhpbiBtZWRpYS1xdWVyeSgkc2NyZWVuLCAkbWluLXdpZHRoKSB7XG4gICAgJGluZGV4OiBpbmRleChtYXAta2V5cyhkZXZpY2UuJGRldmljZS1zaXplcyksICRzY3JlZW4pO1xuICAgICRuZXh0LWluZGV4OiAkaW5kZXggKyAxO1xuICAgICRkZXZpY2Utc2l6ZXMta2V5czogbWFwLWtleXMoZGV2aWNlLiRkZXZpY2Utc2l6ZXMpO1xuICAgICRuZXh0LXNjcmVlbjogaWYoJG5leHQtaW5kZXggPD0gbGVuZ3RoKCRkZXZpY2Utc2l6ZXMta2V5cyksIG50aCgkZGV2aWNlLXNpemVzLWtleXMsICRuZXh0LWluZGV4KSwgbnVsbCk7XG4gICAgJG1heC13aWR0aDogaWYoJG5leHQtc2NyZWVuLCBtYXAtZ2V0KGRldmljZS4kZGV2aWNlLXNpemVzLCAkbmV4dC1zY3JlZW4pIC0gMXB4LCBudWxsKTtcbiAgICAkbWVkaWEtcXVlcnk6IFwiKG1pbi13aWR0aDogI3skbWluLXdpZHRofSlcIjtcbiAgICBAaWYgJG1heC13aWR0aCB7XG4gICAgICAgICRtZWRpYS1xdWVyeTogXCIjeyRtZWRpYS1xdWVyeX0gYW5kIChtYXgtd2lkdGg6ICN7JG1heC13aWR0aH0pXCI7XG4gICAgICB9XG4gICAgICBAbWVkaWEgI3skbWVkaWEtcXVlcnl9IHtcbiAgICAgICAgQGNvbnRlbnQ7XG4gICAgICB9XG59XG5AbWl4aW4gcmVzcG9uc2l2ZUZvbnRTaXplKCRzaXplVmFyaWFudDogJ2RlZmF1bHQnKSB7XG4gIEBlYWNoICRzY3JlZW4sICRtaW4td2lkdGggaW4gZGV2aWNlLiRkZXZpY2Utc2l6ZXMge1xuICAgIEBtZWRpYSAobWluLXdpZHRoOiAkbWluLXdpZHRoKSB7XG4gICAgICAgICAgJHNjcmVlbi1mb250LXNpemU6IG1hcC1nZXQoZGV2aWNlLiRmb250LXNpemVzLCAkc2NyZWVuKTtcbiAgICAgICAgICAkc2NyZWVuLWZvbnQtc3ViLXNpemU6IG1hcC1nZXQoZGV2aWNlLiRmb250LXN1Yi1zaXplcywgJHNjcmVlbik7XG4gICAgICAgICAgJGxpbmUtaGVpZ2h0LXJhdGlvOiBtYXAtZ2V0KGRldmljZS4kbGluZS1oZWlnaHRzLCAkc2NyZWVuKTtcbiAgICAgIFxuICAgICAgICAgICRmaW5hbC1mb250LXNpemU6ICRzY3JlZW4tZm9udC1zaXplO1xuICAgICAgICAgIEBpZiAkc2l6ZVZhcmlhbnQgPT0gJ3NtYWxsZXInIHtcbiAgICAgICAgICAgICRmaW5hbC1mb250LXNpemU6ICRzY3JlZW4tZm9udC1zaXplIC0gJHNjcmVlbi1mb250LXN1Yi1zaXplIC0gLjRyZW07XG4gICAgICAgICAgfSBAZWxzZSBpZiAkc2l6ZVZhcmlhbnQgPT0gJ2xhcmdlcicge1xuICAgICAgICAgICAgJGZpbmFsLWZvbnQtc2l6ZTogJHNjcmVlbi1mb250LXNpemUgKyAkc2NyZWVuLWZvbnQtc3ViLXNpemUgKyAxLjFyZW07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qIEFwcGx5IHN0eWxlcyAqL1xuICAgICAgICAgIGZvbnQtc2l6ZTogJGZpbmFsLWZvbnQtc2l6ZTtcbiAgICAgICAgICBsaW5lLWhlaWdodDogJGZpbmFsLWZvbnQtc2l6ZSAqICRsaW5lLWhlaWdodC1yYXRpbztcbiAgICAgICAgfVxuICAgICAgfVxuICB9XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
  });
}

/***/ }),

/***/ 4357:
/*!**********************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/animations/dialog-animation.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dialog: () => (/* binding */ dialog)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 2501);
// dialog-animation.ts

const dialog = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('dialog', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* <=> *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  opacity: 0,
  transform: 'translateX(100%)' // start from below the page
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('1s ease', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  opacity: 1,
  transform: 'translateY(0%)' // move to the middle of the page
}))])]);

/***/ }),

/***/ 9151:
/*!********************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/animations/lock-animation.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lock: () => (/* binding */ lock)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 2501);

const lock = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('lock', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('closed', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(0deg) scale(1)',
  color: '#333333'
})), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('open', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(45deg) scale(1.2)',
  color: '#FFBF00'
})), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('closed => open', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('0.5s ease', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(0deg) scale(1)',
  color: '#333333'
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(15deg) scale(1.1)',
  color: '#B0B000'
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(30deg) scale(1.15)',
  color: '#FFD700'
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(45deg) scale(1.2)',
  color: '#FFB700'
})]))), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('open => closed', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('0.5s ease', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(45deg) scale(1.2)',
  color: '#FFBF00'
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(30deg) scale(1.15)',
  color: '#FFD700'
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(15deg) scale(1.1)',
  color: '#B0B000'
}), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(0deg) scale(1)',
  color: '#333333'
})])))]);

/***/ }),

/***/ 7895:
/*!*************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/animations/rotate180-animation.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rotate180: () => (/* binding */ rotate180)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 2501);

const rotate180 = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('rotate180', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('true', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(0deg)'
})), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('false', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(180deg)'
})), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('true <=> false', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('200ms ease-in-out'))]);

/***/ }),

/***/ 5602:
/*!***************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/animations/spin-change-animation.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   spinChange: () => (/* binding */ spinChange)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 2501);

const spinChange = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('spinChange', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('initial', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(0deg)'
})), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('spinning', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(360deg)'
})), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('check', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
  transform: 'rotate(360deg)'
})), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('initial <=> spinning', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('1s linear')), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => check', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('1s ease'))]);

/***/ }),

/***/ 386:
/*!***************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/directives/glow-border.directive.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlowBorderDirective: () => (/* binding */ GlowBorderDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 8849);


class GlowBorderDirective {
  el;
  renderer;
  ngControl;
  appGlowBorder = false;
  statusSubscription = null;
  isGlowing = false;
  hasError = false;
  formFieldElement = null;
  constructor(el, renderer, ngControl) {
    this.el = el;
    this.renderer = renderer;
    this.ngControl = ngControl;
  }
  ngAfterViewInit() {
    this.formFieldElement = this.el.nativeElement.closest('.mat-mdc-text-field-wrapper');
    if (this.ngControl.statusChanges) {
      this.statusSubscription = this.ngControl.statusChanges.subscribe(status => {
        this.updateGlow(status === 'INVALID');
      });
    }
  }
  updateGlow(isInvalid) {
    if (isInvalid) {
      this.hasError = !this.ngControl.untouched;
      if (this.hasError) {
        this.renderer.addClass(this.formFieldElement, 'error-animation');
      } else {
        this.renderer.addClass(this.formFieldElement, 'glow-animation');
        this.isGlowing = true;
      }
    }
    // If the field is valid, add the 'glowAnimation' and remove 'error-animation' if it exists
    else {
      if (!this.isGlowing && !this.hasError) {
        this.renderer.addClass(this.formFieldElement, 'glow-animation');
        this.isGlowing = true;
      } else {
        this.renderer.removeClass(this.formFieldElement, 'error-animation');
        this.hasError = true;
      }
    }
  }
  onFocus() {
    this.updateGlow(this.ngControl?.invalid ?? false);
  }
  onBlur() {
    // Only remove the styles that were added on focus
    if (this.hasError) {
      this.renderer.removeClass(this.formFieldElement, 'error-animation');
      this.hasError = false; // Reset the flag after removing
    }
    if (this.isGlowing) {
      this.renderer.removeClass(this.formFieldElement, 'glow-animation');
      this.isGlowing = false; // Reset the flag after removing
    }
  }
  ngOnDestroy() {
    if (this.statusSubscription) {
      this.statusSubscription?.unsubscribe();
    }
  }
  static ɵfac = function GlowBorderDirective_Factory(t) {
    return new (t || GlowBorderDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControl));
  };
  static ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: GlowBorderDirective,
    selectors: [["", "appGlowBorder", ""]],
    hostBindings: function GlowBorderDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("focus", function GlowBorderDirective_focus_HostBindingHandler() {
          return ctx.onFocus();
        })("blur", function GlowBorderDirective_blur_HostBindingHandler() {
          return ctx.onBlur();
        });
      }
    },
    inputs: {
      appGlowBorder: "appGlowBorder"
    },
    standalone: true
  });
}

/***/ }),

/***/ 8133:
/*!************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/interceptors/auth-interceptor.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthInterceptor: () => (/* binding */ AuthInterceptor)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 1891);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 2389);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_authorize_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/authorize.service */ 5614);




class AuthInterceptor {
  authService;
  // eslint-disable-next-line no-unused-vars
  constructor(authService) {
    this.authService = authService;
  }
  intercept(req, next) {
    const currentRoute = req.headers.get('X-Current-Route');
    console.log('eazy ', currentRoute);
    // Use the custom route to determine if the request is an "easy access" route
    if (currentRoute) {
      console.log('eazy access');
      const newReq = req.clone({
        headers: req.headers.delete('X-Current-Route')
      });
      return next.handle(newReq);
    } else {
      return this.authService.token$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.switchMap)(token => {
        console.log('environmen 77t', src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production);
        const authReq = token ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        }) : req;
        console.log('authReq', authReq);
        return next.handle(authReq).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
          console.error('HTTP error occurred in auth-interceptor', error);
          // Rethrow the error to propagate it to the caller
          throw error;
        }));
      }));
    }
  }
  static ɵfac = function AuthInterceptor_Factory(t) {
    return new (t || AuthInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_authorize_service__WEBPACK_IMPORTED_MODULE_1__.AuthorizeService));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: AuthInterceptor,
    factory: AuthInterceptor.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 9632:
/*!*************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/interceptors/error-interceptor.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorInterceptor: () => (/* binding */ ErrorInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _child_reusable_options_error_handler_error_handler_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../child-reusable-options/error-handler/error-handler.component */ 6371);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 2389);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 7401);






class ErrorInterceptor {
  dialog;
  router;
  dialogRef;
  constructor(dialog, router) {
    this.dialog = dialog;
    this.router = router;
    this.dialog = dialog;
  }
  intercept(req, next) {
    return next.handle(req).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)(error => {
      // Should siaply appropriate message from server
      // not just this unknown bs lol
      let errorMessage = 'An unknown error occured!';
      if (error.error.message) {
        errorMessage = error.error.message;
      }
      this.dialogRef = this.dialog.open(_child_reusable_options_error_handler_error_handler_component__WEBPACK_IMPORTED_MODULE_0__.ErrorHandlerComponent, {
        data: {
          message: errorMessage
        },
        disableClose: true
      });
      const routerSubscription = this.router.events.subscribe(event => {
        if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__.NavigationStart) {
          this.dialogRef?.close();
          routerSubscription.unsubscribe();
        }
      });
      throw error;
    }));
  }
  static ɵfac = function ErrorInterceptor_Factory(t) {
    return new (t || ErrorInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: ErrorInterceptor,
    factory: ErrorInterceptor.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 313:
/*!****************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/reauthorize/reauthorize.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReauthorizeComponent: () => (/* binding */ ReauthorizeComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/animations */ 2501);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _animations_dialog_animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animations/dialog-animation */ 4357);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_authorize_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/authorize.service */ 5614);







class ReauthorizeComponent {
  data;
  dialogRef;
  authorizeService;
  remainingTime;
  loadingBarState = 100;
  constructor(data, dialogRef, authorizeService) {
    this.data = data;
    this.dialogRef = dialogRef;
    this.authorizeService = authorizeService;
    this.remainingTime = data.remainingTime;
  }
  ngOnInit() {
    this.startCountdown();
  }
  startCountdown() {
    const interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.loadingBarState = this.remainingTime / 30 * 100; // 30-second countdown
      } else {
        clearInterval(interval);
        // Session expired, perform logout
        this.logOut();
      }
    }, 1000);
  }
  // Method to extend the session
  reAuthorize() {
    this.dialogRef.close('extend');
    this.authorizeService.stayLoggedIn();
  }
  // Method to log out
  logOut() {
    this.dialogRef.close('logout');
  }
  static ɵfac = function ReauthorizeComponent_Factory(t) {
    return new (t || ReauthorizeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_authorize_service__WEBPACK_IMPORTED_MODULE_1__.AuthorizeService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
    type: ReauthorizeComponent,
    selectors: [["app-reauthorize"]],
    inputs: {
      remainingTime: "remainingTime"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
    decls: 23,
    vars: 6,
    consts: [["lang", "en"], ["charset", "utf-8"], [1, "fas", "fa-history"], [1, "reauthTitle"], [1, "loading-bar-container"], [1, "loading-bar"], [1, "time-remaining"], ["mat-dialog-actions", ""], ["mat-raised-button", "", 1, "reauthLogout", 3, "click"], ["mat-raised-button", "", 1, "reauthStayIn", 3, "click"]],
    template: function ReauthorizeComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "html", 0)(1, "head");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "meta", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "title");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Reauthorize Page");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "body")(6, "div")(7, "header");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, " Session Timeout ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, " Your session is about to expire ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](17, "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 7)(19, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ReauthorizeComponent_Template_button_click_19_listener() {
          return ctx.logOut();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Logout");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ReauthorizeComponent_Template_button_click_21_listener() {
          return ctx.reAuthorize();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Remain Logged In");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("@dialogAnimation", undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("@loadingBar", ctx.loadingBarState);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Time Remaining: ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](17, 3, ctx.remainingTime, "ss"), " ");
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.DatePipe],
    styles: [".dialog-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.loading-bar-container[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.loading-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 20px;\n  background-color: #007bff;\n}\n\n.time-remaining[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  text-align: center;\n  z-index: 1;\n  background-color: rgba(0, 0, 0, 0.7);\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXNzaXN0YW50LWxldmVsLWNvZGUvY3VzdG9tLWFyY2hpdGVjdHVyZS1haWRzL3JlYXV0aG9yaXplL3JlYXV0aG9yaXplLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7QUFDSjs7QUFFRTtFQUNFLGtCQUFBO0FBQ0o7O0FBRUU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0FBQ0o7O0FBRUU7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLG9DQUFBO0VBQ0EsWUFBQTtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLmRpYWxvZy1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuICBcbiAgLmxvYWRpbmctYmFyLWNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG4gIFxuICAubG9hZGluZy1iYXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMjBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3YmZmO1xuICB9XG4gIFxuICAudGltZS1yZW1haW5pbmcge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXG4gICAgYm90dG9tOiAwOyBcbiAgICBsZWZ0OiAwOyBcbiAgICB3aWR0aDogMTAwJTsgXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyBcbiAgICB6LWluZGV4OiAxOyBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNyk7IFxuICAgIGNvbG9yOiB3aGl0ZTsgXG4gIH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
    data: {
      animation: [_animations_dialog_animation__WEBPACK_IMPORTED_MODULE_0__.dialog, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.trigger)('loadingBar', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.transition)(':increment', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.animate)('1s', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.keyframes)([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.style)({
        width: '0%'
      }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_5__.style)({
        width: '{{ progress }}%'
      })]))])])]
    }
  });
}

/***/ }),

/***/ 2230:
/*!***********************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/resolvers/skalar-info-resolver.component.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserProfileResolver: () => (/* binding */ UserProfileResolver)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/global-data.service */ 8860);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ 9409);




class UserProfileResolver {
  globalDataService;
  snackBar;
  constructor(globalDataService, snackBar) {
    this.globalDataService = globalDataService;
    this.snackBar = snackBar;
  }
  // Used for profile and skalars pages for
  resolve(route) {
    const url = route.routeConfig.path; // Get the URL of the current route
    if (url === 'profile/:info') {
      return this.globalDataService.getSkalarData(); // Replace with your data-fetching method
    } else {
      // path: 'skalars/:id',
      const id = route.params['id'];
      this.globalDataService.fetchSkalarsData(id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(data => {
        // Check if data is true and set the 'blocked' value accordingly
        // Which is accessed by canActivate nav guard and will stop nav and
        // display message
        if (typeof data === 'boolean') {
          this.globalDataService.setBlockedValue(data === true);
          return null;
        } else {
          return data;
        }
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
        this.snackBar.open('An error occurred while fetching Skalar data', '', {
          duration: 3000
        });
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(null);
      }));
    }
  }
  static ɵfac = function UserProfileResolver_Factory(t) {
    return new (t || UserProfileResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_global_data_service__WEBPACK_IMPORTED_MODULE_0__.GlobalDataService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__.MatSnackBar));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: UserProfileResolver,
    factory: UserProfileResolver.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 5614:
/*!*********************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/services/authorize.service.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthorizeService: () => (/* binding */ AuthorizeService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8071);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1650);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _reauthorize_reauthorize_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reauthorize/reauthorize.component */ 313);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ 7401);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ 9409);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 7947);











class AuthorizeService {
  http;
  dialog;
  snackBar;
  router;
  platformId;
  redirectUrl = '';
  apiUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl;
  // these variables don't require reactivity/async data
  userId = null;
  isAuthenticated = false;
  // Subjects
  tokenSubject$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(null);
  // Observables
  token$ = this.tokenSubject$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.shareReplay)(1));
  // path of url
  currentRoute = '';
  constructor(http, dialog, snackBar, router, platformId) {
    this.http = http;
    this.dialog = dialog;
    this.snackBar = snackBar;
    this.router = router;
    this.platformId = platformId;
  }
  //  recieved credentials
  getUserId() {
    return this.userId;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  // search email on login
  searchEmails(email) {
    const queryParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpParams({
      fromString: email
    });
    return this.http.get(this.apiUrl + '/authorize/emailValidation', {
      params: queryParams
    });
  }
  // Login
  login(email, password, stayLoggedIn) {
    const authData = {
      email,
      password,
      stayLoggedIn
    };
    console.log('stayLoggedIn', stayLoggedIn);
    this.http.post(this.apiUrl + '/authorize/login', authData).subscribe({
      next: response => {
        if (response.token) {
          this.tokenSubject$.next(response.token);
          this.userId = response.userId;
          this.isAuthenticated = true;
          //  look over and add clean up for subjects and obs
          this.setAuthTimer(response.expiresIn);
          const expirationDate = new Date(new Date().getTime() + response.expiresIn);
          this.saveAuthData(response.token, expirationDate, response.userId);
          const redirectUrl = this.redirectUrl ? this.redirectUrl : '/home';
          this.router.navigate([redirectUrl]);
          this.snackBar.open('Welcome Fellow Skalar🎓', '', {
            duration: 3000
          });
          this.redirectUrl = '';
          return true;
        } else {
          // failed login
          return false;
        }
      },
      error: error => {
        this.tokenSubject$.next(null);
        this.userId = null;
        this.isAuthenticated = false;
      }
    });
    // default return false to handle sync case when login fails immdediately
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(false);
  }
  // stay loggedin.. fix ths
  stayLoggedIn() {
    const Id = this.userId;
    console.log('followed by userId', Id);
    const sub = this.http.post(this.apiUrl + '/authorize/stayLoggedIn', Id).subscribe({
      next: response => {
        if (response.token) {
          this.snackBar.open('Thanks for reauthorizing yourself', '✅ ', {
            duration: 3000
          });
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration);
          this.saveAuthData(response.token, expirationDate, this.userId);
          sub.unsubscribe();
          console.log('love you reauthorized');
        }
      },
      error: error => {
        this.isAuthenticated = false;
        // this.snackBar.open('Failed to login, please try again', 'Will do!!', {
        //     duration: 4000
        // });
      }
    });
  }
  setAuthTimer(duration) {
    const warningTime = duration - 30000; // 30 seconds before expiration
    setTimeout(() => {
      // Calculate the remaining time in seconds
      const remainingTime = Math.floor((duration - Date.now()) / 1000);
      // Display a warning dialog when there are 30 seconds left
      const dialogRef = this.dialog.open(_reauthorize_reauthorize_component__WEBPACK_IMPORTED_MODULE_0__.ReauthorizeComponent, {
        data: {
          remainingTime
        }
      });
      // Subscribe to dialog result or actions if needed
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'extend') {
          // reassign setAuthTimer
          this.setAuthTimer(warningTime);
        } else {
          // User didn't extend, you can handle this case accordingly
          // logout when time runs out
          this.logout();
          this.snackBar.open('Validation Expired', 'Please Relogin', {
            duration: 3000
          });
        }
      });
    }, warningTime);
  }
  // needs to be triggered whenever one of these values change
  saveAuthData(token, expirationDate, userId) {
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_6__.isPlatformBrowser)(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('expiration', expirationDate.toISOString());
      localStorage.setItem('userId', userId);
    }
  }
  getAuthData() {
    const token = localStorage.getItem('token');
    this.tokenSubject$.next(token);
    this.userId = localStorage.getItem('userId');
  }
  // access removal
  clearAuthData() {
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_6__.isPlatformBrowser)(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('userId');
    }
  }
  // clean up
  logout() {
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_6__.isPlatformBrowser)(this.platformId)) {
      this.currentRoute = document.URL;
      console.log('current url', this.currentRoute);
      if (this.currentRoute !== 'http://localhost:4200/login' && this.currentRoute !== 'https://www.skalarly.com/login') {
        this.router.navigate(['/login']);
      }
      this.tokenSubject$.next(null);
      this.isAuthenticated = false;
      this.userId = null;
      // change activity status to false
      // clear local storage
      this.clearAuthData();
    }
  }
  static ɵfac = function AuthorizeService_Factory(t) {
    return new (t || AuthorizeService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.PLATFORM_ID));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
    token: AuthorizeService,
    factory: AuthorizeService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 5604:
/*!*************************************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/services/create-edit-account/signup-form-state.service.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignUpFormStateService: () => (/* binding */ SignUpFormStateService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

// Shared service to manage the sign-up form state
class SignUpFormStateService {
  hasUnsavedChanges = false;
  setUnsavedChanges(state) {
    console.log('check 1?', state);
    this.hasUnsavedChanges = state;
  }
  // Method to check form state
  getUnsavedChanges() {
    console.log('unsaved?', this.hasUnsavedChanges);
    return this.hasUnsavedChanges;
  }
  static ɵfac = function SignUpFormStateService_Factory(t) {
    return new (t || SignUpFormStateService)();
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: SignUpFormStateService,
    factory: SignUpFormStateService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 7109:
/*!*******************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/services/editing.service.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditingService: () => (/* binding */ EditingService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

class EditingService {
  isSaved = false;
  constructor() {}
  //check authorization
  getIsSaved() {
    return this.isSaved;
  }
  // save profile
  saveEditingProfile() {
    return this.isSaved = true;
  }
  static ɵfac = function EditingService_Factory(t) {
    return new (t || EditingService)();
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
    token: EditingService,
    factory: EditingService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 8860:
/*!***********************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/services/global-data.service.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalDataService: () => (/* binding */ GlobalDataService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1650);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2389);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 553);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _authorize_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authorize.service */ 5614);






class GlobalDataService {
  http;
  authorizeService;
  apiUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
  userId = null;
  skalarInfo$ = null;
  isBlocked = false;
  // Lets cache basic skalar info on login, but updated if edit profile!
  // faster profile laod also, just have to get posts, pics..
  // things that are used lots, pp, username, name...
  constructor(
  // eslint-disable-next-line no-unused-vars
  http, authorizeService) {
    this.http = http;
    this.authorizeService = authorizeService;
    this.userId = authorizeService.getUserId();
  }
  setBlockedValue(value) {
    this.isBlocked = value;
  }
  getBlockedValue() {
    const value = this.isBlocked;
    this.isBlocked = false; // reset the value after accessing it
    return value;
  }
  // grab this skalars data
  getSkalarData() {
    if (!this.skalarInfo$) {
      const queryParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpParams({
        fromString: this.userId
      });
      return this.http.get(
      // set up mock server to serve local host requests?
      this.apiUrl + '/skalars/selfInfo', {
        params: queryParams
      }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.shareReplay)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(err => {
        throw `Error in grabbing your info request: ${err}`;
      }));
    } else {
      return this.skalarInfo$;
    }
  }
  // grab skalars data
  fetchSkalarsData(id) {
    const queryParams = {
      id: id,
      userId: this.userId
    };
    const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpParams({
      fromObject: queryParams
    });
    return this.http.get(this.apiUrl + '/skalars/skalarsInfo', {
      params
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.catchError)(err => {
      throw `Error in grabbing Skalars request: ${err}`;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(data => {
      // Check if the received data is a boolean
      if (typeof data === 'boolean') {
        // this skalar has blocked you, no data for you
        return null;
      } else {
        // Return the data as is
        return data;
      }
    }));
  }
  static ɵfac = function GlobalDataService_Factory(t) {
    return new (t || GlobalDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_authorize_service__WEBPACK_IMPORTED_MODULE_1__.AuthorizeService));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
    token: GlobalDataService,
    factory: GlobalDataService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 6030:
/*!***********************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/services/orientation.service.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrientationService: () => (/* binding */ OrientationService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 2513);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 4520);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 274);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 6575);






class OrientationService {
  ngZone;
  router;
  platformId;
  routeSub$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
  orientationState = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(true);
  screen = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this.orientationState());
  urlState = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)('/');
  url = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this.urlState());
  constructor(ngZone, router, platformId) {
    this.ngZone = ngZone;
    this.router = router;
    this.platformId = platformId;
    if ((0,_angular_common__WEBPACK_IMPORTED_MODULE_2__.isPlatformBrowser)(this.platformId)) {
      this.setOrientationState();
      window.addEventListener('resize', () => {
        this.ngZone.run(() => {
          const orientationType = window.screen.orientation.type;
          switch (orientationType) {
            case 'landscape-primary':
            case 'landscape-secondary':
              this.orientationState.set(false);
              break;
            case 'portrait-primary':
            case 'portrait-secondary':
              this.orientationState.set(true);
              break;
            default:
              this.orientationState.set(true);
              break;
          }
        });
      });
      // SSR check changing url
      (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.afterRender)(() => {
        this.urlState.set(this.router.url);
        this.router.events.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__.NavigationEnd), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this.routeSub$))
        // eslint-disable-next-line rxjs-angular/prefer-async-pipe
        .subscribe(event => {
          this.urlState.set(event.url);
        });
      }, {
        phase: _angular_core__WEBPACK_IMPORTED_MODULE_1__.AfterRenderPhase.Read
      });
    }
  }
  // SSR
  setOrientationState() {
    const orientationType = window.screen.orientation.type;
    switch (orientationType) {
      case 'landscape-primary':
      case 'landscape-secondary':
        this.orientationState.set(false);
        break;
      case 'portrait-primary':
      case 'portrait-secondary':
        this.orientationState.set(true);
        break;
      default:
        this.orientationState.set(true);
        break;
    }
  }
  ngOnDestroy() {
    this.routeSub$.next();
    this.routeSub$.complete();
  }
  static ɵfac = function OrientationService_Factory(t) {
    return new (t || OrientationService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: OrientationService,
    factory: OrientationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 6280:
/*!********************************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/services/router-strategies/title-strategy.service.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomTitleStrategy: () => (/* binding */ CustomTitleStrategy)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 6480);



class CustomTitleStrategy extends _angular_router__WEBPACK_IMPORTED_MODULE_0__.TitleStrategy {
  titleService;
  constructor(titleService) {
    super();
    this.titleService = titleService;
  }
  updateTitle(snapshot) {
    // you might extract a title from the deepest child route
    let childRoute = snapshot.root;
    while (childRoute.firstChild) {
      childRoute = childRoute.firstChild;
    }
    const title = childRoute.data['title'] ?? 'Skalarly ';
    this.titleService.setTitle(title);
  }
  static ɵfac = function CustomTitleStrategy_Factory(t) {
    return new (t || CustomTitleStrategy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.Title));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: CustomTitleStrategy,
    factory: CustomTitleStrategy.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 8588:
/*!************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/validators/password.validator.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   passwordValidator: () => (/* binding */ passwordValidator)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 655);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 3317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9736);

// Define password validation rules here
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
// Custom password validator function
function passwordValidator() {
  return control => {
    return control.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_0__.debounceTime)(500), (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(value => {
      if (!value) {
        return null;
      }
      if (!passwordRegex.test(control.value)) {
        return {
          invalidPassword: true
        };
      }
      // Password meets the criteria
      return null;
    }));
  };
}

/***/ }),

/***/ 5115:
/*!*************************************************************************!*\
  !*** ./src/app/top-level-code/login/imports/animation-logic-imports.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reusableLogicAnimations: () => (/* binding */ reusableLogicAnimations)
/* harmony export */ });
/* harmony import */ var _assistant_level_code_custom_architecture_aids_animations_lock_animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../assistant-level-code/custom-architecture-aids/animations/lock-animation */ 9151);
/* harmony import */ var _assistant_level_code_custom_architecture_aids_animations_rotate180_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../assistant-level-code/custom-architecture-aids/animations/rotate180-animation */ 7895);
/* harmony import */ var _assistant_level_code_custom_architecture_aids_animations_spin_change_animation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../assistant-level-code/custom-architecture-aids/animations/spin-change-animation */ 5602);



const reusableLogicAnimations = [_assistant_level_code_custom_architecture_aids_animations_lock_animation__WEBPACK_IMPORTED_MODULE_0__.lock, _assistant_level_code_custom_architecture_aids_animations_rotate180_animation__WEBPACK_IMPORTED_MODULE_1__.rotate180, _assistant_level_code_custom_architecture_aids_animations_spin_change_animation__WEBPACK_IMPORTED_MODULE_2__.spinChange];

/***/ }),

/***/ 718:
/*!***************************************************************************!*\
  !*** ./src/app/top-level-code/login/login-logic/login-logic.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginLogicComponent: () => (/* binding */ LoginLogicComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 8849);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 2235);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 655);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 3317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 5043);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 9736);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 1891);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 4980);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 9644);
/* harmony import */ var _assistant_level_code_custom_architecture_aids_directives_glow_border_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../assistant-level-code/custom-architecture-aids/directives/glow-border.directive */ 386);
/* harmony import */ var src_app_assistant_level_code_custom_architecture_aids_validators_password_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/assistant-level-code/custom-architecture-aids/validators/password.validator */ 8588);
/* harmony import */ var _imports_animation_logic_imports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../imports/animation-logic-imports */ 5115);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 6575);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/form-field */ 1333);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/tooltip */ 702);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/input */ 26);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/checkbox */ 6658);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _assistant_level_code_custom_architecture_aids_services_authorize_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../assistant-level-code/custom-architecture-aids/services/authorize.service */ 5614);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 7947);






















function LoginLogicComponent_Conditional_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No account matches this email");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function LoginLogicComponent_Conditional_6_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0, " alternate_email ");
  }
}
function LoginLogicComponent_Conditional_6_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0, " update ");
  }
}
function LoginLogicComponent_Conditional_6_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0, " check_circle ");
  }
}
function LoginLogicComponent_Conditional_6_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function LoginLogicComponent_Conditional_6_Conditional_9_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      let tmp_b_0;
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"]((tmp_b_0 = ctx_r11.loginForm.get("email")) == null ? null : tmp_b_0.reset());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function LoginLogicComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-form-field", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Academic Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, LoginLogicComponent_Conditional_6_Conditional_4_Template, 2, 0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, LoginLogicComponent_Conditional_6_Case_6_Template, 1, 0)(7, LoginLogicComponent_Conditional_6_Case_7_Template, 1, 0)(8, LoginLogicComponent_Conditional_6_Case_8_Template, 1, 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, LoginLogicComponent_Conditional_6_Conditional_9_Template, 3, 0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    let LoginLogicComponent_Conditional_6_contFlowTmp;
    let tmp_8_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("appGlowBorder", ctx_r0.isGlowing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("condition-met", ctx.emailFound);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](4, (ctx == null ? null : ctx.error) === "notFound" ? 4 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@spinChange", ctx.emailState);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](6, (LoginLogicComponent_Conditional_6_contFlowTmp = ctx.emailState) === "initial" ? 6 : LoginLogicComponent_Conditional_6_contFlowTmp === "spinning" ? 7 : LoginLogicComponent_Conditional_6_contFlowTmp === "check" ? 8 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](9, ((tmp_8_0 = ctx_r0.loginForm.get("email")) == null ? null : tmp_8_0.value) ? 9 : -1);
  }
}
function LoginLogicComponent_Conditional_13_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Invalid password");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function LoginLogicComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-form-field", 5)(1, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "input", 18, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, " Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, LoginLogicComponent_Conditional_13_Conditional_7_Template, 2, 0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function LoginLogicComponent_Conditional_13_Template_button_click_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      $event.stopPropagation();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r16.toggleVisibility());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@lock", ctx.lockState);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", !ctx.isPasswordValid ? "lock" : "lock_open", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("type", ctx_r1.visiblePassword ? "text" : "password")("appGlowBorder", ctx_r1.isGlowing);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("condition-met", ctx_r1.loginForm.get("password").valid);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](7, (ctx == null ? null : ctx.error) === "notFound" ? 7 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("matTooltip", ctx_r1.visiblePassword ? "Hide Password" : "Show Password");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("@rotate180", ctx_r1.visiblePassword);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r1.visiblePassword ? "visibility" : "visibility_off", " ");
  }
}
function LoginLogicComponent_Case_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0, " Login ");
  }
}
function LoginLogicComponent_Case_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0, " Loading... ");
  }
}
function LoginLogicComponent_Case_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](0, " Login ");
  }
}
const _c0 = (a0, a1) => ({
  "normal-style": a0,
  "error-style": a1
});
class LoginLogicComponent {
  authorizeService;
  router;
  cdr;
  alwaysVertical = false;
  hideBorder = false;
  isGlowing = false;
  progressState = 'default';
  // email
  email$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Observable();
  // password
  password$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Observable();
  visiblePassword = false;
  stayLoggedIn = false;
  constructor(authorizeService,
  // eslint-disable-next-line no-unused-vars
  router, cdr) {
    this.authorizeService = authorizeService;
    this.router = router;
    this.cdr = cdr;
  }
  loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroup({
    email: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.email]),
    password: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, (0,src_app_assistant_level_code_custom_architecture_aids_validators_password_validator__WEBPACK_IMPORTED_MODULE_1__.passwordValidator)()])
  });
  // form function
  createControlObservable(controlName, debounce, startWithState, validateFn, switchMapFn) {
    return this.loginForm.controls[controlName].valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.debounceTime)(debounce), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.distinctUntilChanged)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.startWith)(startWithState), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.map)(value => {
      const controlValue = this.loginForm.controls[controlName].value;
      return [controlValue, validateFn(controlValue)];
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.switchMap)(([value, isValid]) => switchMapFn(value, isValid)));
  }
  // Switch map function for email
  emailSwitchMapFn(email, isValid) {
    if (email === '') {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)({
        emailFound: false,
        emailState: 'initial'
      });
    } else if (isValid) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.concat)((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)({
        emailFound: false,
        emailState: 'loading'
      }), this.authorizeService.searchEmails(email).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.map)(emailFound => ({
        emailFound,
        emailState: emailFound ? 'check' : 'initial'
      }))));
    } else {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)({
        emailFound: false,
        emailState: 'initial',
        error: 'notFound'
      });
    }
  }
  // Switch map function to handle changes in password
  handlePasswordChange(password, isValid) {
    if (password === '') {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)({
        isPasswordValid: false,
        lockState: 'closed'
      });
    } else if (isValid) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)({
        isPasswordValid: true,
        lockState: 'open'
      });
    } else {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)({
        isPasswordValid: false,
        lockState: 'closed',
        error: 'notFound'
      });
    }
  }
  ngOnInit() {
    // email
    this.email$ = this.createControlObservable('email', 500, {
      emailFound: false,
      emailState: 'initial',
      error: ''
    }, this.isEmailValid.bind(this), this.emailSwitchMapFn);
    // password
    this.password$ = this.createControlObservable('password', 500, {
      isPasswordValid: false,
      lockState: 'closed'
    }, this.isPasswordValid.bind(this),
    // Updated
    this.handlePasswordChange);
  }
  isEmailValid() {
    return this.loginForm.controls['email'].valid;
  }
  isPasswordValid() {
    return this.loginForm.controls['password'].valid;
  }
  // toggle password visbility
  toggleVisibility() {
    this.visiblePassword = !this.visiblePassword;
  }
  // remain logged in
  stayIn() {
    this.stayLoggedIn = !this.stayLoggedIn;
  }
  login() {
    this.progressState = 'loading';
    this.cdr.detectChanges(); // Detect changes immediately
    setTimeout(() => {
      this.progressState = 'declined';
      this.cdr.detectChanges(); // Detect changes when state changes to 'declined'
      setTimeout(() => {
        this.progressState = 'default';
        this.cdr.detectChanges(); // Detect changes when state resets to 'default'
      }, 2000); // Wait 3 seconds before returning to default
    }, 2000);
    // 2 seconds to go to 'declined'
    // when success this.progressState = 'complete';
    // this.authorizeService
    //   .login(
    //     this.loginForm.controls['email'].value,
    //     this.loginForm.controls['password'].value
    //   )
    //   .subscribe({
    //     next: (progress: boolean) => {
    //       if (progress) {
    //         this.progressState = 'complete';
    //         // navigate to home page
    //       } else {
    //         this.progressState = 'default';
    //         this.failedLoginAnimation = 'left';
    //         // Reset the animation after a short delay
    //         setTimeout(() => {
    // if (this.intervalId) {
    //   clearInterval(this.intervalId);
    // }
    //           this.failedLoginAnimation = 'right';
    //           setTimeout(() => {
    //             this.failedLoginAnimation = 'initial'; // Reset to the initial state
    //           }, 100);
    //         }, 100);
    //       }
    //     },
    //     error: (error) => {
    //       // Handle any errors that occurred during login
    //       this.progressState = 'default'; // Hide the loading button in case of an error
    //     }
    //   });
  }
  getIconConfig(progressState) {
    switch (progressState) {
      case 'default':
        return '';
      case 'loading':
        return '';
      case 'complete':
        return 'fingerprint-border-approved';
      case 'declined':
        return 'fingerprint-border-declined';
      default:
        return '';
    }
  }
  // ability to login using enter click
  enterClicked() {
    if (this.loginForm.valid) {
      this.login();
    }
  }
  // forgot password
  navigate() {
    this.router.navigate(['/forgot-password']);
  }
  static ɵfac = function LoginLogicComponent_Factory(t) {
    return new (t || LoginLogicComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_assistant_level_code_custom_architecture_aids_services_authorize_service__WEBPACK_IMPORTED_MODULE_3__.AuthorizeService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ChangeDetectorRef));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
    type: LoginLogicComponent,
    selectors: [["app-login-logic"]],
    inputs: {
      alwaysVertical: "alwaysVertical",
      hideBorder: "hideBorder"
    },
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
    decls: 23,
    vars: 16,
    consts: [[3, "formGroup", "ngSubmit"], ["phrase", ""], [1, "input-boxes"], [3, "ngClass"], ["column", ""], ["appearance", "outline", "southPaw", ""], [1, "login-options"], ["color", "primary", 3, "checked", "change"], ["forgot", ""], ["mat-button", "", "forgot", "", 3, "click"], [1, "login-standard-wrapper"], ["mat-raised-button", "", "type", "submit", 1, "login", 3, "ngClass", "keydown.enter"], ["matInput", "", "formControlName", "email", "placeholder", "ex: name@institution.ca", "type", "email", "id", "skalarlyEmail", 3, "appGlowBorder"], ["matPrefix", "", 1, "material-symbols-outlined"], ["matSuffix", "", "mat-icon-button", ""], ["matSuffix", "", "mat-icon-button", "", 3, "click"], [1, "material-symbols-outlined"], ["matPrefix", "", "placeholder", "Password", 1, "material-symbols-outlined"], ["matInput", "", "formControlName", "password", "placeholder", "Password", 3, "type", "appGlowBorder"], ["skalarlyPassword", ""], ["matSuffix", "", "mat-icon-button", "", "type", "button", 3, "matTooltip", "click"], ["matSuffix", "", 1, "material-symbols-outlined"]],
    template: function LoginLogicComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngSubmit", function LoginLogicComponent_Template_form_ngSubmit_0_listener() {
          return ctx.login();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, " Enhancing Academics ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 2)(4, "span", 3)(5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, LoginLogicComponent_Conditional_6_Template, 10, 7, "mat-form-field", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 6)(9, "mat-checkbox", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("change", function LoginLogicComponent_Template_mat_checkbox_change_9_listener() {
          return ctx.stayIn();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, " Stay logged In ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, LoginLogicComponent_Conditional_13_Template, 11, 10, "mat-form-field", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](14, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 8)(16, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function LoginLogicComponent_Template_button_click_16_listener() {
          return ctx.navigate();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, " Forgot Password?\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 10)(19, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("keydown.enter", function LoginLogicComponent_Template_button_keydown_enter_19_listener() {
          return ctx.enterClicked();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, LoginLogicComponent_Case_20_Template, 1, 0)(21, LoginLogicComponent_Case_21_Template, 1, 0)(22, LoginLogicComponent_Case_22_Template, 1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
      }
      if (rf & 2) {
        let LoginLogicComponent_contFlowTmp;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.loginForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("hide-border", ctx.hideBorder);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](13, _c0, !ctx.alwaysVertical, ctx.alwaysVertical));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](6, (LoginLogicComponent_contFlowTmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](7, 9, ctx.email$)) ? 6 : -1, LoginLogicComponent_contFlowTmp);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("checked", ctx.stayLoggedIn);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](13, (LoginLogicComponent_contFlowTmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](14, 11, ctx.password$)) ? 13 : -1, LoginLogicComponent_contFlowTmp);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", ctx.getIconConfig(ctx.progressState));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵconditional"](20, (LoginLogicComponent_contFlowTmp = ctx.progressState) === "default" ? 20 : LoginLogicComponent_contFlowTmp === "loading" ? 21 : 22);
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.AsyncPipe, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlName, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatError, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatPrefix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatSuffix, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__.MatTooltipModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_18__.MatTooltip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_20__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_20__.MatInput, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_21__.MatCheckboxModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_21__.MatCheckbox, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgClass, _assistant_level_code_custom_architecture_aids_directives_glow_border_directive__WEBPACK_IMPORTED_MODULE_0__.GlowBorderDirective],
    styles: ["\n\ndiv[column][_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  padding: 3% 2% 0% 2%;\n  width: 100%;\n}\ndiv[column][_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]:first-of-type {\n  justify-content: flex-start;\n}\ndiv[column][_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]:not(:first-of-type) {\n  justify-content: flex-end;\n}\n\ndiv[forgot][_ngcontent-%COMP%] {\n  margin-bottom: 4%;\n  display: flex;\n  justify-content: flex-end;\n}\ndiv[forgot][_ngcontent-%COMP%]   button[forgot][_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  cursor: pointer;\n}\n@media (min-width: 0px) {\n  div[forgot][_ngcontent-%COMP%]   button[forgot][_ngcontent-%COMP%] {\n    \n\n    font-size: 0.91rem;\n    line-height: 1.456rem;\n  }\n}\n@media (min-width: 600px) {\n  div[forgot][_ngcontent-%COMP%]   button[forgot][_ngcontent-%COMP%] {\n    \n\n    font-size: 0.99rem;\n    line-height: 1.5345rem;\n  }\n}\n@media (min-width: 768px) {\n  div[forgot][_ngcontent-%COMP%]   button[forgot][_ngcontent-%COMP%] {\n    \n\n    font-size: 1.15rem;\n    line-height: 1.725rem;\n  }\n}\n@media (min-width: 992px) {\n  div[forgot][_ngcontent-%COMP%]   button[forgot][_ngcontent-%COMP%] {\n    \n\n    font-size: 1.1rem;\n    line-height: 1.595rem;\n  }\n}\n@media (min-width: 1200px) {\n  div[forgot][_ngcontent-%COMP%]   button[forgot][_ngcontent-%COMP%] {\n    \n\n    font-size: 1.13rem;\n    line-height: 1.582rem;\n  }\n}\n\ndiv[phrase][_ngcontent-%COMP%] {\n  padding: 2% 0;\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  color: grey;\n  align-items: center;\n}\n@media (min-width: 0px) {\n  div[phrase][_ngcontent-%COMP%] {\n    \n\n    font-size: 0.91rem;\n    line-height: 1.456rem;\n  }\n}\n@media (min-width: 600px) {\n  div[phrase][_ngcontent-%COMP%] {\n    \n\n    font-size: 0.99rem;\n    line-height: 1.5345rem;\n  }\n}\n@media (min-width: 768px) {\n  div[phrase][_ngcontent-%COMP%] {\n    \n\n    font-size: 1.15rem;\n    line-height: 1.725rem;\n  }\n}\n@media (min-width: 992px) {\n  div[phrase][_ngcontent-%COMP%] {\n    \n\n    font-size: 1.1rem;\n    line-height: 1.595rem;\n  }\n}\n@media (min-width: 1200px) {\n  div[phrase][_ngcontent-%COMP%] {\n    \n\n    font-size: 1.13rem;\n    line-height: 1.582rem;\n  }\n}\n\nmat-checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-start;\n}\n@media (min-width: 0px) {\n  mat-checkbox[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    \n\n    font-size: 0.91rem;\n    line-height: 1.456rem;\n  }\n}\n@media (min-width: 600px) {\n  mat-checkbox[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    \n\n    font-size: 0.99rem;\n    line-height: 1.5345rem;\n  }\n}\n@media (min-width: 768px) {\n  mat-checkbox[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    \n\n    font-size: 1.15rem;\n    line-height: 1.725rem;\n  }\n}\n@media (min-width: 992px) {\n  mat-checkbox[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    \n\n    font-size: 1.1rem;\n    line-height: 1.595rem;\n  }\n}\n@media (min-width: 1200px) {\n  mat-checkbox[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n    \n\n    font-size: 1.13rem;\n    line-height: 1.582rem;\n  }\n}\n\n.normal-style[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: baseline;\n}\n@media only screen and (min-width: 600px) {\n  .normal-style[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: center;\n    flex-direction: row;\n  }\n}\n\n.error-style[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n}\n\nspan[matPrefix][_ngcontent-%COMP%] {\n  margin-left: 15%;\n}\n\n.login-options[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  text-align: center;\n}\n\n.hide-border[_ngcontent-%COMP%] {\n  border-right: none;\n}\n\n.input-boxes[_ngcontent-%COMP%]:first-of-type   mat-checkbox[_ngcontent-%COMP%] {\n  margin-left: 3%;\n}\n\n.login-standard-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  padding-bottom: 5%;\n  justify-content: center;\n}\n.login-standard-wrapper[_ngcontent-%COMP%]   button.login[_ngcontent-%COMP%] {\n  background-color: var(--firstChoice);\n  color: var(--basicText);\n  border-radius: 25px;\n  padding: 12px 24px;\n  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);\n  width: 75%;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.5s ease-in-out;\n}\n@media (min-width: 0px) {\n  .login-standard-wrapper[_ngcontent-%COMP%]   button.login[_ngcontent-%COMP%] {\n    \n\n    font-size: 1.4rem;\n    line-height: 2.24rem;\n  }\n}\n@media (min-width: 600px) {\n  .login-standard-wrapper[_ngcontent-%COMP%]   button.login[_ngcontent-%COMP%] {\n    \n\n    font-size: 1.5rem;\n    line-height: 2.325rem;\n  }\n}\n@media (min-width: 768px) {\n  .login-standard-wrapper[_ngcontent-%COMP%]   button.login[_ngcontent-%COMP%] {\n    \n\n    font-size: 1.7rem;\n    line-height: 2.55rem;\n  }\n}\n@media (min-width: 992px) {\n  .login-standard-wrapper[_ngcontent-%COMP%]   button.login[_ngcontent-%COMP%] {\n    \n\n    font-size: 1.7rem;\n    line-height: 2.465rem;\n  }\n}\n@media (min-width: 1200px) {\n  .login-standard-wrapper[_ngcontent-%COMP%]   button.login[_ngcontent-%COMP%] {\n    \n\n    font-size: 1.8rem;\n    line-height: 2.52rem;\n  }\n}\n.login-standard-wrapper[_ngcontent-%COMP%]   button.login[_ngcontent-%COMP%]:hover {\n  transform: scale(1.05);\n}\n.login-standard-wrapper[_ngcontent-%COMP%]   button.login[_ngcontent-%COMP%]:before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 100%;\n  bottom: 0;\n  background-image: linear-gradient(to left, var(--pairingColor), var(--secondChoice));\n  transition: right 0.5s ease-in-out;\n  z-index: -1;\n}\n.login-standard-wrapper[_ngcontent-%COMP%]   button.login[_ngcontent-%COMP%]:hover:before {\n  right: 0;\n}\n.login-standard-wrapper[_ngcontent-%COMP%]   button.login.fingerprint-border-declined[_ngcontent-%COMP%] {\n  background-color: var(--error);\n  animation: _ngcontent-%COMP%_shake 0.5s linear;\n}\n@keyframes _ngcontent-%COMP%_shake {\n  0%, 100% {\n    transform: translateX(0);\n  }\n  25%, 75% {\n    transform: translateX(-12px);\n  }\n  50% {\n    transform: translateX(12px);\n  }\n}\n.login-standard-wrapper[_ngcontent-%COMP%]   button.login.fingerprint-border-approved[_ngcontent-%COMP%] {\n  text-shadow: 0 0 5px var(--approved);\n  transform: scale(1.7);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9wLWxldmVsLWNvZGUvbG9naW4vbG9naW4tbG9naWMvbG9naW4tbG9naWMtYW5pbWF0aW9ucy5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvdG9wLWxldmVsLWNvZGUvbG9naW4vbG9naW4tbG9naWMvbG9naW4tbG9naWMuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2Fzc2lzdGFudC1sZXZlbC1jb2RlL3VuaXZlcnNhbC1yZXVzYWJsZS1zdHlsZXMvY29tbW9uLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2Fzc2lzdGFudC1sZXZlbC1jb2RlL3VuaXZlcnNhbC1yZXVzYWJsZS1zdHlsZXMvcmVzcG9uc2l2ZS1taXhpbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFJLGlCQUFBO0FDR0o7RUNGSSxhQURpQjtFQUVqQix1QkFGaUM7RUFHakMsc0JBSG9EO0VES3BELG9CQUFBO0VBQ0EsV0FBQTtBQUNKO0FBQ0k7RUFBa0IsMkJBQUE7QUFFdEI7QUFESTtFQUF3Qix5QkFBQTtBQUk1Qjs7QUFEQTtFQUNJLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0FBSUo7QUFISTtFQUVFLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUFJTjtBRU5JO0VGRkE7SUVhTSxpQkFBQTtJQUNBLGtCQUxvQjtJQU1wQixxQkFBQTtFRkRSO0FBQ0Y7QUViSTtFRkZBO0lFYU0saUJBQUE7SUFDQSxrQkFMb0I7SUFNcEIsc0JBQUE7RUZNUjtBQUNGO0FFcEJJO0VGRkE7SUVhTSxpQkFBQTtJQUNBLGtCQUxvQjtJQU1wQixxQkFBQTtFRmFSO0FBQ0Y7QUUzQkk7RUZGQTtJRWFNLGlCQUFBO0lBQ0EsaUJBTG9CO0lBTXBCLHFCQUFBO0VGb0JSO0FBQ0Y7QUVsQ0k7RUZGQTtJRWFNLGlCQUFBO0lBQ0Esa0JBTG9CO0lBTXBCLHFCQUFBO0VGMkJSO0FBQ0Y7O0FBcENFO0VBQ0UsYUFBQTtFQUNBLGtCQUFBO0VDeEJBLGFBRGlCO0VBRWpCLHVCQUZpQztFQUdqQyxzQkFIb0Q7RUQyQnBELFdBQUE7RUFFQSxtQkFBQTtBQXdDSjtBRW5ESTtFRktGO0lFTVEsaUJBQUE7SUFDQSxrQkFMb0I7SUFNcEIscUJBQUE7RUY0Q1I7QUFDRjtBRTFESTtFRktGO0lFTVEsaUJBQUE7SUFDQSxrQkFMb0I7SUFNcEIsc0JBQUE7RUZtRFI7QUFDRjtBRWpFSTtFRktGO0lFTVEsaUJBQUE7SUFDQSxrQkFMb0I7SUFNcEIscUJBQUE7RUYwRFI7QUFDRjtBRXhFSTtFRktGO0lFTVEsaUJBQUE7SUFDQSxpQkFMb0I7SUFNcEIscUJBQUE7RUZpRVI7QUFDRjtBRS9FSTtFRktGO0lFTVEsaUJBQUE7SUFDQSxrQkFMb0I7SUFNcEIscUJBQUE7RUZ3RVI7QUFDRjs7QUF4RUU7RUFDRSxhQUFBO0VBQ0EsMkJBQUE7QUEyRUo7QUUzRkk7RUZpQkE7SUVOTSxpQkFBQTtJQUNBLGtCQUxvQjtJQU1wQixxQkFBQTtFRm9GUjtBQUNGO0FFbEdJO0VGaUJBO0lFTk0saUJBQUE7SUFDQSxrQkFMb0I7SUFNcEIsc0JBQUE7RUYyRlI7QUFDRjtBRXpHSTtFRmlCQTtJRU5NLGlCQUFBO0lBQ0Esa0JBTG9CO0lBTXBCLHFCQUFBO0VGa0dSO0FBQ0Y7QUVoSEk7RUZpQkE7SUVOTSxpQkFBQTtJQUNBLGlCQUxvQjtJQU1wQixxQkFBQTtFRnlHUjtBQUNGO0FFdkhJO0VGaUJBO0lFTk0saUJBQUE7SUFDQSxrQkFMb0I7SUFNcEIscUJBQUE7RUZnSFI7QUFDRjs7QUF4R0U7RUN2Q0UsYUR3Q3VCO0VDdkN2Qix1QkR1QzZCO0VDdEM3QixzQkRzQ3FDO0VBQ3JDLHFCQUFBO0FBNkdKO0FBNUdJO0VBSEY7SUN2Q0UsYUQyQzJCO0lDMUMzQix1QkQwQ2lDO0lDekNqQyxtQkR5Q3lDO0VBaUgzQztBQUNGOztBQS9HQTtFQzlDSSxhRCtDcUI7RUM5Q3JCLHVCRDhDMkI7RUM3QzNCLHNCRDZDbUM7QUFvSHZDOztBQWxIRTtFQUFrQixnQkFBQTtBQXNIcEI7O0FBckhBO0VDbERJLGFBRGlCO0VBRWpCLHVCQUZpQztFQUdqQyxzQkFIb0Q7RURxRHRELGtCQUFBO0FBMEhGOztBQXZIQTtFQUFjLGtCQUFBO0FBMkhkOztBQTFIK0I7RUFBZSxlQUFBO0FBOEg5Qzs7QUE3SEU7RUFDRSxhQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsdUJBQUE7QUFnSUo7QUEvSEk7RUFFQSxvQ0FBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLDBDQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQ0FBQTtBQWdJSjtBRXZMSTtFRjZDQTtJRWxDTSxpQkFBQTtJQUNBLGlCQVhtQjtJQVluQixvQkFBQTtFRmdMUjtBQUNGO0FFOUxJO0VGNkNBO0lFbENNLGlCQUFBO0lBQ0EsaUJBWG1CO0lBWW5CLHFCQUFBO0VGdUxSO0FBQ0Y7QUVyTUk7RUY2Q0E7SUVsQ00saUJBQUE7SUFDQSxpQkFYbUI7SUFZbkIsb0JBQUE7RUY4TFI7QUFDRjtBRTVNSTtFRjZDQTtJRWxDTSxpQkFBQTtJQUNBLGlCQVhtQjtJQVluQixxQkFBQTtFRnFNUjtBQUNGO0FFbk5JO0VGNkNBO0lFbENNLGlCQUFBO0lBQ0EsaUJBWG1CO0lBWW5CLG9CQUFBO0VGNE1SO0FBQ0Y7QUFsS0k7RUFDRSxzQkFBQTtBQW9LTjtBQWxLSTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7RUFDQSxvRkFBQTtFQUNBLGtDQUFBO0VBQ0EsV0FBQTtBQW9LTjtBQWxLSTtFQUNFLFFBQUE7QUFvS047QUFqS0U7RUFDSSw4QkFBQTtFQUVBLDRCQUFBO0FBa0tOO0FEL1BNO0VBQ0U7SUFDQSx3QkFBQTtFQ2lRTjtFRC9QTTtJQUNBLDRCQUFBO0VDaVFOO0VEL1BNO0lBQ0EsMkJBQUE7RUNpUU47QUFDRjtBQTNLSTtFQUNFLG9DQUFBO0VBQ0EscUJBQUE7QUE2S04iLCJzb3VyY2VzQ29udGVudCI6WyIgICAgLyogZmFpbGVkIGxvZ2luICovXG4gICAgQG1peGluIGRlY2xpbmVkIHtcbiAgICAgIEBrZXlmcmFtZXMgc2hha2Uge1xuICAgICAgICAwJSwgMTAwJSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgICAgICAgfVxuICAgICAgICAyNSUsIDc1JSB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTJweCk7XG4gICAgICAgIH1cbiAgICAgICAgNTAlIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEycHgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgICIsIkB1c2UgJ2xvZ2luLWxvZ2ljLWFuaW1hdGlvbnMuY29tcG9uZW50JyBhcyBhbmltYXRpb247XG5AdXNlICcuLi8uLi8uLi9hc3Npc3RhbnQtbGV2ZWwtY29kZS91bml2ZXJzYWwtcmV1c2FibGUtc3R5bGVzL3Jlc3BvbnNpdmUtbWl4aW4nIGFzIHJlc3BvbnNpdmU7XG5AdXNlICcuLi8uLi8uLi9hc3Npc3RhbnQtbGV2ZWwtY29kZS91bml2ZXJzYWwtcmV1c2FibGUtc3R5bGVzL2NvbW1vbicgYXMgY29tbW9uO1xuZGl2W2NvbHVtbl0ge1xuICAgIEBpbmNsdWRlIGNvbW1vbi5jb21tb247XG4gICAgcGFkZGluZzogMyUgMiUgMCUgMiU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF0LWZvcm0tZmllbGQge1xuICAgICY6Zmlyc3Qtb2YtdHlwZSB7IGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDsgfVxuICAgICY6bm90KDpmaXJzdC1vZi10eXBlKSB7IGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IH1cbiAgfVxufVxuZGl2W2ZvcmdvdF17XG4gICAgbWFyZ2luLWJvdHRvbTogNCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgIGJ1dHRvbltmb3Jnb3Rde1xuICAgICAgQGluY2x1ZGUgcmVzcG9uc2l2ZS5yZXNwb25zaXZlRm9udFNpemUoJ3NtYWxsZXInKTtcbiAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICB9XG4gIGRpdltwaHJhc2Vde1xuICAgIHBhZGRpbmc6IDIlIDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIEBpbmNsdWRlIGNvbW1vbi5jb21tb247XG4gICAgY29sb3I6IGdyZXk7XG4gICAgQGluY2x1ZGUgcmVzcG9uc2l2ZS5yZXNwb25zaXZlRm9udFNpemUoJ3NtYWxsZXInKTtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgbWF0LWNoZWNrYm94IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICBkaXZ7XG4gICAgQGluY2x1ZGUgcmVzcG9uc2l2ZS5yZXNwb25zaXZlRm9udFNpemUoJ3NtYWxsZXInKTtcbiAgICB9XG4gIH1cblxuICAubm9ybWFsLXN0eWxle1xuICAgIEBpbmNsdWRlIGNvbW1vbi5jb21tb24oZmxleCwgY2VudGVyLCBjb2x1bW4pO1xuICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMHB4KSB7XG4gICAgICAgIEBpbmNsdWRlIGNvbW1vbi5jb21tb24oZmxleCwgY2VudGVyLCByb3cpO1xuICAgIH1cbn1cbi5lcnJvci1zdHlsZSB7XG4gIEBpbmNsdWRlIGNvbW1vbi5jb21tb24oZmxleCwgY2VudGVyLCBjb2x1bW4pO1xufVxuICBzcGFuW21hdFByZWZpeF0geyBtYXJnaW4tbGVmdDogMTUlOyB9XG4ubG9naW4tb3B0aW9ucyB7XG4gIEBpbmNsdWRlIGNvbW1vbi5jb21tb247XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICB9XG4gICAgICAgXG4uaGlkZS1ib3JkZXJ7IGJvcmRlci1yaWdodDogbm9uZTsgfVxuICAuaW5wdXQtYm94ZXM6Zmlyc3Qtb2YtdHlwZSB7IG1hdC1jaGVja2JveCB7IG1hcmdpbi1sZWZ0OiAzJTsgfSB9XG4gIC5sb2dpbi1zdGFuZGFyZC13cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmctYm90dG9tOiA1JTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgXG4gICAgYnV0dG9uLmxvZ2luIHtcbiAgICBAaW5jbHVkZSByZXNwb25zaXZlLnJlc3BvbnNpdmVGb250U2l6ZSgpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZpcnN0Q2hvaWNlKTsgXG4gICAgY29sb3I6IHZhcigtLWJhc2ljVGV4dCk7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDsgXG4gICAgcGFkZGluZzogMTJweCAyNHB4O1xuICAgIGJveC1zaGFkb3c6IDBweCA0cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4yKTsgXG4gICAgd2lkdGg6IDc1JTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IFxuICAgIG92ZXJmbG93OiBoaWRkZW47IFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjVzIGVhc2UtaW4tb3V0O1xuICAgICY6aG92ZXIge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcbiAgICB9XG4gICAgJjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICBsZWZ0OiAwOyBcbiAgICAgIHJpZ2h0OiAxMDAlO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGxlZnQsIHZhcigtLXBhaXJpbmdDb2xvciksIHZhcigtLXNlY29uZENob2ljZSkpO1xuICAgICAgdHJhbnNpdGlvbjogcmlnaHQgMC41cyBlYXNlLWluLW91dDtcbiAgICAgIHotaW5kZXg6IC0xOyBcbiAgICB9XG4gICAgJjpob3ZlcjpiZWZvcmUge1xuICAgICAgcmlnaHQ6IDA7IFxuICAgIH1cblxuICAmLmZpbmdlcnByaW50LWJvcmRlci1kZWNsaW5lZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1lcnJvcik7XG4gICAgICBAaW5jbHVkZSBhbmltYXRpb24uZGVjbGluZWQ7XG4gICAgICBhbmltYXRpb246IHNoYWtlIC41cyBsaW5lYXI7ICBcbiAgICB9XG4gICAgJi5maW5nZXJwcmludC1ib3JkZXItYXBwcm92ZWQgeyBcbiAgICAgIHRleHQtc2hhZG93OiAwIDAgNXB4IHZhcigtLWFwcHJvdmVkKTtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS43KTtcbiAgICB9XG4gIH1cbn1cbiIsIkBtaXhpbiBjb21tb24oJGZsZXg6IGZsZXgsICRjb250ZW50OiBjZW50ZXIsICRwb3J0cmFpdDogY29sdW1uKXtcbiAgICBkaXNwbGF5OiAkZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6ICRjb250ZW50O1xuICAgIGZsZXgtZGlyZWN0aW9uOiAkcG9ydHJhaXQ7XG59XG5AbWl4aW4gcGFnZVNpemUoJHdpZHRoOiAxMDAlLCAkaGVpZ2h0OiAxMDB2aCl7XG4gICAgd2lkdGg6ICR3aWR0aDtcbiAgICBoZWlnaHQ6ICRoZWlnaHQ7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cbiIsIiBAdXNlICcuLi91bml2ZXJzYWwtcmV1c2FibGUtc3R5bGVzL2JyZWFrLXBvaW50cycgYXMgZGV2aWNlO1xuIFxuQG1peGluIG1lZGlhLXF1ZXJ5KCRzY3JlZW4sICRtaW4td2lkdGgpIHtcbiAgICAkaW5kZXg6IGluZGV4KG1hcC1rZXlzKGRldmljZS4kZGV2aWNlLXNpemVzKSwgJHNjcmVlbik7XG4gICAgJG5leHQtaW5kZXg6ICRpbmRleCArIDE7XG4gICAgJGRldmljZS1zaXplcy1rZXlzOiBtYXAta2V5cyhkZXZpY2UuJGRldmljZS1zaXplcyk7XG4gICAgJG5leHQtc2NyZWVuOiBpZigkbmV4dC1pbmRleCA8PSBsZW5ndGgoJGRldmljZS1zaXplcy1rZXlzKSwgbnRoKCRkZXZpY2Utc2l6ZXMta2V5cywgJG5leHQtaW5kZXgpLCBudWxsKTtcbiAgICAkbWF4LXdpZHRoOiBpZigkbmV4dC1zY3JlZW4sIG1hcC1nZXQoZGV2aWNlLiRkZXZpY2Utc2l6ZXMsICRuZXh0LXNjcmVlbikgLSAxcHgsIG51bGwpO1xuICAgICRtZWRpYS1xdWVyeTogXCIobWluLXdpZHRoOiAjeyRtaW4td2lkdGh9KVwiO1xuICAgIEBpZiAkbWF4LXdpZHRoIHtcbiAgICAgICAgJG1lZGlhLXF1ZXJ5OiBcIiN7JG1lZGlhLXF1ZXJ5fSBhbmQgKG1heC13aWR0aDogI3skbWF4LXdpZHRofSlcIjtcbiAgICAgIH1cbiAgICAgIEBtZWRpYSAjeyRtZWRpYS1xdWVyeX0ge1xuICAgICAgICBAY29udGVudDtcbiAgICAgIH1cbn1cbkBtaXhpbiByZXNwb25zaXZlRm9udFNpemUoJHNpemVWYXJpYW50OiAnZGVmYXVsdCcpIHtcbiAgQGVhY2ggJHNjcmVlbiwgJG1pbi13aWR0aCBpbiBkZXZpY2UuJGRldmljZS1zaXplcyB7XG4gICAgQG1lZGlhIChtaW4td2lkdGg6ICRtaW4td2lkdGgpIHtcbiAgICAgICAgICAkc2NyZWVuLWZvbnQtc2l6ZTogbWFwLWdldChkZXZpY2UuJGZvbnQtc2l6ZXMsICRzY3JlZW4pO1xuICAgICAgICAgICRzY3JlZW4tZm9udC1zdWItc2l6ZTogbWFwLWdldChkZXZpY2UuJGZvbnQtc3ViLXNpemVzLCAkc2NyZWVuKTtcbiAgICAgICAgICAkbGluZS1oZWlnaHQtcmF0aW86IG1hcC1nZXQoZGV2aWNlLiRsaW5lLWhlaWdodHMsICRzY3JlZW4pO1xuICAgICAgXG4gICAgICAgICAgJGZpbmFsLWZvbnQtc2l6ZTogJHNjcmVlbi1mb250LXNpemU7XG4gICAgICAgICAgQGlmICRzaXplVmFyaWFudCA9PSAnc21hbGxlcicge1xuICAgICAgICAgICAgJGZpbmFsLWZvbnQtc2l6ZTogJHNjcmVlbi1mb250LXNpemUgLSAkc2NyZWVuLWZvbnQtc3ViLXNpemUgLSAuNHJlbTtcbiAgICAgICAgICB9IEBlbHNlIGlmICRzaXplVmFyaWFudCA9PSAnbGFyZ2VyJyB7XG4gICAgICAgICAgICAkZmluYWwtZm9udC1zaXplOiAkc2NyZWVuLWZvbnQtc2l6ZSArICRzY3JlZW4tZm9udC1zdWItc2l6ZSArIDEuMXJlbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyogQXBwbHkgc3R5bGVzICovXG4gICAgICAgICAgZm9udC1zaXplOiAkZmluYWwtZm9udC1zaXplO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAkZmluYWwtZm9udC1zaXplICogJGxpbmUtaGVpZ2h0LXJhdGlvO1xuICAgICAgICB9XG4gICAgICB9XG4gIH1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
    data: {
      animation: [..._imports_animation_logic_imports__WEBPACK_IMPORTED_MODULE_2__.reusableLogicAnimations]
    },
    changeDetection: 0
  });
}

/***/ }),

/***/ 553:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

/***/ }),

/***/ 4913:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 6480);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ 4987);
/* harmony import */ var _angular_platform_browser_animations_async__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations/async */ 5850);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 4860);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.component */ 6401);
/* harmony import */ var _app_assistant_level_code_custom_architecture_aids_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/assistant-level-code/custom-architecture-aids/interceptors/auth-interceptor */ 8133);
/* harmony import */ var _app_assistant_level_code_custom_architecture_aids_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/assistant-level-code/custom-architecture-aids/interceptors/error-interceptor */ 9632);
/* harmony import */ var _app_app_routes_app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app-routes/app-routing.module */ 641);










(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, {
  providers: [{
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HTTP_INTERCEPTORS,
    useClass: _app_assistant_level_code_custom_architecture_aids_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_1__.AuthInterceptor,
    multi: true
  }, {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HTTP_INTERCEPTORS,
    useClass: _app_assistant_level_code_custom_architecture_aids_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_2__.ErrorInterceptor,
    multi: true
  }, (0,_angular_router__WEBPACK_IMPORTED_MODULE_6__.provideRouter)(_app_app_routes_app_routing_module__WEBPACK_IMPORTED_MODULE_3__.routes, (0,_angular_router__WEBPACK_IMPORTED_MODULE_6__.withViewTransitions)()), (0,_angular_platform_browser_animations_async__WEBPACK_IMPORTED_MODULE_7__.provideAnimationsAsync)(), (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.importProvidersFrom)(_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClientModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__.BrowserAnimationsModule), (0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.provideClientHydration)((0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.withHttpTransferCacheOptions)({
    includePostRequests: true
  }))]
}).then(started => {
  console.log('Start up is working', started);
}).catch(err => {
  console.error('error has occured on start up', err);
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4913)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map