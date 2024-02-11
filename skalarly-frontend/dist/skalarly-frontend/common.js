"use strict";
(self["webpackChunkskalarly_fs"] = self["webpackChunkskalarly_fs"] || []).push([["common"],{

/***/ 4573:
/*!**********************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/pipes/bold.pipe.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoldPipe: () => (/* binding */ BoldPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 1699);

class BoldPipe {
  // list is from whichever api call that is being matched
  // input is from formcontrol value inputed by skalar
  transform(list, input) {
    // Create a regular expression object for pattern matching
    //  g is global and i is case-insensitive
    const matchOptions = new RegExp(input, 'gi');
    const boldedValueInList = item => item.replace(matchOptions, match => `<b>${match}</b>`);
    return boldedValueInList(list);
  }
  static ɵfac = function BoldPipe_Factory(t) {
    return new (t || BoldPipe)();
  };
  static ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
    name: "bold",
    type: BoldPipe,
    pure: true,
    standalone: true
  });
}

/***/ }),

/***/ 645:
/*!**********************************************************!*\
  !*** ./src/app/nav-bar/nav-icons/nav-icons.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavIconsComponent: () => (/* binding */ NavIconsComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 7947);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 6515);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 895);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/chips */ 1757);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 1699);
/* harmony import */ var src_app_assistant_level_code_custom_architecture_aids_services_orientation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/assistant-level-code/custom-architecture-aids/services/orientation.service */ 6030);









function NavIconsComponent_For_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 0)(1, "mat-icon", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const icon_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", icon_r1.url);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r6.orientationService.url() === icon_r1.url ? icon_r1.activeIcon : icon_r1.defaultIcon);
  }
}
function NavIconsComponent_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 2)(1, "mat-icon", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const icon_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", icon_r1.url);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r7.orientationService.url() === icon_r1.url ? icon_r1.activeIcon : icon_r1.defaultIcon);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", icon_r1.description, " ");
  }
}
function NavIconsComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, NavIconsComponent_For_2_Conditional_0_Template, 3, 2, "button", 0)(1, NavIconsComponent_For_2_Conditional_1_Template, 5, 3);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵconditional"](0, ctx_r0.orientationService.screen() ? 0 : 1);
  }
}
class NavIconsComponent {
  orientationService;
  constructor(orientationService) {
    this.orientationService = orientationService;
  }
  navIcon = [{
    url: '/institutions',
    activeIcon: 'stadium',
    defaultIcon: 'things_to_do',
    description: 'Schools'
  }, {
    url: '/connections',
    activeIcon: 'hub',
    defaultIcon: 'share',
    description: 'Network'
  }, {
    url: '/home',
    activeIcon: 'cottage',
    defaultIcon: 'home',
    description: 'Home'
  }, {
    url: '/messages',
    activeIcon: 'forum',
    defaultIcon: 'chat',
    description: 'Messages'
  }, {
    url: '/notifications',
    activeIcon: 'notifications_active',
    defaultIcon: 'notifications',
    description: 'Updates'
  }];
  static ɵfac = function NavIconsComponent_Factory(t) {
    return new (t || NavIconsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_assistant_level_code_custom_architecture_aids_services_orientation_service__WEBPACK_IMPORTED_MODULE_0__.OrientationService));
  };
  static ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: NavIconsComponent,
    selectors: [["app-nav-icons"]],
    standalone: true,
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
    decls: 3,
    vars: 0,
    consts: [["mat-icon-button", "", "aria-label", "Navigation icon button", 3, "routerLink"], [1, "material-symbols-outlined"], ["mat-fab", "", "aria-label", "Navigation icon button", 3, "routerLink"], ["text", ""]],
    template: function NavIconsComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterCreate"](1, NavIconsComponent_For_2_Template, 2, 1, null, null, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeaterTrackByIdentity"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrepeater"](ctx.navIcon);
      }
    },
    dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatIconButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatFabButton, _angular_material_chips__WEBPACK_IMPORTED_MODULE_3__.MatChipsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink],
    styles: ["nav[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n}\n@media screen and (min-width: 767px) {\n  nav[_ngcontent-%COMP%] {\n    justify-content: flex-end;\n  }\n}\n\nbutton[mat-icon-button][_ngcontent-%COMP%], button[mat-fab][_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  background-color: transparent;\n  color: black;\n  margin-right: 1%;\n  box-shadow: none;\n}\nbutton[mat-icon-button].mat-fab[_ngcontent-%COMP%], button[mat-fab].mat-fab[_ngcontent-%COMP%] {\n  box-shadow: none;\n}\n\ndiv[text][_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvbmF2LWJhci9uYXYtaWNvbnMvbmF2LWljb25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLDhCQUFBO0VBQ0EsV0FBQTtBQUNKO0FBQUk7RUFKSjtJQUtRLHlCQUFBO0VBR047QUFDRjs7QUFEQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSw2QkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBSUo7QUFISTtFQUNJLGdCQUFBO0FBS1I7O0FBRkE7RUFDQSxpQkFBQTtBQUtBIiwic291cmNlc0NvbnRlbnQiOlsibmF2IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjdweCkge1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kOyBcbiAgICB9XG59XG5idXR0b25bbWF0LWljb24tYnV0dG9uXSwgYnV0dG9uW21hdC1mYWJdIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgbWFyZ2luLXJpZ2h0OiAxJTtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgICYubWF0LWZhYiB7XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgfVxufVxuZGl2W3RleHRde1xuZm9udC1zaXplOiAuN3JlbTtcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
  });
}

/***/ })

}]);
//# sourceMappingURL=common.js.map