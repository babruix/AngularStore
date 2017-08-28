import { Directive, ElementRef } from '@angular/core';
import { NgxAni } from 'ngxani';

@Directive({
  selector: '[appAnimateDirective]'
})
export class AnimateDirective {

  constructor(private ngxAni: NgxAni) { }

  animateColor(dom: ElementRef, color, completeCallback = () => {}) {
    this.ngxAni.to(dom, 5, {
      'background-color': color,
      'ease': this.ngxAni.ease.easeOutCirc,
      'onComplete': completeCallback
    });
  }

  animationOut(dom: ElementRef, completeCallback) {
    this.ngxAni.to(dom, 0.3, {
      'transform' : 'translate3d(100px, 0, 0) rotate(620deg)',
      '-webkit-transform' : 'translate3d(100px, 0, 0) rotate(620deg)',
      '-ms-transform' : 'translate3d(100px, 0, 0) rotate(620deg)',
      'opacity': '0',
      'ease': this.ngxAni.ease.easeOutCirc,
      'onComplete': completeCallback
    });
  }

  animationIn(dom: ElementRef) {
    this.ngxAni.fromTo(dom, 0.2, {
      'transform': 'translate3d(100px, 0, 0)',
      '-webkit-transform': 'translate3d(100px, 0, 0)',
      '-ms-transform': 'translate3d(100px, 0, 0)',
      'opacity': '0',
      'ease': this.ngxAni.ease.easeInOutCirc,
    }, {
      'transform': 'translate3d(0, 0, 0) rotate(0)',
      '-webkit-transform': 'translate3d(0, 0, 0) rotate(0)',
      '-ms-transform': 'translate3d(0, 0, 0) rotate(0)',
      'opacity': '1',
      'ease': this.ngxAni.ease.easeInOutCirc,
    });
  }

  slideDownIn(dom: ElementRef) {
    this.ngxAni.fromTo(dom, 0.5, {
      'margin-top': '-100px',
      'z-index': '-1',
      'opacity': '0',
      'ease': this.ngxAni.ease.easeInOutCirc,
    }, {
      'margin-top': '0',
      'opacity': '1',
      'ease': this.ngxAni.ease.easeInOutCirc,
    });
  }

  slideUpOut(dom: ElementRef, completeCallback = () => {}) {
    if (!dom) {
      return;
    }
    this.ngxAni.fromTo(dom, 0.3, {
      'margin-top': '0',
      'ease': this.ngxAni.ease.easeInOutCirc,
    }, {
      'margin-top': '-100px',
      'opacity': '0',
      'z-index': '-1',
      'ease': this.ngxAni.ease.easeInOutCirc,
      'onComplete': completeCallback
    });
  }
}
