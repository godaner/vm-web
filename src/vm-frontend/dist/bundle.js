/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(8))(0);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(8))(38);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(8))(6);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BrowserRouter__ = __webpack_require__(39);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserRouter", function() { return __WEBPACK_IMPORTED_MODULE_0__BrowserRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HashRouter__ = __webpack_require__(42);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HashRouter", function() { return __WEBPACK_IMPORTED_MODULE_1__HashRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Link__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return __WEBPACK_IMPORTED_MODULE_2__Link__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MemoryRouter__ = __webpack_require__(44);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return __WEBPACK_IMPORTED_MODULE_3__MemoryRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NavLink__ = __webpack_require__(47);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NavLink", function() { return __WEBPACK_IMPORTED_MODULE_4__NavLink__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Prompt__ = __webpack_require__(50);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return __WEBPACK_IMPORTED_MODULE_5__Prompt__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Redirect__ = __webpack_require__(52);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return __WEBPACK_IMPORTED_MODULE_6__Redirect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Route__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return __WEBPACK_IMPORTED_MODULE_7__Route__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Router__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return __WEBPACK_IMPORTED_MODULE_8__Router__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__StaticRouter__ = __webpack_require__(58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return __WEBPACK_IMPORTED_MODULE_9__StaticRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Switch__ = __webpack_require__(60);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return __WEBPACK_IMPORTED_MODULE_10__Switch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__matchPath__ = __webpack_require__(62);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return __WEBPACK_IMPORTED_MODULE_11__matchPath__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__withRouter__ = __webpack_require__(63);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return __WEBPACK_IMPORTED_MODULE_12__withRouter__["a"]; });



























/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(71);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*内部信息显示*/
var InnerMessager = _react2.default.createClass({
    displayName: 'InnerMessager',

    getInitialState: function getInitialState() {

        var state = {};

        //default tip
        var defaultTip = "正在加载";
        if (!isEmpty(this.props.defaultTip)) {
            defaultTip = this.props.defaultTip;
        }

        //init state
        state = { defaultTip: defaultTip, tip: "", cacheTip: "", tipPoint: ".", tipPointMaxNum: 4, tipPointNum: 0, timer: undefined };
        return state;
    },
    componentDidMount: function componentDidMount() {
        //when ui loaded , start show loop tip
        this.startLoopShowTipTimer(this.state.defaultTip);
    },
    stopLoopShowTipTimer: function stopLoopShowTipTimer() {
        //clear interval timer and clear the tip
        var state = this.state;
        if (state.timer != undefined) {
            clearInterval(state.timer);
            state.timer = undefined;
        }
        state.tip = "";
        state.cacheTip = "";
        this.setState(state);
    },
    startLoopShowTipTimer: function startLoopShowTipTimer(msg) {
        //set tip in state
        var state = this.state;
        state.tip = state.cacheTip = msg;
        this.setState(state);

        //set timer in state
        state = this.state;
        state.timer = setInterval(function () {
            var state = this.state;
            var tip = state.tip;
            if (state.tipPointNum >= state.tipPointMaxNum) {
                tip = state.cacheTip;
                state.tipPointNum = 0;
            }
            tip = tip + state.tipPoint;

            state.tipPointNum = state.tipPointNum + 1;

            state.tip = tip;

            this.setState(state);
        }.bind(this), 500);
        this.setState(state);
    },
    staticShowTip: function staticShowTip(msg) {
        var state = this.state;
        state.tip = msg;
        this.setState(state);
    },
    componentWillUnmount: function componentWillUnmount() {
        //clear interval timer
        this.stopLoopShowTipTimer();
    },
    //当msg为空,将隐藏;
    //当msg不为空,loop为false,字体不会循环展示;为true或者undefined,字体循环展示;
    showMsg: function showMsg(msg, loop) {
        //loop default is true

        if (undefined == loop) {
            loop = true;
        }

        //stop loop show tip
        this.stopLoopShowTipTimer();

        //start loop show tip
        if (msg != undefined && msg != "") {

            if (loop) {
                this.startLoopShowTipTimer(msg);
            } else {
                this.staticShowTip(msg);
            }
        }
    },
    showDefaultMsg: function showDefaultMsg(loop) {
        this.showMsg(this.getDefaultMsg(), loop);
    },

    getDefaultMsg: function getDefaultMsg() {
        return this.state.defaultTip;
    },
    hide: function hide() {
        this.showMsg();
    },
    hideMsg: function hideMsg() {
        this.showMsg();
    },

    render: function render() {
        return _react2.default.createElement(
            'div',
            { id: 'tip' },
            this.state.tip
        );
    }
}); //引入react组件
exports.default = InnerMessager; //将App组件导出

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = vendors_lib;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var hasBasename = exports.hasBasename = function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

var stripBasename = exports.stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;


  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addLeadingSlash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return stripLeadingSlash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hasBasename; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return stripBasename; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return stripTrailingSlash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return parsePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createPath; });
var addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var hasBasename = function hasBasename(path, prefix) {
  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
};

var stripBasename = function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;


  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(81);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlainPanelTitle = _react2.default.createClass({
    displayName: 'PlainPanelTitle',

    getInitialState: function getInitialState() {
        var state = { title: this.props.title };
        return state;
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { id: 'plain_panel_title_content' },
            _react2.default.createElement(
                'div',
                { id: 'title_div' },
                this.state.title
            ),
            _react2.default.createElement('div', { id: 'split_line' })
        );
    }
}); //引入react组件
exports.default = PlainPanelTitle; //将App组件导出

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _events = __webpack_require__(36);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.event = new _events.EventEmitter();
//项目前端事件分发器
//引入react组件
window.VmFrontendEventsDispatcher = {
    event: window.event,
    showMsgDialog: function showMsgDialog(msg, onCloseCallfun) {
        this.event.emit('showMsgDialog', msg, onCloseCallfun);
    },
    closeMsgDialog: function closeMsgDialog() {
        this.event.emit('closeMsgDialog');
    },
    showLoading: function showLoading(msg) {
        this.event.emit('showLoading', msg);
    },
    closeLoading: function closeLoading() {
        this.event.emit('closeLoading');
    },
    updateHeadComponentUser: function updateHeadComponentUser(newUser) {
        this.event.emit('updateHeadComponentUser', newUser);
    },
    protectPage: function protectPage() {
        this.event.emit('protectPage');
    },
    getOnlineUser: function getOnlineUser(callfun) {
        this.event.emit('getOnlineUser', callfun);
    },
    feelerOnlineUser: function feelerOnlineUser(callfun) {
        this.event.emit('feelerOnlineUser', callfun);
    }
};
window.EventsDispatcher = window.VmFrontendEventsDispatcher;
var eventsDispatcher = window.EventsDispatcher;
var EventsDispatcher = eventsDispatcher;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return locationsAreEqual; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_resolve_pathname__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_value_equal__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PathUtils__ = __webpack_require__(10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





var createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = Object(__WEBPACK_IMPORTED_MODULE_2__PathUtils__["d" /* parsePath */])(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = Object(__WEBPACK_IMPORTED_MODULE_0_resolve_pathname__["default"])(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && Object(__WEBPACK_IMPORTED_MODULE_1_value_equal__["default"])(a.state, b.state);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(87);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入react组件
var MsgDialog = _react2.default.createClass({
    displayName: "MsgDialog",

    getInitialState: function getInitialState() {
        var closeText = "确认";
        if (!isEmpty(this.props.closeText)) {
            closeText = this.props.closeText;
        }
        var state = {
            closeText: closeText,
            dialogClassName: "",
            onCloseCallfun: undefined
        };
        return state;
    },
    componentDidMount: function componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);

        //adjust ui
        this.adjustUI();

        //add events
        this.registEvents();
    },
    registEvents: function registEvents() {
        var _this = this;

        window.event.on('showMsgDialog', function (msg, onCloseCallfun) {
            //set onCloseCallfun to state
            var state = _this.state;
            state.onCloseCallfun = onCloseCallfun;
            _this.setState(state);

            _this.showMsg(msg);
        });
        window.event.on('closeMsgDialog', function () {
            _this.close();
        });
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    },
    onWindowResize: function onWindowResize() {
        this.adjustUI();
    },
    showMsg: function showMsg(msg) {
        if (msg == null || msg == undefined) {
            msg = "无消息";
        }

        //set it's message
        $(this.refs.msg_p).html(msg);
        //show it
        this.fadeIn();

        //close btn get focus ，for enter 13 to close dialog
        $(this.refs.close_btn).focus();
    },
    close: function close() {

        this.fadeOut();

        //callfun
        var onCloseCallfun = this.state.onCloseCallfun;
        if (!isEmpty(onCloseCallfun)) {
            onCloseCallfun();
        }
    },
    fadeIn: function fadeIn() {
        //不直接使用
        var state = this.state;
        $(this.refs.content).fadeIn();
        state.dialogClassName = "block animated headShake";
        this.setState(state);

        // c(this.state);
    },
    fadeOut: function fadeOut() {
        //不直接使用
        var state = this.state;
        state.dialogClassName = "animated bounceOut";
        $(this.refs.content).fadeOut();
        this.setState(state);
    },
    adjustUI: function adjustUI() {
        {
            /*调整样式*/
        }
        this.dialogToMiddle();
    },
    dialogToMiddle: function dialogToMiddle() {
        //垂直居中
        var dialog = $(this.refs.dialog);
        var content = $(this.refs.content);
        var dialog_h = dialog.height();
        var content_h = content.height();
        var top = (content_h - dialog_h) / 2;
        dialog.css("margin-top", top + "px");
    },
    handleCloseBtnKeyUp: function handleCloseBtnKeyUp(e) {
        if (e.keyCode === 13) {
            this.close();
        }
    },
    render: function render() {
        return _react2.default.createElement(
            "div",
            { id: "fragment_msg_dialog_content",
                ref: "content" },
            _react2.default.createElement(
                "div",
                { id: "dialog",
                    className: this.state.dialogClassName,
                    ref: "dialog" },
                _react2.default.createElement(
                    "div",
                    { id: "body" },
                    _react2.default.createElement(
                        "span",
                        { id: "msg_p",
                            ref: "msg_p" },
                        this.props.msg
                    ),
                    _react2.default.createElement(
                        "span",
                        { id: "split" },
                        "|"
                    ),
                    _react2.default.createElement(
                        "a",
                        { id: "close_btn",
                            ref: "close_btn",
                            href: "javascript:void(0);",
                            onClick: this.close,
                            onKeyUp: this.handleCloseBtnKeyUp },
                        this.state.closeText
                    )
                )
            )
        );
    }
});

exports.default = MsgDialog; //将App组件导出

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _resolvePathname = __webpack_require__(25);

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = __webpack_require__(26);

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, _PathUtils.parsePath)(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _warning = __webpack_require__(3);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

exports.default = createTransitionManager;

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Router__ = __webpack_require__(18);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Router__["a" /* default */]);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






/**
 * The public API for putting history on context.
 */

var Router = function (_React$Component) {
  _inherits(Router, _React$Component);

  function Router() {
    var _temp, _this, _ret;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props.history.location.pathname)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Router.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends({}, this.context.router, {
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      })
    };
  };

  Router.prototype.computeMatch = function computeMatch(pathname) {
    return {
      path: '/',
      url: '/',
      params: {},
      isExact: pathname === '/'
    };
  };

  Router.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        history = _props.history;


    __WEBPACK_IMPORTED_MODULE_1_invariant___default()(children == null || __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.count(children) === 1, 'A <Router> may have only one child element');

    // Do this here so we can setState when a <Redirect> changes the
    // location in componentWillMount. This happens e.g. when doing
    // server rendering using a <StaticRouter>.
    this.unlisten = history.listen(function () {
      _this2.setState({
        match: _this2.computeMatch(history.location.pathname)
      });
    });
  };

  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(this.props.history === nextProps.history, 'You cannot change <Router history>');
  };

  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unlisten();
  };

  Router.prototype.render = function render() {
    var children = this.props.children;

    return children ? __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.only(children) : null;
  };

  return Router;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

Router.propTypes = {
  history: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node
};
Router.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object
};
Router.childContextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Router);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path_to_regexp__);


var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compilePath = function compilePath(pattern, options) {
  var cacheKey = '' + options.end + options.strict + options.sensitive;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  var keys = [];
  var re = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default()(pattern, keys, options);
  var compiledPattern = { re: re, keys: keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

/**
 * Public API for matching a URL pathname to a path pattern.
 */
var matchPath = function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof options === 'string') options = { path: options };

  var _options = options,
      _options$path = _options.path,
      path = _options$path === undefined ? '/' : _options$path,
      _options$exact = _options.exact,
      exact = _options$exact === undefined ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === undefined ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === undefined ? false : _options$sensitive;

  var _compilePath = compilePath(path, { end: exact, strict: strict, sensitive: sensitive }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);

  if (!match) return null;

  var url = match[0],
      values = match.slice(1);

  var isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path: path, // the path pattern used to match
    url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
    isExact: isExact, // whether or not we matched exactly
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

/* harmony default export */ __webpack_exports__["a"] = (matchPath);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);


var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          __WEBPACK_IMPORTED_MODULE_0_warning___default()(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

/* harmony default export */ __webpack_exports__["a"] = (createTransitionManager);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

__webpack_require__(69);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*演员展示*/
//引入react组件
var ActorsList = _react2.default.createClass({
    displayName: 'ActorsList',

    getInitialState: function getInitialState() {
        return { whenThereHaveNotActor: "无相关演员" };
    },
    render: function render() {
        //map
        var listActors = function listActors(actors) {
            var res = [];
            for (var i = 0; i < actors.length; i++) {
                var actor = actors[i];
                // set the location
                var location = {
                    pathname: '/filmmaker/' + actor.id,
                    state: { fromDashboard: true }
                };
                if (i != actors.length - 1) {
                    res.push(_react2.default.createElement(
                        'span',
                        { key: actor.id },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { className: 'aLink', to: location },
                            actor.name
                        ),
                        ' / '
                    ));
                } else {
                    res.push(_react2.default.createElement(
                        _reactRouterDom.Link,
                        { key: actor.id, className: 'aLink', to: location },
                        actor.name
                    ));
                }
            }
            return res;
        };
        // tip string
        var actorsStr = this.state.whenThereHaveNotActor;
        // c(actorsStr);
        var actors = this.props.actors;
        if (!isEmptyList(actors)) {
            actorsStr = "";
            for (var i = 0; i < actors.length; i++) {
                var actor = actors[i];
                actorsStr += actor.name;
                if (i != actors.length - 1) {
                    actorsStr += " / ";
                }
            }
        }
        return _react2.default.createElement(
            'span',
            { title: actorsStr },
            '\u4E3B\u6F14\uFF1A',
            isEmptyList(this.props.actors) ? this.state.whenThereHaveNotActor : listActors(this.props.actors)
        );
    }
});
exports.default = ActorsList;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

__webpack_require__(73);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*导演展示*/
//引入react组件
var Director = _react2.default.createClass({
    displayName: 'Director',

    getInitialState: function getInitialState() {

        return { whenThereHaveNotDirector: "无相关导演" };
    },
    render: function render() {
        var _this = this;

        //a api to show the director.jsx

        var showDirector = function showDirector(director) {
            if (isEmpty(director)) {
                return _this.state.whenThereHaveNotDirector;
            } else {
                // set the location
                var location = {
                    pathname: '/filmmaker/' + director.id,
                    state: { fromDashboard: true }
                };
                return _react2.default.createElement(
                    _reactRouterDom.Link,
                    { title: director.name, id: 'director_name', className: 'aLink', to: location },
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u5BFC\u6F14 : '
                    ),
                    director.name
                );
            }
        };

        return _react2.default.createElement(
            'span',
            null,
            showDirector(this.props.director)
        );
    }
});
exports.default = Director;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

var _inner_messager = __webpack_require__(7);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

var _actors_list = __webpack_require__(21);

var _actors_list2 = _interopRequireDefault(_actors_list);

var _director = __webpack_require__(22);

var _director2 = _interopRequireDefault(_director);

__webpack_require__(85);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*电影列表展示*/
var MoviesDisplayer = _react2.default.createClass({
    displayName: 'MoviesDisplayer',


    getInitialState: function getInitialState() {
        return {
            loadingMoviesTip: "正在加载电影列表",
            noMoviesTip: "无相关电影"
        };
    },
    noMoviesTip: function noMoviesTip() {
        this.showMsg(this.state.noMoviesTip, false);
    },
    loadingMoviesTip: function loadingMoviesTip() {
        this.showMsg(this.state.loadingMoviesTip, true);
    },
    hideMovieTip: function hideMovieTip() {
        this.refs.innerMessager.hide();
    },
    showMsg: function showMsg(msg, loop) {
        this.refs.innerMessager.showMsg(msg, loop);
    },
    showDefaultMsg: function showDefaultMsg(loop) {
        this.refs.innerMessager.showDefaultMsg(loop);
    },

    render: function render() {
        var movies = this.props.movies;

        //for first load
        if (isEmptyList(movies)) {
            movies = [];
        }
        var movieItems = movies.map(function (item) {

            // set the location
            var location = {
                pathname: '/movie/' + item.id,
                state: { fromDashboard: true }

                //imgUrl
            };var imgUrl = generateImgUrl({
                imgUrl: item.imgUrl,
                width: 300
            });
            return _react2.default.createElement(
                'li',
                { className: 'movie_item animated flipInX', key: item.id },
                _react2.default.createElement(
                    'div',
                    { className: 'movie_img_div' },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: location, className: 'aLink' },
                        _react2.default.createElement('img', { src: MOVIE_LOADING_IMG, 'data-original': imgUrl })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'movie_info_div' },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: location, className: 'aLink movie_name_a' },
                            item.name
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'movie_actor_list_div' },
                        _react2.default.createElement(_actors_list2.default, { actors: item.actors })
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_director2.default, { director: item.director })
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        '\u8BC4\u5206\uFF1A',
                        item.score
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        '\u64AD\u653E\uFF1A',
                        item.watchNum,
                        '\u6B21'
                    )
                )
            );
        }.bind(this));

        return _react2.default.createElement(
            'ul',
            { id: 'movies_list_ul' },
            _react2.default.createElement(_inner_messager2.default, { defaultTip: this.state.loadingMoviesTip, ref: 'innerMessager' }),
            movieItems,
            _react2.default.createElement('li', { className: 'clear' })
        );
    }
}); //引入react组件
exports.default = MoviesDisplayer;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(8))(12);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ __webpack_exports__["default"] = (resolvePathname);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ __webpack_exports__["default"] = (valueEqual);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_invariant__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

/**
 * The public API for rendering a history-aware <a>.
 */

var Link = function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    var _temp, _this, _ret;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleClick = function (event) {
      if (_this.props.onClick) _this.props.onClick(event);

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !_this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();

          var history = _this.context.router.history;
          var _this$props = _this.props,
              replace = _this$props.replace,
              to = _this$props.to;


          if (replace) {
            history.replace(to);
          } else {
            history.push(to);
          }
        }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Link.prototype.render = function render() {
    var _props = this.props,
        replace = _props.replace,
        to = _props.to,
        innerRef = _props.innerRef,
        props = _objectWithoutProperties(_props, ['replace', 'to', 'innerRef']); // eslint-disable-line no-unused-vars

    __WEBPACK_IMPORTED_MODULE_2_invariant___default()(this.context.router, 'You should not use <Link> outside a <Router>');

    var href = this.context.router.history.createHref(typeof to === 'string' ? { pathname: to } : to);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('a', _extends({}, props, { onClick: this.handleClick, href: href, ref: innerRef }));
  };

  return Link;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Link.propTypes = {
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  target: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  replace: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object]).isRequired,
  innerRef: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func])
};
Link.defaultProps = {
  replace: false
};
Link.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      push: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
      replace: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
      createHref: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
    }).isRequired
  }).isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Link);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Route__ = __webpack_require__(30);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Route__["a" /* default */]);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__matchPath__ = __webpack_require__(19);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var isEmptyChildren = function isEmptyChildren(children) {
  return __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.count(children) === 0;
};

/**
 * The public API for matching a single path and rendering.
 */

var Route = function (_React$Component) {
  _inherits(Route, _React$Component);

  function Route() {
    var _temp, _this, _ret;

    _classCallCheck(this, Route);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props, _this.context.router)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Route.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends({}, this.context.router, {
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        }
      })
    };
  };

  Route.prototype.computeMatch = function computeMatch(_ref, router) {
    var computedMatch = _ref.computedMatch,
        location = _ref.location,
        path = _ref.path,
        strict = _ref.strict,
        exact = _ref.exact,
        sensitive = _ref.sensitive;

    if (computedMatch) return computedMatch; // <Switch> already computed the match for us

    __WEBPACK_IMPORTED_MODULE_1_invariant___default()(router, 'You should not use <Route> or withRouter() outside a <Router>');

    var route = router.route;

    var pathname = (location || route.location).pathname;

    return path ? Object(__WEBPACK_IMPORTED_MODULE_4__matchPath__["a" /* default */])(pathname, { path: path, strict: strict, exact: exact, sensitive: sensitive }) : route.match;
  };

  Route.prototype.componentWillMount = function componentWillMount() {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(this.props.component && this.props.render), 'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored');

    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(this.props.component && this.props.children && !isEmptyChildren(this.props.children)), 'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored');

    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(this.props.render && this.props.children && !isEmptyChildren(this.props.children)), 'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored');
  };

  Route.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');

    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    });
  };

  Route.prototype.render = function render() {
    var match = this.state.match;
    var _props = this.props,
        children = _props.children,
        component = _props.component,
        render = _props.render;
    var _context$router = this.context.router,
        history = _context$router.history,
        route = _context$router.route,
        staticContext = _context$router.staticContext;

    var location = this.props.location || route.location;
    var props = { match: match, location: location, history: history, staticContext: staticContext };

    return component ? // component prop gets first priority, only called if there's a match
    match ? __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(component, props) : null : render ? // render prop is next, only called if there's a match
    match ? render(props) : null : children ? // children come last, always called
    typeof children === 'function' ? children(props) : !isEmptyChildren(children) ? __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.only(children) : null : null;
  };

  return Route;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

Route.propTypes = {
  computedMatch: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object, // private, from <Switch>
  path: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  exact: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.bool,
  strict: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.bool,
  sensitive: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.bool,
  component: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func,
  render: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node]),
  location: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object
};
Route.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.shape({
    history: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object.isRequired,
    route: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object.isRequired,
    staticContext: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object
  })
};
Route.childContextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Route);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return canUseDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return removeEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getConfirmation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return supportsHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return supportsPopStateOnHashChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return supportsGoWithoutReloadUsingHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isExtraneousPopstateEvent; });
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(75);

var _inner_messager = __webpack_require__(7);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*标签展示*/
//引入react组件
var TagsOfMovie = _react2.default.createClass({
    displayName: 'TagsOfMovie',

    getInitialState: function getInitialState() {
        return {
            whenTagIsLoading: "正在加载标签信息",
            whenThereHaveNotTag: "无相关标签信息",
            movieId: this.props.movieId,
            tags: []
        };
    },
    componentDidMount: function componentDidMount() {

        this.getTagsOfMovie();
    },
    getTagsOfMovie: function getTagsOfMovie(callfun) {
        var url = "/tag/byMovieId/" + this.state.movieId;
        ajax.get({
            url: url,
            onBeforeRequest: function () {}.bind(this),
            onResponseStart: function () {

                //hide tip
                this.showTagTip();
            }.bind(this),
            onResponseSuccess: function (result) {
                if (isEmptyList(result.data.list)) {
                    this.showTagTip(this.state.whenThereHaveNotTag, false);

                    this.props.onLoadDataSuccess([]);

                    return;
                }

                var state = this.state;
                state.tags = result.data.list;

                this.setState(state);

                //callfun
                this.props.onLoadDataSuccess(state.tags);
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg);
            }.bind(this),
            onResponseEnd: function () {
                //callfun
                if (callfun != undefined) {
                    callfun();
                }
            }.bind(this)
        });
    },
    showTagTip: function showTagTip(msg, loop) {
        this.refs.innerMessager.showMsg(msg, loop);
    },

    render: function render() {

        //show tags
        var listTags = function listTags(tags) {
            if (isEmptyList(tags)) {
                return;
            }
            var res = [];
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                // c(tag);
                res.push(_react2.default.createElement(
                    'li',
                    { className: 'tag', key: tag.id },
                    _react2.default.createElement(
                        'a',
                        { href: 'javascript:void(0);' },
                        tag.name
                    )
                ));
            }
            return res;
        };
        return _react2.default.createElement(
            'div',
            { id: 'tags_of_movie' },
            _react2.default.createElement(_inner_messager2.default, { ref: 'innerMessager',
                defaultTip: this.state.whenTagIsLoading }),
            _react2.default.createElement(
                'div',
                { id: 'ul_div' },
                _react2.default.createElement(
                    'ul',
                    null,
                    listTags(this.state.tags)
                )
            )
        );
    }
});
exports.default = TagsOfMovie;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*弹性文本展示*/
var FlexText = _react2.default.createClass({
    displayName: "FlexText",

    getInitialState: function getInitialState() {
        //set maxTextLength
        var defaultMaxTextLength = 100;
        if (!isEmpty(this.props.maxTextLength)) {
            defaultMaxTextLength = this.props.maxTextLength;
        }

        return { maxTextLength: defaultMaxTextLength };
    },
    render: function render() {

        //computer allText and shortText
        var maxTextLength = this.state.maxTextLength;
        var allText = this.props.text;
        if (isEmpty(allText)) {
            allText = "";
        }
        var shortText = allText;
        if (maxTextLength < allText.length) {
            shortText = allText.substring(0, maxTextLength) + "...";
        }
        return _react2.default.createElement(
            "div",
            { id: "flex_text_content", title: allText },
            this.props.title,
            shortText
        );
    }
}); //引入react组件
exports.default = FlexText;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

var _inner_messager = __webpack_require__(7);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

__webpack_require__(79);

var _plain_panel_title = __webpack_require__(11);

var _plain_panel_title2 = _interopRequireDefault(_plain_panel_title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*演员详情展示*/
//引入react组件
var FilmmakersDetailsArea = _react2.default.createClass({
    displayName: "FilmmakersDetailsArea",


    getInitialState: function getInitialState() {
        return {
            whenActorsDetailsIsLoading: "正在加载电影人信息",
            whenThereIsHaveNotFilmmakers: "无相关电影人",
            title: "相关演员"
        };
    },
    componentDidMount: function componentDidMount() {
        //add resize event listener
        window.addEventListener('resize', this.onWindowResize);
        //get filmmakers
        this.getFilmmakers();
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    },
    onWindowResize: function onWindowResize() {
        this.adjustUI();
    },
    getFilmmakers: function getFilmmakers() {
        var url = "/filmmaker/byMovieId/" + this.props.movieId;

        ajax.get({
            url: url,
            onBeforeRequest: function () {}.bind(this),
            onResponseStart: function () {

                //hide tip
                this.showTip();
            }.bind(this),
            onResponseSuccess: function (result) {
                if (isEmptyList(result.data.filmmakers)) {
                    this.showTip(this.state.whenThereIsHaveNotFilmmakers, false);

                    //callfun
                    this.props.onLoadDataSuccess([]);

                    return;
                }

                //set state
                var state = this.state;
                state.filmmakers = result.data.filmmakers;

                this.setState(state);

                //adjust ui
                this.adjustUI();

                //callfun
                this.props.onLoadDataSuccess(state.filmmakers);
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg);
            }.bind(this),
            onResponseEnd: function () {}.bind(this)
        });
    },
    adjustUI: function adjustUI() {
        var $actors_details_area = $(this.refs.actors_details_area);
        var w = $($actors_details_area.find("img")[0]).width();
        // c(w);
        var h = w;
        $actors_details_area.find("img").height(h);
    },
    showTip: function showTip(msg, loop) {
        this.refs.actors_details_area_inner_messager.showMsg(msg, loop);
    },

    render: function render() {
        var listFilmmakers = function () {
            var filmmakers = this.state.filmmakers;
            var res = [];
            // if(isEmptyList(filmmakers)){
            // res.push(<li key="1">无相关电影人</li>)
            // return res;
            // }
            if (isEmptyList(filmmakers)) {
                filmmakers = [];
            }

            for (var i = 0; i < filmmakers.length; i++) {
                var filmmaker = filmmakers[i];
                // set the location
                var location = {
                    pathname: '/filmmaker/' + filmmaker.id,
                    state: { fromDashboard: true }
                    //imgUrl
                    // var imgUrl = vm_config.http_url_prefix + filmmaker.imgUrl;

                };var imgUrl = generateImgUrl({ imgUrl: filmmaker.imgUrl, width: 50 });
                res.push(_react2.default.createElement(
                    "li",
                    { key: filmmaker.id, title: filmmaker.name },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { title: filmmaker.name, to: location },
                        _react2.default.createElement("img", { title: filmmaker.name, src: imgUrl }),
                        _react2.default.createElement(
                            "div",
                            { title: filmmaker.name },
                            filmmaker.name
                        )
                    )
                ));
            }
            return res;
        }.bind(this);
        return _react2.default.createElement(
            "div",
            { id: "actors_details_area", ref: "actors_details_area" },
            _react2.default.createElement(_plain_panel_title2.default, { title: this.state.title }),
            _react2.default.createElement(_inner_messager2.default, { defaultTip: this.state.whenActorsDetailsIsLoading,
                ref: "actors_details_area_inner_messager" }),
            _react2.default.createElement(
                "ul",
                null,
                listFilmmakers()
            )
        );
    }
});
exports.default = FilmmakersDetailsArea;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(83);

var _inner_messager = __webpack_require__(7);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

var _plain_panel_title = __webpack_require__(11);

var _plain_panel_title2 = _interopRequireDefault(_plain_panel_title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*电影播放器展示*/
var MoviePlayer = _react2.default.createClass({
    displayName: 'MoviePlayer',

    getInitialState: function getInitialState() {

        return {
            whenPlayerIsLoading: "正在加载视频资源",
            moviePlayerPanelTitle: "电影播放"
        };
    }, componentDidMount: function componentDidMount() {

        //add resize event listener
        window.addEventListener('resize', this.onWindowResize);

        this.adjustUI();
    },
    componentWillReceiveProps: function componentWillReceiveProps() {
        c("componentWillReceiveProps");
        c(this.props.movie);
        //get movie versions
        if (!isUndefined(this.props.movie.id)) {

            this.getMovieSrcVersion();
        }
    },

    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    },
    onWindowResize: function onWindowResize() {
        this.adjustUI();
    },
    adjustUI: function adjustUI() {
        this.adjustMoviePlayerUI();
    },
    adjustMoviePlayerUI: function adjustMoviePlayerUI() {
        //set player's height by width
        var m_player = $(this.refs.m_player);

        var w = m_player.width();
        var h = w / 1.5;
        m_player.height(h);
    },
    movieSharpness: function movieSharpness(data) {
        //1代表标清，2代表高清，3代表超清
        if (data == 1) {
            return "标清";
        }
        if (data == 2) {
            return "高清";
        }
        if (data == 3) {
            return "超清";
        }
    },
    getMovieSrcVersion: function getMovieSrcVersion(callfun) {
        var url = "/movie/version/" + this.props.movie.id + "?orderBy=weight&orderType=desc";
        ajax.get({
            url: url,
            onBeforeRequest: function () {}.bind(this),
            onResponseStart: function () {
                //cancel tip
                this.showTip();
            }.bind(this),
            onResponseSuccess: function (result) {
                var versionsInfo = result.data.versions;
                var videos = [];
                for (var i = 0; i < versionsInfo.length; i++) {
                    var version = versionsInfo[i];
                    videos.push([generateUrl({ url: version.srcUrl }), 'video/mp4', this.movieSharpness(version.sharpness), version.weight]);
                }
                videos.push(['http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4', 'video/mp4', '1080', 1080]);
                //init movie player
                var options = {};
                var posterUrl = generateImgUrl({
                    imgUrl: this.props.movie.posterUrl,
                    obj: {
                        width: 600
                    }
                });
                // const  posterUrl = "http://192.168.0.122:5551/src/img/707/300";
                options.poster = posterUrl;
                options.video = videos;
                //init movie player
                setTimeout(function () {

                    this.initPlayer(options);
                    // c("OPTIONS");
                    // c(options);
                }.bind(this), 10);
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg);
            }.bind(this),
            onResponseEnd: function () {
                //callfun
                if (callfun != undefined) {
                    callfun();
                }
            }.bind(this)
        });
    },
    initPlayer: function initPlayer(options) {
        // c("options.poster");
        // c(options.poster);
        var videoObject = {
            container: '#m_player', //“#”代表容器的ID，“.”或“”代表容器的class
            variable: 'player', //该属性必需设置，值等于下面的new chplayer()的对象
            poster: options.poster, //封面图片
            autoplay: false, //默认自动播放
            volume: 1.0, //初始化音量
            flashplayer: true, //如果强制使用flashplayer则设置成true
            video: options.video //视频地址http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4

        };
        var player = new ckplayer(videoObject);
    },
    showTip: function showTip(msg, loop) {
        this.refs.player_inner_messager.showMsg(msg, loop);
    },

    render: function render() {

        return _react2.default.createElement(
            'div',
            { id: 'm' },
            _react2.default.createElement(_plain_panel_title2.default, { title: this.state.moviePlayerPanelTitle }),
            _react2.default.createElement(_inner_messager2.default, { defaultTip: this.state.whenPlayerIsLoading,
                ref: 'player_inner_messager' }),
            _react2.default.createElement('div', { id: 'm_player',
                ref: 'm_player' })
        );
    }
}); //引入react组件
exports.default = MoviePlayer;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _reactDom = __webpack_require__(24);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(38);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*网站头部*/
_reactDom2.default.render(_react2.default.createElement(_index2.default, null), document.getElementById('react_dom_index')); /*!!记得导入*/

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(24);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

var _filmmaker_info_page = __webpack_require__(66);

var _filmmaker_info_page2 = _interopRequireDefault(_filmmaker_info_page);

var _events = __webpack_require__(36);

__webpack_require__(89);

var _movie_list_page = __webpack_require__(91);

var _movie_list_page2 = _interopRequireDefault(_movie_list_page);

var _movie_info_page = __webpack_require__(99);

var _movie_info_page2 = _interopRequireDefault(_movie_info_page);

var _head = __webpack_require__(102);

var _head2 = _interopRequireDefault(_head);

var _tail = __webpack_require__(111);

var _tail2 = _interopRequireDefault(_tail);

var _msg_dialog = __webpack_require__(14);

var _msg_dialog2 = _interopRequireDefault(_msg_dialog);

var _loading = __webpack_require__(114);

var _loading2 = _interopRequireDefault(_loading);

var _user_page = __webpack_require__(117);

var _user_page2 = _interopRequireDefault(_user_page);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Index = _react2.default.createClass({
    displayName: 'Index',

    getInitialState: function getInitialState() {
        return {};
    },
    render: function render() {
        //set now page's props
        return _react2.default.createElement(
            'div',
            { id: 'index' },
            _react2.default.createElement(
                _reactRouterDom.HashRouter,
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_head2.default, null),
                    _react2.default.createElement(
                        _reactRouterDom.Switch,
                        null,
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/',
                            render: function render() {
                                return _react2.default.createElement(_movie_list_page2.default, { tagGroupSource: '/tagGroup/list',
                                    movieSource: '/movie/list' });
                            } }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/movie/list',
                            render: function render() {
                                return _react2.default.createElement(_movie_list_page2.default, { tagGroupSource: '/tagGroup/list',
                                    movieSource: '/movie/list' });
                            } }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/movie/:movieId', component: _movie_info_page2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/filmmaker/:filmmakerId', component: _filmmaker_info_page2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { path: '/user/online', component: _user_page2.default })
                    ),
                    _react2.default.createElement(_tail2.default, null),
                    _react2.default.createElement(_msg_dialog2.default, { ref: 'msg_dialog' }),
                    _react2.default.createElement(_loading2.default, null)
                )
            )
        );
    }
});

exports.default = Index; //将App组件导出

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createBrowserHistory__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_history_createBrowserHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(17);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







/**
 * The public API for a <Router> that uses HTML5 history.
 */

var BrowserRouter = function (_React$Component) {
  _inherits(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, BrowserRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = __WEBPACK_IMPORTED_MODULE_3_history_createBrowserHistory___default()(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  BrowserRouter.prototype.componentWillMount = function componentWillMount() {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!this.props.history, '<BrowserRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { BrowserRouter as Router }`.');
  };

  BrowserRouter.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Router__["a" /* default */], { history: this.history, children: this.props.children });
  };

  return BrowserRouter;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

BrowserRouter.propTypes = {
  basename: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  forceRefresh: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool,
  getUserConfirmation: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  keyLength: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number,
  children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node
};


/* harmony default export */ __webpack_exports__["a"] = (BrowserRouter);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(3);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(6);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(15);

var _PathUtils = __webpack_require__(9);

var _createTransitionManager = __webpack_require__(16);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Browser history needs a DOM');

  var globalHistory = window.history;
  var canUseHistory = (0, _DOMUtils.supportsHistory)();
  var needsHashChangeListener = !(0, _DOMUtils.supportsPopStateOnHashChange)();

  var _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;


    var path = pathname + search + hash;

    (0, _warning2.default)(!basename || (0, _PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

    return (0, _LocationUtils.createLocation)(path, state, key);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + (0, _PathUtils.createPath)(location);
  };

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
        (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createBrowserHistory;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(8))(8);

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createHashHistory__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createHashHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_history_createHashHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(17);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







/**
 * The public API for a <Router> that uses window.location.hash.
 */

var HashRouter = function (_React$Component) {
  _inherits(HashRouter, _React$Component);

  function HashRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, HashRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = __WEBPACK_IMPORTED_MODULE_3_history_createHashHistory___default()(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  HashRouter.prototype.componentWillMount = function componentWillMount() {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!this.props.history, '<HashRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { HashRouter as Router }`.');
  };

  HashRouter.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Router__["a" /* default */], { history: this.history, children: this.props.children });
  };

  return HashRouter;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

HashRouter.propTypes = {
  basename: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
  getUserConfirmation: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  hashType: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOf(['hashbang', 'noslash', 'slash']),
  children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node
};


/* harmony default export */ __webpack_exports__["a"] = (HashRouter);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(3);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(6);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(15);

var _PathUtils = __webpack_require__(9);

var _createTransitionManager = __webpack_require__(16);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HashChangeEvent = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + (0, _PathUtils.stripLeadingSlash)(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: _PathUtils.stripLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  },
  slash: {
    encodePath: _PathUtils.addLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _invariant2.default)(_DOMUtils.canUseDOM, 'Hash history needs a DOM');

  var globalHistory = window.history;
  var canGoWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

  var basename = props.basename ? (0, _PathUtils.stripTrailingSlash)((0, _PathUtils.addLeadingSlash)(props.basename)) : '';

  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;


  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    (0, _warning2.default)(!basename || (0, _PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = (0, _PathUtils.stripBasename)(path, basename);

    return (0, _LocationUtils.createLocation)(path);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && (0, _LocationUtils.locationsAreEqual)(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === (0, _PathUtils.createPath)(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [(0, _PathUtils.createPath)(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + (0, _PathUtils.createPath)(location));
  };

  var push = function push(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf((0, _PathUtils.createPath)(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createHashHistory;

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_MemoryRouter__ = __webpack_require__(45);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_MemoryRouter__["a" /* default */]);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createMemoryHistory__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createMemoryHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_history_createMemoryHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(18);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







/**
 * The public API for a <Router> that stores location in memory.
 */

var MemoryRouter = function (_React$Component) {
  _inherits(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, MemoryRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = __WEBPACK_IMPORTED_MODULE_3_history_createMemoryHistory___default()(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  MemoryRouter.prototype.componentWillMount = function componentWillMount() {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!this.props.history, '<MemoryRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { MemoryRouter as Router }`.');
  };

  MemoryRouter.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Router__["a" /* default */], { history: this.history, children: this.props.children });
  };

  return MemoryRouter;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

MemoryRouter.propTypes = {
  initialEntries: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array,
  initialIndex: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number,
  getUserConfirmation: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  keyLength: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number,
  children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node
};


/* harmony default export */ __webpack_exports__["a"] = (MemoryRouter);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(3);

var _warning2 = _interopRequireDefault(_warning);

var _PathUtils = __webpack_require__(9);

var _LocationUtils = __webpack_require__(15);

var _createTransitionManager = __webpack_require__(16);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clamp = function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
};

/**
 * Creates a history object that stores locations in memory.
 */
var createMemoryHistory = function createMemoryHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? (0, _LocationUtils.createLocation)(entry, undefined, createKey()) : (0, _LocationUtils.createLocation)(entry, undefined, entry.key || createKey());
  });

  // Public interface

  var createHref = _PathUtils.createPath;

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;

      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      history.entries[history.index] = location;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

    var action = 'POP';
    var location = history.entries[nextIndex];

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var canGo = function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  };

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return transitionManager.setPrompt(prompt);
  };

  var listen = function listen(listener) {
    return transitionManager.appendListener(listener);
  };

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createMemoryHistory;

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Route__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(28);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
var NavLink = function NavLink(_ref) {
  var to = _ref.to,
      exact = _ref.exact,
      strict = _ref.strict,
      location = _ref.location,
      activeClassName = _ref.activeClassName,
      className = _ref.className,
      activeStyle = _ref.activeStyle,
      style = _ref.style,
      getIsActive = _ref.isActive,
      ariaCurrent = _ref.ariaCurrent,
      rest = _objectWithoutProperties(_ref, ['to', 'exact', 'strict', 'location', 'activeClassName', 'className', 'activeStyle', 'style', 'isActive', 'ariaCurrent']);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Route__["a" /* default */], {
    path: (typeof to === 'undefined' ? 'undefined' : _typeof(to)) === 'object' ? to.pathname : to,
    exact: exact,
    strict: strict,
    location: location,
    children: function children(_ref2) {
      var location = _ref2.location,
          match = _ref2.match;

      var isActive = !!(getIsActive ? getIsActive(match, location) : match);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */], _extends({
        to: to,
        className: isActive ? [className, activeClassName].filter(function (i) {
          return i;
        }).join(' ') : className,
        style: isActive ? _extends({}, style, activeStyle) : style,
        'aria-current': isActive && ariaCurrent
      }, rest));
    }
  });
};

NavLink.propTypes = {
  to: __WEBPACK_IMPORTED_MODULE_3__Link__["a" /* default */].propTypes.to,
  exact: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  strict: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  activeClassName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  activeStyle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  style: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  isActive: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  ariaCurrent: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf(['page', 'step', 'location', 'true'])
};

NavLink.defaultProps = {
  activeClassName: 'active',
  ariaCurrent: 'true'
};

/* harmony default export */ __webpack_exports__["a"] = (NavLink);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(49)

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Prompt__ = __webpack_require__(51);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Prompt__["a" /* default */]);

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_invariant__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/**
 * The public API for prompting the user before navigating away
 * from a screen with a component.
 */

var Prompt = function (_React$Component) {
  _inherits(Prompt, _React$Component);

  function Prompt() {
    _classCallCheck(this, Prompt);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Prompt.prototype.enable = function enable(message) {
    if (this.unblock) this.unblock();

    this.unblock = this.context.router.history.block(message);
  };

  Prompt.prototype.disable = function disable() {
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    }
  };

  Prompt.prototype.componentWillMount = function componentWillMount() {
    __WEBPACK_IMPORTED_MODULE_2_invariant___default()(this.context.router, 'You should not use <Prompt> outside a <Router>');

    if (this.props.when) this.enable(this.props.message);
  };

  Prompt.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.when) {
      if (!this.props.when || this.props.message !== nextProps.message) this.enable(nextProps.message);
    } else {
      this.disable();
    }
  };

  Prompt.prototype.componentWillUnmount = function componentWillUnmount() {
    this.disable();
  };

  Prompt.prototype.render = function render() {
    return null;
  };

  return Prompt;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Prompt.propTypes = {
  when: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  message: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string]).isRequired
};
Prompt.defaultProps = {
  when: true
};
Prompt.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      block: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
    }).isRequired
  }).isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Prompt);

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Redirect__ = __webpack_require__(53);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Redirect__["a" /* default */]);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_history__ = __webpack_require__(54);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







/**
 * The public API for updating the location programmatically
 * with a component.
 */

var Redirect = function (_React$Component) {
  _inherits(Redirect, _React$Component);

  function Redirect() {
    _classCallCheck(this, Redirect);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Redirect.prototype.isStatic = function isStatic() {
    return this.context.router && this.context.router.staticContext;
  };

  Redirect.prototype.componentWillMount = function componentWillMount() {
    __WEBPACK_IMPORTED_MODULE_3_invariant___default()(this.context.router, 'You should not use <Redirect> outside a <Router>');

    if (this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidMount = function componentDidMount() {
    if (!this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var prevTo = Object(__WEBPACK_IMPORTED_MODULE_4_history__["a" /* createLocation */])(prevProps.to);
    var nextTo = Object(__WEBPACK_IMPORTED_MODULE_4_history__["a" /* createLocation */])(this.props.to);

    if (Object(__WEBPACK_IMPORTED_MODULE_4_history__["b" /* locationsAreEqual */])(prevTo, nextTo)) {
      __WEBPACK_IMPORTED_MODULE_2_warning___default()(false, 'You tried to redirect to the same route you\'re currently on: ' + ('"' + nextTo.pathname + nextTo.search + '"'));
      return;
    }

    this.perform();
  };

  Redirect.prototype.perform = function perform() {
    var history = this.context.router.history;
    var _props = this.props,
        push = _props.push,
        to = _props.to;


    if (push) {
      history.push(to);
    } else {
      history.replace(to);
    }
  };

  Redirect.prototype.render = function render() {
    return null;
  };

  return Redirect;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Redirect.propTypes = {
  push: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  from: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  to: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object]).isRequired
};
Redirect.defaultProps = {
  push: false
};
Redirect.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    history: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      push: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
      replace: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
    }).isRequired,
    staticContext: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
  }).isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (Redirect);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createBrowserHistory__ = __webpack_require__(55);
/* unused harmony reexport createBrowserHistory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__createHashHistory__ = __webpack_require__(56);
/* unused harmony reexport createHashHistory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createMemoryHistory__ = __webpack_require__(57);
/* unused harmony reexport createMemoryHistory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LocationUtils__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__LocationUtils__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__LocationUtils__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PathUtils__ = __webpack_require__(10);
/* unused harmony reexport parsePath */
/* unused harmony reexport createPath */










/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LocationUtils__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PathUtils__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createTransitionManager__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DOMUtils__ = __webpack_require__(31);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  __WEBPACK_IMPORTED_MODULE_1_invariant___default()(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["b" /* canUseDOM */], 'Browser history needs a DOM');

  var globalHistory = window.history;
  var canUseHistory = Object(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["g" /* supportsHistory */])();
  var needsHashChangeListener = !Object(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["h" /* supportsPopStateOnHashChange */])();

  var _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? __WEBPACK_IMPORTED_MODULE_5__DOMUtils__["c" /* getConfirmation */] : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

  var basename = props.basename ? Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["g" /* stripTrailingSlash */])(Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["a" /* addLeadingSlash */])(props.basename)) : '';

  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;


    var path = pathname + search + hash;

    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!basename || Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["c" /* hasBasename */])(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["e" /* stripBasename */])(path, basename);

    return Object(__WEBPACK_IMPORTED_MODULE_2__LocationUtils__["a" /* createLocation */])(path, state, key);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = Object(__WEBPACK_IMPORTED_MODULE_4__createTransitionManager__["a" /* default */])();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (Object(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["d" /* isExtraneousPopstateEvent */])(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["b" /* createPath */])(location);
  };

  var push = function push(path, state) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = Object(__WEBPACK_IMPORTED_MODULE_2__LocationUtils__["a" /* createLocation */])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
        __WEBPACK_IMPORTED_MODULE_0_warning___default()(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = Object(__WEBPACK_IMPORTED_MODULE_2__LocationUtils__["a" /* createLocation */])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
        __WEBPACK_IMPORTED_MODULE_0_warning___default()(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      Object(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["a" /* addEventListener */])(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) Object(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["a" /* addEventListener */])(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      Object(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["e" /* removeEventListener */])(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) Object(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["e" /* removeEventListener */])(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

/* unused harmony default export */ var _unused_webpack_default_export = (createBrowserHistory);

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LocationUtils__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PathUtils__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createTransitionManager__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DOMUtils__ = __webpack_require__(31);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








var HashChangeEvent = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["f" /* stripLeadingSlash */])(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: __WEBPACK_IMPORTED_MODULE_3__PathUtils__["f" /* stripLeadingSlash */],
    decodePath: __WEBPACK_IMPORTED_MODULE_3__PathUtils__["a" /* addLeadingSlash */]
  },
  slash: {
    encodePath: __WEBPACK_IMPORTED_MODULE_3__PathUtils__["a" /* addLeadingSlash */],
    decodePath: __WEBPACK_IMPORTED_MODULE_3__PathUtils__["a" /* addLeadingSlash */]
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  __WEBPACK_IMPORTED_MODULE_1_invariant___default()(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["b" /* canUseDOM */], 'Hash history needs a DOM');

  var globalHistory = window.history;
  var canGoWithoutReload = Object(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["f" /* supportsGoWithoutReloadUsingHash */])();

  var _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? __WEBPACK_IMPORTED_MODULE_5__DOMUtils__["c" /* getConfirmation */] : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

  var basename = props.basename ? Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["g" /* stripTrailingSlash */])(Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["a" /* addLeadingSlash */])(props.basename)) : '';

  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;


  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!basename || Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["c" /* hasBasename */])(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

    if (basename) path = Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["e" /* stripBasename */])(path, basename);

    return Object(__WEBPACK_IMPORTED_MODULE_2__LocationUtils__["a" /* createLocation */])(path);
  };

  var transitionManager = Object(__WEBPACK_IMPORTED_MODULE_4__createTransitionManager__["a" /* default */])();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && Object(__WEBPACK_IMPORTED_MODULE_2__LocationUtils__["b" /* locationsAreEqual */])(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["b" /* createPath */])(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';

      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({ action: action, location: location });
        } else {
          revertPop(location);
        }
      });
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["b" /* createPath */])(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf(Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["b" /* createPath */])(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["b" /* createPath */])(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["b" /* createPath */])(location));
  };

  var push = function push(path, state) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(state === undefined, 'Hash history cannot push state; it is ignored');

    var action = 'PUSH';
    var location = Object(__WEBPACK_IMPORTED_MODULE_2__LocationUtils__["a" /* createLocation */])(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["b" /* createPath */])(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf(Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["b" /* createPath */])(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        __WEBPACK_IMPORTED_MODULE_0_warning___default()(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(state === undefined, 'Hash history cannot replace state; it is ignored');

    var action = 'REPLACE';
    var location = Object(__WEBPACK_IMPORTED_MODULE_2__LocationUtils__["a" /* createLocation */])(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["b" /* createPath */])(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(Object(__WEBPACK_IMPORTED_MODULE_3__PathUtils__["b" /* createPath */])(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      Object(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["a" /* addEventListener */])(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      Object(__WEBPACK_IMPORTED_MODULE_5__DOMUtils__["e" /* removeEventListener */])(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

/* unused harmony default export */ var _unused_webpack_default_export = (createHashHistory);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PathUtils__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LocationUtils__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createTransitionManager__ = __webpack_require__(20);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






var clamp = function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
};

/**
 * Creates a history object that stores locations in memory.
 */
var createMemoryHistory = function createMemoryHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


  var transitionManager = Object(__WEBPACK_IMPORTED_MODULE_3__createTransitionManager__["a" /* default */])();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? Object(__WEBPACK_IMPORTED_MODULE_2__LocationUtils__["a" /* createLocation */])(entry, undefined, createKey()) : Object(__WEBPACK_IMPORTED_MODULE_2__LocationUtils__["a" /* createLocation */])(entry, undefined, entry.key || createKey());
  });

  // Public interface

  var createHref = __WEBPACK_IMPORTED_MODULE_1__PathUtils__["b" /* createPath */];

  var push = function push(path, state) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = Object(__WEBPACK_IMPORTED_MODULE_2__LocationUtils__["a" /* createLocation */])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;

      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  };

  var replace = function replace(path, state) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = Object(__WEBPACK_IMPORTED_MODULE_2__LocationUtils__["a" /* createLocation */])(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      history.entries[history.index] = location;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

    var action = 'POP';
    var location = history.entries[nextIndex];

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var canGo = function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  };

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return transitionManager.setPrompt(prompt);
  };

  var listen = function listen(listener) {
    return transitionManager.appendListener(listener);
  };

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };

  return history;
};

/* unused harmony default export */ var _unused_webpack_default_export = (createMemoryHistory);

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_StaticRouter__ = __webpack_require__(59);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_StaticRouter__["a" /* default */]);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_history_PathUtils__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_history_PathUtils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_history_PathUtils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Router__ = __webpack_require__(18);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var normalizeLocation = function normalizeLocation(object) {
  var _object$pathname = object.pathname,
      pathname = _object$pathname === undefined ? '/' : _object$pathname,
      _object$search = object.search,
      search = _object$search === undefined ? '' : _object$search,
      _object$hash = object.hash,
      hash = _object$hash === undefined ? '' : _object$hash;


  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var addBasename = function addBasename(basename, location) {
  if (!basename) return location;

  return _extends({}, location, {
    pathname: Object(__WEBPACK_IMPORTED_MODULE_4_history_PathUtils__["addLeadingSlash"])(basename) + location.pathname
  });
};

var stripBasename = function stripBasename(basename, location) {
  if (!basename) return location;

  var base = Object(__WEBPACK_IMPORTED_MODULE_4_history_PathUtils__["addLeadingSlash"])(basename);

  if (location.pathname.indexOf(base) !== 0) return location;

  return _extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
};

var createLocation = function createLocation(location) {
  return typeof location === 'string' ? Object(__WEBPACK_IMPORTED_MODULE_4_history_PathUtils__["parsePath"])(location) : normalizeLocation(location);
};

var createURL = function createURL(location) {
  return typeof location === 'string' ? location : Object(__WEBPACK_IMPORTED_MODULE_4_history_PathUtils__["createPath"])(location);
};

var staticHandler = function staticHandler(methodName) {
  return function () {
    __WEBPACK_IMPORTED_MODULE_1_invariant___default()(false, 'You cannot %s with <StaticRouter>', methodName);
  };
};

var noop = function noop() {};

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */

var StaticRouter = function (_React$Component) {
  _inherits(StaticRouter, _React$Component);

  function StaticRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, StaticRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.createHref = function (path) {
      return Object(__WEBPACK_IMPORTED_MODULE_4_history_PathUtils__["addLeadingSlash"])(_this.props.basename + createURL(path));
    }, _this.handlePush = function (location) {
      var _this$props = _this.props,
          basename = _this$props.basename,
          context = _this$props.context;

      context.action = 'PUSH';
      context.location = addBasename(basename, createLocation(location));
      context.url = createURL(context.location);
    }, _this.handleReplace = function (location) {
      var _this$props2 = _this.props,
          basename = _this$props2.basename,
          context = _this$props2.context;

      context.action = 'REPLACE';
      context.location = addBasename(basename, createLocation(location));
      context.url = createURL(context.location);
    }, _this.handleListen = function () {
      return noop;
    }, _this.handleBlock = function () {
      return noop;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  StaticRouter.prototype.getChildContext = function getChildContext() {
    return {
      router: {
        staticContext: this.props.context
      }
    };
  };

  StaticRouter.prototype.componentWillMount = function componentWillMount() {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!this.props.history, '<StaticRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { StaticRouter as Router }`.');
  };

  StaticRouter.prototype.render = function render() {
    var _props = this.props,
        basename = _props.basename,
        context = _props.context,
        location = _props.location,
        props = _objectWithoutProperties(_props, ['basename', 'context', 'location']);

    var history = {
      createHref: this.createHref,
      action: 'POP',
      location: stripBasename(basename, createLocation(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler('go'),
      goBack: staticHandler('goBack'),
      goForward: staticHandler('goForward'),
      listen: this.handleListen,
      block: this.handleBlock
    };

    return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Router__["a" /* default */], _extends({}, props, { history: history }));
  };

  return StaticRouter;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

StaticRouter.propTypes = {
  basename: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  context: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object])
};
StaticRouter.defaultProps = {
  basename: '',
  location: '/'
};
StaticRouter.childContextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = (StaticRouter);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Switch__ = __webpack_require__(61);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Switch__["a" /* default */]);

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__matchPath__ = __webpack_require__(19);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







/**
 * The public API for rendering the first <Route> that matches.
 */

var Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Switch.prototype.componentWillMount = function componentWillMount() {
    __WEBPACK_IMPORTED_MODULE_3_invariant___default()(this.context.router, 'You should not use <Switch> outside a <Router>');
  };

  Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    __WEBPACK_IMPORTED_MODULE_2_warning___default()(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    __WEBPACK_IMPORTED_MODULE_2_warning___default()(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
  };

  Switch.prototype.render = function render() {
    var route = this.context.router.route;
    var children = this.props.children;

    var location = this.props.location || route.location;

    var match = void 0,
        child = void 0;
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (element) {
      if (!__WEBPACK_IMPORTED_MODULE_0_react___default.a.isValidElement(element)) return;

      var _element$props = element.props,
          pathProp = _element$props.path,
          exact = _element$props.exact,
          strict = _element$props.strict,
          sensitive = _element$props.sensitive,
          from = _element$props.from;

      var path = pathProp || from;

      if (match == null) {
        child = element;
        match = path ? Object(__WEBPACK_IMPORTED_MODULE_4__matchPath__["a" /* default */])(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive }) : route.match;
      }
    });

    return match ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(child, { location: location, computedMatch: match }) : null;
  };

  return Switch;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Switch.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    route: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired
  }).isRequired
};
Switch.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node,
  location: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
};


/* harmony default export */ __webpack_exports__["a"] = (Switch);

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_matchPath__ = __webpack_require__(19);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_matchPath__["a" /* default */]);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_withRouter__ = __webpack_require__(64);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_withRouter__["a" /* default */]);

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Route__ = __webpack_require__(30);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






/**
 * A public higher-order component to access the imperative API
 */
var withRouter = function withRouter(Component) {
  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = _objectWithoutProperties(props, ['wrappedComponentRef']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Route__["a" /* default */], { render: function render(routeComponentProps) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Component, _extends({}, remainingProps, routeComponentProps, { ref: wrappedComponentRef }));
      } });
  };

  C.displayName = 'withRouter(' + (Component.displayName || Component.name) + ')';
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
  };

  return __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics___default()(C, Component);
};

/* harmony default export */ __webpack_exports__["a"] = (withRouter);

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(67);

var _actors_list = __webpack_require__(21);

var _actors_list2 = _interopRequireDefault(_actors_list);

var _inner_messager = __webpack_require__(7);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

var _director = __webpack_require__(22);

var _director2 = _interopRequireDefault(_director);

var _tags_of_movie = __webpack_require__(32);

var _tags_of_movie2 = _interopRequireDefault(_tags_of_movie);

var _flex_text = __webpack_require__(33);

var _flex_text2 = _interopRequireDefault(_flex_text);

var _filmmakers_details_area = __webpack_require__(34);

var _filmmakers_details_area2 = _interopRequireDefault(_filmmakers_details_area);

var _movies_player = __webpack_require__(35);

var _movies_player2 = _interopRequireDefault(_movies_player);

var _movies_displayer = __webpack_require__(23);

var _movies_displayer2 = _interopRequireDefault(_movies_displayer);

var _msg_dialog = __webpack_require__(14);

var _msg_dialog2 = _interopRequireDefault(_msg_dialog);

var _plain_panel_title = __webpack_require__(11);

var _plain_panel_title2 = _interopRequireDefault(_plain_panel_title);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*import '../../../public/js/ckplayer/ckplayer/ckplayer.js';*/
/*电影人详情展示页面*/
//引入react组件
var FilmmakerInfoPage = _react2.default.createClass({
    displayName: 'FilmmakerInfoPage',

    getInitialState: function getInitialState() {
        //init state
        // c(this.props.match.params.filmmakerId);
        return {
            whenFilmmakerInfoIsLoading: "正在加载电影人信息",
            filmmakerDescriptionTextLength: 150,
            filmmakerDescriptionTitle: "电影人描述 : ",
            filmmaker: {}, //初次渲染需要一个空对象,而不是一个undefined
            filmmakerUrl: this.props.match.url,
            filmmakerId: this.props.match.params.filmmakerId,
            aboutFilmmakersMovies: undefined,
            aboutFilmmakersMoviesPage: {
                size: 10,
                start: 0,
                orderBy: "score",
                orderType: "desc"
            }

        };
    },
    componentDidMount: function componentDidMount() {
        //add resize event listener
        window.addEventListener('resize', this.onWindowResize);

        //get filmmaker
        this.getFilmmakerBasicInfo();

        //get about filmmaker movies
        this.getAboutFilmmakerMovies([this.state.filmmakerId]);

        //adjust ui
        this.adjustUI();
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    },
    componentDidUpdate: function componentDidUpdate() {
        // c("componentDidUpdate");
    },
    componentWillReceiveProps: function componentWillReceiveProps(props) {
        var _this = this;

        //Link to!!!当点击某个Link标签时,路由会接受到一个新的props；但是如果跳转的是同一个页面,那么对不起，不会跳转，需要手动重置路由
        if (!isEmpty(this.props.match.url)) {
            this.props.history.push('/empty');
            setTimeout(function () {
                _this.props.history.replace(_this.props.match.url);
            }, 1);
        }
    },
    onWindowResize: function onWindowResize() {
        this.adjustUI();
    },
    adjustUI: function adjustUI() {},
    lazyLoadImg: function lazyLoadImg() {
        lazyLoad();
    },

    getFilmmakerBasicInfo: function getFilmmakerBasicInfo(callfun) {

        //get movie info
        var url = this.state.filmmakerUrl;

        ajax.get({
            url: url,
            onBeforeRequest: function () {
                //show tip
                this.showFilmmakerTip(this.state.whenFilmmakerInfoIsLoading);
            }.bind(this),
            onResponseStart: function () {
                //close tip
                this.showFilmmakerTip();
            }.bind(this),
            onResponseSuccess: function (result) {
                var state = this.state;

                //set movie info to state

                state.filmmaker = result.data.filmmaker;

                this.setState(state);

                //lazy load img
                this.lazyLoadImg();
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg);
            }.bind(this),
            onResponseEnd: function () {
                //callfun
                if (callfun != undefined) {
                    callfun();
                }
            }.bind(this)
        });
    },
    showFilmmakerTip: function showFilmmakerTip(msg, loop) {
        this.refs.innerMessager.showMsg(msg, loop);
    },


    loadingAboutFilmmakerMovies: function loadingAboutFilmmakerMovies() {
        this.refs.aboutFilmmakersMovies_MoviesDisplayer.loadingMoviesTip();
    },
    hideAboutFilmmakerMovies: function hideAboutFilmmakerMovies() {
        this.refs.aboutFilmmakersMovies_MoviesDisplayer.hideMovieTip();
    },
    noAboutFilmmakerMovies: function noAboutFilmmakerMovies() {
        this.refs.aboutFilmmakersMovies_MoviesDisplayer.noMoviesTip();
    },
    getAboutFilmmakerMovies: function getAboutFilmmakerMovies(movieFilmmakerIds) {

        if (isEmptyList(movieFilmmakerIds)) {
            this.noAboutFilmmakerMovies();
            return;
        }

        //set ids
        var ids = movieFilmmakerIds;
        //ajax
        var orderBy = this.state.aboutFilmmakersMoviesPage.orderBy;
        var orderType = this.state.aboutFilmmakersMoviesPage.orderType;
        var size = this.state.aboutFilmmakersMoviesPage.size;
        var start = this.state.aboutFilmmakersMoviesPage.start;

        var url = "/movie/about/filmmaker?orderBy=" + orderBy + "&orderType=" + orderType + "&size=" + size + "&start=" + start;
        url = contactUrlWithArray(url, "filmmakerIds", ids);

        ajax.get({
            url: url,
            onBeforeRequest: function () {

                //show tip
                this.loadingAboutFilmmakerMovies();
            }.bind(this),
            onResponseStart: function () {
                //close tip
                this.hideAboutFilmmakerMovies();
            }.bind(this),
            onResponseSuccess: function (result) {
                if (isEmptyList(result.data.movies)) {
                    this.noAboutFilmmakerMovies();
                    return;
                }
                var state = this.state;

                //set movie info to state

                state.aboutFilmmakersMovies = result.data.movies;

                this.setState(state);

                //lazy load img
                this.lazyLoadImg();
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg);
            }.bind(this),
            onResponseEnd: function () {}.bind(this)
        });
    },

    render: function render() {
        var birthday = timeFormatter.formatDate(this.state.filmmaker.birthday);
        c(this.state.filmmaker.imgUrl);
        return _react2.default.createElement(
            'div',
            { id: 'movie_info_content' },
            _react2.default.createElement(
                'div',
                { id: 'basic_info' },
                _react2.default.createElement(
                    'div',
                    { className: 'clearfix', id: 'movie_info_displayer' },
                    _react2.default.createElement(
                        'div',
                        { id: 'filmmaker_img' },
                        _react2.default.createElement('img', { src: FILMMAKER_LOADING_IMG, 'data-original': vm_config.http_url_prefix + this.state.filmmaker.imgUrl })
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'filmmaker_text' },
                        _react2.default.createElement(
                            'ul',
                            { id: 'text_ul' },
                            _react2.default.createElement(_inner_messager2.default, { defaultTip: this.state.whenFilmmakerInfoIsLoading,
                                ref: 'innerMessager' }),
                            _react2.default.createElement(
                                'li',
                                { id: 'name_li' },
                                '\u7535\u5F71\u4EBA : ',
                                _react2.default.createElement(
                                    'a',
                                    { title: this.state.filmmaker.name,
                                        href: 'javascript:void(0);' },
                                    this.state.filmmaker.name
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u522B\u540D : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    this.state.filmmaker.alias
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u8840\u578B : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    this.state.filmmaker.bloodType
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u804C\u4E1A : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    this.state.filmmaker.profession
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u661F\u5EA7 : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    this.state.filmmaker.constellation
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u6027\u522B : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    this.state.filmmaker.sex
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u751F\u65E5 : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    birthday
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u56FD\u5BB6 : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    this.state.filmmaker.country
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { id: 'description_li' },
                                _react2.default.createElement(_flex_text2.default, { title: this.state.filmmakerDescriptionTitle,
                                    text: this.state.filmmaker.description,
                                    maxTextLength: this.state.filmmakerDescriptionTextLength })
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { id: 'about_filmmakers_movies' },
                _react2.default.createElement(_plain_panel_title2.default, { title: '\u7535\u5F71\u4EBA\u76F8\u5173' }),
                _react2.default.createElement(_movies_displayer2.default, { movies: this.state.aboutFilmmakersMovies,
                    ref: 'aboutFilmmakersMovies_MoviesDisplayer' })
            )
        );
    }
});

exports.default = FilmmakerInfoPage;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./filmmaker_info_page.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./filmmaker_info_page.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#movie_info_content {\n  margin: 0px 15%;\n  width: 70%;\n  background-color: rgb(241,242,243); }\n  #movie_info_content #basic_info {\n    width: 100%;\n    border-radius: 3px;\n    background-color: white;\n    padding: 20px 20px;\n    box-sizing: border-box;\n    margin-top: 20px;\n    width: 100%; }\n    #movie_info_content #basic_info > #movie_info_displayer {\n      flex: 1;\n      display: flex;\n      width: 100%;\n      padding: 10px;\n      box-sizing: border-box; }\n      #movie_info_content #basic_info > #movie_info_displayer > div {\n        float: left; }\n      #movie_info_content #basic_info > #movie_info_displayer #filmmaker_img {\n        width: 150px; }\n        #movie_info_content #basic_info > #movie_info_displayer #filmmaker_img > img {\n          width: 150px;\n          height: 150px; }\n      #movie_info_content #basic_info > #movie_info_displayer #filmmaker_text {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding-left: 20px;\n        box-sizing: border-box;\n        height: 100%; }\n        #movie_info_content #basic_info > #movie_info_displayer #filmmaker_text ul {\n          list-style: none;\n          display: inline; }\n          #movie_info_content #basic_info > #movie_info_displayer #filmmaker_text ul li {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            height: auto;\n            width: auto; }\n        #movie_info_content #basic_info > #movie_info_displayer #filmmaker_text #text_ul > li {\n          padding: 0px 5px;\n          box-sizing: border-box;\n          margin-bottom: 10px;\n          width: 25%; }\n        #movie_info_content #basic_info > #movie_info_displayer #filmmaker_text #text_ul #name_li {\n          width: 100%; }\n          #movie_info_content #basic_info > #movie_info_displayer #filmmaker_text #text_ul #name_li, #movie_info_content #basic_info > #movie_info_displayer #filmmaker_text #text_ul #name_li > a {\n            color: rgb(61,158,255);\n            font-size: 24px; }\n        #movie_info_content #basic_info > #movie_info_displayer #filmmaker_text #text_ul #description_li {\n          width: 100%; }\n  #movie_info_content #about_filmmakers_movies {\n    width: 100%;\n    width: 100%;\n    border-radius: 3px;\n    background-color: white;\n    padding: 20px 20px;\n    box-sizing: border-box;\n    margin-top: 20px; }\n", ""]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./actors_list.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./actors_list.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n", ""]);

// exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./inner_messager.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./inner_messager.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#tip {\n  width: 100%;\n  text-align: center;\n  height: 15px; }\n", ""]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./director.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./director.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#director_name {\n  width: 100%;\n  display: block;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n  #director_name span {\n    cursor: default;\n    color: rgb(153,153,153); }\n", ""]);

// exports


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./tags_of_movie.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./tags_of_movie.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#tags_of_movie {\n  width: 100%; }\n  #tags_of_movie div#ul_div {\n    width: 100%; }\n    #tags_of_movie div#ul_div > ul li {\n      text-align: center;\n      margin: 0px 5px;\n      padding: 2px 5px;\n      cursor: pointer;\n      display: inline; }\n      #tags_of_movie div#ul_div > ul li {\n        background-color: white;\n        border-radius: 99px;\n        border: 1px solid rgb(61,158,255); }\n        #tags_of_movie div#ul_div > ul li > a {\n          color: rgb(61,158,255); }\n      #tags_of_movie div#ul_div > ul li:hover {\n        background-color: rgb(61,158,255);\n        border-radius: 99px; }\n        #tags_of_movie div#ul_div > ul li:hover > a {\n          background-color: rgb(61,158,255);\n          color: white; }\n", ""]);

// exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(78);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./flex_text.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./flex_text.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#flex_text_content {\n  width: 100%;\n  word-wrap: break-word;\n  word-break: break-all;\n  white-space: normal;\n  overflow: auto; }\n", ""]);

// exports


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./filmmakers_details_area.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./filmmakers_details_area.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#actors_details_area {\n  width: 100%; }\n  #actors_details_area ul {\n    list-style: none;\n    display: inline; }\n    #actors_details_area ul li {\n      display: inline-block;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      height: auto;\n      width: auto; }\n  #actors_details_area > ul > li {\n    width: 25%; }\n    #actors_details_area > ul > li > a {\n      display: block; }\n      #actors_details_area > ul > li > a > img {\n        width: 80%;\n        margin-left: 10%; }\n      #actors_details_area > ul > li > a > div {\n        padding: 2px 0px;\n        box-sizing: border-box;\n        width: 80%;\n        margin-left: 10%;\n        color: rgb(153,153,153);\n        text-align: left;\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis; }\n", ""]);

// exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(82);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./plain_panel_title.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./plain_panel_title.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#plain_panel_title_content {\n  width: 100%; }\n  #plain_panel_title_content #title_div {\n    width: 100%;\n    font-size: 16px;\n    line-height: 16px;\n    color: rgb(153,153,153); }\n  #plain_panel_title_content #split_line {\n    height: 1px;\n    border: none;\n    background-color: rgb(241,242,243);\n    width: 100%;\n    margin: 10px 0px; }\n", ""]);

// exports


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(84);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./movie_player.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./movie_player.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#m {\n  width: 100%; }\n  #m #m_player {\n    width: 100%; }\n", ""]);

// exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(86);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./movies_displayer.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./movies_displayer.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#movies_list_ul {\n  width: 100%;\n  display: inline;\n  list-style-type: none;\n  width: 100%; }\n  #movies_list_ul li.movie_item {\n    margin: 0px;\n    padding: 10px;\n    box-sizing: border-box;\n    width: 20%;\n    border: none;\n    outline: none;\n    display: inline-block;\n    float: left; }\n    #movies_list_ul li.movie_item .movie_img_div a {\n      display: block;\n      width: 100%; }\n      #movies_list_ul li.movie_item .movie_img_div a img {\n        width: 100%; }\n    #movies_list_ul li.movie_item .movie_info_div {\n      width: 100%;\n      height: auto; }\n      #movies_list_ul li.movie_item .movie_info_div div {\n        width: 100%;\n        display: block;\n        margin: 2px 0px; }\n      #movies_list_ul li.movie_item .movie_info_div div.movie_actor_list_div {\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        display: block; }\n", ""]);

// exports


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(88);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./msg_dialog.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./msg_dialog.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#fragment_msg_dialog_content {\n  /*默认隐藏*/\n  display: none;\n  width: 100%;\n  height: 100%;\n  line-height: 100%;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  z-index: 9999;\n  background-color: rgba(0, 0, 0, 0.8);\n  text-align: center; }\n  #fragment_msg_dialog_content #dialog {\n    width: auto;\n    display: inline-block !important;\n    display: inline;\n    padding: 20px;\n    box-sizing: border-box;\n    background-color: #383d49;\n    border-radius: 2px; }\n    #fragment_msg_dialog_content #dialog * {\n      color: white; }\n    #fragment_msg_dialog_content #dialog #body {\n      text-align: center;\n      line-height: 100%;\n      height: 100%; }\n      #fragment_msg_dialog_content #dialog #body #close_btn:hover {\n        color: rgb(153,153,153); }\n      #fragment_msg_dialog_content #dialog #body #split {\n        margin: 0px 10px; }\n", ""]);

// exports


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(90);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n/*head,center,tail =>width*/\nbody > div {\n  width: 100%; }\n", ""]);

// exports


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _msg_dialog = __webpack_require__(14);

var _msg_dialog2 = _interopRequireDefault(_msg_dialog);

var _inner_messager = __webpack_require__(7);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

var _movies_displayer = __webpack_require__(23);

var _movies_displayer2 = _interopRequireDefault(_movies_displayer);

var _pager = __webpack_require__(92);

var _pager2 = _interopRequireDefault(_pager);

__webpack_require__(95);

__webpack_require__(97);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*一组电影tag*/
var MovieTagGroup = _react2.default.createClass({
    displayName: "MovieTagGroup",

    render: function render() {
        var _this = this;

        var tagGroupStyleClass = "";
        if (this.props.selected != undefined && this.props.selected) {
            tagGroupStyleClass = "currt";
        }
        return _react2.default.createElement(
            "div",
            { id: this.props.movieTagGroupId, className: "type_item" },
            _react2.default.createElement(
                "label",
                null,
                this.props.movieTagGroupName,
                ":"
            ),
            _react2.default.createElement(
                "ul",
                null,
                _react2.default.createElement(
                    "li",
                    { className: tagGroupStyleClass, onClick: function onClick() {
                            _this.props.handleClickTag(undefined, _this.props.movieTagGroupId);
                        } },
                    _react2.default.createElement(
                        "a",
                        { href: "javascript:void(0);" },
                        "\u5168\u90E8"
                    )
                ),
                this.props.movieTags.map(function (item) {
                    var _this2 = this;

                    var tagStyleClass = "";
                    if (item.selected != undefined && item.selected) {
                        tagStyleClass = "currt";
                    }
                    return _react2.default.createElement(
                        "li",
                        { key: item.id, id: item.id, className: tagStyleClass, onClick: function onClick() {
                                _this2.props.handleClickTag(item.id, _this2.props.movieTagGroupId);
                            } },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0);" },
                            item.name
                        )
                    );
                }.bind(this))
            )
        );
    }
});
/*电影标签列表*/
//引入react组件
var MovieTagGroupList = _react2.default.createClass({
    displayName: "MovieTagGroupList",

    getInitialState: function getInitialState() {
        return {
            loadingTagTip: "正在加载标签列表",
            noTagTip: "无相关标签"
        };
    },
    noTagsTip: function noTagsTip() {
        this.showMsg(this.state.noTagTip, false);
    },
    loadingTagsTip: function loadingTagsTip() {
        this.showMsg(this.state.loadingTagTip, true);
    },
    hideTagTip: function hideTagTip() {
        this.refs.innerMessager.hide();
    },
    showMsg: function showMsg(msg, loop) {
        this.refs.innerMessager.showMsg(msg, loop);
    },
    showDefaultMsg: function showDefaultMsg(loop) {
        this.refs.innerMessager.showDefaultMsg(loop);
    },

    render: function render() {
        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_inner_messager2.default, { defaultTip: this.state.loadingTagTip,
                ref: "innerMessager" }),
            this.props.movieTagGroup.map(function (item) {
                return _react2.default.createElement(MovieTagGroup, { key: item.id,
                    handleClickTag: this.props.handleClickTag,
                    movieTagGroupId: item.id,
                    movieTagGroupName: item.name,
                    selected: item.selected,
                    movieTags: item.items });
            }.bind(this))
        );
    }
});

var MovieListPage = _react2.default.createClass({
    displayName: "MovieListPage",

    getInitialState: function getInitialState() {

        var orderByOptions = [{
            id: "score", name: "最高评分", selected: true
        }, {
            id: "watch_num",
            name: "最多播放",
            selected: false
        }, {
            id: "release_time", name: "最新上映", selected: false
        }];

        var state = {
            tagGroupSource: "/tagGroup/list",
            movieSource: "/movie/list",
            movieSearchBtnText: "搜索",
            whenThereIsHaveNotMovies: "无相关电影",
            whenThereIsHaveNotTags: "无相关标签",
            whenSearchRepeat: "重复搜索",
            lastKeyword: "",
            movieSearchTimer: undefined,
            movieTagGroup: [],
            movies: {
                keyword: "",
                total: 0,
                list: undefined,
                page: 1,
                size: 20,
                orderType: "desc"
            },
            orderByOptions: orderByOptions
        };

        return state;
    },
    componentDidMount: function componentDidMount() {
        this.getTagGroup(this.getMovie);
        window.addEventListener('resize', this.onWindowResize);
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    },
    onWindowResize: function onWindowResize() {
        this.adjustMovieListUI();
    },
    adjustMovieListUI: function adjustMovieListUI() {
        {/*设置电影列表样式*/
        }
        var width = $($(".movie_img_div a img")[0]).css("width");

        var height = parseInt(width) * 1.5;
        height = height.toString() + "px";
        $(".movie_img_div a img").css("height", height);
    },
    lazyLoadImg: function lazyLoadImg() {
        lazyLoad();
    },
    loadingMoviesTip: function loadingMoviesTip() {
        this.refs.moviesDisplayer.loadingMoviesTip();
    },
    noMoviesTip: function noMoviesTip() {
        this.refs.moviesDisplayer.noMoviesTip();
    },
    hideMovieTip: function hideMovieTip() {

        this.refs.moviesDisplayer.hideMovieTip();
    },
    getMovie: function getMovie(callfun) {

        {/*get movies list*/
        }

        {
            /*collect params*/
        }
        var movies = this.state.movies;
        var page = movies.page;
        var size = movies.size;
        var orderType = movies.orderType;
        var start = (page - 1) * size;
        var keyword = movies.keyword;

        {/*collect param => orderBy*/
        }
        var orderBy;
        for (var i = 0; i < this.state.orderByOptions.length; i++) {
            if (this.state.orderByOptions[i].selected) {
                orderBy = this.state.orderByOptions[i].id;
                break;
            }
        }

        {/*collect param => selected tags id*/
        }
        var tagIds = [];
        for (var i = 0; i < this.state.movieTagGroup.length; i++) {
            var g = this.state.movieTagGroup[i];
            if (!g.selected) {
                for (var j = 0; j < g.items.length; j++) {
                    var tag = g.items[j];
                    if (tag.selected) {
                        tagIds.push(tag.id);
                    }
                }
            }
        }

        var url = this.state.movieSource + "?page=" + page + "&start=" + start + "&size=" + size + "&orderBy=" + orderBy + "&orderType=" + orderType + "&keyword=" + keyword;
        url = contactUrlWithArray(url, "tagIds", tagIds);
        ajax.get({
            url: url,
            onBeforeRequest: function () {
                //set tip
                this.loadingMoviesTip();
            }.bind(this),
            onResponseStart: function () {
                //hide tip
                this.hideMovieTip();
            }.bind(this),
            onResponseSuccess: function (result) {

                //set movie list info
                var state = this.state;
                state.movies.list = result.data.list;
                state.movies.total = result.data.total;
                this.setState(state);

                //adjust movie list ui
                this.adjustMovieListUI();

                //lazy load img
                this.lazyLoadImg();

                // if have not movies
                if (isEmptyList(state.movies.list)) {
                    this.noMoviesTip();
                }
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg);
            }.bind(this),
            onResponseEnd: function () {
                //callfun
                if (callfun != undefined) {
                    callfun();
                }
            }.bind(this)
        });
    },


    loadingTagsTip: function loadingTagsTip() {
        this.refs.movieTagGroupList.loadingTagsTip();
    },
    noTagsTip: function noTagsTip() {
        this.refs.movieTagGroupList.noTagsTip();
    },
    hideTagTip: function hideTagTip() {
        this.refs.movieTagGroupList.hideTagTip();
    },

    getTagGroup: function getTagGroup(callfun) {

        {/*获取电影标签分组*/
        }
        ajax.get({
            url: this.state.tagGroupSource,
            onBeforeRequest: function () {
                //set tip
                this.loadingTagsTip();
            }.bind(this),
            onResponseStart: function () {
                //hide tip
                this.hideTagTip();
            }.bind(this),
            onResponseSuccess: function (result) {

                var state = this.state;
                state.movieTagGroup = result.data.list;

                //set tip
                if (isEmptyList(state.movieTagGroup)) {
                    // this.showTagTip(this.state.whenThereIsHaveNotTags,false);
                    this.noTagsTip();
                }

                //default select tag group id

                for (var i = 0; i < state.movieTagGroup.length; i++) {
                    var g = state.movieTagGroup[i];
                    g.selected = true;
                }

                this.setState(state);
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg, function () {
                    //callfun
                    if (callfun != undefined) {
                        callfun();
                    }
                });
            }.bind(this),
            onResponseEnd: function () {
                //callfun
                if (callfun != undefined) {
                    callfun();
                }
            }.bind(this),
            onRequestError: function () {}.bind(this)

        });
    },
    handlePageChange: function handlePageChange(movePage) {
        var newPage = this.state.movies.page + movePage;
        //            c(this.state.movies.total-(this.state.movies.size*(newPage-1))<=0);
        if (newPage <= 0 || this.state.movies.total - this.state.movies.size * (newPage - 1) <= 0) {
            return;
        }
        //更新page
        var state = this.state;
        state.movies.page = newPage;
        this.setState(state);
        this.getMovie();
    },

    handleClickTag: function handleClickTag(selectedTagId, selectedTagGroupId) {
        {} /*点击标签事件*/

        //            c("handleClickTag");
        //            c(selectedTagId);
        //            c(selectedTagGroupId);
        var groups = this.state.movieTagGroup;
        if (selectedTagId == undefined) {
            {/*单纯选择某个标签组*/
            }
            for (var i = 0; i < groups.length; i++) {
                var g = groups[i];
                if (g.id == selectedTagGroupId) {
                    g.selected = true;
                    for (var j = 0; j < g.items.length; j++) {
                        var tag = g.items[j];
                        tag.selected = false;
                    }
                }
            }
        } else {
            {/*选择某个标签组下的某个标签*/
            }
            for (var i = 0; i < groups.length; i++) {
                var g = groups[i];
                if (g.id == selectedTagGroupId) {
                    g.selected = false;
                    {/*找到指定标签组*/
                    }
                    for (var j = 0; j < g.items.length; j++) {
                        var tag = g.items[j];
                        if (selectedTagId == tag.id) {
                            tag.selected = true;
                        } else {
                            tag.selected = false;
                        }
                    }
                    break;
                }
            }
        }

        //get react state
        var state = this.state;
        //set movie list page
        state.movies.page = 1;
        //set tag group
        state.movieTagGroup = groups;

        //set react state
        this.setState(state);

        //refresh movies list
        this.getMovie();
    },
    sortMovie: function sortMovie(orderById) {
        {/*collect param => orderBy*/
        }
        var orderByOptions = this.state.orderByOptions;
        var orderBy;
        for (var i = 0; i < orderByOptions.length; i++) {
            if (orderByOptions[i].id == orderById) {
                orderByOptions[i].selected = true;
            } else {
                orderByOptions[i].selected = false;
            }
        }

        //更新page
        var state = this.state;
        state.orderByOptions = orderByOptions;
        this.setState(state);
        this.getMovie();
    },

    clearMovieSearchTimer: function clearMovieSearchTimer() {
        if (this.state.movieSearchTimer) {
            clearTimeout(this.state.movieSearchTimer);
        }
    },
    handleSearchInputChange: function handleSearchInputChange() {

        //clear search timer
        this.clearMovieSearchTimer();
        //稍后执行
        this.state.movieSearchTimer = setTimeout(function () {
            this.searchMovie();
        }.bind(this), 1000);
    },
    handleSearchInputKeyUp: function handleSearchInputKeyUp(e) {
        if (e.keyCode == 13) {
            //clear search timer
            this.clearMovieSearchTimer();

            //search movie
            this.searchMovie();
        }
    },
    handleClickSearchBtn: function handleClickSearchBtn() {

        //clear search timer
        this.clearMovieSearchTimer();

        //search movie
        this.searchMovie();
    },
    searchMovie: function searchMovie() {
        //get keyword
        var keyword = this.refs.keyword.value;

        //if keyword same ,do not search
        if (this.state.lastKeyword == keyword) {
            window.VmFrontendEventsDispatcher.showMsgDialog(this.state.whenSearchRepeat);
            return;
        }
        var oldMovieSearchBtnText = this.state.movieSearchBtnText;

        var state = this.state;
        //set the movieSearchBtnText in state
        state.movieSearchBtnText = "搜索中...";

        //set the keyword in state
        state.movies.keyword = keyword;
        //search page 1
        state.movies.page = 1;
        //update state
        this.setState(state);
        this.getMovie(function () {
            // movieSearchBtn.val(movieSearchBtnOdlText);

            //save this keyword
            this.state.lastKeyword = keyword;
            setTimeout(function () {
                var state = this.state;
                //update movieSearchBtnText in state
                state.movieSearchBtnText = oldMovieSearchBtnText;
                this.setState(state);
            }.bind(this, oldMovieSearchBtnText), 100);
        }.bind(this, keyword, oldMovieSearchBtnText));
    },
    render: function render() {
        var _this3 = this;

        return _react2.default.createElement(
            "div",
            { id: "fragment_index_center_content" },
            _react2.default.createElement(
                "div",
                { id: "movie_type_div" },
                _react2.default.createElement(MovieTagGroupList, { handleClickTag: this.handleClickTag,
                    movieTagGroup: this.state.movieTagGroup,
                    ref: "movieTagGroupList" })
            ),
            _react2.default.createElement(
                "div",
                { id: "movie_list_div" },
                _react2.default.createElement(
                    "div",
                    { id: "head" },
                    _react2.default.createElement(
                        "div",
                        { id: "sort_div" },
                        _react2.default.createElement(
                            "ul",
                            { id: "sort_ways" },
                            _react2.default.createElement(
                                "label",
                                null,
                                "\u6392\u5E8F\uFF1A"
                            ),
                            this.state.orderByOptions.map(function (item, index) {
                                var clsName = "";
                                if (item.selected) {
                                    clsName = "currt";
                                }

                                return _react2.default.createElement(
                                    "li",
                                    { key: item.id, onClick: function onClick() {
                                            _this3.sortMovie(item.id);
                                        }, className: clsName },
                                    _react2.default.createElement(
                                        "a",
                                        { href: "javascript:void(0);" },
                                        item.name
                                    )
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { id: "search_div" },
                        _react2.default.createElement("input", { id: "fragment_head_nav_search_text", onChange: function onChange() {
                                _this3.handleSearchInputChange();
                            }, onKeyUp: this.handleSearchInputKeyUp, ref: "keyword", placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57" }),
                        _react2.default.createElement("input", { id: "fragment_head_nav_search_btn", onClick: function onClick() {
                                _this3.handleClickSearchBtn();
                            }, ref: "movieSearchBtn", type: "button", value: this.state.movieSearchBtnText })
                    ),
                    _react2.default.createElement(
                        "div",
                        { id: "total_div" },
                        "\u5171",
                        _react2.default.createElement(
                            "span",
                            { id: "totalNum" },
                            this.state.movies.total
                        ),
                        "\u4E2A\u7ED3\u679C"
                    ),
                    _react2.default.createElement("div", { className: "clear" })
                ),
                _react2.default.createElement("div", { id: "line" }),
                _react2.default.createElement(
                    "div",
                    { id: "movies_display_div" },
                    _react2.default.createElement(_movies_displayer2.default, { movies: this.state.movies.list,
                        ref: "moviesDisplayer" }),
                    _react2.default.createElement(_pager2.default, { handlePageChange: this.handlePageChange,
                        page: this.state.movies.page })
                )
            )
        );
    }

});
exports.default = MovieListPage; //将App组件导出

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(93);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pager = _react2.default.createClass({
    displayName: "Pager",


    render: function render() {
        var _this = this;

        return _react2.default.createElement(
            "div",
            { id: "movie_list_pager_div" },
            _react2.default.createElement(
                "ul",
                { id: "movie_list_pager_ul" },
                _react2.default.createElement(
                    "li",
                    { className: "pager_li" },
                    _react2.default.createElement(
                        "a",
                        { href: "javascript:void(0);", onClick: function onClick() {
                                _this.props.handlePageChange(-1);
                            } },
                        "\u4E0A\u4E00\u9875"
                    )
                ),
                _react2.default.createElement(
                    "li",
                    { className: "pager_li currt" },
                    _react2.default.createElement(
                        "a",
                        { href: "javascript:void(0);" },
                        this.props.page
                    )
                ),
                _react2.default.createElement(
                    "li",
                    { className: "pager_li" },
                    _react2.default.createElement(
                        "a",
                        { href: "javascript:void(0);", onClick: function onClick() {
                                _this.props.handlePageChange(1);
                            } },
                        "\u4E0B\u4E00\u9875"
                    )
                )
            )
        );
    }
}); //引入react组件
exports.default = Pager; //将App组件导出

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(94);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./pager.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./pager.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#movie_list_pager_div {\n  margin: 80px 0px;\n  width: 100%;\n  text-align: center; }\n  #movie_list_pager_div ul {\n    list-style: none;\n    display: inline; }\n    #movie_list_pager_div ul li {\n      display: inline-block;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      height: auto;\n      width: auto; }\n  #movie_list_pager_div ul li {\n    overflow: hidden;\n    margin: 0px 5px; }\n  #movie_list_pager_div ul li.pager_li {\n    border: 1px solid rgb(241,242,243);\n    height: auto;\n    cursor: pointer;\n    text-align: left;\n    transition: all 500ms; }\n    #movie_list_pager_div ul li.pager_li a {\n      padding: 8px 15px;\n      box-sizing: border-box;\n      display: block;\n      width: 100%;\n      height: 100%; }\n    #movie_list_pager_div ul li.pager_li:hover {\n      background-color: rgb(61,158,255); }\n      #movie_list_pager_div ul li.pager_li:hover a {\n        color: white; }\n  #movie_list_pager_div ul li.currt {\n    background-color: rgb(61,158,255); }\n    #movie_list_pager_div ul li.currt a {\n      color: white; }\n", ""]);

// exports


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(96);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./movie_list_page.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./movie_list_page.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n.clickSearchBtn {\n  background-color: \"rgb(61,158,255)\";\n  color: white; }\n\n#fragment_index_center_content {\n  margin: 0px 15%;\n  width: 70%;\n  background-color: rgb(241,242,243); }\n  #fragment_index_center_content > * {\n    padding: 20px 20px;\n    box-sizing: border-box; }\n  #fragment_index_center_content #movie_type_div {\n    margin-top: 20px;\n    width: 100%;\n    border-radius: 3px;\n    background-color: white;\n    padding: 20px 20px;\n    box-sizing: border-box;\n    /*#tagTip{\n      width:100%;\n      text-align: center;\n      height: 15px;\n    }*/ }\n    #fragment_index_center_content #movie_type_div .type_item {\n      margin: 12px 0px; }\n      #fragment_index_center_content #movie_type_div .type_item > * {\n        display: inline; }\n      #fragment_index_center_content #movie_type_div .type_item label {\n        width: 80px;\n        text-align: right;\n        display: inline-block;\n        margin-right: 10px; }\n      #fragment_index_center_content #movie_type_div .type_item ul {\n        width: 80%;\n        display: inline;\n        text-align: left;\n        list-style-type: none; }\n        #fragment_index_center_content #movie_type_div .type_item ul .currt {\n          background-color: rgb(61,158,255);\n          border-radius: 99px; }\n          #fragment_index_center_content #movie_type_div .type_item ul .currt > a {\n            color: white; }\n        #fragment_index_center_content #movie_type_div .type_item ul li {\n          text-align: center;\n          margin: 0px 5px;\n          padding: 2px 5px;\n          box-sizing: border-box;\n          cursor: pointer;\n          display: inline; }\n          #fragment_index_center_content #movie_type_div .type_item ul li {\n            background-color: white;\n            border-radius: 99px;\n            border: 1px solid rgb(61,158,255); }\n            #fragment_index_center_content #movie_type_div .type_item ul li > a {\n              color: rgb(61,158,255); }\n          #fragment_index_center_content #movie_type_div .type_item ul li:hover {\n            background-color: rgb(61,158,255);\n            border-radius: 99px; }\n            #fragment_index_center_content #movie_type_div .type_item ul li:hover > a {\n              background-color: rgb(61,158,255);\n              color: white; }\n  #fragment_index_center_content #movie_list_div {\n    margin-top: 20px;\n    width: 100%;\n    border-radius: 3px;\n    background-color: white;\n    padding: 20px 20px;\n    box-sizing: border-box;\n    /*分割线*/ }\n    #fragment_index_center_content #movie_list_div #head {\n      width: 100%;\n      height: 30px; }\n      #fragment_index_center_content #movie_list_div #head > div {\n        display: block;\n        float: left;\n        height: 30px;\n        line-height: 30px; }\n      #fragment_index_center_content #movie_list_div #head #sort_div {\n        width: 50%;\n        text-align: left; }\n        #fragment_index_center_content #movie_list_div #head #sort_div #sort_ways {\n          display: inline;\n          list-style-type: none; }\n          #fragment_index_center_content #movie_list_div #head #sort_div #sort_ways li {\n            margin: 0px 5px;\n            padding: 2px 5px;\n            box-sizing: border-box;\n            display: inline;\n            cursor: pointer;\n            transition: all 500ms; }\n            #fragment_index_center_content #movie_list_div #head #sort_div #sort_ways li:hover {\n              background-color: rgb(61,158,255);\n              border-radius: 99px; }\n              #fragment_index_center_content #movie_list_div #head #sort_div #sort_ways li:hover > a {\n                color: white; }\n          #fragment_index_center_content #movie_list_div #head #sort_div #sort_ways .currt {\n            background-color: rgb(61,158,255);\n            border-radius: 99px; }\n            #fragment_index_center_content #movie_list_div #head #sort_div #sort_ways .currt > a {\n              color: white; }\n      #fragment_index_center_content #movie_list_div #head #search_div {\n        width: 40%;\n        text-align: right;\n        /*btn*/ }\n        #fragment_index_center_content #movie_list_div #head #search_div #fragment_head_nav_search_text {\n          width: 50%;\n          height: 100%;\n          line-height: 100%;\n          background-color: white;\n          border-radius: 0px;\n          /*省略所有浏览器前缀*/\n          box-sizing: border-box;\n          background-image: url(\"/image/icon_zoom.png\");\n          background-size: 20px 20px;\n          background-repeat: no-repeat;\n          background-position: 5px;\n          padding-left: 30px;\n          box-sizing: border-box;\n          margin-right: 0px;\n          border: 1px solid rgb(61,158,255);\n          border-right: 0px; }\n        #fragment_index_center_content #movie_list_div #head #search_div #fragment_head_nav_search_btn {\n          width: 20%;\n          height: 100%;\n          line-height: 100%;\n          background-color: white;\n          border-radius: 0px;\n          /*省略所有浏览器前缀*/\n          box-sizing: border-box;\n          cursor: pointer;\n          border: 1px solid rgb(61,158,255);\n          transition: all 500ms; }\n          #fragment_index_center_content #movie_list_div #head #search_div #fragment_head_nav_search_btn:hover {\n            background-color: rgb(61,158,255);\n            color: white; }\n      #fragment_index_center_content #movie_list_div #head #total_div {\n        width: 10%;\n        text-align: right; }\n    #fragment_index_center_content #movie_list_div #line {\n      height: 1px;\n      background-color: rgb(241,242,243);\n      margin: 20px 0px; }\n    #fragment_index_center_content #movie_list_div #movies_display_div {\n      width: 100%; }\n", ""]);

// exports


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(98);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../css-loader/index.js!../sass-loader/lib/loader.js!./animate.css", function() {
			var newContent = require("!!../css-loader/index.js!../sass-loader/lib/loader.js!./animate.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/*!\n * animate.css -http://daneden.me/animate\n * Version - 3.5.1\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\n *\n * Copyright (c) 2016 Daniel Eden\n */\n.animated {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both; }\n\n.animated.infinite {\n  -webkit-animation-iteration-count: infinite;\n  animation-iteration-count: infinite; }\n\n.animated.hinge {\n  -webkit-animation-duration: 2s;\n  animation-duration: 2s; }\n\n.animated.flipOutX,\n.animated.flipOutY,\n.animated.bounceIn,\n.animated.bounceOut {\n  -webkit-animation-duration: .75s;\n  animation-duration: .75s; }\n\n@-webkit-keyframes bounce {\n  from, 20%, 53%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  40%, 43% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -30px, 0); }\n  70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -4px, 0);\n    transform: translate3d(0, -4px, 0); } }\n\n@keyframes bounce {\n  from, 20%, 53%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  40%, 43% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -30px, 0); }\n  70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -4px, 0);\n    transform: translate3d(0, -4px, 0); } }\n\n.bounce {\n  -webkit-animation-name: bounce;\n  animation-name: bounce;\n  -webkit-transform-origin: center bottom;\n  transform-origin: center bottom; }\n\n@-webkit-keyframes flash {\n  from, 50%, to {\n    opacity: 1; }\n  25%, 75% {\n    opacity: 0; } }\n\n@keyframes flash {\n  from, 50%, to {\n    opacity: 1; }\n  25%, 75% {\n    opacity: 0; } }\n\n.flash {\n  -webkit-animation-name: flash;\n  animation-name: flash; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.pulse {\n  -webkit-animation-name: pulse;\n  animation-name: pulse; }\n\n@-webkit-keyframes rubberBand {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1); }\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1); }\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1); }\n  65% {\n    -webkit-transform: scale3d(0.95, 1.05, 1);\n    transform: scale3d(0.95, 1.05, 1); }\n  75% {\n    -webkit-transform: scale3d(1.05, 0.95, 1);\n    transform: scale3d(1.05, 0.95, 1); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes rubberBand {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1); }\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1); }\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1); }\n  65% {\n    -webkit-transform: scale3d(0.95, 1.05, 1);\n    transform: scale3d(0.95, 1.05, 1); }\n  75% {\n    -webkit-transform: scale3d(1.05, 0.95, 1);\n    transform: scale3d(1.05, 0.95, 1); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.rubberBand {\n  -webkit-animation-name: rubberBand;\n  animation-name: rubberBand; }\n\n@-webkit-keyframes shake {\n  from, to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); } }\n\n@keyframes shake {\n  from, to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); } }\n\n.shake {\n  -webkit-animation-name: shake;\n  animation-name: shake; }\n\n@-webkit-keyframes headShake {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); }\n  6.5% {\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\n    transform: translateX(-6px) rotateY(-9deg); }\n  18.5% {\n    -webkit-transform: translateX(5px) rotateY(7deg);\n    transform: translateX(5px) rotateY(7deg); }\n  31.5% {\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\n    transform: translateX(-3px) rotateY(-5deg); }\n  43.5% {\n    -webkit-transform: translateX(2px) rotateY(3deg);\n    transform: translateX(2px) rotateY(3deg); }\n  50% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n@keyframes headShake {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); }\n  6.5% {\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\n    transform: translateX(-6px) rotateY(-9deg); }\n  18.5% {\n    -webkit-transform: translateX(5px) rotateY(7deg);\n    transform: translateX(5px) rotateY(7deg); }\n  31.5% {\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\n    transform: translateX(-3px) rotateY(-5deg); }\n  43.5% {\n    -webkit-transform: translateX(2px) rotateY(3deg);\n    transform: translateX(2px) rotateY(3deg); }\n  50% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n.headShake {\n  -webkit-animation-timing-function: ease-in-out;\n  animation-timing-function: ease-in-out;\n  -webkit-animation-name: headShake;\n  animation-name: headShake; }\n\n@-webkit-keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg); }\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg); }\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg); }\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg); }\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg); } }\n\n@keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg); }\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg); }\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg); }\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg); }\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg); } }\n\n.swing {\n  -webkit-transform-origin: top center;\n  transform-origin: top center;\n  -webkit-animation-name: swing;\n  animation-name: swing; }\n\n@-webkit-keyframes tada {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  10%, 20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); }\n  40%, 60%, 80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes tada {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  10%, 20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); }\n  40%, 60%, 80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.tada {\n  -webkit-animation-name: tada;\n  animation-name: tada; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes wobble {\n  from {\n    -webkit-transform: none;\n    transform: none; }\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); }\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); }\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); }\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); }\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes wobble {\n  from {\n    -webkit-transform: none;\n    transform: none; }\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); }\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); }\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); }\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); }\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.wobble {\n  -webkit-animation-name: wobble;\n  animation-name: wobble; }\n\n@-webkit-keyframes jello {\n  from, 11.1%, to {\n    -webkit-transform: none;\n    transform: none; }\n  22.2% {\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\n    transform: skewX(-12.5deg) skewY(-12.5deg); }\n  33.3% {\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\n    transform: skewX(6.25deg) skewY(6.25deg); }\n  44.4% {\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\n    transform: skewX(-3.125deg) skewY(-3.125deg); }\n  55.5% {\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\n    transform: skewX(1.5625deg) skewY(1.5625deg); }\n  66.6% {\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\n    transform: skewX(-0.78125deg) skewY(-0.78125deg); }\n  77.7% {\n    -webkit-transform: skewX(0.39063deg) skewY(0.39063deg);\n    transform: skewX(0.39063deg) skewY(0.39063deg); }\n  88.8% {\n    -webkit-transform: skewX(-0.19531deg) skewY(-0.19531deg);\n    transform: skewX(-0.19531deg) skewY(-0.19531deg); } }\n\n@keyframes jello {\n  from, 11.1%, to {\n    -webkit-transform: none;\n    transform: none; }\n  22.2% {\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\n    transform: skewX(-12.5deg) skewY(-12.5deg); }\n  33.3% {\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\n    transform: skewX(6.25deg) skewY(6.25deg); }\n  44.4% {\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\n    transform: skewX(-3.125deg) skewY(-3.125deg); }\n  55.5% {\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\n    transform: skewX(1.5625deg) skewY(1.5625deg); }\n  66.6% {\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\n    transform: skewX(-0.78125deg) skewY(-0.78125deg); }\n  77.7% {\n    -webkit-transform: skewX(0.39063deg) skewY(0.39063deg);\n    transform: skewX(0.39063deg) skewY(0.39063deg); }\n  88.8% {\n    -webkit-transform: skewX(-0.19531deg) skewY(-0.19531deg);\n    transform: skewX(-0.19531deg) skewY(-0.19531deg); } }\n\n.jello {\n  -webkit-animation-name: jello;\n  animation-name: jello;\n  -webkit-transform-origin: center;\n  transform-origin: center; }\n\n@-webkit-keyframes bounceIn {\n  from, 20%, 40%, 60%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n    transform: scale3d(0.97, 0.97, 0.97); }\n  to {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes bounceIn {\n  from, 20%, 40%, 60%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n    transform: scale3d(0.97, 0.97, 0.97); }\n  to {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.bounceIn {\n  -webkit-animation-name: bounceIn;\n  animation-name: bounceIn; }\n\n@-webkit-keyframes bounceInDown {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n    transform: translate3d(0, 5px, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes bounceInDown {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n    transform: translate3d(0, 5px, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.bounceInDown {\n  -webkit-animation-name: bounceInDown;\n  animation-name: bounceInDown; }\n\n@-webkit-keyframes bounceInLeft {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0);\n    transform: translate3d(-3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0);\n    transform: translate3d(25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0);\n    transform: translate3d(5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes bounceInLeft {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0);\n    transform: translate3d(-3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0);\n    transform: translate3d(25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0);\n    transform: translate3d(5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.bounceInLeft {\n  -webkit-animation-name: bounceInLeft;\n  animation-name: bounceInLeft; }\n\n@-webkit-keyframes bounceInRight {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0);\n    transform: translate3d(3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0);\n    transform: translate3d(-25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0);\n    transform: translate3d(-5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes bounceInRight {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0);\n    transform: translate3d(3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0);\n    transform: translate3d(-25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0);\n    transform: translate3d(-5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.bounceInRight {\n  -webkit-animation-name: bounceInRight;\n  animation-name: bounceInRight; }\n\n@-webkit-keyframes bounceInUp {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0);\n    transform: translate3d(0, 3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0);\n    transform: translate3d(0, -5px, 0); }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes bounceInUp {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0);\n    transform: translate3d(0, 3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0);\n    transform: translate3d(0, -5px, 0); }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.bounceInUp {\n  -webkit-animation-name: bounceInUp;\n  animation-name: bounceInUp; }\n\n@-webkit-keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  50%, 55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); } }\n\n@keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  50%, 55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); } }\n\n.bounceOut {\n  -webkit-animation-name: bounceOut;\n  animation-name: bounceOut; }\n\n@-webkit-keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n@keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n.bounceOutDown {\n  -webkit-animation-name: bounceOutDown;\n  animation-name: bounceOutDown; }\n\n@-webkit-keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0);\n    transform: translate3d(20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n@keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0);\n    transform: translate3d(20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n.bounceOutLeft {\n  -webkit-animation-name: bounceOutLeft;\n  animation-name: bounceOutLeft; }\n\n@-webkit-keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0);\n    transform: translate3d(-20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n@keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0);\n    transform: translate3d(-20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n.bounceOutRight {\n  -webkit-animation-name: bounceOutRight;\n  animation-name: bounceOutRight; }\n\n@-webkit-keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0);\n    transform: translate3d(0, 20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n@keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0);\n    transform: translate3d(0, 20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n.bounceOutUp {\n  -webkit-animation-name: bounceOutUp;\n  animation-name: bounceOutUp; }\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.fadeIn {\n  -webkit-animation-name: fadeIn;\n  animation-name: fadeIn; }\n\n@-webkit-keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInDown {\n  -webkit-animation-name: fadeInDown;\n  animation-name: fadeInDown; }\n\n@-webkit-keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInDownBig {\n  -webkit-animation-name: fadeInDownBig;\n  animation-name: fadeInDownBig; }\n\n@-webkit-keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInLeft {\n  -webkit-animation-name: fadeInLeft;\n  animation-name: fadeInLeft; }\n\n@-webkit-keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInLeftBig {\n  -webkit-animation-name: fadeInLeftBig;\n  animation-name: fadeInLeftBig; }\n\n@-webkit-keyframes fadeInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInRight {\n  -webkit-animation-name: fadeInRight;\n  animation-name: fadeInRight; }\n\n@-webkit-keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInRightBig {\n  -webkit-animation-name: fadeInRightBig;\n  animation-name: fadeInRightBig; }\n\n@-webkit-keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInUp {\n  -webkit-animation-name: fadeInUp;\n  animation-name: fadeInUp; }\n\n@-webkit-keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInUpBig {\n  -webkit-animation-name: fadeInUpBig;\n  animation-name: fadeInUpBig; }\n\n@-webkit-keyframes fadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n@keyframes fadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.fadeOut {\n  -webkit-animation-name: fadeOut;\n  animation-name: fadeOut; }\n\n@-webkit-keyframes fadeOutDown {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n@keyframes fadeOutDown {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n.fadeOutDown {\n  -webkit-animation-name: fadeOutDown;\n  animation-name: fadeOutDown; }\n\n@-webkit-keyframes fadeOutDownBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n@keyframes fadeOutDownBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n.fadeOutDownBig {\n  -webkit-animation-name: fadeOutDownBig;\n  animation-name: fadeOutDownBig; }\n\n@-webkit-keyframes fadeOutLeft {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n@keyframes fadeOutLeft {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n.fadeOutLeft {\n  -webkit-animation-name: fadeOutLeft;\n  animation-name: fadeOutLeft; }\n\n@-webkit-keyframes fadeOutLeftBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n@keyframes fadeOutLeftBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n.fadeOutLeftBig {\n  -webkit-animation-name: fadeOutLeftBig;\n  animation-name: fadeOutLeftBig; }\n\n@-webkit-keyframes fadeOutRight {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n@keyframes fadeOutRight {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n.fadeOutRight {\n  -webkit-animation-name: fadeOutRight;\n  animation-name: fadeOutRight; }\n\n@-webkit-keyframes fadeOutRightBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n@keyframes fadeOutRightBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n.fadeOutRightBig {\n  -webkit-animation-name: fadeOutRightBig;\n  animation-name: fadeOutRightBig; }\n\n@-webkit-keyframes fadeOutUp {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n@keyframes fadeOutUp {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n.fadeOutUp {\n  -webkit-animation-name: fadeOutUp;\n  animation-name: fadeOutUp; }\n\n@-webkit-keyframes fadeOutUpBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n@keyframes fadeOutUpBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n.fadeOutUpBig {\n  -webkit-animation-name: fadeOutUpBig;\n  animation-name: fadeOutUpBig; }\n\n@-webkit-keyframes flip {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  40% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  50% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  80% {\n    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; } }\n\n@keyframes flip {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  40% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  50% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  80% {\n    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; } }\n\n.animated.flip {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n  -webkit-animation-name: flip;\n  animation-name: flip; }\n\n@-webkit-keyframes flipInX {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n@keyframes flipInX {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n.flipInX {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInX;\n  animation-name: flipInX; }\n\n@-webkit-keyframes flipInY {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n@keyframes flipInY {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n.flipInY {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInY;\n  animation-name: flipInY; }\n\n@-webkit-keyframes flipOutX {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0; } }\n\n@keyframes flipOutX {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0; } }\n\n.flipOutX {\n  -webkit-animation-name: flipOutX;\n  animation-name: flipOutX;\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important; }\n\n@-webkit-keyframes flipOutY {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0; } }\n\n@keyframes flipOutY {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0; } }\n\n.flipOutY {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipOutY;\n  animation-name: flipOutY; }\n\n@-webkit-keyframes lightSpeedIn {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0; }\n  60% {\n    -webkit-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes lightSpeedIn {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0; }\n  60% {\n    -webkit-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.lightSpeedIn {\n  -webkit-animation-name: lightSpeedIn;\n  animation-name: lightSpeedIn;\n  -webkit-animation-timing-function: ease-out;\n  animation-timing-function: ease-out; }\n\n@-webkit-keyframes lightSpeedOut {\n  from {\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0; } }\n\n@keyframes lightSpeedOut {\n  from {\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0; } }\n\n.lightSpeedOut {\n  -webkit-animation-name: lightSpeedOut;\n  animation-name: lightSpeedOut;\n  -webkit-animation-timing-function: ease-in;\n  animation-timing-function: ease-in; }\n\n@-webkit-keyframes rotateIn {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateIn {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateIn {\n  -webkit-animation-name: rotateIn;\n  animation-name: rotateIn; }\n\n@-webkit-keyframes rotateInDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInDownLeft {\n  -webkit-animation-name: rotateInDownLeft;\n  animation-name: rotateInDownLeft; }\n\n@-webkit-keyframes rotateInDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInDownRight {\n  -webkit-animation-name: rotateInDownRight;\n  animation-name: rotateInDownRight; }\n\n@-webkit-keyframes rotateInUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInUpLeft {\n  -webkit-animation-name: rotateInUpLeft;\n  animation-name: rotateInUpLeft; }\n\n@-webkit-keyframes rotateInUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInUpRight {\n  -webkit-animation-name: rotateInUpRight;\n  animation-name: rotateInUpRight; }\n\n@-webkit-keyframes rotateOut {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0; } }\n\n@keyframes rotateOut {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0; } }\n\n.rotateOut {\n  -webkit-animation-name: rotateOut;\n  animation-name: rotateOut; }\n\n@-webkit-keyframes rotateOutDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; } }\n\n@keyframes rotateOutDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; } }\n\n.rotateOutDownLeft {\n  -webkit-animation-name: rotateOutDownLeft;\n  animation-name: rotateOutDownLeft; }\n\n@-webkit-keyframes rotateOutDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n@keyframes rotateOutDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n.rotateOutDownRight {\n  -webkit-animation-name: rotateOutDownRight;\n  animation-name: rotateOutDownRight; }\n\n@-webkit-keyframes rotateOutUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n@keyframes rotateOutUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n.rotateOutUpLeft {\n  -webkit-animation-name: rotateOutUpLeft;\n  animation-name: rotateOutUpLeft; }\n\n@-webkit-keyframes rotateOutUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0; } }\n\n@keyframes rotateOutUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0; } }\n\n.rotateOutUpRight {\n  -webkit-animation-name: rotateOutUpRight;\n  animation-name: rotateOutUpRight; }\n\n@-webkit-keyframes hinge {\n  0% {\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  20%, 60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  40%, 80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0; } }\n\n@keyframes hinge {\n  0% {\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  20%, 60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  40%, 80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0; } }\n\n.hinge {\n  -webkit-animation-name: hinge;\n  animation-name: hinge; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes rollIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes rollIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.rollIn {\n  -webkit-animation-name: rollIn;\n  animation-name: rollIn; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes rollOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg); } }\n\n@keyframes rollOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg); } }\n\n.rollOut {\n  -webkit-animation-name: rollOut;\n  animation-name: rollOut; }\n\n@-webkit-keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  50% {\n    opacity: 1; } }\n\n@keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  50% {\n    opacity: 1; } }\n\n.zoomIn {\n  -webkit-animation-name: zoomIn;\n  animation-name: zoomIn; }\n\n@-webkit-keyframes zoomInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInDown {\n  -webkit-animation-name: zoomInDown;\n  animation-name: zoomInDown; }\n\n@-webkit-keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInLeft {\n  -webkit-animation-name: zoomInLeft;\n  animation-name: zoomInLeft; }\n\n@-webkit-keyframes zoomInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInRight {\n  -webkit-animation-name: zoomInRight;\n  animation-name: zoomInRight; }\n\n@-webkit-keyframes zoomInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInUp {\n  -webkit-animation-name: zoomInUp;\n  animation-name: zoomInUp; }\n\n@-webkit-keyframes zoomOut {\n  from {\n    opacity: 1; }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  to {\n    opacity: 0; } }\n\n@keyframes zoomOut {\n  from {\n    opacity: 1; }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  to {\n    opacity: 0; } }\n\n.zoomOut {\n  -webkit-animation-name: zoomOut;\n  animation-name: zoomOut; }\n\n@-webkit-keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomOutDown {\n  -webkit-animation-name: zoomOutDown;\n  animation-name: zoomOutDown; }\n\n@-webkit-keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    -webkit-transform-origin: left center;\n    transform-origin: left center; } }\n\n@keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    -webkit-transform-origin: left center;\n    transform-origin: left center; } }\n\n.zoomOutLeft {\n  -webkit-animation-name: zoomOutLeft;\n  animation-name: zoomOutLeft; }\n\n@-webkit-keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    -webkit-transform-origin: right center;\n    transform-origin: right center; } }\n\n@keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    -webkit-transform-origin: right center;\n    transform-origin: right center; } }\n\n.zoomOutRight {\n  -webkit-animation-name: zoomOutRight;\n  animation-name: zoomOutRight; }\n\n@-webkit-keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomOutUp {\n  -webkit-animation-name: zoomOutUp;\n  animation-name: zoomOutUp; }\n\n@-webkit-keyframes slideInDown {\n  from {\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInDown {\n  from {\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInDown {\n  -webkit-animation-name: slideInDown;\n  animation-name: slideInDown; }\n\n@-webkit-keyframes slideInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInLeft {\n  -webkit-animation-name: slideInLeft;\n  animation-name: slideInLeft; }\n\n@-webkit-keyframes slideInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInRight {\n  -webkit-animation-name: slideInRight;\n  animation-name: slideInRight; }\n\n@-webkit-keyframes slideInUp {\n  from {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInUp {\n  from {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInUp {\n  -webkit-animation-name: slideInUp;\n  animation-name: slideInUp; }\n\n@-webkit-keyframes slideOutDown {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n@keyframes slideOutDown {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n.slideOutDown {\n  -webkit-animation-name: slideOutDown;\n  animation-name: slideOutDown; }\n\n@-webkit-keyframes slideOutLeft {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n@keyframes slideOutLeft {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n.slideOutLeft {\n  -webkit-animation-name: slideOutLeft;\n  animation-name: slideOutLeft; }\n\n@-webkit-keyframes slideOutRight {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n@keyframes slideOutRight {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n.slideOutRight {\n  -webkit-animation-name: slideOutRight;\n  animation-name: slideOutRight; }\n\n@-webkit-keyframes slideOutUp {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n@keyframes slideOutUp {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n.slideOutUp {\n  -webkit-animation-name: slideOutUp;\n  animation-name: slideOutUp; }\n", ""]);

// exports


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(100);

var _actors_list = __webpack_require__(21);

var _actors_list2 = _interopRequireDefault(_actors_list);

var _inner_messager = __webpack_require__(7);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

var _director = __webpack_require__(22);

var _director2 = _interopRequireDefault(_director);

var _tags_of_movie = __webpack_require__(32);

var _tags_of_movie2 = _interopRequireDefault(_tags_of_movie);

var _flex_text = __webpack_require__(33);

var _flex_text2 = _interopRequireDefault(_flex_text);

var _filmmakers_details_area = __webpack_require__(34);

var _filmmakers_details_area2 = _interopRequireDefault(_filmmakers_details_area);

var _movies_player = __webpack_require__(35);

var _movies_player2 = _interopRequireDefault(_movies_player);

var _movies_displayer = __webpack_require__(23);

var _movies_displayer2 = _interopRequireDefault(_movies_displayer);

var _msg_dialog = __webpack_require__(14);

var _msg_dialog2 = _interopRequireDefault(_msg_dialog);

var _plain_panel_title = __webpack_require__(11);

var _plain_panel_title2 = _interopRequireDefault(_plain_panel_title);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*import '../../../public/js/ckplayer/ckplayer/ckplayer.js';*/

//引入react组件
var MovieInfoPage = _react2.default.createClass({
    displayName: 'MovieInfoPage',

    getInitialState: function getInitialState() {
        //init state
        return {
            movieDescriptionTitle: "电影简介 : ",
            whenMovieIsLoading: "加载电影信息",
            movieDescriptionTextLength: 100,
            movie: {},
            movieUrl: this.props.match.url, //请求电影基本信息的url
            targetMovieId: this.props.match.params.movieId,
            //thisMovieFilmmakerIds:undefined,
            //thisMovieTagIds:undefined,
            aboutFilmmakersMovies: undefined,
            aboutFilmmakersMoviesPage: {
                size: 10,
                start: 0,
                orderBy: "score",
                orderType: "desc"
            },
            aboutTagsMovies: undefined,
            aboutTagsMoviesPage: {
                size: 10,
                start: 0,
                orderBy: "score",
                orderType: "desc"
            }

        };
    },
    componentDidMount: function componentDidMount() {
        //add resize event listener
        window.addEventListener('resize', this.onWindowResize);

        //get movie
        this.getMovieBasicInfo();

        //adjust ui
        this.adjustUI();
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    },
    componentDidUpdate: function componentDidUpdate() {
        // c("componentDidUpdate");
    },
    componentWillReceiveProps: function componentWillReceiveProps(props) {
        var _this = this;

        //Link to!!!当点击某个Link标签时,路由会接受到一个新的props；但是如果跳转的是同一个页面,那么对不起，不会跳转，需要手动重置路由
        if (!isEmpty(this.props.match.url)) {
            this.props.history.push('/empty');
            setTimeout(function () {
                _this.props.history.replace(_this.props.match.url);
            }, 1);
        }
    },
    onWindowResize: function onWindowResize() {
        this.adjustUI();
    },
    adjustUI: function adjustUI() {},
    lazyLoadImg: function lazyLoadImg() {
        lazyLoad();
    },
    updateMovie: function updateMovie(movie) {
        var state = this.state;

        //set movie info to state

        state.movie = movie;

        this.setState(state);
    },

    getMovieBasicInfo: function getMovieBasicInfo(callfun) {

        // var movieId = this.state.targetMovieId;


        //get movie info
        var url = this.state.movieUrl;

        ajax.get({
            url: url,
            onBeforeRequest: function () {
                //show tip
                this.showMovieInfoTip(this.state.whenMovieIsLoading);
            }.bind(this),
            onResponseStart: function () {
                //close tip
                this.showMovieInfoTip();
            }.bind(this),
            onResponseSuccess: function (result) {

                this.updateMovie(result.data.movie);

                //update movie description
                // this.updateMovieDescription(state.movie.description);

                //lazy load img
                this.lazyLoadImg();
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg);
            }.bind(this),
            onResponseEnd: function () {
                // c(this.state)
                //callfun
                if (callfun != undefined) {
                    callfun();
                }
            }.bind(this)
        });
    },
    showMovieInfoTip: function showMovieInfoTip(msg, loop) {
        this.refs.innerMessager.showMsg(msg, loop);
    },

    loadingAboutTagsMovies: function loadingAboutTagsMovies() {
        this.refs.aboutTagsMovies_MoviesDisplayer.loadingMoviesTip();
    },
    hideAboutTagsMovies: function hideAboutTagsMovies() {
        this.refs.aboutTagsMovies_MoviesDisplayer.hideMovieTip();
    },
    noAboutTagsMovies: function noAboutTagsMovies() {
        this.refs.aboutTagsMovies_MoviesDisplayer.noMoviesTip();
    },
    getAboutTagsMovies: function getAboutTagsMovies(movieTags) {
        // c(movieTags);
        if (isEmptyList(movieTags)) {

            this.noAboutTagsMovies();
            return;
        }

        //get filmmakerIds
        var tagIds = [];
        for (var i = 0; i < movieTags.length; i++) {
            tagIds.push(movieTags[i].id);
        }
        // c(tagIds);
        //ajax
        var orderBy = this.state.aboutTagsMoviesPage.orderBy;
        var orderType = this.state.aboutTagsMoviesPage.orderType;
        var size = this.state.aboutTagsMoviesPage.size;
        var start = this.state.aboutTagsMoviesPage.start;

        var url = "/movie/about/tag?orderBy=" + orderBy + "&orderType=" + orderType + "&size=" + size + "&start=" + start + "&excludeMovieId=" + this.state.targetMovieId;
        url = contactUrlWithArray(url, "tagIds", tagIds);
        ajax.get({
            url: url,
            onBeforeRequest: function () {
                //show tip
                this.loadingAboutTagsMovies();
            }.bind(this),
            onResponseStart: function () {
                //close tip
                this.hideAboutTagsMovies();
            }.bind(this),
            onResponseSuccess: function (result) {

                if (isEmptyList(result.data.movies)) {
                    this.noAboutTagsMovies();
                    return;
                }

                var state = this.state;

                //set movie info to state

                state.aboutTagsMovies = result.data.movies;

                this.setState(state);

                //lazy load img
                this.lazyLoadImg();
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg);
            }.bind(this)
        });
    },
    loadingAboutFilmmakerMovies: function loadingAboutFilmmakerMovies() {
        this.refs.aboutFilmmakersMovies_MoviesDisplayer.loadingMoviesTip();
    },
    hideAboutFilmmakerMovies: function hideAboutFilmmakerMovies() {
        this.refs.aboutFilmmakersMovies_MoviesDisplayer.hideMovieTip();
    },
    noAboutFilmmakerMovies: function noAboutFilmmakerMovies() {
        this.refs.aboutFilmmakersMovies_MoviesDisplayer.noMoviesTip();
    },
    getAboutFilmmakerMovies: function getAboutFilmmakerMovies(movieFilmmakers) {
        if (isEmptyList(movieFilmmakers)) {

            this.noAboutFilmmakerMovies();
            return;
        }

        //get filmmakerIds
        var ids = [];
        for (var i = 0; i < movieFilmmakers.length; i++) {
            ids.push(movieFilmmakers[i].id);
        }
        //ajax
        var orderBy = this.state.aboutFilmmakersMoviesPage.orderBy;
        var orderType = this.state.aboutFilmmakersMoviesPage.orderType;
        var size = this.state.aboutFilmmakersMoviesPage.size;
        var start = this.state.aboutFilmmakersMoviesPage.start;

        var url = "/movie/about/filmmaker?orderBy=" + orderBy + "&orderType=" + orderType + "&size=" + size + "&start=" + start + "&excludeMovieId=" + this.state.targetMovieId;
        url = contactUrlWithArray(url, "filmmakerIds", ids);

        ajax.get({
            url: url,
            onBeforeRequest: function () {
                //show tip
                this.loadingAboutFilmmakerMovies();
            }.bind(this),
            onResponseStart: function () {
                //close tip
                this.hideAboutFilmmakerMovies();
            }.bind(this),
            onResponseSuccess: function (result) {

                var state = this.state;

                //set movie info to state

                state.aboutFilmmakersMovies = result.data.movies;

                this.setState(state);

                //lazy load img
                this.lazyLoadImg();
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg);
            }.bind(this)
        });
    },

    render: function render() {

        //format releaseTime
        var releaseTime = timeFormatter.formatDate(this.state.movie.releaseTime);
        //imgUrl
        var imgUrl = generateImgUrl({ imgUrl: this.state.movie.imgUrl, width: 300 });
        return _react2.default.createElement(
            'div',
            { id: 'movie_info_content' },
            _react2.default.createElement(
                'div',
                { id: 'basic_info' },
                _react2.default.createElement(
                    'div',
                    { className: 'clearfix', id: 'movie_info_displayer' },
                    _react2.default.createElement(
                        'div',
                        { id: 'movie_img' },
                        _react2.default.createElement('img', { src: MOVIE_LOADING_IMG, 'data-original': imgUrl })
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'movie_text' },
                        _react2.default.createElement(
                            'ul',
                            { id: 'text_ul' },
                            _react2.default.createElement(_inner_messager2.default, { defaultTip: this.state.whenMovieIsLoading,
                                ref: 'innerMessager' }),
                            _react2.default.createElement(
                                'li',
                                { id: 'name_li' },
                                '\u7535\u5F71 : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    this.state.movie.name
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u522B\u540D : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    this.state.movie.alias
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u4E0A\u6620\u65F6\u95F4 : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    releaseTime
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u65F6\u957F : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    this.state.movie.movieTime
                                ),
                                ' \u5206\u949F'
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u8BC4\u5206 : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    this.state.movie.score
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(_director2.default, { director: this.state.movie.director })
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(_actors_list2.default, { actors: this.state.movie.actors })
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                '\u603B\u64AD\u653E\u6570 : ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'javascript:void(0);' },
                                    this.state.movie.watchNum
                                ),
                                ' \u6B21'
                            ),
                            _react2.default.createElement(
                                'li',
                                { id: 'description_li' },
                                _react2.default.createElement(_flex_text2.default, { title: this.state.movieDescriptionTitle,
                                    text: this.state.movie.description,
                                    maxTextLength: this.state.movieDescriptionTextLength })
                            ),
                            _react2.default.createElement(
                                'li',
                                { id: 'tags_li' },
                                _react2.default.createElement(_tags_of_movie2.default, { movieId: this.state.targetMovieId,
                                    onLoadDataSuccess: this.getAboutTagsMovies })
                            )
                        )
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { id: 'movie_player', className: 'clearfix' },
                _react2.default.createElement(
                    'div',
                    { id: 'm_wrapper', ref: 'm_wrapper' },
                    _react2.default.createElement(_movies_player2.default, { movie: this.state.movie })
                ),
                _react2.default.createElement('div', { id: 'split' }),
                _react2.default.createElement(
                    'div',
                    { id: 'actors_details_div_wrapper' },
                    _react2.default.createElement(
                        'div',
                        { id: 'actors_details_div' },
                        _react2.default.createElement(_filmmakers_details_area2.default, { movieId: this.state.targetMovieId,
                            onLoadDataSuccess: this.getAboutFilmmakerMovies })
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { id: 'about_filmmakers_movies' },
                _react2.default.createElement(_plain_panel_title2.default, { title: '\u7535\u5F71\u4EBA\u76F8\u5173' }),
                _react2.default.createElement(_movies_displayer2.default, { movies: this.state.aboutFilmmakersMovies,
                    ref: 'aboutFilmmakersMovies_MoviesDisplayer' })
            ),
            _react2.default.createElement(
                'div',
                { id: 'about_tags_movies' },
                _react2.default.createElement(_plain_panel_title2.default, { title: '\u6807\u7B7E\u76F8\u5173' }),
                _react2.default.createElement(_movies_displayer2.default, { movies: this.state.aboutTagsMovies,
                    ref: 'aboutTagsMovies_MoviesDisplayer' })
            )
        );
    }
});

exports.default = MovieInfoPage;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(101);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./movie_info_page.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./movie_info_page.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#movie_info_content {\n  margin: 0px 15%;\n  width: 70%;\n  background-color: rgb(241,242,243); }\n  #movie_info_content #basic_info {\n    width: 100%;\n    border-radius: 3px;\n    background-color: white;\n    padding: 20px 20px;\n    box-sizing: border-box;\n    margin-top: 20px;\n    width: 100%; }\n    #movie_info_content #basic_info > #movie_info_displayer {\n      flex: 1;\n      display: flex;\n      width: 100%; }\n      #movie_info_content #basic_info > #movie_info_displayer > div {\n        float: left; }\n      #movie_info_content #basic_info > #movie_info_displayer #movie_img {\n        width: 200px; }\n        #movie_info_content #basic_info > #movie_info_displayer #movie_img > img {\n          width: 200px;\n          height: 300px; }\n      #movie_info_content #basic_info > #movie_info_displayer #movie_text {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding-left: 20px;\n        box-sizing: border-box;\n        height: 100%; }\n        #movie_info_content #basic_info > #movie_info_displayer #movie_text ul {\n          list-style: none;\n          display: inline; }\n          #movie_info_content #basic_info > #movie_info_displayer #movie_text ul li {\n            display: inline-block;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            height: auto;\n            width: auto; }\n        #movie_info_content #basic_info > #movie_info_displayer #movie_text #text_ul > li {\n          margin-bottom: 10px;\n          width: 25%;\n          padding: 0px 5px;\n          box-sizing: border-box; }\n        #movie_info_content #basic_info > #movie_info_displayer #movie_text #text_ul #name_li {\n          width: 100%; }\n          #movie_info_content #basic_info > #movie_info_displayer #movie_text #text_ul #name_li, #movie_info_content #basic_info > #movie_info_displayer #movie_text #text_ul #name_li > a {\n            color: rgb(61,158,255);\n            font-size: 24px; }\n        #movie_info_content #basic_info > #movie_info_displayer #movie_text #text_ul #description_li {\n          width: 100%;\n          margin-top: 20px; }\n        #movie_info_content #basic_info > #movie_info_displayer #movie_text #text_ul #tags_li {\n          width: 100%;\n          margin-top: 20px; }\n  #movie_info_content #movie_player {\n    width: 100%;\n    margin-top: 20px;\n    background-color: rgb(241,242,243);\n    display: flex; }\n    #movie_info_content #movie_player > div {\n      float: left; }\n    #movie_info_content #movie_player #m_wrapper {\n      width: 100%;\n      border-radius: 3px;\n      background-color: white;\n      padding: 20px 20px;\n      box-sizing: border-box;\n      flex: 11; }\n    #movie_info_content #movie_player #split {\n      width: 20px;\n      height: 3px;\n      background-color: red;\n      visibility: hidden; }\n    #movie_info_content #movie_player #actors_details_div_wrapper {\n      width: 100%;\n      border-radius: 3px;\n      background-color: white;\n      padding: 20px 20px;\n      box-sizing: border-box;\n      flex: 5; }\n  #movie_info_content #about_filmmakers_movies {\n    width: 100%;\n    width: 100%;\n    border-radius: 3px;\n    background-color: white;\n    padding: 20px 20px;\n    box-sizing: border-box;\n    margin-top: 20px; }\n  #movie_info_content #about_tags_movies {\n    width: 100%;\n    width: 100%;\n    border-radius: 3px;\n    background-color: white;\n    padding: 20px 20px;\n    box-sizing: border-box;\n    margin-top: 20px; }\n", ""]);

// exports


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

var _login_dialog = __webpack_require__(103);

var _login_dialog2 = _interopRequireDefault(_login_dialog);

var _regist_dialog = __webpack_require__(106);

var _regist_dialog2 = _interopRequireDefault(_regist_dialog);

__webpack_require__(109);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 用户信息展示,界面跳转，保护用户界面的职责
 */
//引入react组件
var Head = _react2.default.createClass({
    displayName: "Head",


    getInitialState: function getInitialState() {
        return {
            logouting: "正在注销...",
            logoutSuccess: "注销成功",
            logoutFailure: "注销失败",
            tipOfOffLine: "您已离线",
            onlineUserBasicInfoUrl: "/user/online/basicInfo",

            //用户未登录时受保护的页面，用于用户注销后或者被动离线后调用
            protectedUserPageLists: ["/user/[0-9/_-a-zA-Z]*"],
            user: {}, //默认为空对象
            pollOnlineUserStatusTimer: undefined,
            pollOnlineUserStatusTimerInterval: 10000,
            isFirstVisitPage: true //用于辅助轮询
        };
    },
    componentDidMount: function componentDidMount() {
        this.registEvents();
        //刷新页面后轮询获取在线用户，如果用户不在线，那么保护页面
        this.startPollOnlineUserStatus();
        //set is first visit page flag
    },
    setIsFirstVisitPage: function setIsFirstVisitPage(bol) {
        var state = this.state;
        state.isFirstVisitPage = bol;
        this.setState(state);
    },
    stopPollOnlineUserStatus: function stopPollOnlineUserStatus() {
        if (!isUndefined(this.state.pollOnlineUserStatusTimer)) {
            clearInterval(this.state.pollOnlineUserStatusTimer);
            this.setPollOnlineUserStatusTimer(undefined);
        }
    },
    startPollOnlineUserStatus: function startPollOnlineUserStatus() {
        if (!isUndefined(this.state.pollOnlineUserStatusTimer)) {
            return;
        }

        this.pollOnlineUserStatus();
        var pollOnlineUserStatusTimer = setInterval(function () {
            this.pollOnlineUserStatus();
        }.bind(this), this.state.pollOnlineUserStatusTimerInterval);
        //set poll timer
        this.setPollOnlineUserStatusTimer(pollOnlineUserStatusTimer);
    },
    pollOnlineUserStatus: function pollOnlineUserStatus() {
        window.VmFrontendEventsDispatcher.feelerOnlineUser({
            onFeelerOnlineUser: function (isOnline, u) {

                //update user in state
                window.VmFrontendEventsDispatcher.updateHeadComponentUser(u);

                if (!isOnline) {
                    //clear timer
                    this.stopPollOnlineUserStatus();
                    //when user is online,open websocket
                    window.VmFrontendEventsDispatcher.protectPage();
                    //tip user
                    if (!this.state.isFirstVisitPage) {
                        window.VmFrontendEventsDispatcher.showMsgDialog(this.state.tipOfOffLine);
                    }
                } else {
                    this.closeLoginDialog(); //!!!防止用户登陆后再次点开登录框!!!
                }
                this.setIsFirstVisitPage(false);
            }.bind(this)
        });
    },
    setPollOnlineUserStatusTimer: function setPollOnlineUserStatusTimer(pollOnlineUserStatusTimer) {
        var state = this.state;
        state.pollOnlineUserStatusTimer = pollOnlineUserStatusTimer;
        this.setState(state);
    },
    registEvents: function registEvents() {
        var _this = this;

        //注册更新头像事件
        window.event.on('updateHeadComponentUser', function (newUser) {
            _this.updateStateUser(newUser);
        });

        //检测用户是否有在线
        window.event.on('feelerOnlineUser', function (args) {
            var url = "/user/feelerOnlineUser";
            ajax.get({
                url: url,
                ignoreAjaxError: true,
                onBeforeRequest: function () {}.bind(_this),
                onResponseStart: function () {}.bind(_this),
                onResponseSuccess: function (result) {
                    //用户不在线
                    var isOnline = result.data.online;
                    var u = result.data.user;
                    if (!isOnline) {
                        window.VmFrontendEventsDispatcher.protectPage();
                    }
                    if (!isUndefined(args)) {
                        //callfun
                        if (!isUndefined(args.onFeelerOnlineUser)) {
                            args.onFeelerOnlineUser(isOnline, u);
                        }
                    }
                }.bind(_this),
                onResponseFailure: function (result) {}.bind(_this),
                onResponseEnd: function () {}.bind(_this),
                onRequestError: function () {}.bind(_this)
            });
        });
        //获取用户是否有在线
        window.event.on('getOnlineUser', function (args) {

            var url = "/user/online";
            ajax.get({
                url: url,
                onBeforeRequest: function () {}.bind(_this),
                onResponseStart: function () {}.bind(_this),
                onResponseSuccess: function (result) {
                    //用户不在线
                    var u = result.data.user;
                    //update head component user
                    window.VmFrontendEventsDispatcher.updateHeadComponentUser(u);
                    //callfun
                    if (!isUndefined(args)) {

                        //callfun
                        if (!isUndefined(args.onGetOnlineUser)) {
                            args.onGetOnlineUser(u);
                        }
                    }
                }.bind(_this),
                onResponseFailure: function (result) {}.bind(_this),
                onResponseEnd: function () {}.bind(_this),
                onRequestError: function () {}.bind(_this)
            });
        });

        //保护页面的职责
        window.event.on('protectPage', function () {
            c("protectPage");
            for (var i = 0; i < vm_config.protectedUserPageLists.length; i++) {
                var protectedPage = vm_config.protectedUserPageLists[i];
                c(_this.props.location.pathname);
                if (_this.props.location.pathname.match(protectedPage)) {
                    _this.props.history.replace("/");
                    break;
                }
            }
            //update head user
            window.VmFrontendEventsDispatcher.updateHeadComponentUser(undefined);
        });
    },
    showLoginDialog: function showLoginDialog() {
        this.refs.login_dialog.showLoginDialog();
    },
    closeLoginDialog: function closeLoginDialog() {
        this.refs.login_dialog.closeLoginDialog();
    },
    onLoginSuccess: function onLoginSuccess(user) {
        //update and show user info
        this.updateStateUser(user);
        this.startPollOnlineUserStatus();
    },
    showRegistDialog: function showRegistDialog() {
        this.refs.regist_dialog.showRegistDialog();
    },
    closeRegistDialog: function closeRegistDialog() {
        this.refs.regist_dialog.closeRegistDialog();
    },
    onRegistSuccess: function onRegistSuccess(user) {
        this.updateStateUser(user);
        this.startPollOnlineUserStatus();
    },
    updateStateUser: function updateStateUser(user) {
        //when login success reset user
        var state = this.state;
        if (isEmpty(user)) {
            state.user = {};
        } else {
            state.user = user;
        }
        this.setState(state);
    },


    logout: function logout() {
        //show loading dialog
        window.VmFrontendEventsDispatcher.showLoading(this.state.logouting);

        var url = "/user/logout";

        ajax.put({
            url: url,
            onBeforeRequest: function () {}.bind(this),
            onResponseStart: function () {
                //close loading dialog
                window.VmFrontendEventsDispatcher.closeLoading();
            }.bind(this),
            onResponseSuccess: function (result) {

                window.VmFrontendEventsDispatcher.showMsgDialog(this.state.logoutSuccess);

                //update user in state
                this.updateStateUser({});

                //protect page
                window.VmFrontendEventsDispatcher.protectPage();

                //clear poll timer
                this.stopPollOnlineUserStatus();
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(this.state.logoutFailure);
            }.bind(this),
            onResponseEnd: function () {}.bind(this)
        });
    },
    render: function render() {
        //在线
        var loginStatus = function () {
            var _this2 = this;

            var onlineUserBasicInfoLocation = {
                pathname: this.state.onlineUserBasicInfoUrl
            };
            //imgUrl
            var headImgUrl = generateImgUrl({
                imgUrl: this.state.user.imgUrl,
                width: 50
            });
            return _react2.default.createElement(
                "span",
                null,
                _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { id: "headImg_a", to: onlineUserBasicInfoLocation },
                        _react2.default.createElement("img", { id: "headImg_img", src: headImgUrl })
                    )
                ),
                _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { id: "username", to: onlineUserBasicInfoLocation },
                        this.state.user.username
                    )
                ),
                _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement(
                        "a",
                        { href: "javascript:void(0);", onClick: function onClick() {
                                _this2.logout();
                            } },
                        "\u6CE8\u9500"
                    )
                )
            );
        }.bind(this);
        //离线
        var logoutStatus = function () {
            return _react2.default.createElement(
                "span",
                null,
                _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement(
                        "a",
                        { href: "javascript:void(0);", onClick: this.showLoginDialog },
                        "\u767B\u5F55"
                    )
                ),
                _react2.default.createElement(
                    "li",
                    null,
                    _react2.default.createElement(
                        "a",
                        { href: "javascript:void(0);", onClick: this.showRegistDialog },
                        "\u6CE8\u518C"
                    )
                )
            );
        }.bind(this);
        return _react2.default.createElement(
            "div",
            { id: "fragment_head_content" },
            _react2.default.createElement(
                "div",
                { id: "nav_div" },
                _react2.default.createElement(
                    "ul",
                    { id: "fragment_head_nav" },
                    _react2.default.createElement(
                        "li",
                        { id: "fragment_head_nav_logo" },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: "/" },
                            _react2.default.createElement(
                                "span",
                                { id: "logo_v" },
                                "V"
                            ),
                            _react2.default.createElement(
                                "span",
                                { id: "logo_m" },
                                "M"
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "li",
                        { id: "user_li" },
                        _react2.default.createElement(
                            "ul",
                            { id: "user_ul" },
                            isEmpty(this.state.user) ? logoutStatus() : loginStatus()
                        )
                    )
                )
            ),
            _react2.default.createElement("div", { id: "blank_div" }),
            _react2.default.createElement(_login_dialog2.default, { ref: "login_dialog", onLoginSuccess: this.onLoginSuccess }),
            _react2.default.createElement(_regist_dialog2.default, { ref: "regist_dialog", onRegistSuccess: this.onRegistSuccess })
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(Head); //将App组件导出

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

__webpack_require__(104);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*登录框*/
//引入react组件
var LoginDialog = _react2.default.createClass({
    displayName: 'LoginDialog',

    getInitialState: function getInitialState() {
        return {
            dialogClassName: "",
            // loginFailure: "登录失败",
            // loginSuccess: "登录成功",
            logining: "正在登陆,请稍等..."
        };
    },
    componentDidMount: function componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);

        //adjust ui
        this.adjustUI();
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    },
    onWindowResize: function onWindowResize() {
        this.adjustUI();
    },
    adjustUI: function adjustUI() {
        {
            /*调整样式*/
        }
        this.dialogToMiddle();
    },
    dialogToMiddle: function dialogToMiddle() {
        //垂直居中
        var dialog = $(this.refs.dialog);
        var content = $(this.refs.content);
        var dialog_h = dialog.height();
        var content_h = content.height();
        var top = (content_h - dialog_h) / 2;
        dialog.css("margin-top", top + "px");
    },
    showLoginDialog: function showLoginDialog() {
        //show it
        this.fadeIn();

        //adjust ui
        this.adjustUI();

        //get focus
        $(this.refs.username).focus();
    },
    closeLoginDialog: function closeLoginDialog() {
        //hide it
        this.fadeOut();
    },
    fadeIn: function fadeIn() {

        var state = this.state;
        $(this.refs.content).fadeIn();
        state.dialogClassName = "block animated bounceIn";
        this.setState(state);

        // c(this.state);
    },
    fadeOut: function fadeOut() {
        var state = this.state;
        state.dialogClassName = "animated bounceOut";
        $(this.refs.content).fadeOut();
        this.setState(state);
    },
    login: function login() {

        var username = $(this.refs.username).val();
        var password = $(this.refs.password).val();
        var url = "/user/login";
        var data = $.extend({
            username: username,
            password: password
        }, getVisitInfoObj());
        ajax.put({
            url: url,
            data: data,
            onBeforeRequest: function () {
                //close login dialog
                this.closeLoginDialog();
                //show loading dialog
                window.VmFrontendEventsDispatcher.showLoading(this.state.logining);
            }.bind(this),
            onResponseStart: function () {
                //close loading
                window.VmFrontendEventsDispatcher.closeLoading();
            }.bind(this),
            onResponseSuccess: function (result) {

                // c(result);
                //keep token
                localStorage.setItem(KEY_OF_ACCESS_TOKEN, result.data.user.token);

                //login success,hide login dialog
                this.closeLoginDialog();

                //show msg dialog
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg);

                //callfun
                this.props.onLoginSuccess(result.data.user);
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(result.msg, function () {
                    this.showLoginDialog();
                }.bind(this));
            }.bind(this)
        });
    },
    handlePasswordKeyUp: function handlePasswordKeyUp(e) {
        if (e.keyCode === 13) {
            this.login();
        }
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { id: 'login_dialog_content', ref: 'content' },
            _react2.default.createElement(
                'div',
                { id: 'dialog', className: this.state.dialogClassName, ref: 'dialog' },
                _react2.default.createElement(
                    'div',
                    { id: 'head', className: 'clearfix' },
                    _react2.default.createElement(
                        'div',
                        { id: 'title_div' },
                        '\u767B\u5F55'
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'close_div' },
                        _react2.default.createElement(
                            'a',
                            { href: 'javascript:void(0);', onClick: this.closeLoginDialog },
                            'X'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'body' },
                    _react2.default.createElement(
                        'div',
                        { id: 'login_form' },
                        _react2.default.createElement(
                            'div',
                            { id: 'username_div' },
                            _react2.default.createElement('input', { id: 'username_input',
                                type: 'text',
                                ref: 'username',
                                placeholder: 'username' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'password_div' },
                            _react2.default.createElement('input', { id: 'password_input',
                                type: 'password',
                                ref: 'password',
                                onKeyUp: this.handlePasswordKeyUp,
                                placeholder: 'password' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'login_btn_div' },
                            _react2.default.createElement('input', { id: 'login_btn_input',
                                type: 'button',
                                value: '\u767B\u5F55',
                                onClick: this.login })
                        )
                    )
                )
            )
        );
    }
});
exports.default = LoginDialog;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(105);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./login_dialog.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./login_dialog.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#login_dialog_content {\n  /*默认隐藏*/\n  display: none;\n  width: 100%;\n  height: 100%;\n  line-height: 100%;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  z-index: 9998;\n  background-color: rgba(0, 0, 0, 0.8);\n  text-align: center; }\n  #login_dialog_content #dialog {\n    width: 300px;\n    display: inline-block !important;\n    display: inline;\n    padding: 10px 20px;\n    box-sizing: border-box;\n    background-color: #383d49;\n    border-radius: 2px; }\n    #login_dialog_content #dialog * {\n      color: white; }\n    #login_dialog_content #dialog > div {\n      width: 100%; }\n    #login_dialog_content #dialog #head {\n      border-bottom: 1px solid \"rgb(153,153,153)\"; }\n      #login_dialog_content #dialog #head > div {\n        padding: 15px 5px;\n        box-sizing: border-box;\n        width: 50%;\n        float: left; }\n      #login_dialog_content #dialog #head #title_div {\n        text-align: left; }\n      #login_dialog_content #dialog #head #close_div {\n        text-align: right; }\n        #login_dialog_content #dialog #head #close_div a {\n          cursor: pointer; }\n          #login_dialog_content #dialog #head #close_div a:hover {\n            color: rgb(153,153,153); }\n    #login_dialog_content #dialog #body {\n      width: 100%; }\n      #login_dialog_content #dialog #body #login_form {\n        width: 100%; }\n        #login_dialog_content #dialog #body #login_form > div {\n          width: 100%;\n          margin-bottom: 20px; }\n        #login_dialog_content #dialog #body #login_form #username_input {\n          height: 30px;\n          width: 100%;\n          border: 1px solid rgb(153,153,153);\n          color: black;\n          background-image: url(\"/image/username.png\");\n          background-size: 20px 20px;\n          background-repeat: no-repeat;\n          background-position: 5px;\n          border: 1px solid rgb(153,153,153);\n          padding-left: 30px;\n          box-sizing: border-box; }\n        #login_dialog_content #dialog #body #login_form #password_input {\n          height: 30px;\n          width: 100%;\n          border: 1px solid rgb(153,153,153);\n          color: black;\n          background-image: url(\"/image/password.png\");\n          background-size: 20px 20px;\n          background-repeat: no-repeat;\n          background-position: 5px;\n          padding-left: 30px;\n          box-sizing: border-box; }\n        #login_dialog_content #dialog #body #login_form #login_btn_input {\n          cursor: pointer;\n          height: 30px;\n          margin: 0px 25%;\n          width: 50%;\n          border: 1px solid rgb(61,158,255);\n          background-color: rgb(61,158,255);\n          color: white;\n          transition: all 500ms; }\n          #login_dialog_content #dialog #body #login_form #login_btn_input:hover {\n            background-color: white;\n            color: black;\n            border: 1px solid white;\n            border-radius: 3px; }\n", ""]);

// exports


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

__webpack_require__(107);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*注册框*/
//引入react组件
var RegistDialog = _react2.default.createClass({
    displayName: 'RegistDialog',

    getInitialState: function getInitialState() {
        return {
            dialogClassName: "",
            registFailure: "注册失败",
            registSuccess: "注册成功",
            registing: "正在注册,请稍等..."
        };
    },
    componentDidMount: function componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);

        //adjust ui
        this.adjustUI();
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    },
    onWindowResize: function onWindowResize() {
        this.adjustUI();
    },
    adjustUI: function adjustUI() {
        {
            /*调整样式*/
        }
        this.dialogToMiddle();
    },
    dialogToMiddle: function dialogToMiddle() {
        //垂直居中
        var dialog = $(this.refs.dialog);
        var content = $(this.refs.content);
        var dialog_h = dialog.height();
        var content_h = content.height();
        var top = (content_h - dialog_h) / 2;
        dialog.css("margin-top", top + "px");
    },
    showRegistDialog: function showRegistDialog() {
        //show it
        this.fadeIn();

        //adjust ui
        this.adjustUI();

        //get focus
        $(this.refs.username).focus();
    },
    closeRegistDialog: function closeRegistDialog() {
        //hide it
        this.fadeOut();
    },
    fadeIn: function fadeIn() {

        var state = this.state;
        $(this.refs.content).fadeIn();
        state.dialogClassName = "block animated bounceIn";
        this.setState(state);

        // c(this.state);
    },
    fadeOut: function fadeOut() {
        var state = this.state;
        state.dialogClassName = "animated bounceOut";
        $(this.refs.content).fadeOut();
        this.setState(state);
    },
    regist: function regist() {

        var username = $(this.refs.username).val();
        var password = $(this.refs.password).val();
        var url = "/user/regist?username=" + username + "&password=" + password;

        ajax.put({
            url: url,
            onBeforeRequest: function () {

                //close login dialog
                this.closeRegistDialog();

                //show loading dialog
                window.VmFrontendEventsDispatcher.showLoading(this.state.registing);
            }.bind(this),
            onResponseStart: function () {
                //close loading
                window.VmFrontendEventsDispatcher.closeLoading();
            }.bind(this),
            onResponseSuccess: function (result) {
                //hide regist dialog
                this.closeRegistDialog();

                //keep token
                localStorage.setItem(KEY_OF_ACCESS_TOKEN, result.data.user.token);

                //show msg dialog
                window.VmFrontendEventsDispatcher.showMsgDialog(this.state.registSuccess);

                //callfun
                this.props.onRegistSuccess(result.data.user);
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(this.state.registFailure, function () {
                    this.showRegistDialog();
                }.bind(this));
            }.bind(this)
        });
    },
    handlePasswordKeyUp: function handlePasswordKeyUp(e) {
        if (e.keyCode === 13) {
            this.regist();
        }
    },
    render: function render() {
        return _react2.default.createElement(
            'div',
            { id: 'regist_dialog_content', ref: 'content' },
            _react2.default.createElement(
                'div',
                { id: 'dialog', className: this.state.dialogClassName, ref: 'dialog' },
                _react2.default.createElement(
                    'div',
                    { id: 'head', className: 'clearfix' },
                    _react2.default.createElement(
                        'div',
                        { id: 'title_div' },
                        '\u6CE8\u518C'
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'close_div' },
                        _react2.default.createElement(
                            'a',
                            { href: 'javascript:void(0);', onClick: this.closeRegistDialog },
                            'X'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'body' },
                    _react2.default.createElement(
                        'div',
                        { id: 'regist_form' },
                        _react2.default.createElement(
                            'div',
                            { id: 'username_div' },
                            _react2.default.createElement('input', { id: 'username_input',
                                type: 'text',
                                ref: 'username',
                                placeholder: 'username' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'password_div' },
                            _react2.default.createElement('input', { id: 'password_input',
                                type: 'password',
                                ref: 'password',
                                onKeyUp: this.handlePasswordKeyUp,
                                placeholder: 'password' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'regist_btn_div' },
                            _react2.default.createElement('input', { id: 'regist_btn_input',
                                type: 'button',
                                value: '\u6CE8\u518C',
                                onClick: this.regist })
                        )
                    )
                )
            )
        );
    }
});
exports.default = RegistDialog;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(108);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./regist_dialog.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./regist_dialog.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#regist_dialog_content {\n  /*默认隐藏*/\n  display: none;\n  width: 100%;\n  height: 100%;\n  line-height: 100%;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  z-index: 9998;\n  background-color: rgba(0, 0, 0, 0.8);\n  text-align: center; }\n  #regist_dialog_content #dialog {\n    width: 300px;\n    display: inline-block !important;\n    display: inline;\n    padding: 10px 20px;\n    box-sizing: border-box;\n    background-color: #383d49;\n    border-radius: 2px; }\n    #regist_dialog_content #dialog * {\n      color: white; }\n    #regist_dialog_content #dialog > div {\n      width: 100%; }\n    #regist_dialog_content #dialog #head {\n      border-bottom: 1px solid \"rgb(153,153,153)\"; }\n      #regist_dialog_content #dialog #head > div {\n        padding: 15px 5px;\n        box-sizing: border-box;\n        width: 50%;\n        float: left; }\n      #regist_dialog_content #dialog #head #title_div {\n        text-align: left; }\n      #regist_dialog_content #dialog #head #close_div {\n        text-align: right; }\n        #regist_dialog_content #dialog #head #close_div a {\n          cursor: pointer; }\n          #regist_dialog_content #dialog #head #close_div a:hover {\n            color: rgb(153,153,153); }\n    #regist_dialog_content #dialog #body {\n      width: 100%; }\n      #regist_dialog_content #dialog #body #regist_form {\n        width: 100%; }\n        #regist_dialog_content #dialog #body #regist_form > div {\n          width: 100%;\n          margin-bottom: 20px; }\n        #regist_dialog_content #dialog #body #regist_form #username_input {\n          height: 30px;\n          width: 100%;\n          border: 1px solid rgb(153,153,153);\n          color: black;\n          background-image: url(\"/image/username.png\");\n          background-size: 20px 20px;\n          background-repeat: no-repeat;\n          background-position: 5px;\n          border: 1px solid rgb(153,153,153);\n          padding-left: 30px;\n          box-sizing: border-box; }\n        #regist_dialog_content #dialog #body #regist_form #password_input {\n          height: 30px;\n          width: 100%;\n          border: 1px solid rgb(153,153,153);\n          color: black;\n          background-image: url(\"/image/password.png\");\n          background-size: 20px 20px;\n          background-repeat: no-repeat;\n          background-position: 5px;\n          padding-left: 30px;\n          box-sizing: border-box; }\n        #regist_dialog_content #dialog #body #regist_form #regist_btn_input {\n          cursor: pointer;\n          height: 30px;\n          margin: 0px 25%;\n          width: 50%;\n          border: 1px solid rgb(61,158,255);\n          background-color: rgb(61,158,255);\n          color: white;\n          transition: all 500ms; }\n          #regist_dialog_content #dialog #body #regist_form #regist_btn_input:hover {\n            background-color: white;\n            color: black;\n            border: 1px solid white;\n            border-radius: 3px; }\n", ""]);

// exports


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(110);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./head.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./head.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n/*var start*/\n/*var end*/\n/*mixin start*/\n/*mixin end*/\n#fragment_head_content {\n  width: 100%;\n  height: 70px;\n  line-height: 70px;\n  background-color: white; }\n  #fragment_head_content #nav_div {\n    background-color: gold;\n    position: fixed;\n    top: 0px;\n    left: 0px;\n    z-index: 9997;\n    background-color: white; }\n    #fragment_head_content #nav_div ul#fragment_head_nav {\n      /*nav*/\n      list-style-type: none;\n      height: 70px;\n      line-height: 70px;\n      padding: 0px 0px;\n      margin: 0px 15%;\n      width: 70%;\n      /*user*/ }\n      #fragment_head_content #nav_div ul#fragment_head_nav li {\n        width: 50%;\n        float: left;\n        display: block;\n        height: 70px;\n        line-height: 70px; }\n      #fragment_head_content #nav_div ul#fragment_head_nav li#fragment_head_nav_logo #logo_v {\n        color: red;\n        font-weight: bold;\n        font-size: 30px; }\n      #fragment_head_content #nav_div ul#fragment_head_nav li#fragment_head_nav_logo #logo_m {\n        color: rgb(61,158,255);\n        font-weight: bold;\n        font-size: 30px; }\n      #fragment_head_content #nav_div ul#fragment_head_nav li#user_li ul {\n        list-style: none;\n        display: inline; }\n        #fragment_head_content #nav_div ul#fragment_head_nav li#user_li ul li {\n          display: inline-block;\n          white-space: nowrap;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          height: auto;\n          width: auto; }\n      #fragment_head_content #nav_div ul#fragment_head_nav li#user_li ul#user_ul li {\n        margin: 0px 10px; }\n        #fragment_head_content #nav_div ul#fragment_head_nav li#user_li ul#user_ul li a#headImg_a img#headImg_img {\n          border-radius: 100px;\n          width: 42px;\n          height: 42px;\n          margin: 14px 0px; }\n        #fragment_head_content #nav_div ul#fragment_head_nav li#user_li ul#user_ul li a:hover {\n          color: red; }\n  #fragment_head_content #blank_div {\n    height: 70px;\n    background-color: \"rgb(61,158,255)\"; }\n", ""]);

// exports


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(112);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tail = _react2.default.createClass({
    displayName: 'Tail',


    render: function render() {
        return _react2.default.createElement(
            'div',
            { id: 'fragment_tail_content' },
            _react2.default.createElement('img', { src: '/image/tail.png' })
        );
    }
}); //引入react组件
exports.default = Tail; //将App组件导出

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(113);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./tail.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./tail.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#fragment_tail_content {\n  height: 200px;\n  margin: 0px 15%;\n  width: 70%;\n  background-color: rgb(241,242,243);\n  margin-top: 30px; }\n", ""]);

// exports


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

__webpack_require__(115);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*等待展示*/
//引入react组件
var Loading = _react2.default.createClass({
    displayName: 'Loading',

    getInitialState: function getInitialState() {
        return {
            dialogClassName: "",
            nowMsg: "",
            defaultMsg: "请稍等..."
        };
    },
    componentDidMount: function componentDidMount() {

        window.addEventListener('resize', this.onWindowResize);

        //adjust ui
        this.adjustUI();

        //regist events
        this.registEvents();
    },
    registEvents: function registEvents() {
        var _this = this;

        window.event.on('showLoading', function (msg) {
            _this.showLoading(msg);
        });
        window.event.on('closeLoading', function () {
            _this.closeLoading();
        });
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    },
    onWindowResize: function onWindowResize() {
        this.adjustUI();
    },
    adjustUI: function adjustUI() {
        {
            /*调整样式*/
        }
        this.dialogToMiddle();
    },
    dialogToMiddle: function dialogToMiddle() {
        //垂直居中
        var dialog = $(this.refs.dialog);
        var content = $(this.refs.content);
        var dialog_h = dialog.height();
        var content_h = content.height();
        var top = (content_h - dialog_h) / 2;
        dialog.css("margin-top", top + "px");
    },
    updateStateNowMsg: function updateStateNowMsg(msg) {
        var state = this.state;
        state.nowMsg = msg;
        this.setState(state);
    },
    showLoading: function showLoading(msg) {
        //choice msg
        if (isEmpty(msg)) {
            this.updateStateNowMsg(this.state.defaultMsg);
        } else {
            this.updateStateNowMsg(msg);
        }

        //show it
        this.fadeIn();

        //adjust ui
        this.adjustUI();
    },
    closeLoading: function closeLoading() {

        //show it
        this.fadeOut();
    },

    fadeIn: function fadeIn() {

        var state = this.state;
        $(this.refs.content).fadeIn();
        state.dialogClassName = "block animated bounceIn";
        this.setState(state);

        // c(this.state);
    },
    fadeOut: function fadeOut() {
        var state = this.state;
        state.dialogClassName = "animated bounceOut";
        $(this.refs.content).fadeOut();
        this.setState(state);
    },
    render: function render() {

        return _react2.default.createElement(
            'div',
            { id: 'loading_content',
                ref: 'content' },
            _react2.default.createElement(
                'div',
                { id: 'dialog',
                    ref: 'dialog',
                    className: this.state.dialogClassName },
                _react2.default.createElement('img', { src: '/image/loading.gif' }),
                _react2.default.createElement(
                    'div',
                    null,
                    this.state.nowMsg
                )
            )
        );
    }
});
exports.default = Loading;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(116);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./loading.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./loading.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#loading_content {\n  /*默认隐藏*/\n  display: none;\n  width: 100%;\n  height: 100%;\n  line-height: 100%;\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  z-index: 10000;\n  background-color: rgba(0, 0, 0, 0.8);\n  text-align: center; }\n  #loading_content #dialog {\n    height: 100px;\n    width: 300px;\n    display: inline-block !important;\n    display: inline;\n    padding: 10px 20px;\n    box-sizing: border-box;\n    background-color: rgba(56, 61, 73, 0);\n    border-radius: 2px; }\n    #loading_content #dialog * {\n      color: white; }\n    #loading_content #dialog img {\n      width: 20px;\n      height: 20px; }\n    #loading_content #dialog div {\n      height: 40px;\n      line-height: 40px;\n      width: 100%; }\n", ""]);

// exports


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

var _plain_panel_title = __webpack_require__(11);

var _plain_panel_title2 = _interopRequireDefault(_plain_panel_title);

var _user_basic_info_page = __webpack_require__(118);

var _user_basic_info_page2 = _interopRequireDefault(_user_basic_info_page);

var _user_head_page = __webpack_require__(124);

var _user_head_page2 = _interopRequireDefault(_user_head_page);

__webpack_require__(130);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*用户个人中心*/
var UserPage = _react2.default.createClass({
    displayName: "UserPage",

    getInitialState: function getInitialState() {
        return {

            basicInfoUrl: "/user/online/basicInfo",
            headUrl: "/user/online/head"
            // userId: this.props.match.params.userId
        };
    },
    componentDidMount: function componentDidMount() {},

    render: function render() {
        //是否为非法进入,即用户未登录的情况下进入
        window.VmFrontendEventsDispatcher.feelerOnlineUser();

        return _react2.default.createElement(
            "div",
            { id: "user_info", className: "defaultPanel" },
            _react2.default.createElement(_plain_panel_title2.default, { title: this.state.title }),
            _react2.default.createElement(
                "div",
                { id: "content",
                    className: "clearfix" },
                _react2.default.createElement(
                    "div",
                    { id: "nav" },
                    _react2.default.createElement(
                        "ul",
                        { id: "nav_ul" },
                        _react2.default.createElement(
                            "li",
                            null,
                            _react2.default.createElement(
                                _reactRouterDom.NavLink,
                                { to: this.state.basicInfoUrl,
                                    activeClassName: "active" },
                                "\u57FA\u672C\u4FE1\u606F"
                            )
                        ),
                        _react2.default.createElement(
                            "li",
                            null,
                            _react2.default.createElement(
                                _reactRouterDom.NavLink,
                                { to: this.state.headUrl,
                                    activeClassName: "active" },
                                "\u5934\u50CF\u4FEE\u6539"
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { id: "displayer" },
                    _react2.default.createElement(
                        _reactRouterDom.Switch,
                        null,
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.state.basicInfoUrl, component: _user_basic_info_page2.default }),
                        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: this.state.headUrl, component: _user_head_page2.default })
                    )
                )
            )
        );
    }
}); //引入react组件
exports.default = (0, _reactRouterDom.withRouter)(UserPage);

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(5);

var _dater = __webpack_require__(119);

var _dater2 = _interopRequireDefault(_dater);

__webpack_require__(122);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*用户基本信息页面*/
var UserBasicInfoPage = _react2.default.createClass({
    displayName: "UserBasicInfoPage",

    getInitialState: function getInitialState() {
        // c(props);
        return {
            // userId: this.props.match.params.userId,
            getInfoFailure: "获取信息失败",
            title: "用户个人信息",
            updateUserBasicInfoSuccess: "更新用户信息成功",
            updateUserBasicInfoFailure: "更新用户信息失败",
            updatingUserBasicInfo: "正在更新用户信息",
            user: {}
        };
    },
    componentDidMount: function componentDidMount() {
        window.VmFrontendEventsDispatcher.getOnlineUser({
            onGetOnlineUser: function (u) {
                this.updateStateUser(u);
            }.bind(this)
        });
    },

    updateStateUser: function updateStateUser(user) {
        if (isEmpty(user)) {
            user = {};
        }
        var state = this.state;
        state.user = user;
        this.setState(state);
    },
    handleBirthdayChange: function handleBirthdayChange(date) {
        // c("handleBirthdayChange");
        var t = parseInt(date.getTime()) / 1000;
        // c("t.toFixed(0)");
        // c(t.toFixed(0));
        // c(t);
        this.updateUserBirthday(t.toFixed(0));
    },
    updateUserBirthday: function updateUserBirthday(birthday) {
        var user = this.state.user;
        user.birthday = birthday;
        this.updateStateUser(user);
    },
    updateUserBasicInfo: function updateUserBasicInfo(callfun) {
        window.EventsDispatcher.showLoading(this.state.updatingUserBasicInfo);
        var url = "/user/online";
        ajax.put({
            url: url,
            data: this.state.user,
            onBeforeRequest: function () {}.bind(this),
            onResponseStart: function () {
                window.EventsDispatcher.closeLoading();
            }.bind(this),
            onResponseSuccess: function (result) {
                var u = result.data.user;
                //update user in state
                this.updateStateUser(u);

                // c("u1");
                // c(u);

                window.VmFrontendEventsDispatcher.showMsgDialog(this.state.updateUserBasicInfoSuccess);
            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(this.state.updateUserBasicInfoFailure);
            }.bind(this),
            onResponseEnd: function () {
                //callfun
                if (callfun != undefined) {
                    callfun();
                }
            }.bind(this, callfun)
        });
    },
    handleUsernameChange: function handleUsernameChange(e) {
        var username = e.target.value;
        // c(username);
        // $(this.refs.username).value(username);
        // this.updateStateUsername(username);禁止更新username
    },
    updateStateUsername: function updateStateUsername(username) {
        var user = this.state.user;
        user.username = username;
        this.updateStateUser(user);
    },
    handleDescriptionChange: function handleDescriptionChange(e) {
        var description = e.target.value;
        c(description);
        // $(this.refs.description).value(description);
        this.updateStateDescription(description);
    },
    updateStateDescription: function updateStateDescription(description) {
        var user = this.state.user;
        user.description = description;
        this.updateStateUser(user);
    },
    handleSexChange: function handleSexChange(e) {
        var sex = e.target.value;
        c(sex);
        // $(this.refs.sex).value(sex);
        this.updateStateSex(sex);
    },
    updateStateSex: function updateStateSex(sex) {
        var user = this.state.user;
        user.sex = sex;

        this.updateStateUser(user);
    },
    render: function render() {
        var _this = this;

        var t = parseInt(this.state.user.birthday);
        var birthday = new Date(t * 1000);
        return _react2.default.createElement(
            "div",
            { id: "user_basic_info_content", className: "clearfix" },
            _react2.default.createElement(
                "div",
                { id: "basic_info" },
                _react2.default.createElement(
                    "form",
                    null,
                    _react2.default.createElement(
                        "div",
                        { id: "displayer" },
                        _react2.default.createElement(
                            "div",
                            { id: "username_div", className: "info_item clearfix" },
                            _react2.default.createElement(
                                "label",
                                null,
                                "\u6635\u79F0 : "
                            ),
                            _react2.default.createElement("span", { className: "split" }),
                            _react2.default.createElement(
                                "span",
                                { className: "content" },
                                _react2.default.createElement("input", { onChange: this.handleUsernameChange, value: this.state.user.username })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { id: "sex_div", className: "info_item clearfix" },
                            _react2.default.createElement(
                                "label",
                                null,
                                "\u6027\u522B : "
                            ),
                            _react2.default.createElement("span", { className: "split" }),
                            _react2.default.createElement(
                                "span",
                                { className: "content" },
                                _react2.default.createElement(
                                    "select",
                                    { defaultValue: this.state.user.sex,
                                        value: this.state.user.sex,
                                        onChange: this.handleSexChange },
                                    _react2.default.createElement(
                                        "option",
                                        { value: "1" },
                                        "\u7537"
                                    ),
                                    _react2.default.createElement(
                                        "option",
                                        { value: "2" },
                                        "\u5973"
                                    ),
                                    _react2.default.createElement(
                                        "option",
                                        { value: "3" },
                                        "\u4FDD\u5BC6"
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { id: "birthday_div", className: "info_item clearfix" },
                            _react2.default.createElement(
                                "label",
                                null,
                                "\u751F\u65E5 : "
                            ),
                            _react2.default.createElement("span", { className: "split" }),
                            _react2.default.createElement(
                                "span",
                                { className: "content" },
                                _react2.default.createElement(_dater2.default, { defaultDate: birthday,
                                    onDateChange: this.handleBirthdayChange })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { id: "description_div", className: "info_item clearfix" },
                            _react2.default.createElement(
                                "label",
                                null,
                                "\u63CF\u8FF0 : "
                            ),
                            _react2.default.createElement("span", { className: "split" }),
                            _react2.default.createElement(
                                "span",
                                { className: "content" },
                                _react2.default.createElement("textarea", { placeholder: "\u8BF7\u8F93\u5165\u63CF\u8FF0\u4FE1\u606F",
                                    onChange: this.handleDescriptionChange,
                                    value: this.state.user.description })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            { id: "confirm_div" },
                            _react2.default.createElement("input", { type: "button",
                                onClick: function onClick() {
                                    _this.updateUserBasicInfo();
                                },
                                value: "\u786E\u5B9A" })
                        )
                    )
                )
            ),
            _react2.default.createElement(
                "div",
                { id: "tip" },
                _react2.default.createElement(
                    "p",
                    null,
                    "\u8BF7\u60A8\u5B8C\u5584\u8D26\u6237\u57FA\u672C\u4FE1\u606F"
                )
            )
        );
    }
}); //引入react组件
exports.default = UserBasicInfoPage;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(120);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*日期插件*/
var Dater = _react2.default.createClass({
    displayName: "Dater",

    getInitialState: function getInitialState() {
        //init default value
        var now = new Date();
        //init maxYear
        var maxYear = now.getFullYear();

        //init minYear
        var minYear = maxYear - 100;

        if (!isEmpty(this.props.minYear) && this.props.minYear <= maxYear) {
            minYear = this.props.minYear;
        }

        //init years
        var years = [];
        for (var i = maxYear; i >= minYear; i--) {
            years.push(i);
        }
        //init months
        var months = [];
        for (var i = 1; i <= 12; i++) {
            months.push(i);
        }
        //init days
        var days = [];
        var maxDay = now.getCountOfMonthDay();
        for (var i = 1; i <= maxDay; i++) {
            days.push(i);
        }

        return {
            years: years,
            months: months,
            days: days,
            now: now,
            minYear: minYear,
            maxYear: maxYear
        };
    },
    splitDate: function splitDate(originalJsDate) {
        var date = undefined;
        if (!isUndefined(originalJsDate)) {

            var year = originalJsDate.getFullYear();
            var month = originalJsDate.getMonth() + 1;
            var day = originalJsDate.getDate();
            date = { year: year, month: month, day: day };
        }
        return date;
    },
    componentDidMount: function componentDidMount() {},
    getDate: function getDate() {
        var year = $(this.refs.year).val();
        var month = $(this.refs.month).val();
        var day = $(this.refs.day).val();
        var d = new Date();
        d.setFullYear(year);
        d.setMonth(month - 1);
        d.setDate(day);
        return d;
    },

    generateOptions: function generateOptions(values) {
        var res = [];
        for (var i = 0; i < values.length; i++) {
            var value = values[i];

            res.push(_react2.default.createElement(
                "option",
                { key: value,
                    value: value },
                value
            ));
        }
        return res;
    },
    render: function render() {
        var _this = this;

        var now = this.state.now;
        //init date
        var date = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate()
        };
        if (!isUndefined(this.props.defaultDate)) {
            date = this.splitDate(this.props.defaultDate);
        }
        // c("render");
        // c(date);
        return _react2.default.createElement(
            "span",
            { id: "date_content" },
            _react2.default.createElement(
                "span",
                null,
                _react2.default.createElement(
                    "select",
                    { id: "year",
                        ref: "year",
                        defaultValue: "",
                        value: date.year,
                        onChange: function onChange() {
                            _this.props.onDateChange(_this.getDate());
                        } },
                    this.generateOptions(this.state.years)
                ),
                "\u5E74"
            ),
            _react2.default.createElement(
                "span",
                null,
                _react2.default.createElement(
                    "select",
                    { id: "month",
                        ref: "month",
                        defaultValue: "",
                        value: date.month,
                        onChange: function onChange() {
                            _this.props.onDateChange(_this.getDate());
                        } },
                    this.generateOptions(this.state.months)
                ),
                "\u6708"
            ),
            _react2.default.createElement(
                "span",
                null,
                _react2.default.createElement(
                    "select",
                    { id: "day",
                        ref: "day",
                        defaultValue: "",
                        value: date.day,
                        onChange: function onChange() {
                            _this.props.onDateChange(_this.getDate());
                        } },
                    this.generateOptions(this.state.days)
                ),
                "\u65E5"
            )
        );
    }
}); //引入react组件
exports.default = Dater;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(121);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./dater.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./dater.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#date_content {\n  width: 100%; }\n  #date_content span {\n    margin-right: 10px; }\n    #date_content span select {\n      height: 20px;\n      line-height: 20px;\n      border: 1px solid rgb(61,158,255);\n      width: 50px; }\n", ""]);

// exports


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(123);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./user_basic_info_page.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./user_basic_info_page.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#user_basic_info_content {\n  width: 100%; }\n  #user_basic_info_content > div {\n    float: left; }\n  #user_basic_info_content #basic_info {\n    width: 70%;\n    padding: 20px;\n    box-sizing: border-box; }\n    #user_basic_info_content #basic_info #displayer {\n      width: 100%; }\n      #user_basic_info_content #basic_info #displayer .info_item {\n        margin-bottom: 20px;\n        display: flex;\n        width: 100%; }\n        #user_basic_info_content #basic_info #displayer .info_item > * {\n          float: left;\n          display: block; }\n        #user_basic_info_content #basic_info #displayer .info_item label {\n          width: 50px;\n          text-align: right;\n          font-size: 14px;\n          height: 20px;\n          line-height: 20px; }\n        #user_basic_info_content #basic_info #displayer .info_item span.split {\n          width: 10px; }\n        #user_basic_info_content #basic_info #displayer .info_item span.content {\n          flex: 1; }\n      #user_basic_info_content #basic_info #displayer #username_div input {\n        height: 20px;\n        line-height: 20px;\n        border: 1px solid rgb(61,158,255);\n        width: 150px; }\n      #user_basic_info_content #basic_info #displayer #sex_div select {\n        height: 20px;\n        line-height: 20px;\n        border: 1px solid rgb(61,158,255);\n        width: 50px; }\n      #user_basic_info_content #basic_info #displayer #birthday_div {\n        /*input {\r\n          height: $input_height;\r\n          line-height: $input_height;\r\n          border: 1px solid unquote($defaultBlueRgb);\r\n          width: 150px;\r\n        }*/ }\n      #user_basic_info_content #basic_info #displayer #description_div textarea {\n        height: 20px;\n        line-height: 20px;\n        border: 1px solid rgb(61,158,255);\n        width: 70%;\n        height: 150px;\n        resize: none; }\n      #user_basic_info_content #basic_info #displayer #confirm_div {\n        width: 100%;\n        text-align: center; }\n        #user_basic_info_content #basic_info #displayer #confirm_div input {\n          cursor: pointer;\n          color: white;\n          border: 1px solid rgb(61,158,255);\n          height: 30px;\n          width: 60px;\n          background-color: rgb(61,158,255); }\n  #user_basic_info_content #tip {\n    padding-left: 30px;\n    box-sizing: border-box;\n    width: 30%; }\n", ""]);

// exports


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(125);

var _img_uploader = __webpack_require__(127);

var _img_uploader2 = _interopRequireDefault(_img_uploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*用户头像页面*/
//引入react组件
var UserHeadPage = _react2.default.createClass({
    displayName: "UserHeadPage",

    getInitialState: function getInitialState() {
        var config = {
            aspectRatio: 1 / 1,
            fileTypes: ["jpg", "png"],
            fileMaxsize: 1024 * 1024 * 1, //2M
            saveImgUrl: "/user/online/img",
            uploadTempImgUrl: "/src/img"
        };
        return {
            config: config,
            // userId: this.props.match.params.userId,
            getInfoFailure: "获取信息失败",
            userHeadRequestWidth: 300,
            user: {}
        };
    },
    componentDidMount: function componentDidMount() {
        window.VmFrontendEventsDispatcher.getOnlineUser({
            onGetOnlineUser: function (u) {
                var imgUrl = generateImgUrl({
                    imgUrl: u.imgUrl,
                    width: this.state.userHeadRequestWidth
                });
                //预览头像
                this.getUserHeadUploader().previewImg(imgUrl);
            }.bind(this)
        });
    },
    getUserHeadUploader: function getUserHeadUploader() {
        return this.refs.userHeadUploader;
    },
    previewHeadImg: function previewHeadImg(imgUrl) {
        this.getUserHeadUploader().previewImg(imgUrl);
    },
    onUpdateImgSuccess: function onUpdateImgSuccess(result) {
        this.getUserHeadUploader().previewImg(generateImgUrl({
            imgUrl: result.data.imgUrl,
            width: 300
        }));
        window.EventsDispatcher.updateHeadComponentUser(result.data.user);
    },
    onUploadTempImgSuccess: function onUploadTempImgSuccess(result) {

        this.getUserHeadUploader().previewImg(generateImgUrl({
            imgUrl: result.data.imgUrl
        }));
    },

    render: function render() {
        return _react2.default.createElement(
            "div",
            { id: "user_head_content", className: "clearfix" },
            _react2.default.createElement(
                "div",
                { id: "react_img_uploader" },
                _react2.default.createElement(_img_uploader2.default, { ref: "userHeadUploader",
                    config: this.state.config,
                    onUpdateImgSuccess: this.onUpdateImgSuccess,
                    onUploadTempImgSuccess: this.onUploadTempImgSuccess })
            ),
            _react2.default.createElement(
                "div",
                { id: "tip" },
                _react2.default.createElement(
                    "p",
                    null,
                    "\u5728\u8FD9\u91CC\u53EF\u4EE5\u4E0A\u4F20\u60A8\u7684\u5934\u50CF"
                )
            )
        );
    }
});
exports.default = UserHeadPage;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(126);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./user_head_page.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./user_head_page.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#user_head_content {\n  display: flex; }\n  #user_head_content div {\n    float: left; }\n  #user_head_content #react_img_uploader {\n    flex: 2; }\n  #user_head_content #tip {\n    padding-left: 30px;\n    box-sizing: border-box;\n    flex: 1; }\n", ""]);

// exports


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(128);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 图片上传组件
 */
var ImgUpload = _react2.default.createClass({
    displayName: "ImgUpload",

    getInitialState: function getInitialState() {

        // var config = {
        //     fileTypes: ["jpg", "png"],
        //     fileMaxsize: 1024 * 1024 * 2,//1M
        //     saveImgUrl:"/online/img",//服务器接受x,y,w,h,fileId等参数,返回newImgUrl
        //     uploadTempImgUrl:"/online/img/temp",//服务器接受imgFile,返回tempImgUrl和fileId
        //      server_url_prefix:""
        // };
        var config = this.props.config;
        return {
            config: config,
            uploadTempImgTip: "正在读取图片",
            saveImg: "正在保存图片",
            userImgFileTooMax: "文件过大,最大允许 : " + config.fileMaxsize / 1024 + " kb",
            userImgFileExtError: "文件类型错误,允许的文件类型 : " + config.fileTypes,
            userImgFileIsEmpty: "请选择一个文件",
            userImgUpdateSuccess: "图片更新成功",
            willUpdatedImgInfo: {
                fileId: undefined //服务器临时保存的用户头像的filename，如a.png，如果为undefined，那么将禁止其更新头像
            },
            $imgPreview: undefined
        };
    },
    componentDidMount: function componentDidMount() {
        // this.previewImg(this.state.config.defaultDisplayImg);
    },
    validateImgFileOnSubmit: function validateImgFileOnSubmit() {
        //服务器未接收到相关的图片缓存
        if (isUndefined(this.state.willUpdatedImgInfo.fileId)) {
            throw this.state.userImgFileIsEmpty;
        }
    },
    validateImgFileOnChoice: function validateImgFileOnChoice(imgFile) {

        // c(imgFile);

        //unselect, size
        if (isUndefined(imgFile) || isUndefined(imgFile.size)) {
            throw this.state.userImgFileIsEmpty;
        }
        if (imgFile.size > this.state.config.fileMaxsize) {
            throw this.state.userImgFileTooMax;
        }
        var ext = getFileNameExt(imgFile.name);
        if (!this.state.config.fileTypes.contains(ext)) {
            throw this.state.userImgFileExtError;
        }
    },
    getImgInput: function getImgInput() {
        return $(this.refs.imgInput);
    },
    getImgFile: function getImgFile() {
        return this.getImgInput().get(0).files[0];
    },
    updateStateImgPreview: function updateStateImgPreview($imgPreview) {
        var state = this.state;
        state.$imgPreview = $imgPreview;
        this.setState(state);
    },
    previewImg: function previewImg(imgUrl) {
        setTimeout(function () {
            this.previewImgWait(imgUrl);
        }.bind(this));
    },
    previewImgWait: function previewImgWait(imgUrl) {

        var updateWillUpdateUserImgInfo = function (e) {

            var $imageBoxData = this.state.willUpdatedImgInfo;

            $imageBoxData.x = Math.round(e.x);
            $imageBoxData.y = Math.round(e.y);

            $imageBoxData.height = Math.round(e.height);
            $imageBoxData.width = Math.round(e.width);

            $imageBoxData.rotate = Math.round(e.rotate);
            $imageBoxData.scaleX = Math.round(e.scaleX);
            $imageBoxData.scaleY = Math.round(e.scaleY);

            var state = this.state;
            state.willUpdatedImgInfo = $imageBoxData;
            this.setState(state);

            return $imageBoxData;
        }.bind(this);

        var $previews = $('.preview');
        //cropper options
        var options = {
            aspectRatio: this.state.config.aspectRatio,
            viewMode: 2,
            ready: function ready(e) {
                // console.log(e.type);

                var $clone = $(this).clone().removeClass('cropper-hidden');

                $clone.css({
                    display: 'block',
                    width: '100%',
                    minWidth: 0,
                    minHeight: 0,
                    maxWidth: 'none',
                    maxHeight: 'none'
                });

                $previews.css({
                    width: '100%',
                    overflow: 'hidden'
                }).html($clone);
            },
            cropstart: function cropstart(e) {
                console.log(e.type, e.action);
            },
            cropmove: function cropmove(e) {
                console.log(e.type, e.action);
            },
            cropend: function cropend(e) {
                console.log(e.type, e.action);
            },
            crop: function crop(e) {

                updateWillUpdateUserImgInfo(e);

                var imageData = $(this).cropper('getImageData');

                var previewAspectRatio = e.width / e.height;
                $previews.each(function () {
                    var $preview = $(this);
                    var previewWidth = $preview.width();
                    var previewHeight = previewWidth / previewAspectRatio;
                    var imageScaledRatio = e.width / previewWidth;

                    $preview.height(previewHeight).find('img').css({
                        width: imageData.naturalWidth / imageScaledRatio,
                        height: imageData.naturalHeight / imageScaledRatio,
                        marginLeft: -e.x / imageScaledRatio,
                        marginTop: -e.y / imageScaledRatio
                    });
                });
            },
            zoom: function zoom(e) {
                c(e.type, e.ratio);
            }
        };
        if (isUndefined(this.state.$imgPreview)) {
            var $imgPreview = $(this.refs.imgPreview);
            //init cropper
            $imgPreview.cropper(options);
            this.updateStateImgPreview($imgPreview);
        }
        // a(this.state.config.server_url_prefix + imgUrl);

        this.state.$imgPreview.cropper("replace", imgUrl);
    },
    uploadTempImg: function uploadTempImg(callfun) {

        var imgInput = this.getImgInput();
        var imgFile = this.getImgFile();
        //validateImgFileOnChoice
        try {
            this.validateImgFileOnChoice(imgFile);
        } catch (e) {
            // window.EventsDispatcher.closeLoading();
            window.EventsDispatcher.showMsgDialog(e);

            // clear input #file
            // this.clearImgInput();
            //back self original img
            // this.previewImg(this.state.user.ImgUrl);
            return;
        }

        window.EventsDispatcher.showLoading(this.state.uploadTempImgTip);

        var formData = new FormData();
        formData.append("file", imgFile);
        // var userId = this.state.user.id;
        var url = this.state.config.uploadTempImgUrl;
        ajax.post({
            url: url,
            data: formData,
            enctype: 'multipart/form-data',
            contentType: false, //必须false才会避开jQuery对 formdata 的默认处理 XMLHttpRequest会对 formdata 进行正确的处理
            processData: false, //必须false才会自动加上正确的Content-Type
            onBeforeRequest: function () {}.bind(this),
            onResponseStart: function () {
                window.EventsDispatcher.closeLoading();
            }.bind(this),
            onResponseSuccess: function (result) {
                //更新服务器暂存图片名
                this.updateTempFileId(result.data.fileId);

                this.props.onUploadTempImgSuccess(result);
            }.bind(this),
            onResponseFailure: function (result) {}.bind(this),
            onResponseEnd: function () {
                //callfun
                if (callfun != undefined) {
                    callfun();
                }
            }.bind(this),
            onRequestError: function () {}.bind(this)
        });
    },
    updateTempFileId: function updateTempFileId(fileId) {
        var state = this.state;
        state.willUpdatedImgInfo.fileId = fileId;
        this.setState(state);
    },
    clearImgInput: function clearImgInput() {
        this.getImgInput().val("");
    },
    saveImg: function saveImg(callfun) {

        try {
            this.validateImgFileOnSubmit();
        } catch (e) {
            // window.EventsDispatcher.closeLoading();
            window.EventsDispatcher.showMsgDialog(e);
            return;
        }

        window.EventsDispatcher.showLoading();

        // var userId = this.state.user.id;
        var url = this.state.config.saveImgUrl;
        var data = this.state.willUpdatedImgInfo;
        // data.serverCacheFileName = this.state.serverTempImgFileName;
        ajax.put({
            url: url,
            data: data,
            loadingMsg: this.state.saveImg,
            onBeforeRequest: function () {}.bind(this),
            onResponseStart: function () {
                window.EventsDispatcher.closeLoading();
            }.bind(this),
            onResponseSuccess: function (result) {

                window.EventsDispatcher.showMsgDialog(this.state.userImgUpdateSuccess);

                // clear temp filename
                this.updateTempFileId(undefined);

                this.clearImgInput();

                this.props.onUpdateImgSuccess(result);
            }.bind(this),
            onResponseFailure: function (result) {}.bind(this),
            onResponseEnd: function () {
                //callfun
                if (callfun != undefined) {
                    callfun();
                }
            }.bind(this),
            onRequestError: function () {}.bind(this)
        });
    },

    render: function render() {
        var _this = this;

        return _react2.default.createElement(
            "div",
            { id: "img_uploader", className: "clearfix" },
            _react2.default.createElement(
                "div",
                { id: "img_upload" },
                _react2.default.createElement(
                    "div",
                    { id: "img_upload_to_middle_div" },
                    _react2.default.createElement(
                        "div",
                        { id: "imgPreviewWrapper",
                            ref: "imgPreviewWrapper" },
                        _react2.default.createElement("img", { src: "",
                            id: "imgPreview",
                            ref: "imgPreview" })
                    ),
                    _react2.default.createElement(
                        "div",
                        { id: "btns_div" },
                        _react2.default.createElement("input", { type: "file",
                            ref: "imgInput",
                            name: "img",
                            id: "imgInput",
                            onChange: function onChange() {
                                _this.uploadTempImg();
                            } }),
                        _react2.default.createElement("input", { type: "button",
                            className: "operateBtn",
                            id: "uploadTempImgBtn",
                            value: "\u9009\u62E9\u56FE\u7247",
                            onClick: function onClick() {
                                _this.refs.imgInput.click();
                            } }),
                        _react2.default.createElement("input", { type: "button",
                            className: "operateBtn",
                            id: "imgSaveBtn",
                            ref: "imgSaveBtn",
                            onClick: function onClick() {
                                _this.saveImg();
                            },
                            value: "\u4FDD\u5B58"
                        })
                    )
                )
            ),
            _react2.default.createElement(
                "div",
                { id: "head_preview" },
                _react2.default.createElement(
                    "p",
                    null,
                    "\u9884\u89C8 : "
                ),
                _react2.default.createElement(
                    "div",
                    { id: "imgPreview0" },
                    _react2.default.createElement("div", { className: "preview" }),
                    "80x"
                ),
                _react2.default.createElement(
                    "div",
                    { id: "imgPreview1" },
                    _react2.default.createElement("div", { className: "preview" }),
                    "50x"
                ),
                _react2.default.createElement(
                    "div",
                    { id: "imgPreview2" },
                    _react2.default.createElement("div", { className: "preview" }),
                    "30x"
                )
            )
        );
    }
}); //引入react组件
exports.default = ImgUpload;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(129);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./img_uploader.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./img_uploader.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#img_uploader {\n  display: flex; }\n  #img_uploader > div {\n    float: left; }\n  #img_uploader #img_upload {\n    width: 400px;\n    padding-left: 50px;\n    box-sizing: border-box; }\n    #img_uploader #img_upload #img_upload_to_middle_div {\n      margin: 0px auto;\n      width: 300px; }\n      #img_uploader #img_upload #img_upload_to_middle_div > * {\n        display: block; }\n      #img_uploader #img_upload #img_upload_to_middle_div #imgPreviewWrapper {\n        width: 300px;\n        height: 300px; }\n        #img_uploader #img_upload #img_upload_to_middle_div #imgPreviewWrapper #imgPreview {\n          width: 300px;\n          height: 300px; }\n      #img_uploader #img_upload #img_upload_to_middle_div #btns_div {\n        margin-top: 15px;\n        width: 100%; }\n        #img_uploader #img_upload #img_upload_to_middle_div #btns_div > .operateBtn {\n          background-color: white;\n          color: \"rgb(61,158,255)\";\n          border: 1px solid rgb(61,158,255);\n          width: 100px;\n          height: 30px;\n          cursor: pointer;\n          transition: all 500ms; }\n          #img_uploader #img_upload #img_upload_to_middle_div #btns_div > .operateBtn:hover {\n            background-color: rgb(61,158,255);\n            border-radius: 99px;\n            color: white; }\n        #img_uploader #img_upload #img_upload_to_middle_div #btns_div #uploadTempImgBtn {\n          float: left; }\n        #img_uploader #img_upload #img_upload_to_middle_div #btns_div #imgInput {\n          display: none; }\n        #img_uploader #img_upload #img_upload_to_middle_div #btns_div #imgSaveBtn {\n          float: right; }\n  #img_uploader #head_preview {\n    flex: 1; }\n    #img_uploader #head_preview > * {\n      margin-left: 20px; }\n    #img_uploader #head_preview #imgPreview0 {\n      width: 80px;\n      height: 80px; }\n    #img_uploader #head_preview #imgPreview1 {\n      width: 50px;\n      height: 50px; }\n    #img_uploader #head_preview #imgPreview2 {\n      width: 30px;\n      height: 30px; }\n", ""]);

// exports


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(131);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./user_page.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./user_page.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/* 一般用于div居中\r\n * $marginPercent：距离左右的距离\r\n */\n/*水平ul*/\n.aLink, .aLink a {\n  cursor: pointer;\n  color: rgb(61,158,255);\n  transition: all 500ms; }\n  .aLink:hover, .aLink a:hover {\n    color: red; }\n\n.block {\n  display: block; }\n\n.none {\n  display: none; }\n\n.clear {\n  clear: both; }\n\n.clearfix:before, .clearfix:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  overflow: hidden; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n.defaultPanel {\n  width: 100%;\n  border-radius: 3px;\n  background-color: white;\n  padding: 20px 20px;\n  box-sizing: border-box; }\n\n* {\n  padding: 0px 0px;\n  margin: 0px 0px;\n  width: 100%;\n  text-decoration: none;\n  outline: none;\n  color: rgb(153,153,153);\n  font-size: 12px;\n  fontFamily: \"Microsoft YaHei UI\"; }\n\nbody, html {\n  width: 100%;\n  height: 100%;\n  padding: 0px 0px;\n  margin: 0px 0px;\n  background-color: rgb(241,242,243); }\n\n#user_info {\n  margin: 0px 15%;\n  width: 70%;\n  margin-top: 20px; }\n  #user_info #content {\n    width: 100%;\n    display: flex; }\n    #user_info #content > div {\n      float: left; }\n    #user_info #content #nav {\n      padding: 10px 10px;\n      box-sizing: border-box;\n      width: 200px;\n      background-color: rgb(241,242,243); }\n      #user_info #content #nav #nav_ul {\n        list-style: none;\n        display: block;\n        width: 100%; }\n        #user_info #content #nav #nav_ul li {\n          display: block;\n          width: 100%; }\n          #user_info #content #nav #nav_ul li a {\n            display: block;\n            width: 100%;\n            height: 40px;\n            line-height: 40px;\n            text-align: center;\n            font-size: 15px; }\n          #user_info #content #nav #nav_ul li .active {\n            background-color: rgb(61,158,255);\n            color: white; }\n    #user_info #content #displayer {\n      flex: 1; }\n", ""]);

// exports


/***/ })
/******/ ]);