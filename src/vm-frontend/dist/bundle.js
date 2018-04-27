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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(8))(7);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(vm_config) {

function fail(code) {
    return code < 0;
}

function success(code) {
    return code > 0;
}
function offline(code) {
    return code == vm_config.offline_code;
}

/**
 * json用data传递-后台使用@RequestBody;<br/>
 * 非json用url拼接-后台使用@RequestParam
 * @type {{ajaxError: string, requestServerSuccess: ajax.requestServerSuccess, requestServerError: ajax.requestServerError, ajax: ajax.ajax, get: ajax.get, put: ajax.put, post: ajax.post, contentType: {TEXT: string, JSON: string}}}
 */
var ajax = {
    ajaxError: "网络不佳,请稍后重试",
    offline: "您已离线",
    startResponse: function startResponse(args, result) {
        window.EventsDispatcher.closeLoading();
        if (!isUndefined(args)) {
            if (!isUndefined(args.onResponseStart)) {
                args.onResponseStart();
            }
        }
    },
    endResponse: function endResponse(args, result) {
        if (!isUndefined(args)) {
            if (!isUndefined(args.onResponseEnd)) {
                args.onResponseEnd();
            }
        }
    },
    requestServerSuccess: function requestServerSuccess(args, result) {
        if (isUndefined(result)) {
            return;
        }
        if (offline(result.code)) {
            //离线
            //show some tip
            window.VmFrontendEventsDispatcher.showMsgDialog(this.offline, function () {});
            //protect user page
            window.VmFrontendEventsDispatcher.protectPage();

            return;
        }
        if (fail(result.code) && !isUndefined(args.onResponseFailure)) {
            args.onResponseFailure(result);
        }
        if (success(result.code) && !isUndefined(args.onResponseSuccess)) {
            args.onResponseSuccess(result);
        }
    },
    requestServerError: function requestServerError(args, XMLHttpRequest, textStatus, errorThrown) {
        console.error(XMLHttpRequest);
        console.error(textStatus);
        console.error(errorThrown);
        if (args.ignoreAjaxError != true) {
            window.VmFrontendEventsDispatcher.showMsgDialog(this.ajaxError, function () {});
        }

        if (!isUndefined(args.onRequestError)) {
            args.onRequestError();
        }
    },
    ajax: function ajax(args) {
        //handler args.onBeforeRequest
        if (!isUndefined(args.onBeforeRequest) && args.onBeforeRequest() == false) {
            return;
        }
        //handler args.async
        if (isUndefined(args.async)) {
            args.async = true;
        }

        //handle args.contentType
        if (isUndefined(args.contentType)) {
            args.contentType = "application/json";
        }
        //handle args.data
        if (!isUndefined(args.data) && args.contentType == "application/json") {
            args.data = JSON.stringify(args.data);
        }
        //handle args.dataType
        if (isUndefined(args.dataType)) {
            args.dataType = "json";
        }
        //handle args.processData
        if (isUndefined(args.processData)) {
            args.processData = true;
        }
        //handle args.processData
        if (isUndefined(args.enctype)) {
            args.enctype = "text/plain";
        }
        //handle args.loadingMsg
        if (!isUndefined(args.loadingMsg)) {
            window.EventsDispatcher.showLoading(args.loadingMsg);
        }

        //get token
        var accessToken = localStorage.getItem(vm_config.key_of_access_token);

        //set token header
        var headers = {};
        headers[vm_config.key_of_access_token] = accessToken;
        $.ajaxSetup({
            headers: headers
        });
        $.ajax({
            url: addUrlParam({
                url: vm_config.http_url_prefix + args.url,
                obj: {
                    unix: new Date().getTime()
                }
            }),
            //配合@requestBody
            data: args.data,
            async: args.async,
            type: args.type,
            contentType: args.contentType,
            dataType: args.dataType,
            processData: args.processData,
            enctype: args.enctype,
            success: function (result) {
                this.startResponse(args, result);
                this.requestServerSuccess(args, result);
                this.endResponse(args, result);
            }.bind(this),
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                this.startResponse();
                this.requestServerError(args, XMLHttpRequest, textStatus, errorThrown);
                this.endResponse();
            }.bind(this)
        });
    },
    get: function get(args) {
        args.type = "GET";
        this.ajax(args);
    },
    put: function put(args) {
        args.type = "PUT";
        this.ajax(args);
    },
    post: function post(args) {
        args.type = "POST";
        this.ajax(args);
    },
    contentType: {
        TEXT: "text/plain",
        JSON: "application/json"
    }
};

var commons = {
    generateImgUrl: function generateImgUrl(args) {
        if (isUndefined(args.width)) {
            return vm_config.http_url_prefix + args.imgUrl;
        }
        return vm_config.http_url_prefix + args.imgUrl + "/" + args.width;
    },
    generateUrl: function generateUrl(args) {
        return vm_config.http_url_prefix + args.url;
    }
};

exports.commons = commons;
exports.ajax = ajax;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(8))(218);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(24);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(ENV) {

module.exports = {
    http_url_prefix: ENV.http_url_prefix,
    key_of_access_token: "userAccessToken",
    //受保护的页面
    protectedUserPageLists: ["/user/[0-9/_-a-zA-Z]*"],
    offline_code: -5,
    online_user_polling_interval: ENV.online_user_polling_interval
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(29);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _events = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.eventEmit = new _events.EventEmitter();
//项目前端事件分发器
//引入react组件
window.VmFrontendEventsDispatcher = {
    event: window.eventEmit,
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
    },
    updateImgUploaderImgUrl: function updateImgUploaderImgUrl(imgUrl) {
        this.event.emit('updateImgUploaderImgUrl', imgUrl);
    }
};
window.EventsDispatcher = window.VmFrontendEventsDispatcher;
var eventsDispatcher = window.EventsDispatcher;
var EventsDispatcher = eventsDispatcher;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(32);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引入react组件
var MsgDialog = _react2.default.createClass({
    displayName: 'MsgDialog',

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

        window.eventEmit.on('showMsgDialog', function (msg, onCloseCallfun) {
            //set onCloseCallfun to state
            var state = _this.state;
            state.onCloseCallfun = onCloseCallfun;
            _this.setState(state);

            _this.showMsg(msg);
        });
        window.eventEmit.on('closeMsgDialog', function () {
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
            'div',
            { id: 'fragment_msg_dialog_content',
                ref: 'content' },
            _react2.default.createElement(
                'div',
                { id: 'dialog',
                    className: this.state.dialogClassName,
                    ref: 'dialog' },
                _react2.default.createElement(
                    'div',
                    { id: 'body' },
                    _react2.default.createElement(
                        'span',
                        { id: 'msg_p',
                            ref: 'msg_p' },
                        this.props.msg
                    ),
                    _react2.default.createElement(
                        'span',
                        { id: 'split' },
                        '|'
                    ),
                    _react2.default.createElement(
                        'a',
                        { id: 'close_btn',
                            ref: 'close_btn',
                            href: 'javascript:void(0);',
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
/* 8 */
/***/ (function(module, exports) {

module.exports = vendors_lib;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

__webpack_require__(23);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

__webpack_require__(25);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

var _inner_messager = __webpack_require__(3);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

var _actors_list = __webpack_require__(9);

var _actors_list2 = _interopRequireDefault(_actors_list);

var _director = __webpack_require__(10);

var _director2 = _interopRequireDefault(_director);

__webpack_require__(31);

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
            };var imgUrl = _vm_util.commons.generateImgUrl({
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(8))(123);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(26);

var _inner_messager = __webpack_require__(3);

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
        _vm_util.ajax.get({
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*弹性文本展示*/
var FlexText = _react2.default.createClass({
    displayName: 'FlexText',

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
            'div',
            { id: 'flex_text_content', title: allText },
            this.props.title,
            shortText
        );
    }
}); //引入react组件
exports.default = FlexText;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

var _inner_messager = __webpack_require__(3);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

__webpack_require__(28);

var _plain_panel_title = __webpack_require__(5);

var _plain_panel_title2 = _interopRequireDefault(_plain_panel_title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*演员详情展示*/
//引入react组件
var FilmmakersDetailsArea = _react2.default.createClass({
    displayName: 'FilmmakersDetailsArea',


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

        _vm_util.ajax.get({
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

                };var imgUrl = _vm_util.commons.generateImgUrl({ imgUrl: filmmaker.imgUrl, width: 50 });
                res.push(_react2.default.createElement(
                    'li',
                    { key: filmmaker.id, title: filmmaker.name },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { title: filmmaker.name, to: location },
                        _react2.default.createElement('img', { title: filmmaker.name, src: imgUrl }),
                        _react2.default.createElement(
                            'div',
                            { title: filmmaker.name },
                            filmmaker.name
                        )
                    )
                ));
            }
            return res;
        }.bind(this);
        return _react2.default.createElement(
            'div',
            { id: 'actors_details_area', ref: 'actors_details_area' },
            _react2.default.createElement(_plain_panel_title2.default, { title: this.state.title }),
            _react2.default.createElement(_inner_messager2.default, { defaultTip: this.state.whenActorsDetailsIsLoading,
                ref: 'actors_details_area_inner_messager' }),
            _react2.default.createElement(
                'ul',
                null,
                listFilmmakers()
            )
        );
    }
});
exports.default = FilmmakersDetailsArea;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(30);

var _inner_messager = __webpack_require__(3);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

var _plain_panel_title = __webpack_require__(5);

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
        _vm_util.ajax.get({
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
                    videos.push([_vm_util.commons.generateUrl({ url: version.srcUrl }), 'video/mp4', this.movieSharpness(version.sharpness), version.weight]);
                }
                videos.push(['http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4', 'video/mp4', '1080', 1080]);
                //init movie player
                var options = {};
                var posterUrl = _vm_util.commons.generateImgUrl({
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _reactDom = __webpack_require__(12);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(19);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*网站头部*/
_reactDom2.default.render(_react2.default.createElement(_index2.default, null), document.getElementById('react_dom_index')); /*!!记得导入*/

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(12);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

var _filmmaker_info_page = __webpack_require__(21);

var _filmmaker_info_page2 = _interopRequireDefault(_filmmaker_info_page);

var _events = __webpack_require__(17);

__webpack_require__(33);

var _movie_list_page = __webpack_require__(34);

var _movie_list_page2 = _interopRequireDefault(_movie_list_page);

var _movie_info_page = __webpack_require__(39);

var _movie_info_page2 = _interopRequireDefault(_movie_info_page);

var _head = __webpack_require__(41);

var _head2 = _interopRequireDefault(_head);

var _tail = __webpack_require__(47);

var _tail2 = _interopRequireDefault(_tail);

var _msg_dialog = __webpack_require__(7);

var _msg_dialog2 = _interopRequireDefault(_msg_dialog);

var _loading = __webpack_require__(49);

var _loading2 = _interopRequireDefault(_loading);

var _user_page = __webpack_require__(51);

var _user_page2 = _interopRequireDefault(_user_page);

__webpack_require__(6);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    http_url_prefix: 'http://192.168.0.189:5550',
    online_user_polling_interval: 5000
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(vm_config) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(22);

var _actors_list = __webpack_require__(9);

var _actors_list2 = _interopRequireDefault(_actors_list);

var _inner_messager = __webpack_require__(3);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

var _director = __webpack_require__(10);

var _director2 = _interopRequireDefault(_director);

var _tags_of_movie = __webpack_require__(13);

var _tags_of_movie2 = _interopRequireDefault(_tags_of_movie);

var _flex_text = __webpack_require__(14);

var _flex_text2 = _interopRequireDefault(_flex_text);

var _filmmakers_details_area = __webpack_require__(15);

var _filmmakers_details_area2 = _interopRequireDefault(_filmmakers_details_area);

var _movies_player = __webpack_require__(16);

var _movies_player2 = _interopRequireDefault(_movies_player);

var _movies_displayer = __webpack_require__(11);

var _movies_displayer2 = _interopRequireDefault(_movies_displayer);

var _msg_dialog = __webpack_require__(7);

var _msg_dialog2 = _interopRequireDefault(_msg_dialog);

var _plain_panel_title = __webpack_require__(5);

var _plain_panel_title2 = _interopRequireDefault(_plain_panel_title);

__webpack_require__(6);

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

        _vm_util.ajax.get({
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

        _vm_util.ajax.get({
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _msg_dialog = __webpack_require__(7);

var _msg_dialog2 = _interopRequireDefault(_msg_dialog);

var _inner_messager = __webpack_require__(3);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

var _movies_displayer = __webpack_require__(11);

var _movies_displayer2 = _interopRequireDefault(_movies_displayer);

var _pager = __webpack_require__(35);

var _pager2 = _interopRequireDefault(_pager);

__webpack_require__(37);

__webpack_require__(38);

__webpack_require__(6);

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
        _vm_util.ajax.get({
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
        _vm_util.ajax.get({
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(36);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pager = _react2.default.createClass({
    displayName: 'Pager',


    render: function render() {
        var _this = this;

        return _react2.default.createElement(
            'div',
            { id: 'movie_list_pager_div' },
            _react2.default.createElement(
                'ul',
                { id: 'movie_list_pager_ul' },
                _react2.default.createElement(
                    'li',
                    { className: 'pager_li' },
                    _react2.default.createElement(
                        'a',
                        { href: 'javascript:void(0);', onClick: function onClick() {
                                _this.props.handlePageChange(-1);
                            } },
                        '\u4E0A\u4E00\u9875'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: 'pager_li currt' },
                    _react2.default.createElement(
                        'a',
                        { href: 'javascript:void(0);' },
                        this.props.page
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: 'pager_li' },
                    _react2.default.createElement(
                        'a',
                        { href: 'javascript:void(0);', onClick: function onClick() {
                                _this.props.handlePageChange(1);
                            } },
                        '\u4E0B\u4E00\u9875'
                    )
                )
            )
        );
    }
}); //引入react组件
exports.default = Pager; //将App组件导出

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(40);

var _actors_list = __webpack_require__(9);

var _actors_list2 = _interopRequireDefault(_actors_list);

var _inner_messager = __webpack_require__(3);

var _inner_messager2 = _interopRequireDefault(_inner_messager);

var _director = __webpack_require__(10);

var _director2 = _interopRequireDefault(_director);

var _tags_of_movie = __webpack_require__(13);

var _tags_of_movie2 = _interopRequireDefault(_tags_of_movie);

var _flex_text = __webpack_require__(14);

var _flex_text2 = _interopRequireDefault(_flex_text);

var _filmmakers_details_area = __webpack_require__(15);

var _filmmakers_details_area2 = _interopRequireDefault(_filmmakers_details_area);

var _movies_player = __webpack_require__(16);

var _movies_player2 = _interopRequireDefault(_movies_player);

var _movies_displayer = __webpack_require__(11);

var _movies_displayer2 = _interopRequireDefault(_movies_displayer);

var _msg_dialog = __webpack_require__(7);

var _msg_dialog2 = _interopRequireDefault(_msg_dialog);

var _plain_panel_title = __webpack_require__(5);

var _plain_panel_title2 = _interopRequireDefault(_plain_panel_title);

__webpack_require__(6);

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

        _vm_util.ajax.get({
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
        _vm_util.ajax.get({
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

        _vm_util.ajax.get({
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
        var imgUrl = _vm_util.commons.generateImgUrl({ imgUrl: this.state.movie.imgUrl, width: 300 });
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
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(vm_config) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

var _login_dialog = __webpack_require__(42);

var _login_dialog2 = _interopRequireDefault(_login_dialog);

var _regist_dialog = __webpack_require__(44);

var _regist_dialog2 = _interopRequireDefault(_regist_dialog);

__webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 用户信息展示,界面跳转，保护用户界面的职责
 */
//引入react组件
var Head = _react2.default.createClass({
    displayName: "Head",


    getInitialState: function getInitialState() {
        return {
            USER_IS_LOGIN_IN_OTHER_AREA: -1,
            USER_LOGIN_TIMEOUT: -2,
            USER_IS_FROZENED: -3,
            USER_IS_DELETED: -4,
            USER_INFO_IS_UPDATED: -5,
            logouting: "正在注销...",
            logoutSuccess: "注销成功",
            logoutFailure: "注销失败",
            tipOfOffLine: "您已离线",
            onlineUserBasicInfoUrl: "/user/online/basicInfo",

            //用户未登录时受保护的页面，用于用户注销后或者被动离线后调用
            protectedUserPageLists: ["/user/[0-9/_-a-zA-Z]*"],
            user: {}, //默认为空对象
            pollOnlineUserStatusTimer: undefined,
            pollOnlineUserStatusTimerInterval: vm_config.online_user_polling_interval,
            isFirstVisitPage: true, //用于辅助轮询
            connected: false,
            stompClient: undefined,
            subscriptions: []
        };
    },
    updateConnected: function updateConnected(connected) {
        this.setState({ connected: connected });
    },
    updateStompClient: function updateStompClient(stompClient) {
        this.setState({ stompClient: stompClient });
    },
    updateSubscriptions: function updateSubscriptions(subscriptions) {

        this.setState({ subscriptions: subscriptions });
    },
    connectOnlineStatusWS: function connectOnlineStatusWS(accessToken) {

        // c(this.state);
        var _state = this.state,
            stompClient = _state.stompClient,
            connected = _state.connected;

        if (isUndefined(accessToken) || connected) {
            return;
        }
        if (isUndefined(stompClient)) {
            var url = vm_config.http_url_prefix + '/userWS/ep_user_ws';
            var socket = new SockJS(url);
            stompClient = Stomp.over(socket);
            stompClient.heartbeat.outgoing = 10000; // client will send heartbeats every 20000ms
            stompClient.heartbeat.incoming = 10000; // client does not want to receive heartbeats from the server
            stompClient.connect({}, function (frame) {
                c('Consocketnected: ' + frame);
                this.updateStompClient(stompClient);
                this.subscribe(stompClient, accessToken);
            }.bind(this));
        } else {

            this.subscribe(stompClient, accessToken);
        }
    },
    subscribe: function subscribe(stompClient, accessToken) {
        var _state2 = this.state,
            USER_IS_LOGIN_IN_OTHER_AREA = _state2.USER_IS_LOGIN_IN_OTHER_AREA,
            USER_LOGIN_TIMEOUT = _state2.USER_LOGIN_TIMEOUT,
            USER_IS_FROZENED = _state2.USER_IS_FROZENED,
            USER_IS_DELETED = _state2.USER_IS_DELETED,
            USER_INFO_IS_UPDATED = _state2.USER_INFO_IS_UPDATED;

        this.updateConnected(true);
        var subscription = stompClient.subscribe('/user/' + accessToken + '/userOnlineStatus', function (res) {
            var r = JSON.parse(res.body);
            c(r);

            var code = r.code,
                msg = r.msg,
                data = r.data;

            if (USER_IS_LOGIN_IN_OTHER_AREA == code) {
                this.whenUserOffline({
                    msg: "异地登陆"
                });
            } else if (USER_LOGIN_TIMEOUT == code) {
                this.whenUserOffline({
                    msg: "登录超时"
                });
            } else if (USER_IS_FROZENED == code) {

                this.whenUserOffline({
                    msg: "账户被冻结"
                });
            } else if (USER_IS_DELETED == code) {

                this.whenUserOffline({
                    msg: "账户被删除"
                });
            } else if (USER_INFO_IS_UPDATED == code) {
                this.whenUserOffline({
                    msg: "账户信息被更新"
                });
            }
        }.bind(this));
        this.updateSubscriptions([subscription]);
    },
    whenUserOffline: function whenUserOffline(args) {
        var msg = args.msg;


        if (!this.state.isFirstVisitPage) {
            window.VmFrontendEventsDispatcher.showMsgDialog(msg);
        }
        //update user in state
        this.updateStateUser({});

        //protect page
        window.VmFrontendEventsDispatcher.protectPage();

        //clear poll timer
        this.stopPollOnlineUserStatus();

        this.disConnectOnlineStatusWS();
    },
    whenUserOnline: function whenUserOnline(user) {
        this.startPollOnlineUserStatus();
        this.connectOnlineStatusWS(user.token);
        this.closeLoginDialog(); //!!!防止用户登陆后再次点开登录框!!!
        window.VmFrontendEventsDispatcher.updateImgUploaderImgUrl(user.imgUrl);
        this.updateStateUser(user);
    },
    disConnectOnlineStatusWS: function disConnectOnlineStatusWS() {
        var _state3 = this.state,
            subscriptions = _state3.subscriptions,
            connected = _state3.connected,
            stompClient = _state3.stompClient;

        c("disConnectOnlineStatusWS");
        c(this.state);
        if (!connected && !isUndefined(stompClient)) {
            return;
        }
        for (var i = 0; i < subscriptions.length; i++) {
            subscriptions[i].unsubscribe();
        }
        this.updateConnected(false);
    },

    componentDidMount: function componentDidMount() {
        this.registEvents();
        this.startPollOnlineUserStatus();
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
                if (!isOnline) {
                    //online ?
                    this.whenUserOffline({
                        msg: this.state.tipOfOffLine
                    });
                } else {
                    this.whenUserOnline(u);
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
        window.eventEmit.on('updateHeadComponentUser', function (newUser) {
            _this.updateStateUser(newUser);
        });

        //检测用户是否有在线
        window.eventEmit.on('feelerOnlineUser', function (args) {
            var url = "/user/feelerOnlineUser";
            _vm_util.ajax.get({
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
        window.eventEmit.on('getOnlineUser', function (args) {

            var url = "/user/online";
            _vm_util.ajax.get({
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
        window.eventEmit.on('protectPage', function () {
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

        this.startPollOnlineUserStatus();
    },
    showRegistDialog: function showRegistDialog() {
        this.refs.regist_dialog.showRegistDialog();
    },
    closeRegistDialog: function closeRegistDialog() {
        this.refs.regist_dialog.closeRegistDialog();
    },
    onRegistSuccess: function onRegistSuccess(user) {
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

        _vm_util.ajax.put({
            url: url,
            onBeforeRequest: function () {}.bind(this),
            onResponseStart: function () {
                //close loading dialog
                window.VmFrontendEventsDispatcher.closeLoading();
            }.bind(this),
            onResponseSuccess: function (result) {
                this.whenUserOffline({ msg: result.msg });
                //
                // window.VmFrontendEventsDispatcher.showMsgDialog(this.state.logoutSuccess);
                //
                // //update user in state
                // this.updateStateUser({});
                //
                // //protect page
                // window.VmFrontendEventsDispatcher.protectPage();
                //
                // //clear poll timer
                // this.stopPollOnlineUserStatus();
                //
                // this.disConnectOnlineStatusWS();
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
            var headImgUrl = _vm_util.commons.generateImgUrl({
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(vm_config) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

__webpack_require__(43);

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
        _vm_util.ajax.put({
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
                localStorage.setItem(vm_config.key_of_access_token, result.data.user.token);

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(vm_config) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

__webpack_require__(45);

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

        _vm_util.ajax.put({
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
                localStorage.setItem(vm_config.key_of_access_token, result.data.user.token);

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 45 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 46 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(48);

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
/* 48 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

__webpack_require__(50);

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

        window.eventEmit.on('showLoading', function (msg) {
            _this.showLoading(msg);
        });
        window.eventEmit.on('closeLoading', function () {
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
/* 50 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

var _plain_panel_title = __webpack_require__(5);

var _plain_panel_title2 = _interopRequireDefault(_plain_panel_title);

var _user_basic_info_page = __webpack_require__(52);

var _user_basic_info_page2 = _interopRequireDefault(_user_basic_info_page);

var _user_head_page = __webpack_require__(56);

var _user_head_page2 = _interopRequireDefault(_user_head_page);

__webpack_require__(60);

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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

var _dater = __webpack_require__(53);

var _dater2 = _interopRequireDefault(_dater);

__webpack_require__(55);

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
        _vm_util.ajax.put({
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(54);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*日期插件*/
var Dater = _react2.default.createClass({
    displayName: 'Dater',

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
                'option',
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
            'span',
            { id: 'date_content' },
            _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'select',
                    { id: 'year',
                        ref: 'year',
                        defaultValue: '',
                        value: date.year,
                        onChange: function onChange() {
                            _this.props.onDateChange(_this.getDate());
                        } },
                    this.generateOptions(this.state.years)
                ),
                '\u5E74'
            ),
            _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'select',
                    { id: 'month',
                        ref: 'month',
                        defaultValue: '',
                        value: date.month,
                        onChange: function onChange() {
                            _this.props.onDateChange(_this.getDate());
                        } },
                    this.generateOptions(this.state.months)
                ),
                '\u6708'
            ),
            _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'select',
                    { id: 'day',
                        ref: 'day',
                        defaultValue: '',
                        value: date.day,
                        onChange: function onChange() {
                            _this.props.onDateChange(_this.getDate());
                        } },
                    this.generateOptions(this.state.days)
                ),
                '\u65E5'
            )
        );
    }
}); //引入react组件
exports.default = Dater;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 55 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(57);

var _img_uploader = __webpack_require__(58);

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
            loading: false,
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
                var imgUrl = _vm_util.commons.generateImgUrl({
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
        this.getUserHeadUploader().previewImg(_vm_util.commons.generateImgUrl({
            imgUrl: result.data.imgUrl,
            width: 300
        }));
        window.EventsDispatcher.updateHeadComponentUser(result.data.user);
    },
    onUpdateImgStart: function onUpdateImgStart() {},
    onUpdateImgEnd: function onUpdateImgEnd() {},
    onUploadTempImgSuccess: function onUploadTempImgSuccess(result) {

        this.getUserHeadUploader().previewImg(_vm_util.commons.generateImgUrl({
            imgUrl: result.data.imgUrl
        }));
    },
    onUploadTempImgStart: function onUploadTempImgStart() {},
    onUploadTempImgEnd: function onUploadTempImgEnd() {},
    updateLoading: function updateLoading(loading) {
        this.setState({ loading: loading });
    },

    render: function render() {
        var loading = this.state.loading;

        return _react2.default.createElement(
            "div",
            { id: "user_head_content", className: "clearfix" },
            _react2.default.createElement(
                "div",
                { id: "react_img_uploader" },
                _react2.default.createElement(_img_uploader2.default, { ref: "userHeadUploader",
                    config: this.state.config,
                    loading: loading,
                    onUpdateImgSuccess: this.onUpdateImgSuccess,
                    onUpdateImgStart: this.onUpdateImgStart,
                    onUpdateImgEnd: this.onUpdateImgEnd,
                    onUploadTempImgSuccess: this.onUploadTempImgSuccess,
                    onUploadTempImgStart: this.onUploadTempImgStart,
                    onUploadTempImgEnd: this.onUploadTempImgEnd })
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
/* 57 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _vm_util = __webpack_require__(1);

__webpack_require__(59);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 图片上传组件
 */
var ImgUpload = _react2.default.createClass({
    displayName: 'ImgUpload',

    getInitialState: function getInitialState() {

        // var config = {
        //     fileTypes: ["jpg", "png"],
        //     fileMaxsize: 1024 * 1024 * 1,//1M
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
        this.registEvents();
    },
    validateImgFileOnSubmit: function validateImgFileOnSubmit() {
        //服务器未接收到相关的图片缓存
        if (isUndefined(this.state.willUpdatedImgInfo.fileId)) {
            throw this.state.userImgFileIsEmpty;
        }
    },

    registEvents: function registEvents() {
        var _this = this;

        //上传框更新事件
        window.eventEmit.on('updateImgUploaderImgUrl', function (imgUrl) {

            var fileId = _this.state.willUpdatedImgInfo.fileId;

            if (isUndefined(fileId)) {
                _this.previewImg(_vm_util.commons.generateImgUrl({
                    imgUrl: imgUrl
                }));
            }
        });
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
        var _props = this.props,
            onUploadTempImgSuccess = _props.onUploadTempImgSuccess,
            onUploadTempImgStart = _props.onUploadTempImgStart,
            onUploadTempImgEnd = _props.onUploadTempImgEnd;


        onUploadTempImgStart();
        var imgInput = this.getImgInput();
        var imgFile = this.getImgFile();
        //validateImgFileOnChoice
        try {
            this.validateImgFileOnChoice(imgFile);
        } catch (e) {
            // window.EventsDispatcher.closeLoading();
            window.EventsDispatcher.showMsgDialog(e);

            onUploadTempImgEnd();
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
        _vm_util.ajax.post({
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
                onUploadTempImgEnd();
            }.bind(this),
            onRequestError: function () {

                this.clearSelectFileInfo();
            }.bind(this)
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
    clearSelectFileInfo: function clearSelectFileInfo() {
        //清除用户已选择的图片信息
        this.updateTempFileId(undefined);
        this.clearImgInput();
    },
    saveImg: function saveImg(callfun) {
        var _props2 = this.props,
            onUpdateImgSuccess = _props2.onUpdateImgSuccess,
            onUpdateImgStart = _props2.onUpdateImgStart,
            onUpdateImgEnd = _props2.onUpdateImgEnd;

        onUpdateImgStart();
        try {
            this.validateImgFileOnSubmit();
        } catch (e) {
            // window.EventsDispatcher.closeLoading();
            window.EventsDispatcher.showMsgDialog(e);
            onUpdateImgEnd();
            return;
        }

        window.EventsDispatcher.showLoading();

        // var userId = this.state.user.id;
        var url = this.state.config.saveImgUrl;
        var data = this.state.willUpdatedImgInfo;
        // data.serverCacheFileName = this.state.serverTempImgFileName;
        _vm_util.ajax.put({
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
                this.clearSelectFileInfo();

                this.props.onUpdateImgSuccess(result);
            }.bind(this),
            onResponseFailure: function (result) {}.bind(this),
            onResponseEnd: function () {
                //callfun
                if (callfun != undefined) {
                    callfun();
                }
                onUpdateImgEnd();
            }.bind(this),
            onRequestError: function () {}.bind(this)
        });
    },

    render: function render() {
        var _this2 = this;

        var loading = this.props.loading;

        return _react2.default.createElement(
            'div',
            { id: 'img_uploader', className: 'clearfix' },
            _react2.default.createElement(
                'div',
                { id: 'img_upload' },
                _react2.default.createElement(
                    'div',
                    { id: 'img_upload_to_middle_div' },
                    _react2.default.createElement(
                        'div',
                        { id: 'imgPreviewWrapper',
                            ref: 'imgPreviewWrapper' },
                        _react2.default.createElement('img', { src: '',
                            id: 'imgPreview',
                            ref: 'imgPreview' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'btns_div' },
                        _react2.default.createElement('input', { type: 'file',
                            ref: 'imgInput',
                            name: 'img',
                            id: 'imgInput',
                            onChange: function onChange() {
                                _this2.uploadTempImg();
                            } }),
                        _react2.default.createElement('input', { type: 'button',
                            className: 'operateBtn',
                            id: 'uploadTempImgBtn',
                            value: '\u9009\u62E9\u56FE\u7247',
                            disabled: loading,
                            style: { display: loading ? "none" : "block" },
                            onClick: function onClick() {
                                _this2.refs.imgInput.click();
                            } }),
                        _react2.default.createElement('input', { type: 'button',
                            className: 'operateBtn',
                            id: 'imgSaveBtn',
                            ref: 'imgSaveBtn',
                            disabled: loading,
                            style: { display: loading ? "none" : "block" },
                            onClick: function onClick() {
                                _this2.saveImg();
                            },
                            value: '\u4FDD\u5B58'
                        })
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { id: 'head_preview' },
                _react2.default.createElement(
                    'p',
                    null,
                    '\u9884\u89C8 : '
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'imgPreview' },
                    _react2.default.createElement('div', { className: 'preview' })
                )
            )
        );
    }
}); //引入react组件
exports.default = ImgUpload;

/***/ }),
/* 59 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 60 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);