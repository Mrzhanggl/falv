/*! YDUI Touch v0.0.1 by YDCSS (c) 2017 Licensed MIT */ ! function(e) {
    var t = 750,
        n = e.document,
        i = n.documentElement,
        a = "orientationchange" in e ? "orientationchange" : "resize",
        d = function o() { var e = i.getBoundingClientRect().width; return i.style.fontSize = 5 * Math.max(Math.min(20 * (e / t), 11.2), 8.55) + "px", o }();
    i.setAttribute("data-dpr", e.navigator.appVersion.match(/iphone/gi) ? e.devicePixelRatio : 1), /iP(hone|od|ad)/.test(e.navigator.userAgent) && (n.documentElement.classList.add("ios"), parseInt(e.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8 && n.documentElement.classList.add("hairline")), n.addEventListener && (e.addEventListener(a, d, !1), n.addEventListener("DOMContentLoaded", d, !1))
}(window);