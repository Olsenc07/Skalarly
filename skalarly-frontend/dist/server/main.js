/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 34991:
/*!*******************!*\
  !*** ./server.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractRoutes: () => (/* binding */ extractRoutes),
/* harmony export */   renderApplication: () => (/* reexport safe */ _angular_platform_server__WEBPACK_IMPORTED_MODULE_10__.renderApplication),
/* harmony export */   renderModule: () => (/* reexport safe */ _angular_platform_server__WEBPACK_IMPORTED_MODULE_10__.renderModule),
/* harmony export */   "ɵSERVER_CONTEXT": () => (/* reexport safe */ _angular_platform_server__WEBPACK_IMPORTED_MODULE_10__["ɵSERVER_CONTEXT"])
/* harmony export */ });
/* harmony import */ var _Users_chaseolsen_skalarly_MVP_skalarly_fs_skalarly_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 70734);
/* harmony import */ var zone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zone.js */ 36998);
/* harmony import */ var zone_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zone_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ 35162);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! compression */ 44638);
/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dotenv */ 94272);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_ssr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/ssr */ 67530);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 34228);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! path */ 71017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_main_server__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/main.server */ 49174);
/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! http-proxy-middleware */ 82979);
/* harmony import */ var http_proxy_middleware__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(http_proxy_middleware__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _angular_platform_server__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-server */ 97014);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 68804);





dotenv__WEBPACK_IMPORTED_MODULE_4__.config();





const app = express__WEBPACK_IMPORTED_MODULE_2__();
app.use(compression__WEBPACK_IMPORTED_MODULE_3__());
const PORT = process.env['PORT'] || 4200;
const DIST_FOLDER = (0,path__WEBPACK_IMPORTED_MODULE_6__.join)(process.cwd(), 'dist/skalarly-frontend/');
console.log('port1', PORT);
app.set('view engine', 'html');
app.set('views', DIST_FOLDER);
const API_BASE_URL = process.env['BACKEND_API_URL'];
console.log('API_BASE_URL', API_BASE_URL);
const apiProxyOptions = {
  target: API_BASE_URL,
  changeOrigin: true,
  followRedirects: true,
  onError: (err, req, res) => {
    console.error('Proxy encountered an error:', err);
    if (!res.headersSent) {
      res.status(502).json({
        error: 'Error occurred while proxying to the API.'
      });
    } else {
      res.end();
    }
  }
};
app.use(express__WEBPACK_IMPORTED_MODULE_2__["static"](DIST_FOLDER));
app.use('/api/*', (req, res, next) => {
  console.log('API Request Received:', req.baseUrl, req.url);
  next();
});
app.use('/api', (0,http_proxy_middleware__WEBPACK_IMPORTED_MODULE_8__.createProxyMiddleware)(apiProxyOptions));
app.get('*', /*#__PURE__*/function () {
  var _ref = (0,_Users_chaseolsen_skalarly_MVP_skalarly_fs_skalarly_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (req, res) {
    try {
      const commonEngine = new _angular_ssr__WEBPACK_IMPORTED_MODULE_5__.CommonEngine();
      const options = {
        documentFilePath: (0,path__WEBPACK_IMPORTED_MODULE_6__.join)(DIST_FOLDER, 'index.html'),
        url: req.url,
        publicPath: DIST_FOLDER,
        providers: [{
          provide: _angular_common__WEBPACK_IMPORTED_MODULE_9__.APP_BASE_HREF,
          useValue: req.baseUrl
        }]
      };
      const html = yield commonEngine.render({
        bootstrap: src_main_server__WEBPACK_IMPORTED_MODULE_7__.AppServerPromise,
        ...options
      });
      res.send(html);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});

  // EXPORTS added by @angular-devkit/build-angular
  
  /**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



async function* getRoutesFromRouterConfig(routes, compiler, parentInjector, parentRoute = '') {
    for (const route of routes) {
        const { path, redirectTo, loadChildren, children } = route;
        if (path === undefined) {
            continue;
        }
        const currentRoutePath = buildRoutePath(parentRoute, path);
        if (redirectTo !== undefined) {
            // TODO: handle `redirectTo`.
            yield { route: currentRoutePath, success: false, redirect: true };
            continue;
        }
        if (/[:*]/.test(path)) {
            // TODO: handle parameterized routes population.
            yield { route: currentRoutePath, success: false, redirect: false };
            continue;
        }
        yield { route: currentRoutePath, success: true, redirect: false };
        if (children?.length) {
            yield* getRoutesFromRouterConfig(children, compiler, parentInjector, currentRoutePath);
        }
        if (loadChildren) {
            const loadedChildRoutes = await (0,_angular_router__WEBPACK_IMPORTED_MODULE_11__["ɵloadChildren"])(route, compiler, parentInjector).toPromise();
            if (loadedChildRoutes) {
                const { routes: childRoutes, injector = parentInjector } = loadedChildRoutes;
                yield* getRoutesFromRouterConfig(childRoutes, compiler, injector, currentRoutePath);
            }
        }
    }
}
async function* extractRoutes(bootstrapAppFnOrModule, document) {
    const platformRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.createPlatformFactory)(_angular_core__WEBPACK_IMPORTED_MODULE_12__.platformCore, 'server', [
        {
            provide: _angular_platform_server__WEBPACK_IMPORTED_MODULE_10__.INITIAL_CONFIG,
            useValue: { document, url: '' },
        },
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵConsole"],
            /** An Angular Console Provider that does not print a set of predefined logs. */
            useFactory: () => {
                class Console extends _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵConsole"] {
                    ignoredLogs = new Set(['Angular is running in development mode.']);
                    log(message) {
                        if (!this.ignoredLogs.has(message)) {
                            super.log(message);
                        }
                    }
                }
                return new Console();
            },
        },
        ..._angular_platform_server__WEBPACK_IMPORTED_MODULE_10__["ɵINTERNAL_SERVER_PLATFORM_PROVIDERS"],
    ])();
    try {
        let applicationRef;
        if (isBootstrapFn(bootstrapAppFnOrModule)) {
            applicationRef = await bootstrapAppFnOrModule();
        }
        else {
            const moduleRef = await platformRef.bootstrapModule(bootstrapAppFnOrModule);
            applicationRef = moduleRef.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_12__.ApplicationRef);
        }
        // Wait until the application is stable.
        await (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵwhenStable"])(applicationRef);
        const injector = applicationRef.injector;
        const router = injector.get(_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router);
        if (router.config.length === 0) {
            // In case there are no routes available
            yield { route: '', success: true, redirect: false };
        }
        else {
            const compiler = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_12__.Compiler);
            // Extract all the routes from the config.
            yield* getRoutesFromRouterConfig(router.config, compiler, injector);
        }
    }
    finally {
        platformRef.destroy();
    }
}
function isBootstrapFn(value) {
    // We can differentiate between a module and a bootstrap function by reading compiler-generated `ɵmod` static property:
    return typeof value === 'function' && !('ɵmod' in value);
}
function buildRoutePath(...routeParts) {
    return routeParts.filter(Boolean).join('/');
}


/***/ }),

/***/ 96846:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 68804);
/* harmony import */ var _assistant_level_code_custom_architecture_aids_services_router_strategies_title_strategy_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assistant-level-code/custom-architecture-aids/services/router-strategies/title-strategy.service */ 21911);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/toolbar */ 92183);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/animations */ 46012);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _assistant_level_code_custom_architecture_aids_services_orientation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assistant-level-code/custom-architecture-aids/services/orientation.service */ 95808);







const AppComponent_Defer_2_DepsFn = () => [__webpack_require__.e(/*! import() */ 374).then(__webpack_require__.bind(__webpack_require__, /*! ./nav-bar/nav-bar.component */ 7374)).then(m => m.NavBarComponent), Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @angular/common */ 34228)).then(m => m.NgClass), __webpack_require__.e(/*! import() */ 781).then(__webpack_require__.bind(__webpack_require__, /*! ./nav-bar/nav-icons/nav-icons.component */ 55781)).then(m => m.NavIconsComponent), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet, __webpack_require__.e(/*! import() */ 438).then(__webpack_require__.bind(__webpack_require__, /*! ./assistant-level-code/custom-architecture-aids/directives/scroll-toggle.directive */ 61438)).then(m => m.scrollToggleDirective)];
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

/***/ 95808:
/*!***********************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/services/orientation.service.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrientationService: () => (/* binding */ OrientationService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 68804);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 85028);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 34228);






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
        this.router.events.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_0__.filter)(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__.NavigationEnd), (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.takeUntil)(this.routeSub$))
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
    return new (t || OrientationService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.PLATFORM_ID));
  };
  static ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: OrientationService,
    factory: OrientationService.ɵfac,
    providedIn: 'root'
  });
}

/***/ }),

/***/ 21911:
/*!********************************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/services/router-strategies/title-strategy.service.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomTitleStrategy: () => (/* binding */ CustomTitleStrategy)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 68804);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 59936);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 41081);



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

/***/ 49174:
/*!****************************!*\
  !*** ./src/main.server.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppServerPromise: () => (/* binding */ AppServerPromise)
/* harmony export */ });
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.component */ 96846);
/* harmony import */ var _angular_platform_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-server */ 97014);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 41081);



function AppServerPromise() {
  return (0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, {
    providers: [_angular_platform_server__WEBPACK_IMPORTED_MODULE_2__.ServerModule]
  });
}

/***/ }),

/***/ 18967:
/*!****************************************!*\
  !*** ./node_modules/express/lib/ sync ***!
  \****************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 18967;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 39491:
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 50852:
/*!******************************!*\
  !*** external "async_hooks" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("async_hooks");

/***/ }),

/***/ 14300:
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 6113:
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 82361:
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 57147:
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 13685:
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 95687:
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 41808:
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 87561:
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ 93977:
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),

/***/ 49411:
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 41041:
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ 22037:
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 71017:
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 63477:
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ 12781:
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 71576:
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ 76224:
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 57310:
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 73837:
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 59796:
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		__webpack_require__.O(undefined, [736], () => (__webpack_require__(56394)))
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [736], () => (__webpack_require__(34991)))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + (chunkId === 736 ? "vendor" : chunkId) + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			179: 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = (chunkId) => (installedChunks[chunkId]);
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			__webpack_require__.e(736);
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map