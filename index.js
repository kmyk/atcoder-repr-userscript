// ==UserScript==
// @name         AtCoder repr UserScript
// @namespace    https://github.com/kmyk/atcoder-repr-userscript
// @version      0.1
// @description  decode binary characters in submissions of AtCoder
// @author       Kimiyuki Onaka
// @match        https://atcoder.jp/contests/*/submissions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function prettyCharCode(c) {
        console.log(c, String.fromCharCode(c));
        if (c == 0) {
            return "\\0";
        } else if (c == 9) {
            return "\\t";
        } else if (c < 32) {
            return "\\x" + ("0" + c.toString(16)).substr(-2);
        } else if (c < 127) {
            return String.fromCharCode(c);
        } else if (c == 160) {
            return String.fromCharCode(c); // nbsp
        } else if (c < 256) {
            return "\\x" + ("0" + c.toString(16)).substr(-2);
        } else {
            return String.fromCharCode(c);
        }
    }

    function convertString(s) {
        let t = "";
        for (let i = 0; i < s.length; ++ i) {
            t = t.concat(prettyCharCode(s.charCodeAt(i)));
        }
        return t;
    }

    setTimeout(function () {
        const code = document.getElementById('submission-code');
        for (const tag of code.getElementsByTagName('span')) {
            const s = tag.textContent;
            const t = convertString(s);
            if (s != t) {
                tag.innerText = t;
                tag.style.border = "dotted";
                tag.style.borderWidth = "1px";
                tag.style.borderColor = "red";
            }
        }
    }, 1000);
})();
