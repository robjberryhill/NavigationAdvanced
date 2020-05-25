const createEvent = (evt, handler, element) => {
  if (document.addEventListener) {
    element.addEventListener(evt, handler);
  } else if (document.attachEvent) {
    element.attachEvent(evt, handler);
  }
};

const mblMnuTgl = (evt) => {
  let navCntElm = document.getElementById("NavCont");
  let navElmIsAcv = navCntElm.classList.contains("mobile-active");
  let elm = evt.currentTarget;
  let emlIsAcv = elm.classList.contains("is-active");

  if (emlIsAcv && navElmIsAcv) {
    elm.classList.remove("is-active");
    navCntElm.classList.remove("mobile-active");
  } else if (!emlIsAcv && !navElmIsAcv) {
    elm.classList.add("is-active");
    navCntElm.classList.add("mobile-active");
  }
};

const cngAtr = (elm, atr, val) => {
  elm.setAttribute(atr, val);
}

const rstElmAryAtr = (ary, atr, val, atr2, val2) => {
  for (let i = 0; i < ary.length; i++) {
    let elm = ary[i];
    let elmExp = elm.getAttribute(atr2);

    if (elmExp != val2) {
      cngAtr(elm, atr, val)
    }
  }
}

const mblDrpDwn = (evt) => {
  const navCntElm = document.getElementById("NavCont");
  let navLnkElm = navCntElm.getElementsByClassName("nav-link");
  let elm = evt.currentTarget,
    elmAtr,
    elmMnu,
    elmPrtMnuId,
    elmSel,
    elmTab,
    elmTgl;

  console.log(elm)

  rstElmAryAtr(navLnkElm, "aria-selected", "false", "aria-expanded", "true");

  elmTab = elm.getAttribute("role");
  elmSel = elm.getAttribute("aria-selected");
  elmAtr = elm.getAttribute("aria-expanded");

  if (elmAtr) {
    setTimeout(() => {
      if (elmTab === "tab" && elmSel === "false" && elmAtr === "false") {
        cngAtr(elm, "aria-selected", "true");
      } else if (elmTab === "tab" && elmAtr === "true") {
        cngAtr(elm, "aria-selected", "false");
      }
    }, 500);
  } else {
    setTimeout(() => {
      if (elmTab === "tab" && elmSel === "false") {
        cngAtr(elm, "aria-selected", "true");
      }
    }, 500);
  }

  // Need to configure drp-dwn-cls

  // if (elm.classList.contains("drp-dwn-toggle")) {
  //   elmPrt = elm.parentElement;
  // } else if (elm.classList.contains("drp-dwn-cls")) {
  //   elmPrt = elm.parentElement.parentElement;
  // }
  elmTgl = elm.classList.contains("drp-dwn-toggle");
  elmPrtMnuId = elm.getAttribute('aria-controls');
  elmMnu = document.getElementById(elmPrtMnuId);

  console.log(elmTgl)
  // console.log(elmPrtMnuId)
  // console.log(elmMnu)

  if (elmAtr === "false" && elmTgl) {
    cngAtr(elm, "aria-expanded", "true");
    cngAtr(elmMnu, "aria-hidden", "false");
  } else if (elmAtr === "true" && elmTgl) {
    cngAtr(elm, "aria-expanded", "false");
    cngAtr(elmMnu, "aria-hidden", "true");
  }
};

const crntTabSlctd = (evt) => {
  let navTabItm = document.getElementsByClassName("nav-item");
  let elm = evt.currentTarget;
  let elmAtr = elm.getAttribute("aria-selected");

  for (let i = 0; i < navTabItm.length; i++) {
    let e = navTabItm[i];
    let tabAtr = e.getAttribute('role');

    if (tabAtr === "tab") {
      console.log(e)
      e.setAttribute("aria-selected", "false");
    }
  }

  if (elmAtr === "false") {
    elm.setAttribute("aria-selected", "true");
  } else if (elmAtr === "true") {
    elm.setAttribute("aria-selected", "false");
  }

  console.log(elmAtr);
}

const drpDwnEvts = () => {
  const navCntElm = document.getElementById("NavCont");
  let drpDwnBtnElm = document.getElementsByClassName("drp-dwn-toggle");
  let navLnkElm = navCntElm.getElementsByClassName("nav-link");
  let mblDrpDwnCls = document.getElementsByClassName("drp-dwn-cls");
  let navTabElm = document.getElementsByClassName("nav-item");

  for (let i = 0; i < navLnkElm.length; i++) {
    let elm = navLnkElm[i];
    let tabAtr = elm.getAttribute('role');

    if (tabAtr === "tab") {
      console.log(elm)
      createEvent("click", mblDrpDwn, elm);
    }
  }

  for (let i = 0; i < mblDrpDwnCls.length; i++) {
    let elm = mblDrpDwnCls[i];
    createEvent("click", mblDrpDwn, elm);
  }
};

const intMblTgl = () => {
  const mblBtnTglElm = document.getElementById("MobileToggle");
  createEvent("click", mblMnuTgl, mblBtnTglElm);
};

const init = () => {
  //console.log('Javascript initiated.');
  intMblTgl();
  drpDwnEvts();
};

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
  };

  const ReadyStateChange = () => {
    if (document.readyState === "complete") {
      Ready();
    }
  };

  bo[fnm] = function (callback, context) {
    if (typeof callback !== "function") {
      throw new TypeError("callback for docReady must be a function");
    }
    if (arf) {
      setTimeout(() => {
        callback(context);
      }, 1);
    } else {
      arl.push({ fn: callback, ctx: context });
    }
    if (
      document.readyState === "complete" ||
      (!document.attachEvent && document.readyState === "interactive")
    ) {
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
  };
};

DocumentReadyInit("docReady", window);

docReady(init);
