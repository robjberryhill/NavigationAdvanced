
const createEvent = (evt, handler, element) => {
  if (document.addEventListener) {
    element.addEventListener(evt, handler);
  } else if (document.attachEvent) {
    element.attachEvent(evt, handler);
  }
}

const mblMnuTgl = (evt) => {
  let navCntElm = document.getElementById('NavCont');
  let navElmIsAcv = navCntElm.classList.contains('mobile-active');
  let elm = evt.currentTarget;
  let emlIsAcv = elm.classList.contains('is-active');

  if (emlIsAcv && navElmIsAcv) {
    elm.classList.remove('is-active');
    navCntElm.classList.remove('mobile-active');
  } else if (!emlIsAcv && !navElmIsAcv) {
    elm.classList.add('is-active');
    navCntElm.classList.add('mobile-active');
  }
}

const mblDrpDwn = (evt) => {
  let elm = evt.currentTarget, elmAtr, elmPrt;
  //console.log(elm)

  if (elm.classList.contains('drp-dwn-toggle')) {
    elmPrt = elm.parentElement;
  } else if (elm.classList.contains('drp-dwn-cls')) {
    elmPrt = elm.parentElement.parentElement;
  }

  elmAtr = elmPrt.getAttribute('aria-expanded');

  if (elmAtr === 'false') {
    elmPrt.setAttribute('aria-expanded', 'true');
  } else if (elmAtr === "true") {
    elmPrt.setAttribute('aria-expanded', 'false');
  }
}

const drpDwnEvts = () => {
  let mblDrpDwnElm = document.getElementsByClassName('drp-dwn-toggle');
  let mblDrpDwnCls = document.getElementsByClassName('drp-dwn-cls');

  for (let i = 0; i < mblDrpDwnElm.length; i++) {
    let elm = mblDrpDwnElm[i];
    createEvent('click', mblDrpDwn, elm);
  }

  for (let i = 0; i < mblDrpDwnCls.length; i++) {
    let elm = mblDrpDwnCls[i];
    createEvent('click', mblDrpDwn, elm);
  }
}

const intMblTgl = () => {
  const mblBtnTglElm = document.getElementById('MobileToggle');
  createEvent('click', mblMnuTgl, mblBtnTglElm);
}

const init = () => {
  //console.log('Javascript initiated.');
  intMblTgl();
  drpDwnEvts();
}


const DocumentReadyInit = (fnm, bo) => {
  "use strict";
  fnm = fnm || "docReady";
  bo = bo || window;
  var arl = [];
  var arf = false;
  var rehinstalled = false;

  const Ready = () => {
    if (!arf) {
      arf = true;
      for (let i = 0; i < arl.length; i++) {
        const e = arl[i];
        arl[i].fn.call(window, arl[i].ctx);
      }
      arl = [];
    }
  }

  const ReadyStateChange = () => {
    if (document.readyState === "complete") {
      Ready();
    }
  }

  bo[fnm] = function (callback, context) {
    if (typeof callback !== "function") { throw new TypeError("callback for docReady must be a function"); }
    if (arf) {
      setTimeout(() => { callback(context); }, 1);
    } else {
      arl.push({ fn: callback, ctx: context });
    }
    if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
      setTimeout(Ready, 1);
    } else if (!rehinstalled) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", Ready, false);
        window.attachEvent("load", Ready, false);
      } else {
        document.attachEvent("onreadystatechange", ReadyStateChange);
        window.attachEvent("onload", Ready);
      }
      rehinstalled = true;
    }
  }

}

DocumentReadyInit("docReady", window);

docReady(init);
