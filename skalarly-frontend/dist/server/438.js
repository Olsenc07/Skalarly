"use strict";
exports.id = 438;
exports.ids = [438];
exports.modules = {

/***/ 61438:
/*!*****************************************************************************************************!*\
  !*** ./src/app/assistant-level-code/custom-architecture-aids/directives/scroll-toggle.directive.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scrollToggleDirective: () => (/* binding */ scrollToggleDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 59936);


class scrollToggleDirective {
  el;
  renderer;
  lastTouchY;
  isHidden = false;
  toggleHeader = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  constructor(el, renderer) {
    this.el = el;
    this.renderer = renderer;
  }
  // Desktop
  onWheel(event) {
    this.handleScroll(event.deltaY);
  }
  // Mobile
  onTouchMove(event) {
    //  determine the direction of the touch move
    const touch = event.touches[0] || event.changedTouches[0];
    const currentY = touch.clientY;
    //  previous Y-position to compare with
    if (this.lastTouchY && currentY !== this.lastTouchY) {
      // determine the scroll direction based on touch movement
      const deltaY = this.lastTouchY - currentY;
      this.handleScroll(deltaY);
    }
    // update the last Y-position for next move
    this.lastTouchY = currentY;
  }
  handleScroll(deltaY) {
    if (deltaY > 0) {
      this.hideElement();
      this.toggleHeader.emit(false);
    } else {
      this.showElement();
      this.toggleHeader.emit(true);
    }
  }
  hideElement() {
    if (!this.isHidden) {
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-100%)');
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s');
      this.isHidden = true;
    }
  }
  showElement() {
    if (this.isHidden) {
      this.renderer.removeStyle(this.el.nativeElement, 'transform');
      this.isHidden = false;
    }
  }
  static ɵfac = function scrollToggleDirective_Factory(t) {
    return new (t || scrollToggleDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2));
  };
  static ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: scrollToggleDirective,
    selectors: [["", "scrollToggle", ""]],
    hostBindings: function scrollToggleDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("wheel", function scrollToggleDirective_wheel_HostBindingHandler($event) {
          return ctx.onWheel($event);
        }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"])("touchmove", function scrollToggleDirective_touchmove_HostBindingHandler($event) {
          return ctx.onTouchMove($event);
        }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
      }
    },
    outputs: {
      toggleHeader: "toggleHeader"
    },
    standalone: true
  });
}

/***/ })

};
;
//# sourceMappingURL=438.js.map