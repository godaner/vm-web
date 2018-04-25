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
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(11))(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(11))(1009);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _events = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//如果这里报错，那么可能是env文件夹下的配置出现问题
window.eventEmitEmitter = new _events.EventEmitter();
//项目前端事件分发器
//引入react组件
window.EventsDispatcher = {
    event: window.eventEmitEmitter,
    showLoginDialog: function showLoginDialog() {
        this.event.emit('showLoginDialog');
    },
    onRouteEnter: function onRouteEnter(args) {
        this.event.emit('onRouteEnter', args);
    },
    onTagAddSuccess: function onTagAddSuccess(record) {
        this.event.emit('onTagAddSuccess', record);
    },
    loadTagTableData: function loadTagTableData() {
        this.event.emit('loadTagTableData');
    },
    onMovieSrcVersionAddSuccess: function onMovieSrcVersionAddSuccess(record) {
        this.event.emit('onMovieSrcVersionAddSuccess', record);
    },
    loadMovieSrcVersionTableData: function loadMovieSrcVersionTableData() {
        this.event.emit('loadMovieSrcVersionTableData');
    },
    updateLoginAdminInfo: function updateLoginAdminInfo(admin) {
        //用户check，注销，登录调用
        this.event.emit('updateLoginAdminInfo', admin);
    },
    updateAdminMenuTree: function updateAdminMenuTree(menuTree) {
        this.event.emit('updateAdminMenuTree', menuTree);
    },
    backToHomePage: function backToHomePage() {

        this.event.emit('backToHomePage');
    },
    stopPollingCheckOnlineAdmin: function stopPollingCheckOnlineAdmin() {

        this.event.emit('stopPollingCheckOnlineAdmin');
    },
    startPollingCheckOnlineAdmin: function startPollingCheckOnlineAdmin() {

        this.event.emit('startPollingCheckOnlineAdmin');
    }
};
var eventsDispatcher = window.EventsDispatcher;
var EventsDispatcher = eventsDispatcher;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(vm_config) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Option = _antd.Select.Option;
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
var _ajax = {
    ajaxError: "网络不佳,请稍后重试",
    ajax: function ajax(args) {

        //handler args.async
        if (isUndefined(args.async)) {
            args.async = true;
        }

        //handle args.contentType
        if (isUndefined(args.contentType)) {
            // args.contentType = "application/json";
            args.contentType = _ajax.contentType.DEFAULT;
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

        //get token
        var accessToken = localStorage.getItem(vm_config.key_of_access_token);

        //set token header
        var headers = {};
        headers[vm_config.key_of_access_token] = accessToken;
        $.ajaxSetup({
            headers: headers
        });
        c("Request args is : ");
        c(args);
        c("Request url is : ");
        c(args.url);
        c("Request data is : ");
        c(args.data);
        $.ajax({
            url: commons.addUrlParam({
                url: vm_config.http_url_prefix + args.url,
                obj: { unix: new Date().getTime() }
            }),
            //配合@requestBody
            data: args.data,
            async: args.async,
            type: args.type,
            contentType: args.contentType,
            dataType: args.dataType,
            processData: args.processData,
            enctype: args.enctype,
            beforeSend: function () {
                if (!isUndefined(args.beforeSend)) {
                    args.beforeSend();
                }
            }.bind(this),
            success: function (result) {
                if (success(result.code) && !isUndefined(args.success)) {
                    args.success(result);
                }
                if (fail(result.code) && !isUndefined(args.failure)) {
                    if (offline(result.code)) {
                        window.EventsDispatcher.showLoginDialog();
                        window.EventsDispatcher.stopPollingCheckOnlineAdmin();
                        return;
                    }
                    args.failure(result);
                }
            }.bind(this),
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //tip
                if (args.ignoreAjaxError != true) {

                    _antd.message.error(this.ajaxError);
                }

                if (!isUndefined(args.error)) {
                    args.error(args, XMLHttpRequest, textStatus, errorThrown);
                }
            }.bind(this),
            complete: function (XMLHttpRequest, textStatus) {
                if (!isUndefined(args.complete)) {
                    args.complete(args, XMLHttpRequest, textStatus);
                }
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
    delete: function _delete(args) {
        args.type = "DELETE";
        args.contentType = _ajax.contentType.JSON; //!!!delete比较特殊，无法采用DEFAULT: "application/x-www-form-urlencoded"方式
        this.ajax(args);
    },
    contentType: {
        TEXT: "text/plain",
        JSON: "application/json",
        DEFAULT: "application/x-www-form-urlencoded"
    }
};

var commons = {
    //生成[0,max]的随机数
    rand: function rand(args) {
        var max = args.max;

        return Math.floor(Math.random() * max);
    },
    getImmutableStrByIndex: function getImmutableStrByIndex(args) {
        var index = args.index;


        var data = commons.getImmutableStrs();

        return data[index - 1];
    },
    getImmutableStrs: function getImmutableStrs() {
        return [_react2.default.createElement(
            "span",
            { style: { color: "red" } },
            "\u5185\u7F6E\u5BF9\u8C61"
        ), _react2.default.createElement(
            "span",
            { style: { color: "green" } },
            "\u975E\u5185\u7F6E\u5BF9\u8C61"
        )];
    },
    getSharpnessStrByIndex: function getSharpnessStrByIndex(args) {
        var index = args.index;


        var data = commons.getSharpnessStrs();

        return data[index - 1];
    },
    getSharpnessOptions: function getSharpnessOptions() {

        var data = commons.getSharpnessStrs();

        return commons.getOptions({ data: data });
    },
    getSharpnessStrs: function getSharpnessStrs() {
        return ['标清', '高清', '超清'];
    },
    toStrArr: function toStrArr(notStrArr) {
        if (isEmptyList(notStrArr)) {
            return [];
        }
        for (var i = 0; i < notStrArr.length; i++) {
            notStrArr[i] = notStrArr[i] + '';
        }
        return notStrArr;
    },
    getOptions: function getOptions(args) {
        var start = args.start,
            data = args.data;

        if (isUndefined(start)) {
            start = 1;
        }

        var options = [];
        for (var i = 0; i < data.length; i++) {
            var v = i + start + '';
            options.push(_react2.default.createElement(
                Option,
                { key: i, value: v },
                data[i]
            ));
        }
        return options;
    },
    getStatusStrByIndex: function getStatusStrByIndex(args) {
        var index = args.index;


        var data = commons.getStatusStrs();

        return data[index - 1];
    },
    getStatusOptions: function getStatusOptions() {

        var data = commons.getStatusStrs();

        return commons.getOptions({ data: data });
    },
    getStatusStrs: function getStatusStrs() {
        return [_react2.default.createElement(
            "span",
            { style: { color: "green" } },
            "\u6B63\u5E38"
        ), _react2.default.createElement(
            "span",
            { style: { color: "red" } },
            "\u51BB\u7ED3"
        )];
    },
    getSexStrs: function getSexStrs() {
        return ['男', '女', '未知'];
    },
    getSexOptions: function getSexOptions() {

        var data = commons.getSexStrs();

        return commons.getOptions({ data: data });
    },
    getBloodTypeStrs: function getBloodTypeStrs() {
        return ['A', 'B', 'AB', 'O', 'E', '未知'];
    },
    getBloodTypeStrByIndex: function getBloodTypeStrByIndex(args) {
        var index = args.index;


        var bloodTypes = commons.getBloodTypeStrs();

        return bloodTypes[index - 1];
    },
    getBloodTypeOptions: function getBloodTypeOptions() {

        var data = commons.getBloodTypeStrs();

        return commons.getOptions({ data: data });
    },
    getSexStrByIndex: function getSexStrByIndex(args) {
        var index = args.index;


        var sexs = ['男', '女', '未知'];

        return sexs[index - 1];
    },
    getConsStrs: function getConsStrs() {
        return ['魔羯', '水瓶', '双鱼', '牡羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '魔羯'];
    },
    getConStrByIndex: function getConStrByIndex(args) {
        var index = args.index;


        var consStr = commons.getCons();

        return consStr[index];
    },
    getConStrByDate: function getConStrByDate(args) {
        var date = args.date;


        var index = commons.transConIntByDate(_defineProperty({ date: date }, "date", date));

        return commons.transConStrByIndex(index);
    },
    getConIntByDate: function getConIntByDate(args) {
        var date = args.date;

        var month = date.getMonth() + 1;
        var day = date.getDay();
        return month - (day < "102223444433".charAt(month - 1) - -19); //输出0～12的数字，0表示摩羯，1表示水瓶，依此类推，...，11是射手，12是摩羯。
    },
    generateImgUrl: function generateImgUrl(args) {
        var width = args.width,
            imgUrl = args.imgUrl;

        if (isUndefined(width)) {
            return vm_config.http_url_prefix + imgUrl;
        }
        return vm_config.http_url_prefix + imgUrl + "/" + width;
    },
    makeTipSpan: function makeTipSpan(text, len) {
        if (isUndefined(len)) {
            len = 20;
        }
        var sText = text.substring(0, len);

        if (text.length > 20) {
            sText += "...";
        }
        return _react2.default.createElement(
            "span",
            { title: text },
            sText
        );
    },

    /**
     * 对url添加时间戳
     * @param url
     * @returns {*}
     */
    timestamp: function timestamp(url) {
        //  var getTimestamp=Math.random();
        var t = new Date().getTime();
        url = addUrlParam({
            url: url,
            obj: {
                t: t
            }
        });
        c(url);
        return url;
    },


    /**
     * 对url添加参数,替换原有参数
     * @param url
     * @returns {*}
     */
    addUrlParam: function addUrlParam(args) {

        var url = args.url;
        var obj = args.obj;

        //  var getTimestamp=Math.random();
        for (var key in obj) {
            var val = obj[key];
            var p = getUrlParam(url, key);
            c(p);
            if (!isUndefined(p)) {
                changeUrlParam(url, key, val);
            } else {
                if (url.indexOf("?") > -1) {
                    url = url + "&" + key + "=" + val;
                } else {
                    url = url + "?" + key + "=" + val;
                }
            }
        }

        return url;
    },
    changeUrlParam: function changeUrlParam(url, arg, val) {
        var pattern = arg + '=([^&]*)';
        var replaceText = arg + '=' + val;
        return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText;
    },

    /**
     * 获取指定的URL参数值
     * URL:http://www.quwan.com/index?name=tyler
     * 参数：paramName URL参数
     * 调用方法:getParam("name")
     * 返回值:tyler
     */
    getUrlParam: function getUrlParam(url, variable) {

        var query = url.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return undefined;
    },
    objDeepCopy: function objDeepCopy(obj) {
        if (isUndefined(obj)) {
            return undefined;
        }
        var str,
            newobj = obj.constructor === Array ? [] : {};
        if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object') {
            return;
        } else if (window.JSON) {
            str = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(str); //还原
        } else {
            for (var i in obj) {
                newobj[i] = _typeof(obj[i]) === 'object' ? cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    },
    clone: function clone(obj) {

        return commons.objDeepCopy(obj);
    },
    updateObjByKey: function updateObjByKey(objArr, key, keyVal, newObj) {
        var newArr = [];
        for (var i = 0; i < objArr.length; i++) {
            var obj = objArr[i];
            if (obj[key] == keyVal) {
                newArr.push(newObj);
            } else {
                newArr.push(obj);
            }
        }
        return newArr;
    },
    getObjByKey: function getObjByKey(objArr, key, keyVal) {
        for (var i = 0; i < objArr.length; i++) {
            var obj = objArr[i];
            if (obj[key] == keyVal) {
                //深拷贝
                var res = undefined;
                try {
                    res = commons.objDeepCopy(obj);
                } catch (e) {
                    c(e);
                }
                return res;
            }
        }
    },
    getFieldListByKey: function getFieldListByKey(objArr, keyName) {
        var retArr = [];
        for (var i = 0; i < objArr.length; i++) {
            var obj = objArr[i];
            retArr.push(obj[keyName]);
        }
        return retArr;
    },
    undefined2EmptyStr: function undefined2EmptyStr(obj) {
        if (isUndefined(obj)) {
            return "";
        }
    },

    highLight: function highLight(sourceText, highLightText) {
        if (isUndefined(highLightText)) {
            return sourceText;
        }
        sourceText = sourceText.replace(highLightText, "");
        return _react2.default.createElement(
            "span",
            null,
            _react2.default.createElement(
                "span",
                { style: { color: "red" } },
                highLightText
            ),
            sourceText
        );
    }
};

exports.commons = commons;
exports.ajax = _ajax;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BrowserRouter__ = __webpack_require__(44);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserRouter", function() { return __WEBPACK_IMPORTED_MODULE_0__BrowserRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HashRouter__ = __webpack_require__(46);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HashRouter", function() { return __WEBPACK_IMPORTED_MODULE_1__HashRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Link__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return __WEBPACK_IMPORTED_MODULE_2__Link__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MemoryRouter__ = __webpack_require__(48);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return __WEBPACK_IMPORTED_MODULE_3__MemoryRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NavLink__ = __webpack_require__(51);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "NavLink", function() { return __WEBPACK_IMPORTED_MODULE_4__NavLink__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Prompt__ = __webpack_require__(54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return __WEBPACK_IMPORTED_MODULE_5__Prompt__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Redirect__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return __WEBPACK_IMPORTED_MODULE_6__Redirect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Route__ = __webpack_require__(34);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return __WEBPACK_IMPORTED_MODULE_7__Route__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Router__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return __WEBPACK_IMPORTED_MODULE_8__Router__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__StaticRouter__ = __webpack_require__(62);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return __WEBPACK_IMPORTED_MODULE_9__StaticRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Switch__ = __webpack_require__(64);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return __WEBPACK_IMPORTED_MODULE_10__Switch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__matchPath__ = __webpack_require__(66);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return __WEBPACK_IMPORTED_MODULE_11__matchPath__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__withRouter__ = __webpack_require__(67);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return __WEBPACK_IMPORTED_MODULE_12__withRouter__["a"]; });



























/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _React$createClass;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _edit_form_temple = __webpack_require__(80);

var _edit_form_temple2 = _interopRequireDefault(_edit_form_temple);

__webpack_require__(2);

__webpack_require__(37);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//import "antd/dist/antd.css";


var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var FormItem = _antd.Form.Item;
var SubMenu = _antd.Menu.SubMenu;

var EditDialogTemple = _react2.default.createClass((_React$createClass = {
    displayName: "EditDialogTemple",

    getInitialState: function getInitialState() {
        var _props = this.props,
            width = _props.width,
            height = _props.height,
            maskClosable = _props.maskClosable,
            closable = _props.closable,
            title = _props.title;

        if (isUndefined(closable)) {
            closable = true;
        }
        if (isUndefined(maskClosable)) {
            maskClosable = false;
        }
        if (isUndefined(width)) {
            width = "450px";
        }
        if (isUndefined(height)) {
            height = "300px";
        }
        if (isUndefined(title)) {
            title = "无标题";
        }
        return {
            // modelWidth: "350px",
            modelWidth: width,
            modelHeight: height,
            formLoading: false,
            visible: false,
            closable: closable,
            maskClosable: maskClosable,
            title: title,
            closableCache: closable

        };
    },
    registEvents: function registEvents() {},
    componentDidMount: function componentDidMount() {

        this.registEvents();
    },
    handleCancel: function handleCancel() {

        this.closeDialog();

        var handleCancel = this.props.handleCancel;


        if (!isUndefined(handleCancel)) {
            handleCancel();
        }
    },
    handleSubmit: function handleSubmit(values) {

        this.formEnterLoading();

        var handleSubmit = this.props.handleSubmit;


        if (!isUndefined(handleSubmit)) {
            handleSubmit(values);
        }
    },
    formEnterLoading: function formEnterLoading() {
        //进入handleSubmit后缀自动调用
        this.updateFormLoading(true);
        this.updateClosable(false);
    },
    formLeaveLoading: function formLeaveLoading() {
        //结束handleSubmit后缀需要手动调用
        var closableCache = this.state.closableCache;

        this.updateFormLoading(false);
        if (closableCache) {
            this.updateClosable(true);
        }
    },
    updateClosable: function updateClosable(closable) {
        this.setState({ closable: closable });
    },
    updateFormLoading: function updateFormLoading(loading) {
        var state = this.state;
        state.formLoading = loading;
        this.setState(state);
    },
    closeDialog: function closeDialog() {
        this.updateStateVisible(false);
    },
    showDialog: function showDialog() {
        this.updateStateVisible(true);
    },
    updateStateVisible: function updateStateVisible(visible) {
        var state = this.state;
        state.visible = visible;
        this.setState(state);
    }
}, _defineProperty(_React$createClass, "componentDidMount", function componentDidMount() {}), _defineProperty(_React$createClass, "saveFormRef", function saveFormRef(form) {
    //!!!!
    this.form = form;
}), _defineProperty(_React$createClass, "clearForm", function clearForm() {
    //！！！！清空表单，如果清除form，echoData将无法显示，目前还不知道原因！！！
    this.form.resetFields(); //!!!!
}), _defineProperty(_React$createClass, "afterClose", function afterClose() {
    // this.form.resetFields();//!!!!关闭后自动清空表单


    var afterClose = this.props.afterClose;


    if (!isUndefined(afterClose)) {
        afterClose();
    }
}), _defineProperty(_React$createClass, "render", function render() {

    //get props
    var _props2 = this.props,
        formRows = _props2.formRows,
        formLayout = _props2.formLayout;

    //get state

    var _state = this.state,
        modelWidth = _state.modelWidth,
        modelHeight = _state.modelHeight,
        closable = _state.closable,
        maskClosable = _state.maskClosable,
        formLoading = _state.formLoading,
        visible = _state.visible,
        title = _state.title;

    return _react2.default.createElement(
        "div",
        { id: "user_edit_dialog" },
        _react2.default.createElement(
            _antd.Modal,
            {
                className: "extra",
                visible: visible,
                title: title,
                onCancel: this.handleCancel,
                afterClose: this.afterClose,
                width: modelWidth,
                height: modelHeight,
                closable: closable,
                maskClosable: maskClosable,
                footer: null
            },
            _react2.default.createElement(_edit_form_temple2.default, {
                ref: this.saveFormRef,
                handleSubmit: this.handleSubmit,
                formRows: formRows,
                formLayout: formLayout,
                loading: formLoading
            })
        )
    );
}), _React$createClass));

exports.default = EditDialogTemple; //将App组件导出

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(11))(48);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(11))(6);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(11))(14);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
  if (true) {
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(11))(7);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = vendors_lib;

/***/ }),
/* 12 */
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
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(ENV) {

module.exports = {
    http_url_prefix: ENV.http_url_prefix,
    key_of_access_token: "accessToken",
    offline_code: -9999
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(70)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(11))(708);

/***/ }),
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return locationsAreEqual; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_resolve_pathname__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_value_equal__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PathUtils__ = __webpack_require__(17);
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
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _resolvePathname = __webpack_require__(30);

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = __webpack_require__(31);

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = __webpack_require__(16);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _warning = __webpack_require__(6);

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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Router__ = __webpack_require__(24);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Router__["a" /* default */]);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(7);
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp__ = __webpack_require__(52);
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
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(6);
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _React$createClass;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(2);

__webpack_require__(37);

var _img_uploader = __webpack_require__(92);

var _img_uploader2 = _interopRequireDefault(_img_uploader);

var _vm_util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//import "antd/dist/antd.css";


var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var FormItem = _antd.Form.Item;
var SubMenu = _antd.Menu.SubMenu;


var ImgUploaderDialogTemplate = _react2.default.createClass((_React$createClass = {
    displayName: "ImgUploaderDialogTemplate",

    getInitialState: function getInitialState() {
        var _props = this.props,
            width = _props.width,
            config = _props.config,
            title = _props.title;

        if (isUndefined(width)) {
            width = "650px";
        }
        return {
            // modelWidth: "350px",
            loading: false,
            maskClosable: false,
            width: width,
            visible: false,
            title: title,
            config: config

        };
    },
    registEvents: function registEvents() {},
    componentDidMount: function componentDidMount() {

        this.registEvents();
    },
    handleCancel: function handleCancel() {

        this.closeDialog();

        var handleCancel = this.props.handleCancel;


        if (!isUndefined(handleCancel)) {
            handleCancel();
        }
    },
    afterClose: function afterClose() {
        var afterClose = this.props.afterClose;


        if (!isUndefined(afterClose)) {
            afterClose();
        }
    },
    closeDialog: function closeDialog() {
        this.updateStateVisible(false);
        this.getImgUploader().clearSelectFileInfo();
    },
    showDialog: function showDialog() {
        this.updateStateVisible(true);
    },
    updateExtraInfo: function updateExtraInfo(extraInfo) {
        var state = this.state;
        this.state.config.extraInfo = extraInfo;
        this.setState(state);
    },
    previewImg: function previewImg(imgUrl) {

        setTimeout(function () {
            this.getImgUploader().previewImg(imgUrl);
        }.bind(this));
    },
    getImgUploader: function getImgUploader() {
        return this.refs.img_uploader;
        ;
    },
    updateStateVisible: function updateStateVisible(visible) {
        var state = this.state;
        state.visible = visible;
        this.setState(state);
    }
}, _defineProperty(_React$createClass, "componentDidMount", function componentDidMount() {}), _defineProperty(_React$createClass, "onUpdateImgSuccess", function onUpdateImgSuccess(result) {

    this.updateStateVisible(false);

    //callback
    var onUpdateImgSuccess = this.props.onUpdateImgSuccess;

    onUpdateImgSuccess(result);
}), _defineProperty(_React$createClass, "onUpdateImgStart", function onUpdateImgStart() {

    this.updateLoading(true);
}), _defineProperty(_React$createClass, "onUpdateImgEnd", function onUpdateImgEnd() {

    this.updateLoading(false);
}), _defineProperty(_React$createClass, "onUploadTempImgSuccess", function onUploadTempImgSuccess(result) {

    //callback
    var onUploadTempImgSuccess = this.props.onUploadTempImgSuccess;

    onUploadTempImgSuccess(result);
}), _defineProperty(_React$createClass, "onUploadTempImgStart", function onUploadTempImgStart() {

    this.updateLoading(true);
}), _defineProperty(_React$createClass, "onUploadTempImgEnd", function onUploadTempImgEnd() {
    this.updateLoading(false);
}), _defineProperty(_React$createClass, "updateLoading", function updateLoading(loading) {
    this.setState({ loading: loading });
}), _defineProperty(_React$createClass, "render", function render() {

    //get props
    var title = this.props.title;

    //get state

    var _state = this.state,
        width = _state.width,
        visible = _state.visible,
        config = _state.config,
        maskClosable = _state.maskClosable,
        loading = _state.loading;

    return _react2.default.createElement(
        _antd.Modal,
        {
            className: "extra",
            visible: visible,
            title: title,
            onCancel: this.handleCancel,
            afterClose: this.afterClose,
            width: width,
            closable: !loading,
            maskClosable: maskClosable,
            footer: null
        },
        _react2.default.createElement(_img_uploader2.default, {
            ref: "img_uploader",
            onUpdateImgSuccess: this.onUpdateImgSuccess,
            onUpdateImgStart: this.onUpdateImgStart,
            onUpdateImgEnd: this.onUpdateImgEnd,
            onUploadTempImgSuccess: this.onUploadTempImgSuccess,
            onUploadTempImgStart: this.onUploadTempImgStart,
            onUploadTempImgEnd: this.onUploadTempImgEnd,
            config: config,
            loading: loading })
    );
}), _React$createClass));

exports.default = ImgUploaderDialogTemplate; //将App组件导出

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _events = __webpack_require__(12);

__webpack_require__(13);

__webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _vm_util = __webpack_require__(3);

var _user_sex_count = __webpack_require__(71);

var _user_sex_count2 = _interopRequireDefault(_user_sex_count);

var _movie_cls_count = __webpack_require__(72);

var _movie_cls_count2 = _interopRequireDefault(_movie_cls_count);

var _user_regist_num_count = __webpack_require__(73);

var _user_regist_num_count2 = _interopRequireDefault(_user_regist_num_count);

var _user_age_count = __webpack_require__(74);

var _user_age_count2 = _interopRequireDefault(_user_age_count);

var _user_login_area_count = __webpack_require__(75);

var _user_login_area_count2 = _interopRequireDefault(_user_login_area_count);

var _user_login_system_count = __webpack_require__(76);

var _user_login_system_count2 = _interopRequireDefault(_user_login_system_count);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
//import "antd/dist/antd.css";


var HomePage = _react2.default.createClass({
    displayName: 'HomePage',

    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {},

    render: function render() {
        //set now page's props
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                _antd.Row,
                { justify: 'center', align: 'middle' },
                _react2.default.createElement(
                    _antd.Col,
                    { span: 6 },
                    _react2.default.createElement(_user_login_area_count2.default, null)
                ),
                _react2.default.createElement(
                    _antd.Col,
                    { span: 6 },
                    _react2.default.createElement(_user_age_count2.default, null)
                ),
                _react2.default.createElement(
                    _antd.Col,
                    { span: 6 },
                    _react2.default.createElement(_user_sex_count2.default, null)
                ),
                _react2.default.createElement(
                    _antd.Col,
                    { span: 6 },
                    _react2.default.createElement(_user_login_system_count2.default, null)
                )
            ),
            _react2.default.createElement(
                _antd.Row,
                { justify: 'center', align: 'middle' },
                _react2.default.createElement(
                    _antd.Col,
                    { span: 6 },
                    _react2.default.createElement(_movie_cls_count2.default, null)
                ),
                _react2.default.createElement(
                    _antd.Col,
                    { span: 18 },
                    _react2.default.createElement(_user_regist_num_count2.default, null)
                )
            )
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(HomePage); //将App组件导出

/***/ }),
/* 30 */
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
/* 31 */
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
/* 32 */
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
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant__ = __webpack_require__(9);
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Route__ = __webpack_require__(35);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Route__["a" /* default */]);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__matchPath__ = __webpack_require__(25);
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
/* 36 */
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
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(2);

__webpack_require__(95);

var _vm_util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var UserLoginLogsTable = _react2.default.createClass({
    displayName: "UserLoginLogsTable",

    getInitialState: function getInitialState() {

        return {
            userEditDialog: {
                echoData: undefined
            },
            userLoginLogsTable: {
                title: '用户登录日志列表',
                dataSourceUrl: "/user/login/logs",
                editable: false,
                haveSearchUsername: false,
                usernameDropdownVisible: false,
                bordered: false,
                tableLoading: false,
                refreshBtnLoading: false,
                data: [], //displayData
                originalData: [],
                page: {
                    start: 0,
                    size: 5,
                    orderBy: "",
                    orderType: "",
                    total: 0
                },
                query: {
                    username: "",
                    userId: null
                },
                columns: [],
                deletingTip: "正在删除"
            }
        };
    },
    updateUserIdOfQuery: function updateUserIdOfQuery(userId) {
        var state = this.state;
        state.userLoginLogsTable.query.userId = userId;
        this.setState(state);
    },
    loadDataByUserId: function loadDataByUserId(userId) {
        this.updateUserIdOfQuery(userId);
        this.loadUserLoginLogsTableData();
    },
    onSearchUsername: function onSearchUsername(username) {
        this.updateUsernameOfQuery(username);
        if (!isEmptyString(this.state.userLoginLogsTable.query.username)) {
            this.updateHaveSearchUsername(true);
        } else {

            this.updateHaveSearchUsername(false);
        }
        this.loadUserLoginLogsTableData();
    },
    updateHaveSearchUsername: function updateHaveSearchUsername(haveSearchUsername) {
        var state = this.state;
        state.userLoginLogsTable.haveSearchUsername = haveSearchUsername;
        this.setState(state);
    },
    updateUsernameOfQuery: function updateUsernameOfQuery(username) {
        var state = this.state;
        state.userLoginLogsTable.query.username = username;
        this.setState(state);
    },
    updateUserLoginLogsTableData: function updateUserLoginLogsTableData(data) {
        var state = this.state;
        state.userLoginLogsTable.data = data;
        this.setState(state);
    },
    updateUserLoginLogsTableRefreshBtnLoading: function updateUserLoginLogsTableRefreshBtnLoading(loading) {
        var state = this.state;
        state.userLoginLogsTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateUserLoginLogsTablePage: function updateUserLoginLogsTablePage(page) {
        var state = this.state;
        state.userLoginLogsTable.page = page;
        this.setState(state);
    },
    updateUserLoginLogsTableQuery: function updateUserLoginLogsTableQuery(query) {
        var state = this.state;
        state.userLoginLogsTable.query = query;
        this.setState(state);
    },
    updateUserLoginLogsTableLoading: function updateUserLoginLogsTableLoading(flag) {
        var state = this.state;
        state.userLoginLogsTable.tableLoading = flag;
        this.setState(state);
    },
    updateUserLoginLogsTableColumns: function updateUserLoginLogsTableColumns(columns) {

        var state = this.state;
        state.userLoginLogsTable.columns = columns;
        this.setState(state);
    },
    updateUserLoginLogsTableOriginalData: function updateUserLoginLogsTableOriginalData(originalData) {
        var state = this.state;
        state.userLoginLogsTable.originalData = originalData;
        this.setState(state);
    },
    componentDidMount: function componentDidMount() {
        // "id":4,
        //     "status":1,
        //     "createTime":1520845823,
        //     "updateTime":1520845823,
        //     "isDeleted":2,
        //     "userId":41,
        //     "loginIp":"171.221.142.90",
        //     "system":"Windows 7",
        //     "dpi":"1920*1080",
        //     "brower":"chrome 62.0.3202.94",
        //     "country":"中国",
        //     "province":"四川",
        //     "city":"成都",
        //     "loginTime":1520845823,
        //     "result":1
        var _state$userLoginLogsT = this.state.userLoginLogsTable,
            query = _state$userLoginLogsT.query,
            haveSearchUsername = _state$userLoginLogsT.haveSearchUsername;

        this.updateUserLoginLogsTableColumns([{
            title: 'id',
            width: 100,
            dataIndex: 'id',
            sorter: true
        },
        // {
        //     title: '用户id',
        //     width: 100,
        //     dataIndex: 'user_id',
        //     sorter: true
        // },
        {
            title: '用户名',
            width: 100,
            dataIndex: 'username',
            render: function render(text, record) {
                if (isUndefined(text)) {
                    return "未知";
                }
                return _vm_util.commons.highLight(text, query.username);
            },
            sorter: true,
            filterDropdown: _react2.default.createElement(
                "div",
                { className: "custom-filter-dropdown" },
                _react2.default.createElement(Search, {
                    placeholder: "\u641C\u7D22\u7528\u6237\u540D",
                    onSearch: this.onSearchUsername,
                    style: { width: 200 }
                })
            ),
            filterIcon: _react2.default.createElement(_antd.Icon, { type: "search",
                style: { color: haveSearchUsername ? '#108ee9' : '#aaa' } })
            // filterDropdownVisible: this.state.userTable.usernameDropdownVisible,

        }, {
            title: '登录ip',
            width: 100,
            dataIndex: 'login_ip',
            sorter: true
        }, {
            title: '操作系统',
            width: 100,
            dataIndex: 'system',
            sorter: true
        }, {
            title: '分辨率',
            width: 100,
            dataIndex: 'dpi',
            sorter: true
        }, {
            title: '浏览器',
            width: 100,
            dataIndex: 'brower',
            sorter: true
        }, {
            title: '国家',
            width: 100,
            dataIndex: 'country',
            sorter: true
        }, {
            title: '省份',
            width: 100,
            dataIndex: 'province',
            sorter: true
        }, {
            title: '城市',
            width: 100,
            dataIndex: 'city',
            sorter: true
        }, {
            title: '登陆时间',
            width: 100,
            dataIndex: 'login_time',
            render: function render(text) {
                return timeFormatter.formatTime(text * 1000);
            },
            sorter: true
        }]);

        // this.loadUserLoginLogsTableData();
        // 外部执行加载数据
    },
    handleTableChange: function handleTableChange(pagination, filters, sorter) {

        var page = this.state.userLoginLogsTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateUserLoginLogsTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadUserLoginLogsTableData();
    },
    userLoginLogsTableDataFiledsConverter: function userLoginLogsTableDataFiledsConverter(originalData) {
        var data = [];
        $.each(originalData, function (i, item) {

            data.push({
                key: i,
                id: item.id,
                username: item.username,
                create_time: item.createTime,
                update_time: item.updateTime,
                user_id: item.userId,
                login_ip: item.loginIp,
                system: item.system,
                dpi: item.dpi,
                brower: item.brower,
                country: item.country,
                province: item.province,
                city: item.city,
                login_time: item.loginTime,
                result: item.result
            });
        }.bind(this));
        return data;
    },
    loadUserLoginLogsTableData: function loadUserLoginLogsTableData() {
        this.updateUserLoginLogsTableLoading(true);
        this.updateUserLoginLogsTableRefreshBtnLoading(true);
        var _state$userLoginLogsT2 = this.state.userLoginLogsTable,
            page = _state$userLoginLogsT2.page,
            query = _state$userLoginLogsT2.query;
        //filter

        var orderType = page.orderType;
        if (orderType == "descend") {
            orderType = "desc";
        }
        if (orderType == "ascend") {
            orderType = "asc";
        }
        page.orderType = orderType;

        //ajax
        _vm_util.ajax.get({
            url: this.state.userLoginLogsTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.userLoginLogsTableDataFiledsConverter(originalData);
                //save data

                this.updateUserLoginLogsTableOriginalData(originalData);

                this.updateUserLoginLogsTableData(data);

                var page = this.state.userLoginLogsTable.page;
                this.updateUserLoginLogsTablePage({
                    start: page.start,
                    size: page.size,
                    orderBy: page.orderBy,
                    orderType: page.orderType,
                    total: result.data.total
                });
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function () {}.bind(this),
            complete: function () {
                this.updateUserLoginLogsTableLoading(false);
                this.updateUserLoginLogsTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },

    render: function render() {
        var _state$userLoginLogsT3 = this.state.userLoginLogsTable,
            _title = _state$userLoginLogsT3.title,
            columns = _state$userLoginLogsT3.columns,
            data = _state$userLoginLogsT3.data,
            page = _state$userLoginLogsT3.page,
            tableLoading = _state$userLoginLogsT3.tableLoading,
            refreshBtnLoading = _state$userLoginLogsT3.refreshBtnLoading,
            bordered = _state$userLoginLogsT3.bordered;

        //set now page's props

        return _react2.default.createElement(
            "div",
            { id: "user_login_logs_table" },
            _react2.default.createElement(
                "div",
                { style: { marginBottom: 16 } },
                _react2.default.createElement(
                    _antd.Button,
                    {
                        loading: refreshBtnLoading,
                        onClick: this.loadUserLoginLogsTableData
                    },
                    "\u5237\u65B0"
                )
            ),
            _react2.default.createElement(_antd.Table, {
                locale: { emptyText: "暂无用户数据" },
                columns: columns,
                dataSource: data,
                pagination: {
                    total: page.total,
                    showTotal: function showTotal(total, range) {
                        return "\u7B2C " + range[0] + "-" + range[1] + " \u6761\u8BB0\u5F55 , \u5171 " + total + " \u6761\u8BB0\u5F55";
                    },
                    pageSize: page.size,
                    defaultCurrent: 1
                },
                loading: tableLoading,
                onChange: this.handleTableChange,
                bordered: bordered,
                title: function title() {
                    return _title;
                }
                // footer={() => 'Footer'}
                , scroll: { x: "100%", y: "100%" } })
        );
    }
});

exports.default = UserLoginLogsTable; //将App组件导出

/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(2);

__webpack_require__(125);

var _vm_util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var AdminLoginLogsTable = _react2.default.createClass({
    displayName: "AdminLoginLogsTable",

    getInitialState: function getInitialState() {

        return {
            adminEditDialog: {
                echoData: undefined
            },
            adminLoginLogsTable: {
                title: '管理员登录日志列表',
                dataSourceUrl: "/admin/login/logs/info/list",
                editable: false,
                haveSearchAdminname: false,
                adminnameDropdownVisible: false,
                bordered: false,
                tableLoading: false,
                refreshBtnLoading: false,
                data: [], //displayData
                originalData: [],
                page: {
                    start: 0,
                    size: 5,
                    orderBy: "",
                    orderType: "",
                    total: 0
                },
                query: {
                    username: "",
                    adminId: null
                },
                columns: [],
                deletingTip: "正在删除"
            }
        };
    },
    updateAdminIdOfQuery: function updateAdminIdOfQuery(adminId) {
        var state = this.state;
        state.adminLoginLogsTable.query.adminId = adminId;
        this.setState(state);
    },
    loadDataByAdminId: function loadDataByAdminId(adminId) {
        this.updateAdminIdOfQuery(adminId);
        this.loadAdminLoginLogsTableData();
    },
    onSearchAdminname: function onSearchAdminname(adminname) {
        this.updateAdminnameOfQuery(adminname);
        if (!isEmptyString(this.state.adminLoginLogsTable.query.username)) {
            this.updateHaveSearchAdminname(true);
        } else {

            this.updateHaveSearchAdminname(false);
        }
        this.loadAdminLoginLogsTableData();
    },
    updateHaveSearchAdminname: function updateHaveSearchAdminname(haveSearchAdminname) {
        var state = this.state;
        state.adminLoginLogsTable.haveSearchAdminname = haveSearchAdminname;
        this.setState(state);
    },
    updateAdminnameOfQuery: function updateAdminnameOfQuery(adminname) {
        var state = this.state;
        state.adminLoginLogsTable.query.username = adminname;
        this.setState(state);
    },
    updateAdminLoginLogsTableData: function updateAdminLoginLogsTableData(data) {
        var state = this.state;
        state.adminLoginLogsTable.data = data;
        this.setState(state);
    },
    updateAdminLoginLogsTableRefreshBtnLoading: function updateAdminLoginLogsTableRefreshBtnLoading(loading) {
        var state = this.state;
        state.adminLoginLogsTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateAdminLoginLogsTablePage: function updateAdminLoginLogsTablePage(page) {
        var state = this.state;
        state.adminLoginLogsTable.page = page;
        this.setState(state);
    },
    updateAdminLoginLogsTableQuery: function updateAdminLoginLogsTableQuery(query) {
        var state = this.state;
        state.adminLoginLogsTable.query = query;
        this.setState(state);
    },
    updateAdminLoginLogsTableLoading: function updateAdminLoginLogsTableLoading(flag) {
        var state = this.state;
        state.adminLoginLogsTable.tableLoading = flag;
        this.setState(state);
    },
    updateAdminLoginLogsTableColumns: function updateAdminLoginLogsTableColumns(columns) {

        var state = this.state;
        state.adminLoginLogsTable.columns = columns;
        this.setState(state);
    },
    updateAdminLoginLogsTableOriginalData: function updateAdminLoginLogsTableOriginalData(originalData) {
        var state = this.state;
        state.adminLoginLogsTable.originalData = originalData;
        this.setState(state);
    },
    componentDidMount: function componentDidMount() {
        // "id":4,
        //     "status":1,
        //     "createTime":1520845823,
        //     "updateTime":1520845823,
        //     "isDeleted":2,
        //     "adminId":41,
        //     "loginIp":"171.221.142.90",
        //     "system":"Windows 7",
        //     "dpi":"1920*1080",
        //     "brower":"chrome 62.0.3202.94",
        //     "country":"中国",
        //     "province":"四川",
        //     "city":"成都",
        //     "loginTime":1520845823,
        //     "result":1
        var _state$adminLoginLogs = this.state.adminLoginLogsTable,
            query = _state$adminLoginLogs.query,
            haveSearchAdminname = _state$adminLoginLogs.haveSearchAdminname;

        this.updateAdminLoginLogsTableColumns([{
            title: 'id',
            width: 100,
            dataIndex: 'id',
            sorter: true
        },
        // {
        //     title: '用户id',
        //     width: 100,
        //     dataIndex: 'admin_id',
        //     sorter: true
        // },
        {
            title: '管理员',
            width: 100,
            dataIndex: 'username',
            render: function render(text, record) {
                if (isUndefined(text)) {
                    return "未知";
                }
                return _vm_util.commons.highLight(text, query.username);
            },
            sorter: true,
            filterDropdown: _react2.default.createElement(
                "div",
                { className: "custom-filter-dropdown" },
                _react2.default.createElement(Search, {
                    placeholder: "\u641C\u7D22\u7BA1\u7406\u5458",
                    onSearch: this.onSearchAdminname,
                    style: { width: 200 }
                })
            ),
            filterIcon: _react2.default.createElement(_antd.Icon, { type: "search",
                style: { color: haveSearchAdminname ? '#108ee9' : '#aaa' } })
            // filterDropdownVisible: this.state.adminTable.adminnameDropdownVisible,

        }, {
            title: '登录ip',
            width: 100,
            dataIndex: 'login_ip',
            sorter: true
        }, {
            title: '操作系统',
            width: 100,
            dataIndex: 'system',
            sorter: true
        }, {
            title: '分辨率',
            width: 100,
            dataIndex: 'dpi',
            sorter: true
        }, {
            title: '浏览器',
            width: 100,
            dataIndex: 'brower',
            sorter: true
        }, {
            title: '国家',
            width: 100,
            dataIndex: 'country',
            sorter: true
        }, {
            title: '省份',
            width: 100,
            dataIndex: 'province',
            sorter: true
        }, {
            title: '城市',
            width: 100,
            dataIndex: 'city',
            sorter: true
        }, {
            title: '登陆时间',
            width: 100,
            dataIndex: 'login_time',
            render: function render(text) {
                return timeFormatter.formatTime(text * 1000);
            },
            sorter: true
        }]);

        // this.loadAdminLoginLogsTableData();
        // 外部执行加载数据
    },
    handleTableChange: function handleTableChange(pagination, filters, sorter) {

        var page = this.state.adminLoginLogsTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateAdminLoginLogsTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadAdminLoginLogsTableData();
    },
    adminLoginLogsTableDataFiledsConverter: function adminLoginLogsTableDataFiledsConverter(originalData) {
        var data = [];
        $.each(originalData, function (i, item) {

            data.push({
                key: i,
                id: item.id,
                username: item.username,
                create_time: item.createTime,
                update_time: item.updateTime,
                admin_id: item.adminId,
                login_ip: item.loginIp,
                system: item.system,
                dpi: item.dpi,
                brower: item.brower,
                country: item.country,
                province: item.province,
                city: item.city,
                login_time: item.loginTime,
                result: item.result
            });
        }.bind(this));
        return data;
    },
    loadAdminLoginLogsTableData: function loadAdminLoginLogsTableData() {
        this.updateAdminLoginLogsTableLoading(true);
        this.updateAdminLoginLogsTableRefreshBtnLoading(true);
        var _state$adminLoginLogs2 = this.state.adminLoginLogsTable,
            page = _state$adminLoginLogs2.page,
            query = _state$adminLoginLogs2.query;
        //filter

        var orderType = page.orderType;
        if (orderType == "descend") {
            orderType = "desc";
        }
        if (orderType == "ascend") {
            orderType = "asc";
        }
        page.orderType = orderType;

        //ajax
        _vm_util.ajax.get({
            url: this.state.adminLoginLogsTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.adminLoginLogsTableDataFiledsConverter(originalData);
                //save data

                this.updateAdminLoginLogsTableOriginalData(originalData);

                this.updateAdminLoginLogsTableData(data);

                var page = this.state.adminLoginLogsTable.page;
                this.updateAdminLoginLogsTablePage({
                    start: page.start,
                    size: page.size,
                    orderBy: page.orderBy,
                    orderType: page.orderType,
                    total: result.data.total
                });
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function () {}.bind(this),
            complete: function () {
                this.updateAdminLoginLogsTableLoading(false);
                this.updateAdminLoginLogsTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },

    render: function render() {
        var _state$adminLoginLogs3 = this.state.adminLoginLogsTable,
            _title = _state$adminLoginLogs3.title,
            columns = _state$adminLoginLogs3.columns,
            data = _state$adminLoginLogs3.data,
            page = _state$adminLoginLogs3.page,
            tableLoading = _state$adminLoginLogs3.tableLoading,
            refreshBtnLoading = _state$adminLoginLogs3.refreshBtnLoading,
            bordered = _state$adminLoginLogs3.bordered;

        //set now page's props

        return _react2.default.createElement(
            "div",
            { id: "admin_login_logs_table" },
            _react2.default.createElement(
                "div",
                { style: { marginBottom: 16 } },
                _react2.default.createElement(
                    _antd.Button,
                    {
                        loading: refreshBtnLoading,
                        onClick: this.loadAdminLoginLogsTableData
                    },
                    "\u5237\u65B0"
                )
            ),
            _react2.default.createElement(_antd.Table, {
                locale: { emptyText: "暂无用户数据" },
                columns: columns,
                dataSource: data,
                pagination: {
                    total: page.total,
                    showTotal: function showTotal(total, range) {
                        return "\u7B2C " + range[0] + "-" + range[1] + " \u6761\u8BB0\u5F55 , \u5171 " + total + " \u6761\u8BB0\u5F55";
                    },
                    pageSize: page.size,
                    defaultCurrent: 1
                },
                loading: tableLoading,
                onChange: this.handleTableChange,
                bordered: bordered,
                title: function title() {
                    return _title;
                }
                // footer={() => 'Footer'}
                , scroll: { x: "100%", y: "100%" } })
        );
    }
});

exports.default = AdminLoginLogsTable; //将App组件导出

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(43);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*网站头部*/
_reactDom2.default.render(_react2.default.createElement(_index2.default, null), document.getElementById('react_dom_index')); /*!!记得导入*/

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _home_page = __webpack_require__(29);

var _home_page2 = _interopRequireDefault(_home_page);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(2);

var _head = __webpack_require__(77);

var _head2 = _interopRequireDefault(_head);

var _login_dialog = __webpack_require__(79);

var _login_dialog2 = _interopRequireDefault(_login_dialog);

var _nav = __webpack_require__(83);

var _nav2 = _interopRequireDefault(_nav);

var _routes = __webpack_require__(85);

var _routes2 = _interopRequireDefault(_routes);

var _vm_util = __webpack_require__(3);

__webpack_require__(133);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;

//import "antd/dist/antd.css";


var Index = _react2.default.createClass({
    displayName: 'Index',

    getInitialState: function getInitialState() {
        var collapsed = false;
        var collapsedWidth = 80;
        var siderWidth = 200;
        return {
            collapsed: collapsed,
            siderWidth: siderWidth,
            collapsedWidth: collapsedWidth,
            siderCurrtWidth: collapsed ? collapsedWidth : siderWidth
        };
    },
    onCollapse: function onCollapse(collapsed, type) {
        // console.log(collapsed);
        var _state = this.state,
            siderWidth = _state.siderWidth,
            collapsedWidth = _state.collapsedWidth;

        this.setState({ collapsed: collapsed });
        var newSiderWidth = collapsedWidth;
        if (!collapsed) {
            newSiderWidth = siderWidth;
        }
        this.updateSiderCurrtWidth(newSiderWidth);
    },
    updateSiderCurrtWidth: function updateSiderCurrtWidth(siderCurrtWidth) {
        this.setState({ siderCurrtWidth: siderCurrtWidth });
    },

    render: function render() {
        //set now page's props
        var _state2 = this.state,
            collapsed = _state2.collapsed,
            siderCurrtWidth = _state2.siderCurrtWidth,
            collapsedWidth = _state2.collapsedWidth;


        return _react2.default.createElement(
            _reactRouterDom.HashRouter,
            null,
            _react2.default.createElement(
                _antd.Layout,
                null,
                _react2.default.createElement(_login_dialog2.default, { ref: 'login_dialog' }),
                _react2.default.createElement(
                    Sider,
                    {
                        collapsible: true,
                        collapsed: collapsed,

                        onCollapse: this.onCollapse,
                        width: siderCurrtWidth,
                        collapsedWidth: collapsedWidth,
                        style: { overflow: 'auto', height: '100vh', zIndex: "999", position: 'fixed', left: 0 }
                    },
                    _react2.default.createElement(_nav2.default, null)
                ),
                _react2.default.createElement(
                    _antd.Layout,
                    { style: { marginLeft: siderCurrtWidth } },
                    _react2.default.createElement(
                        Header,
                        { style: { background: '#fff', padding: 0 } },
                        _react2.default.createElement(_head2.default, null)
                    ),
                    _react2.default.createElement(
                        Content,
                        { style: { margin: '0 16px', overflow: 'initial' } },
                        _react2.default.createElement(
                            _antd.Breadcrumb,
                            { style: { margin: '16px 0' } },
                            _react2.default.createElement(
                                _antd.Breadcrumb.Item,
                                null,
                                'User'
                            ),
                            _react2.default.createElement(
                                _antd.Breadcrumb.Item,
                                null,
                                'Bill'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { style: { paddingLeft: 24, paddingRight: 24, background: '#fff' } },
                            _react2.default.createElement(_routes2.default, null)
                        )
                    ),
                    _react2.default.createElement(
                        Footer,
                        { style: { textAlign: 'center' } },
                        'Vm backend \xA92016 Created by Zhangke'
                    )
                )
            )
        );
    }
});

exports.default = Index; //将App组件导出

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createBrowserHistory__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createBrowserHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_history_createBrowserHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(23);
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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(6);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(9);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(21);

var _PathUtils = __webpack_require__(16);

var _createTransitionManager = __webpack_require__(22);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__(32);

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
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createHashHistory__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createHashHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_history_createHashHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(23);
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(6);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(9);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(21);

var _PathUtils = __webpack_require__(16);

var _createTransitionManager = __webpack_require__(22);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _DOMUtils = __webpack_require__(32);

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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_MemoryRouter__ = __webpack_require__(49);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_MemoryRouter__["a" /* default */]);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createMemoryHistory__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_history_createMemoryHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_history_createMemoryHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(24);
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(6);

var _warning2 = _interopRequireDefault(_warning);

var _PathUtils = __webpack_require__(16);

var _LocationUtils = __webpack_require__(21);

var _createTransitionManager = __webpack_require__(22);

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
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Route__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Link__ = __webpack_require__(33);
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(53)

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
/* 53 */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Prompt__ = __webpack_require__(55);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Prompt__["a" /* default */]);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_invariant__ = __webpack_require__(9);
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
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Redirect__ = __webpack_require__(57);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Redirect__["a" /* default */]);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_history__ = __webpack_require__(58);
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
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createBrowserHistory__ = __webpack_require__(59);
/* unused harmony reexport createBrowserHistory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__createHashHistory__ = __webpack_require__(60);
/* unused harmony reexport createHashHistory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createMemoryHistory__ = __webpack_require__(61);
/* unused harmony reexport createMemoryHistory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LocationUtils__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__LocationUtils__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__LocationUtils__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PathUtils__ = __webpack_require__(17);
/* unused harmony reexport parsePath */
/* unused harmony reexport createPath */










/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LocationUtils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PathUtils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createTransitionManager__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DOMUtils__ = __webpack_require__(36);
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
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LocationUtils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PathUtils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createTransitionManager__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DOMUtils__ = __webpack_require__(36);
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
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PathUtils__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LocationUtils__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createTransitionManager__ = __webpack_require__(26);
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
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_StaticRouter__ = __webpack_require__(63);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_StaticRouter__["a" /* default */]);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_history_PathUtils__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_history_PathUtils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_history_PathUtils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Router__ = __webpack_require__(24);
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
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_Switch__ = __webpack_require__(65);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_Switch__["a" /* default */]);

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__matchPath__ = __webpack_require__(25);
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
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_matchPath__ = __webpack_require__(25);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_matchPath__["a" /* default */]);

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router_es_withRouter__ = __webpack_require__(68);
// Written in this round about way for babel-transform-imports


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_react_router_es_withRouter__["a" /* default */]);

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Route__ = __webpack_require__(35);
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(11))(464);

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = { http_url_prefix: 'http://192.168.0.189:5550' };
// module.exports = { http_url_prefix: 'http://192.168.11.222:5551' };
// module.exports = { http_uEventEmitterrl_prefix: 'http://47.106.119.0:5551' };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _events = __webpack_require__(12);

__webpack_require__(13);

__webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _vm_util = __webpack_require__(3);

var _echarts = __webpack_require__(15);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;
//import "antd/dist/antd.css";

var SubMenu = _antd.Menu.SubMenu;
// import ReactEcharts from 'echarts-for-react';


var UserSexCount = _react2.default.createClass({
    displayName: "UserSexCount",

    getInitialState: function getInitialState() {
        return {
            url: "/user/count/sex"
        };
    },

    componentDidMount: function componentDidMount() {

        this.loadData();
    },
    initEcharts: function initEcharts(option) {
        var myChart = _echarts2.default.init($(this.refs.chartContainer).get(0));

        myChart.setOption(option, true);
    },
    loadData: function loadData() {
        var url = this.state.url;
        //ajax

        _vm_util.ajax.get({
            url: url,
            ignoreAjaxError: true,
            success: function (result) {
                var option = this.getOption(result);
                this.initEcharts(option);
            }.bind(this),
            failure: function (result) {}.bind(this),
            error: function () {}.bind(this),
            complete: function () {}.bind(this)
        });
    },
    getOption: function getOption(result) {

        //sexStrs
        var sexCodes = _vm_util.commons.getFieldListByKey(result.data.list, "sex");

        var sexStrs = [];

        $.each(sexCodes, function (i, item) {
            sexStrs.push(_vm_util.commons.getSexStrByIndex({
                index: item
            }));
        });
        //data
        var data = [];
        $.each(result.data.list, function (i, item) {

            var str = _vm_util.commons.getSexStrByIndex({
                index: item.sex
            });
            data.push({
                value: item.number, name: str
            });
        });
        var option = {
            title: {
                text: '用户性别分布',
                // subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: sexStrs
            },
            calculable: true,
            series: [{

                name: '用户性别分布',
                type: 'pie',
                radius: [20, 110],
                // center : ['25%', '50%'],
                roseType: 'area',
                data: data
            }]
        };

        return option;
    },

    render: function render() {

        return _react2.default.createElement("div", { ref: "chartContainer", style: { width: "100%", height: "300" } });
    }
});

exports.default = UserSexCount; //将App组件导出

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _events = __webpack_require__(12);

__webpack_require__(13);

__webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _vm_util = __webpack_require__(3);

var _echarts = __webpack_require__(15);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
//import "antd/dist/antd.css";

// import ReactEcharts from 'echarts-for-react';

var MovieClsCount = _react2.default.createClass({
    displayName: 'MovieClsCount',

    getInitialState: function getInitialState() {
        return {};
    },

    componentDidMount: function componentDidMount() {

        c($(this.refs.chartContainer));
        var myChart = _echarts2.default.init($(this.refs.chartContainer).get(0));

        myChart.setOption(this.getOption(), true);
    },
    getOption: function getOption() {
        var option = {
            title: {
                text: '电影类型分布',
                // subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: ['惊悚', '恐怖', '喜剧']
            },
            calculable: true,
            series: [{

                name: '半径模式',
                type: 'pie',
                radius: [20, 110],
                // center : ['25%', '50%'],
                roseType: 'radius',
                data: [{ value: 112130, name: '惊悚' }, { value: 212313, name: '恐怖' }, { value: 10311, name: '喜剧' }]
            }]
        };

        return option;
    },

    render: function render() {
        return _react2.default.createElement('div', { ref: 'chartContainer', style: { width: "100%", height: "300" } });
    }
});

exports.default = MovieClsCount; //将App组件导出

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _events = __webpack_require__(12);

__webpack_require__(13);

__webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _vm_util = __webpack_require__(3);

var _echarts = __webpack_require__(15);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
//import "antd/dist/antd.css";

// import ReactEcharts from 'echarts-for-react';


var UserRegistNumCount = _react2.default.createClass({
    displayName: 'UserRegistNumCount',

    getInitialState: function getInitialState() {
        return {};
    },

    componentDidMount: function componentDidMount() {

        c($(this.refs.chartContainer));
        var myChart = _echarts2.default.init($(this.refs.chartContainer).get(0));

        myChart.setOption(this.getOption(), true);
    },
    getOption: function getOption() {

        var option = {
            title: {
                text: '用户注册量',
                // subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]

        };

        return option;
    },

    render: function render() {

        return _react2.default.createElement('div', { ref: 'chartContainer', style: { width: "100%", height: "400" } });
    }
});

exports.default = UserRegistNumCount; //将App组件导出

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _events = __webpack_require__(12);

__webpack_require__(13);

__webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _vm_util = __webpack_require__(3);

var _echarts = __webpack_require__(15);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
//import "antd/dist/antd.css";

// import ReactEcharts from 'echarts-for-react';


var UserAgeCount = _react2.default.createClass({
    displayName: 'UserAgeCount',

    getInitialState: function getInitialState() {
        return {};
    },

    componentDidMount: function componentDidMount() {

        var myChart = _echarts2.default.init($(this.refs.chartContainer).get(0));

        myChart.setOption(this.getOption(), true);
    },
    getOption: function getOption() {
        var option = {
            title: {
                text: '用户年龄分布',
                // subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: ['80后', '90后', '00后', '10后']
            },
            calculable: true,
            series: [{

                name: '用户年龄分布',
                type: 'pie',
                radius: [20, 110],
                // center : ['25%', '50%'],
                roseType: 'area',
                data: [{ value: 1110, name: '80后' }, { value: 501, name: '90后' }, { value: 501, name: '00后' }, { value: 500, name: '10后' }]
            }]
        };

        return option;
    },

    render: function render() {

        return _react2.default.createElement('div', { ref: 'chartContainer', style: { width: "100%", height: "300" } });
    }
});

exports.default = UserAgeCount; //将App组件导出

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _events = __webpack_require__(12);

__webpack_require__(13);

__webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _vm_util = __webpack_require__(3);

var _echarts = __webpack_require__(15);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
//import "antd/dist/antd.css";

// import ReactEcharts from 'echarts-for-react';


var UserLoginAreaCount = _react2.default.createClass({
    displayName: 'UserLoginAreaCount',

    getInitialState: function getInitialState() {
        return {
            url: "/user/count/login_area"
        };
    },

    componentDidMount: function componentDidMount() {

        this.loadData();
    },
    initEcharts: function initEcharts(option) {
        var myChart = _echarts2.default.init($(this.refs.chartContainer).get(0));

        myChart.setOption(option, true);
    },
    loadData: function loadData() {
        var url = this.state.url;
        //ajax

        _vm_util.ajax.get({
            url: url,
            ignoreAjaxError: true,
            success: function (result) {
                var option = this.getOption(result);
                this.initEcharts(option);
            }.bind(this),
            failure: function (result) {}.bind(this),
            error: function () {}.bind(this),
            complete: function () {}.bind(this)
        });
    },
    getOption: function getOption(result) {

        //sexStrs
        var codes = _vm_util.commons.getFieldListByKey(result.data.list, "area");

        //data
        var data = [];
        $.each(result.data.list, function (i, item) {

            data.push({
                value: item.number, name: item.area
            });
        });
        var option = {
            title: {
                text: '用户登录地区分布',
                // subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: codes
            },
            calculable: true,
            series: [{

                name: '用户登录地区分布',
                type: 'pie',
                radius: [20, 110],
                // center : ['25%', '50%'],
                roseType: 'area',
                data: data
            }]
        };

        return option;
    },

    render: function render() {

        return _react2.default.createElement('div', { ref: 'chartContainer', style: { width: "100%", height: "300" } });
    }
});

exports.default = UserLoginAreaCount; //将App组件导出

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _events = __webpack_require__(12);

__webpack_require__(13);

__webpack_require__(2);

var _reactRouterDom = __webpack_require__(4);

var _vm_util = __webpack_require__(3);

var _echarts = __webpack_require__(15);

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
//import "antd/dist/antd.css";

// import ReactEcharts from 'echarts-for-react';


var UserLoginSystemCount = _react2.default.createClass({
    displayName: 'UserLoginSystemCount',

    getInitialState: function getInitialState() {
        return {
            url: "/user/count/login_system"
        };
    },

    componentDidMount: function componentDidMount() {

        this.loadData();
    },
    initEcharts: function initEcharts(option) {
        var myChart = _echarts2.default.init($(this.refs.chartContainer).get(0));

        myChart.setOption(option, true);
    },
    loadData: function loadData() {
        var url = this.state.url;
        //ajax

        _vm_util.ajax.get({
            url: url,
            ignoreAjaxError: true,
            success: function (result) {
                var option = this.getOption(result);
                this.initEcharts(option);
            }.bind(this),
            failure: function (result) {}.bind(this),
            error: function () {}.bind(this),
            complete: function () {}.bind(this)
        });
    },
    getOption: function getOption(result) {

        //sexStrs
        var codes = _vm_util.commons.getFieldListByKey(result.data.list, "area");

        //data
        var data = [];
        $.each(result.data.list, function (i, item) {

            data.push({
                value: item.number, name: item.system
            });
        });
        var option = {
            title: {
                text: '用户登录系统分布',
                // subtext: '纯属虚构',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: codes
            },
            calculable: true,
            series: [{

                name: '用户登录系统分布',
                type: 'pie',
                radius: [20, 110],
                // center : ['25%', '50%'],
                roseType: 'area',
                data: data
            }]
        };

        return option;
    },

    render: function render() {

        return _react2.default.createElement('div', { ref: 'chartContainer', style: { width: "100%", height: "300" } });
    }
});

exports.default = UserLoginSystemCount; //将App组件导出

/***/ }),
/* 77 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: E:/zk/vm-web/src/vm-backend/app/components/index/head.jsx: Duplicate declaration \"stompClient\"\n\n\u001b[0m \u001b[90m 42 | \u001b[39m        \u001b[90m// var url = \"http://192.168.0.189:2220/gs-guide-websocket\";\u001b[39m\n \u001b[90m 43 | \u001b[39m        \u001b[36mvar\u001b[39m socket \u001b[33m=\u001b[39m \u001b[36mnew\u001b[39m \u001b[33mSockJS\u001b[39m(url)\u001b[33m;\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 44 | \u001b[39m        \u001b[36mvar\u001b[39m stompClient \u001b[33m=\u001b[39m \u001b[33mStomp\u001b[39m\u001b[33m.\u001b[39mover(socket)\u001b[33m;\u001b[39m\n \u001b[90m    | \u001b[39m            \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 45 | \u001b[39m        stompClient\u001b[33m.\u001b[39mconnect({}\u001b[33m,\u001b[39m \u001b[36mfunction\u001b[39m (frame) {\n \u001b[90m 46 | \u001b[39m            \u001b[90m// setConnected(true);\u001b[39m\n \u001b[90m 47 | \u001b[39m            console\u001b[33m.\u001b[39mlog(\u001b[32m'Connected: '\u001b[39m \u001b[33m+\u001b[39m frame)\u001b[33m;\u001b[39m\u001b[0m\n");

/***/ }),
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(vm_config) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

__webpack_require__(82);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;
//import "antd/dist/antd.css";

var FormItem = _antd.Form.Item;
var SubMenu = _antd.Menu.SubMenu;

var LoginDialog = _react2.default.createClass({
    displayName: "LoginDialog",

    getInitialState: function getInitialState() {
        return {
            width: 350,
            title: "登录",
            closable: false,
            loginUrl: "/admin/login",
            tipOfLogining: "正在登录"
        };
    },

    registEvents: function registEvents() {
        var _this = this;

        window.eventEmitEmitter.on('showLoginDialog', function () {

            _this.showLoginDialog();
        });
    },
    componentDidMount: function componentDidMount() {

        this.registEvents();
    },
    showLoginDialog: function showLoginDialog() {
        this.getAdminLoginDialog().showDialog();
    },
    getAdminLoginDialog: function getAdminLoginDialog() {
        return this.refs.login_dialog;
    },
    handleCancel: function handleCancel() {
        c("handleCancel");
    },
    handleSubmit: function handleSubmit(values) {
        var _state = this.state,
            loginUrl = _state.loginUrl,
            tipOfLogining = _state.tipOfLogining;


        var hideMessage = _antd.message.loading(tipOfLogining, 0);

        var data = $.extend(values, getVisitInfoObj());
        _vm_util.ajax.post({
            url: loginUrl,
            data: data,
            success: function (result) {

                var admin = result.data.admin;

                localStorage.setItem(vm_config.key_of_access_token, admin.token);

                _antd.message.success(result.msg);

                this.getAdminLoginDialog().closeDialog();

                //callback
                window.EventsDispatcher.updateLoginAdminInfo(admin);

                //clear form
                this.getAdminLoginDialog().clearForm();

                window.EventsDispatcher.startPollingCheckOnlineAdmin();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getAdminLoginDialog().formLeaveLoading();
            }.bind(this)
        });
    },

    render: function render() {
        var formRows = [{

            cols: [{
                col: { span: 24 },
                label: "用户名",
                id: "username",
                config: {
                    rules: [{ required: true, whitespace: true, message: '请输入用户名!' }]
                },
                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    name: "username",
                    prefix: _react2.default.createElement(_antd.Icon, { type: "user", style: { color: 'rgba(0,0,0,.25)' } }),
                    placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u7528\u6237\u540D" })
            }]
        }, {
            cols: [{
                col: { span: 24 },
                label: "密码",
                id: "password",
                config: {
                    rules: [{ required: true, whitespace: true, message: '请输入密码!' }]
                },
                input: _react2.default.createElement(_antd.Input, { name: "password",
                    type: "password",
                    autoComplete: "off",
                    prefix: _react2.default.createElement(_antd.Icon, { type: "lock", style: { color: 'rgba(0,0,0,.25)' } }),
                    placeholder: "\u8BF7\u8F93\u5165\u60A8\u7684\u5BC6\u7801" })
            }]
        }];

        //get state
        var _state2 = this.state,
            width = _state2.width,
            title = _state2.title,
            closable = _state2.closable;

        return _react2.default.createElement(_edit_dialog_temple2.default, {
            ref: "login_dialog",
            title: title,
            width: width,
            closable: closable,
            formRows: formRows,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel });
    }
});
exports.default = LoginDialog; //将App组件导出
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(2);

__webpack_require__(81);

var _vm_util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var FormItem = _antd.Form.Item;
var SubMenu = _antd.Menu.SubMenu;

//import "antd/dist/antd.css";


//create form
// const LoginForm = Form.create()(<LoginFormWillBeWrap/>);
var EditFormTempleWrapper = _react2.default.createClass({
    displayName: 'EditFormTempleWrapper',

    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {},
    handleSubmit: function handleSubmit(e) {
        var handleSubmit = this.props.handleSubmit;


        e.preventDefault();
        this.props.form.validateFields(function (err, values) {
            if (!err) {
                if (!isUndefined(handleSubmit)) {
                    c("form values is :");
                    c(values);
                    handleSubmit(values);
                }
            }
        }.bind(this));
    },
    generateFormRows: function generateFormRows(formRows) {
        //get props.form
        var getFieldDecorator = this.props.form.getFieldDecorator;


        var formRowsRes = formRows.map(function (row, i) {
            var cols = row.cols;

            var colsRes = cols.map(function (aCol, j) {
                var config = aCol.config,
                    id = aCol.id,
                    input = aCol.input,
                    label = aCol.label,
                    col = aCol.col,
                    wrapperCol = aCol.wrapperCol,
                    labelCol = aCol.labelCol;

                if (!isUndefined(config)) {
                    if (isUndefined(config.validateFirst)) {
                        config.validateFirst = true;
                    }
                    //!!!!该处可能更改
                    var type = _typeof(config.initialValue);
                    if (!isUndefined(config.initialValue) && (type == "number" || type == "boolean")) {
                        config.initialValue = config.initialValue + ""; //转化为字符串
                    }
                } else {
                    // w(input);
                    // w("isUndefined(config)");
                    config = {};
                }
                if (isUndefined(id)) {
                    // w(input);
                    // w("=>isUndefined(id)");
                    id = uuid();
                }

                if (isUndefined(col)) {
                    col = {};
                }
                if (isUndefined(col.span)) {
                    col.span = null;
                }
                if (isUndefined(wrapperCol)) {
                    wrapperCol = null;
                }
                if (isUndefined(labelCol)) {
                    labelCol = null;
                }
                if (isUndefined(label)) {
                    label = null;
                }

                return _react2.default.createElement(
                    _antd.Col,
                    { span: col.span,
                        key: j },
                    _react2.default.createElement(
                        FormItem,
                        {
                            label: label,
                            wrapperCol: wrapperCol,
                            labelCol: labelCol },
                        getFieldDecorator(id, config)(input)
                    )
                );
            }.bind(this));

            return _react2.default.createElement(
                FormItem,
                { key: i },
                colsRes
            );
        }.bind(this));
        return formRowsRes;
    },

    render: function render() {

        //get props
        var _props = this.props,
            loading = _props.loading,
            formRows = _props.formRows,
            formLayout = _props.formLayout;


        var formItemsRes = this.generateFormRows(formRows);

        if (isUndefined(formLayout)) {
            formLayout = null;
        }
        return _react2.default.createElement(
            _antd.Form,
            { onSubmit: this.handleSubmit
                // layout={formLayout}
                , id: 'edit-form',
                ref: 'edit_form' },
            formItemsRes,
            _react2.default.createElement(
                FormItem,
                null,
                _react2.default.createElement(
                    _antd.Col,
                    { span: '24' },
                    _react2.default.createElement(_antd.Input, { style: { display: 'none' } })
                )
            ),
            _react2.default.createElement(
                FormItem,
                null,
                _react2.default.createElement(
                    _antd.Button,
                    { loading: loading, type: 'primary', htmlType: 'submit', id: 'edit-form-button' },
                    '\u63D0\u4EA4'
                )
            )
        );
    }
});
var EditFormTemple = _antd.Form.create({})(EditFormTempleWrapper);
exports.default = EditFormTemple; //将App组件导出

/***/ }),
/* 81 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 82 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

var _vm_util = __webpack_require__(3);

__webpack_require__(84);

__webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var FormItem = _antd.Form.Item;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;

var Nav = _react2.default.createClass({
    displayName: "Nav",

    getInitialState: function getInitialState() {
        var pathname = this.props.location.pathname; //!!!important
        return {
            selectedKeys: [pathname],
            openKeys: [],
            menuTheme: "dark", //dark,light
            menus: [],
            menuUrl: "/admin/menu/tree/byAdminId/",
            tipOfLoadMenus: "正在加载菜单"
        };
    },
    componentDidMount: function componentDidMount() {
        this.registEvents();
    },
    updateMenus: function updateMenus(menus) {
        if (isUndefined(menus)) {
            menus = [];
        }
        //open all submenu
        var openKeys = [];
        for (var i = 0; i < menus.length; i++) {
            openKeys.push(menus[i].keyProp);
        }
        openKeys.push("homeMenu");

        this.setState({ menus: menus });

        this.updateOpenKeys(openKeys);
    },
    backToHomePage: function backToHomePage() {
        _antd.message.destroy(); //阻止显示msg
        if (this.props.location.pathname != "/") {
            //不在主页

            this.stepPage("/"); //返回主页
        }
    },
    registEvents: function registEvents() {
        var _this = this;

        window.eventEmitEmitter.on('backToHomePage', function () {
            //当用户直接在地址栏输入url时，回显nav
            _this.backToHomePage();
        });
        window.eventEmitEmitter.on('onRouteEnter', function (args) {
            //当用户直接在地址栏输入url时，回显nav
            setTimeout(function () {
                var pathname = args.pathname;

                _this.updateSelectKeys([pathname]);
            }, 1);
        });
        window.eventEmitEmitter.on('updateAdminMenuTree', function (menuTree) {
            //当用户直接在地址栏输入url时，回显nav
            _this.updateMenus(menuTree);
        });
        window.eventEmitEmitter.on('updateLoginAdminInfo', function (admin) {
            //当admin更新后，更具adminId获取新的menu列表，并且广播
            if (isUndefined(admin)) {
                var menu = [];

                _this.updateMenus(menu);

                window.EventsDispatcher.updateAdminMenuTree(menu);

                // this.backToHomePage();//用户注销
            } else {
                var _state = _this.state,
                    menuUrl = _state.menuUrl,
                    tipOfLoadMenus = _state.tipOfLoadMenus;
                // const hiddenMassage = message.loading(tipOfLoadMenus, 0);

                _vm_util.ajax.get({
                    url: menuUrl + admin.id,
                    success: function (result) {

                        var menu = result.data.tree;

                        // message.success(result.msg);

                        // this.updateMenus(menu);

                        window.EventsDispatcher.updateAdminMenuTree(menu);
                    }.bind(_this),
                    failure: function failure(result) {
                        // message.error(result.msg);
                    },
                    complete: function () {
                        // hiddenMassage();
                    }.bind(_this)
                });
            }
        });
    },
    updateSelectKeys: function updateSelectKeys(selectedKeys) {
        var state = this.state;
        state.selectedKeys = selectedKeys;
        this.setState(state);
    },
    updateOpenKeys: function updateOpenKeys(openKeys) {
        var state = this.state;
        state.openKeys = openKeys;
        this.setState(state);
    },
    onMenuItmClick: function onMenuItmClick(_ref) {
        var item = _ref.item,
            key = _ref.key,
            keyPath = _ref.keyPath;

        this.stepPage(key);
    },
    stepPage: function stepPage(key) {
        //单选
        var selectedKeys = [];
        selectedKeys.push(key);
        this.updateSelectKeys(selectedKeys);
        //跳转,将key作为路由的pathname
        this.props.history.push({ //!!!important
            pathname: key,
            query: {
                param: "66" //demo
            }
        });
    },
    onSubMenuClick: function onSubMenuClick(_ref2) {
        var key = _ref2.key,
            domEvent = _ref2.domEvent;

        var openKeys = this.state.openKeys;
        if (openKeys.contains(key)) {
            openKeys.remove(key, true);
        } else {
            openKeys.push(key);
        }
        this.updateOpenKeys(openKeys);
    },

    render: function render() {
        //set now page's props
        var _state2 = this.state,
            selectedKeys = _state2.selectedKeys,
            openKeys = _state2.openKeys,
            menuTheme = _state2.menuTheme,
            menus = _state2.menus;

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "div",
                { id: "logo" },
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
            ),
            _react2.default.createElement(
                _antd.Menu,
                { theme: menuTheme,
                    openKeys: openKeys,
                    selectedKeys: selectedKeys,
                    onClick: this.onMenuItmClick,
                    mode: "inline" },
                _react2.default.createElement(
                    SubMenu,
                    {
                        key: "homeMenu",
                        onTitleClick: this.onSubMenuClick,
                        title: _react2.default.createElement(
                            "span",
                            null,
                            _react2.default.createElement(_antd.Icon, { type: "home" }),
                            _react2.default.createElement(
                                "span",
                                null,
                                "\u4E3B\u9875"
                            )
                        )
                    },
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        { key: "/" },
                        "\u4E3B\u9875"
                    )
                ),
                menus.map(function (subMenu) {
                    return _react2.default.createElement(
                        SubMenu,
                        {
                            key: subMenu.keyProp,
                            onTitleClick: this.onSubMenuClick,
                            title: _react2.default.createElement(
                                "span",
                                null,
                                _react2.default.createElement(_antd.Icon, { type: subMenu.icon }),
                                _react2.default.createElement(
                                    "span",
                                    null,
                                    subMenu.menuName
                                )
                            )
                        },
                        subMenu.child == null ? _react2.default.createElement("div", null) : subMenu.child.map(function (menu) {
                            return _react2.default.createElement(
                                _antd.Menu.Item,
                                { key: menu.keyProp },
                                menu.menuName
                            );
                        }.bind(this))
                    );
                }.bind(this))
            )
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(Nav); //将App组件导出

/***/ }),
/* 84 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(86);

__webpack_require__(2);

var _user_page = __webpack_require__(87);

var _user_page2 = _interopRequireDefault(_user_page);

var _home_page = __webpack_require__(29);

var _home_page2 = _interopRequireDefault(_home_page);

var _user_login_logs_page = __webpack_require__(96);

var _user_login_logs_page2 = _interopRequireDefault(_user_login_logs_page);

var _movie_page = __webpack_require__(97);

var _movie_page2 = _interopRequireDefault(_movie_page);

var _filmmaker_page = __webpack_require__(106);

var _filmmaker_page2 = _interopRequireDefault(_filmmaker_page);

var _tagGroup_page = __webpack_require__(111);

var _tagGroup_page2 = _interopRequireDefault(_tagGroup_page);

var _admin_page = __webpack_require__(119);

var _admin_page2 = _interopRequireDefault(_admin_page);

var _role_page = __webpack_require__(126);

var _role_page2 = _interopRequireDefault(_role_page);

var _admin_login_logs_page = __webpack_require__(132);

var _admin_login_logs_page2 = _interopRequireDefault(_admin_login_logs_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = _antd.Form.Item;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;

var Routes = _react2.default.createClass({
    displayName: "Routes",

    getInitialState: function getInitialState() {
        return {
            menuKeys: undefined //undefined说明未执行updateAdminMenuTree，反之已经执行
        };
    },
    componentDidMount: function componentDidMount() {
        this.registEvents();
    },
    updateMenuKeys: function updateMenuKeys(menuKeys) {
        this.setState({ menuKeys: menuKeys });
    },
    registEvents: function registEvents() {
        var _this = this;

        window.eventEmitEmitter.on('updateAdminMenuTree', function (menuTree) {
            //更新routes
            var menuKeys = [];
            if (!isEmptyList(menuTree)) {
                $.each(menuTree, function (i, menu) {
                    $.each(menu.child, function (j, ch) {
                        menuKeys.push(ch.keyProp);
                    });
                });
            }

            _this.updateMenuKeys(menuKeys);
        });
    },

    render: function render() {
        var menuKeys = this.state.menuKeys;


        if (!isUndefined(menuKeys) && !menuKeys.contains(this.props.location.pathname)) {
            //菜单key不包含当前路径，滚回主页去（防止误入）
            window.EventsDispatcher.backToHomePage();
        }
        if (isUndefined(menuKeys)) {
            menuKeys = [];
        }
        return _react2.default.createElement(
            "div",
            { style: { marginTop: 35, padding: 24, background: '#fff', minHeight: 360 } },
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/",
                render: function render() {
                    window.EventsDispatcher.onRouteEnter({
                        pathname: "/"
                    });

                    return _react2.default.createElement(_home_page2.default, null);
                } }),
            menuKeys.contains("/user") ? _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/user",
                render: function render() {
                    window.EventsDispatcher.onRouteEnter({
                        pathname: "/user"
                    });

                    return _react2.default.createElement(_user_page2.default, null);
                } }) : _react2.default.createElement("div", null),
            menuKeys.contains("/user/login/logs") ? _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/user/login/logs",
                render: function render() {
                    window.EventsDispatcher.onRouteEnter({
                        pathname: "/user/login/logs"
                    });
                    return _react2.default.createElement(_user_login_logs_page2.default, null);
                } }) : _react2.default.createElement("div", null),
            menuKeys.contains("/movie") ? _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/movie",
                render: function render() {
                    window.EventsDispatcher.onRouteEnter({
                        pathname: "/movie"
                    });

                    return _react2.default.createElement(_movie_page2.default, null);
                } }) : _react2.default.createElement("div", null),
            menuKeys.contains("/movie/filmmaker") ? _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/movie/filmmaker",
                render: function render() {
                    window.EventsDispatcher.onRouteEnter({
                        pathname: "/movie/filmmaker"
                    });

                    return _react2.default.createElement(_filmmaker_page2.default, null);
                } }) : _react2.default.createElement("div", null),
            menuKeys.contains("/movie/tagGroup") ? _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/movie/tagGroup",
                render: function render() {
                    window.EventsDispatcher.onRouteEnter({
                        pathname: "/movie/tagGroup"
                    });

                    return _react2.default.createElement(_tagGroup_page2.default, null);
                } }) : _react2.default.createElement("div", null),
            menuKeys.contains("/admin") ? _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/admin",
                render: function render() {
                    window.EventsDispatcher.onRouteEnter({
                        pathname: "/admin"
                    });
                    return _react2.default.createElement(_admin_page2.default, null);
                } }) : _react2.default.createElement("div", null),
            menuKeys.contains("/admin/login/logs") ? _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/admin/login/logs",
                render: function render() {
                    window.EventsDispatcher.onRouteEnter({
                        pathname: "/admin/login/logs"
                    });

                    return _react2.default.createElement(_admin_login_logs_page2.default, null);
                } }) : _react2.default.createElement("div", null),
            menuKeys.contains("/admin/role") ? _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/admin/role",
                render: function render() {
                    window.EventsDispatcher.onRouteEnter({
                        pathname: "/admin/role"
                    });

                    return _react2.default.createElement(_role_page2.default, null);
                } }) : _react2.default.createElement("div", null)
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(Routes); //将App组件导出

/***/ }),
/* 86 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(20);

__webpack_require__(2);

var _user_table = __webpack_require__(88);

var _user_table2 = _interopRequireDefault(_user_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var UserPage = _react2.default.createClass({
    displayName: "UserPage",

    getInitialState: function getInitialState() {

        return {};
    },

    render: function render() {

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_user_table2.default, null)
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(UserPage); //将App组件导出

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(vm_config) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(89);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _user_edit_dialog = __webpack_require__(90);

var _user_edit_dialog2 = _interopRequireDefault(_user_edit_dialog);

var _user_add_dialog = __webpack_require__(91);

var _user_add_dialog2 = _interopRequireDefault(_user_add_dialog);

var _img_uploader_dialog_template = __webpack_require__(27);

var _img_uploader_dialog_template2 = _interopRequireDefault(_img_uploader_dialog_template);

var _user_login_logs_dialog = __webpack_require__(94);

var _user_login_logs_dialog2 = _interopRequireDefault(_user_login_logs_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var UserTable = _react2.default.createClass({
    displayName: "UserTable",

    getInitialState: function getInitialState() {

        return {
            userImgUploaderDialog: {
                title: "头像上传",
                width: 700,
                config: {
                    aspectRatio: 1 / 1,
                    fileTypes: ["jpg", "png"],
                    fileMaxsize: 1024 * 1024 * 1, //2M
                    saveImgUrl: "/user/img",
                    uploadTempImgUrl: "/src/img",
                    extraInfo: {}
                }
            },
            userEditDialog: {
                echoData: undefined
            },
            userTable: {
                title: "用户列表",
                dataSourceUrl: "/user/info/list",
                delUserUrl: "/user/info",
                scroll: { x: true, y: 450 },
                editable: false,
                haveSearchUsername: false,
                usernameDropdownVisible: false,
                bordered: false,
                tableLoading: false,
                batchDeleteBtnLoading: false,
                refreshBtnLoading: false,
                selectedRowKeys: [],
                data: [], //displayData
                originalData: [],
                page: {
                    start: 0,
                    size: 5,
                    orderBy: "",
                    orderType: "",
                    total: 0
                },
                query: {
                    usernameQuery: ""
                },
                columns: [],
                deletingTip: "正在删除"
            }
        };
    },
    onSearchUsername: function onSearchUsername(newUsernameQuery) {
        this.updateUserTableUsernameQuery(newUsernameQuery);
        if (!isEmptyString(this.state.userTable.query.usernameQuery)) {
            this.updateUserTableHaveSearchUsername(true);
        } else {

            this.updateUserTableHaveSearchUsername(false);
        }
        this.loadUserTableData();
    },
    updateUserTableHaveSearchUsername: function updateUserTableHaveSearchUsername(haveSearchUsername) {
        var state = this.state;
        state.userTable.haveSearchUsername = haveSearchUsername;
        this.setState(state);
    },
    updateUserTableUsernameDropdownVisible: function updateUserTableUsernameDropdownVisible(usernameDropdownVisible) {
        var state = this.state;
        state.userTable.usernameDropdownVisible = usernameDropdownVisible;
        this.setState(state);
    },
    updateUserTableSelectedRowKeys: function updateUserTableSelectedRowKeys(selectedRowKeys) {
        var state = this.state;
        state.userTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },
    removeUserTableSelectedRowKeys: function removeUserTableSelectedRowKeys(removeSelectedRowKeys) {
        var selectedRowKeys = this.state.userTable.selectedRowKeys;
        selectedRowKeys = selectedRowKeys.removeByList(removeSelectedRowKeys);
        this.updateUserTableSelectedRowKeys(selectedRowKeys);
    },
    updateUserTableUsernameQuery: function updateUserTableUsernameQuery(newUsernameQuery) {
        var state = this.state;
        state.userTable.query.usernameQuery = newUsernameQuery;
        this.setState(state);
    },
    updateUserTableData: function updateUserTableData(data) {
        var state = this.state;
        state.userTable.data = data;
        this.setState(state);
    },
    updateUserTableBatchDeleteLoading: function updateUserTableBatchDeleteLoading(loading) {
        var state = this.state;
        state.userTable.batchDeleteBtnLoading = loading;
        this.setState(state);
    },
    updateUserTableRefreshBtnLoading: function updateUserTableRefreshBtnLoading(loading) {
        var state = this.state;
        state.userTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateUserTablePage: function updateUserTablePage(page) {
        var state = this.state;
        state.userTable.page = page;
        this.setState(state);
    },
    updateUserTableQuery: function updateUserTableQuery(query) {
        var state = this.state;
        state.userTable.query = query;
        this.setState(state);
    },
    updateUserTableLoading: function updateUserTableLoading(flag) {
        var state = this.state;
        state.userTable.tableLoading = flag;
        this.setState(state);
    },
    updateUserTableColumns: function updateUserTableColumns(columns) {

        var state = this.state;
        state.userTable.columns = columns;
        this.setState(state);
    },
    updateUserTableOriginalData: function updateUserTableOriginalData(originalData) {
        var state = this.state;
        state.userTable.originalData = originalData;
        this.setState(state);
    },
    updateUserEditDialogEchoData: function updateUserEditDialogEchoData(echoData) {
        var state = this.state;
        state.userEditDialog.echoData = echoData;
        this.setState(state);
    },
    getUserImgUploaderDialog: function getUserImgUploaderDialog() {
        return this.refs.user_img_uploader_dialog;
    },
    showUserImgUploaderDialog: function showUserImgUploaderDialog(record) {
        this.getUserImgUploaderDialog().showDialog();
        this.getUserImgUploaderDialog().previewImg(_vm_util.commons.generateImgUrl({
            imgUrl: record.imgUrl,
            width: 300
        }));
        this.getUserImgUploaderDialog().updateExtraInfo(record);
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        this.updateUserTableColumns([{
            title: 'id',
            width: 100,
            dataIndex: 'id',
            sorter: true
        }, {
            title: '头像',
            width: 100,
            dataIndex: 'imgUrl',
            render: function render(text, record) {
                var imageUrl = _vm_util.commons.generateImgUrl({
                    imgUrl: text,
                    width: 50
                });
                return _react2.default.createElement("img", { onClick: function onClick() {
                        return _this.showUserImgUploaderDialog(record);
                    }, style: {
                        width: 50,
                        height: 50,
                        cursor: "pointer"
                    }, src: imageUrl, alt: "\u6682\u65E0" });
            }
        }, {
            title: '用户名',
            width: 150,
            dataIndex: 'username',
            render: function render(text, record) {
                return _vm_util.commons.highLight(text, _this.state.userTable.query.usernameQuery);
            },
            sorter: true,
            filterDropdown: _react2.default.createElement(
                "div",
                { className: "custom-filter-dropdown" },
                _react2.default.createElement(Search, {
                    placeholder: "\u641C\u7D22\u7528\u6237\u540D",
                    onSearch: this.onSearchUsername,
                    style: { width: 200 }
                })
            ),
            filterIcon: _react2.default.createElement(_antd.Icon, { type: "search",
                style: { color: this.state.userTable.haveSearchUsername ? '#108ee9' : '#aaa' } })
            // filterDropdownVisible: this.state.userTable.usernameDropdownVisible,

        }, {
            title: '性别',
            width: 100,
            dataIndex: 'sex',
            render: function render(text) {
                return _vm_util.commons.getSexStrByIndex({ index: text });
            },
            sorter: true

        }, {
            title: '密码', width: 100,
            dataIndex: 'password',
            sorter: true
        },
        // {
        //     title: '简介', width: 200,
        //     dataIndex: 'description',
        //     render: (text) => {
        //         return commons.makeTipSpan(text, 33);
        //     },
        //     sorter: true
        // },
        {
            title: '生日',
            width: 100,
            dataIndex: 'birthday',
            render: function render(text) {
                return timeFormatter.formatDate(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '创建时间',
            width: 150,
            dataIndex: 'create_time',
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '最后更新时间',
            width: 150,
            dataIndex: 'update_time',
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '状态',
            width: 100,
            dataIndex: 'status',
            render: function render(text) {
                return _vm_util.commons.getStatusStrByIndex({ index: text });
            },
            sorter: true
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 150,
            render: function render(text, record) {
                var menu = _react2.default.createElement(
                    _antd.Menu,
                    null,
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { onClick: function onClick() {
                                    return _this.showUserLoginLogsDialog(record.id);
                                }, href: "javascript:void(0);" },
                            "\u67E5\u770B\u767B\u5F55\u65E5\u5FD7"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { onClick: function onClick() {
                                    return _this.showEditDialog(record);
                                }, href: "javascript:void(0);" },
                            "\u7F16\u8F91"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            _antd.Popconfirm,
                            { title: "\u786E\u8BA4\u5220\u9664 ? ",
                                okText: "\u5220\u9664",
                                cancelText: "\u53D6\u6D88",
                                onConfirm: function onConfirm() {
                                    return _this.deleteRecord([record.id]);
                                } },
                            _react2.default.createElement(
                                "a",
                                { href: "javascript:void(0)" },
                                "\u5220\u9664"
                            )
                        )
                    )
                );
                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        _antd.Dropdown,
                        { overlay: menu },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0);" },
                            "\u64CD\u4F5C ",
                            _react2.default.createElement(_antd.Icon, { type: "down" })
                        )
                    )
                );
            },
            sorter: true
        }]);
        this.loadUserTableData();
    },
    handleTableChange: function handleTableChange(pagination, filters, sorter) {

        var page = this.state.userTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateUserTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadUserTableData();
    },
    userTableDataFiledsConverter: function userTableDataFiledsConverter(originalData) {
        var data = [];
        $.each(originalData, function (i, item) {

            data.push({
                key: item.id,
                id: item.id,
                imgUrl: item.imgUrl,
                username: item.username,
                sex: item.sex,
                password: item.password,
                description: item.description,
                birthday: item.birthday,
                create_time: item.createTime,
                update_time: item.updateTime,
                status: item.status
            });
        }.bind(this));
        return data;
    },
    loadUserTableData: function loadUserTableData() {
        this.updateUserTableLoading(true);
        this.updateUserTableRefreshBtnLoading(true);
        var _state$userTable = this.state.userTable,
            page = _state$userTable.page,
            query = _state$userTable.query;
        //filter

        var orderType = page.orderType;
        if (orderType == "descend") {
            orderType = "desc";
        }
        if (orderType == "ascend") {
            orderType = "asc";
        }
        page.orderType = orderType;

        //ajax
        _vm_util.ajax.get({
            url: this.state.userTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.userTableDataFiledsConverter(originalData);
                //save data

                this.updateUserTableOriginalData(originalData);

                this.updateUserTableData(data);

                var page = this.state.userTable.page;
                this.updateUserTablePage({
                    start: page.start,
                    size: page.size,
                    orderBy: page.orderBy,
                    orderType: page.orderType,
                    total: result.data.total
                });
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function () {}.bind(this),
            complete: function () {
                this.updateUserTableLoading(false);
                this.updateUserTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    showEditDialog: function showEditDialog(record) {
        record = _vm_util.commons.getObjByKey(this.state.userTable.originalData, "id", record.id);

        this.updateUserEditDialogEchoData(record);

        this.getUserEditDialog().showDialog();
    },
    deleteRecord: function deleteRecord(ids) {

        var hideLoading = _antd.message.loading(deletingTip);
        this.updateUserTableBatchDeleteLoading(true);

        var _state$userTable2 = this.state.userTable,
            deletingTip = _state$userTable2.deletingTip,
            delUserUrl = _state$userTable2.delUserUrl;

        _vm_util.ajax.delete({
            url: delUserUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                this.updateUserTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                _antd.message.success(result.msg);

                this.removeUserTableSelectedRowKeys(ids);

                this.loadUserTableData();
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function error() {}
        });
    },
    showAddDialog: function showAddDialog() {
        c("showAddDialog");
        this.getUserAddDialog().showDialog();
    },
    getUserAddDialog: function getUserAddDialog() {
        return this.refs.user_add_dialog;
    },
    getUserEditDialog: function getUserEditDialog() {
        return this.refs.user_edit_dialog;
    },
    onEditSuccess: function onEditSuccess(newRecord) {

        var newOriginalData = _vm_util.commons.updateObjByKey(this.state.userTable.originalData, "id", newRecord.id, newRecord);

        this.updateUserTableOriginalData(newOriginalData);

        var newData = this.userTableDataFiledsConverter(newOriginalData);

        this.updateUserTableData(newData);
    },
    onAddSuccess: function onAddSuccess(newRecord) {
        // c(newRecord);
        this.loadUserTableData();
    },
    onUpdateImgSuccess: function onUpdateImgSuccess(result) {
        //previewImg
        // const imgUrl = commons.generateImgUrl(
        //     {
        //         imgUrl: result.data.imgUrl,
        //         width: 300
        //     }
        // );
        // this.getUserImgUploaderDialog().previewImg(imgUrl);
        this.onEditSuccess(result.data.user);
    },
    onUploadTempImgSuccess: function onUploadTempImgSuccess(result) {
        this.getUserImgUploaderDialog().previewImg(vm_config.http_url_prefix + result.data.imgUrl);
    },
    getUserLoginLogsDialog: function getUserLoginLogsDialog() {
        return this.refs.user_login_logs_dialog;
    },
    showUserLoginLogsDialog: function showUserLoginLogsDialog(userId) {
        this.getUserLoginLogsDialog().showDialog(userId);
    },
    expandedRowRender: function expandedRowRender(record) {
        return _react2.default.createElement(
            "span",
            null,
            "\u7B80\u4ECB \uFF1A",
            _react2.default.createElement(
                "p",
                { style: { margin: 0 } },
                record.description
            )
        );
    },

    render: function render() {
        var _this2 = this;

        var echoData = this.state.userEditDialog.echoData;
        var _state$userTable3 = this.state.userTable,
            scroll = _state$userTable3.scroll,
            selectedRowKeys = _state$userTable3.selectedRowKeys,
            columns = _state$userTable3.columns,
            data = _state$userTable3.data,
            page = _state$userTable3.page,
            tableLoading = _state$userTable3.tableLoading,
            batchDeleteBtnLoading = _state$userTable3.batchDeleteBtnLoading,
            refreshBtnLoading = _state$userTable3.refreshBtnLoading,
            bordered = _state$userTable3.bordered;
        var _state$userImgUploade = this.state.userImgUploaderDialog,
            config = _state$userImgUploade.config,
            title = _state$userImgUploade.title,
            width = _state$userImgUploade.width;


        var rowSelection = {
            onChange: function onChange(selectedRowKeys, selectedRows) {
                // c(selectedRows);
                // var selectedRowKeys = this.state.userTable.selectedRowKeys;
                // selectedRowKeys.push(selectedRows.key);
                // this.updateUserTableSelectedRowKeys(selectedRowKeys);
                // c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

                _this2.updateUserTableSelectedRowKeys(selectedRowKeys);
            },
            onSelect: function onSelect(record, selected, selectedRows) {},
            onSelectAll: function onSelectAll(selected, selectedRows, changeRows) {}
        };
        var hasSelected = selectedRowKeys.length > 0;
        //set now page's props
        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "div",
                { style: { marginBottom: 16 } },
                _react2.default.createElement(
                    _antd.Button,
                    {
                        loading: refreshBtnLoading,
                        onClick: this.loadUserTableData
                    },
                    "\u5237\u65B0"
                ),
                _react2.default.createElement(
                    _antd.Button,
                    {
                        style: { marginLeft: 8 },
                        type: "primary",
                        onClick: this.showAddDialog
                    },
                    "\u6DFB\u52A0"
                ),
                _react2.default.createElement(
                    _antd.Popconfirm,
                    { title: "\u786E\u8BA4\u5220\u9664 ? ",
                        okText: "\u5220\u9664",
                        cancelText: "\u53D6\u6D88",
                        onConfirm: function onConfirm() {
                            return _this2.deleteRecord(selectedRowKeys);
                        } },
                    _react2.default.createElement(
                        _antd.Button,
                        {
                            style: { marginLeft: 8 },
                            type: "danger",
                            disabled: !hasSelected,
                            loading: batchDeleteBtnLoading
                        },
                        "\u6279\u91CF\u5220\u9664"
                    )
                ),
                _react2.default.createElement(
                    "span",
                    { style: { marginLeft: 8 } },
                    hasSelected ? "\u9009\u62E9\u4E86 " + selectedRowKeys.length + " \u4E2A\u9009\u9879" : ''
                )
            ),
            _react2.default.createElement(_antd.Table, {
                locale: { emptyText: "暂无用户数据" },
                columns: columns,
                rowSelection: rowSelection,
                expandedRowRender: this.expandedRowRender,
                dataSource: data,
                pagination: {
                    total: page.total,
                    showTotal: function showTotal(total, range) {
                        return "\u7B2C " + range[0] + "-" + range[1] + " \u6761\u8BB0\u5F55 , \u5171 " + total + " \u6761\u8BB0\u5F55";
                    },
                    pageSize: page.size,
                    defaultCurrent: 1
                },
                loading: tableLoading,
                onChange: this.handleTableChange,
                bordered: bordered,
                title: function title() {
                    return _this2.state.userTable.title;
                }
                // footer={() => 'Footer'}
                , scroll: scroll }),
            _react2.default.createElement(_user_edit_dialog2.default, { ref: "user_edit_dialog",
                echoData: echoData,
                onEditSuccess: this.onEditSuccess }),
            _react2.default.createElement(_user_add_dialog2.default, { ref: "user_add_dialog",
                onAddSuccess: this.onAddSuccess }),
            _react2.default.createElement(_img_uploader_dialog_template2.default, {
                config: config,
                width: width,
                title: title,
                ref: "user_img_uploader_dialog",
                onUpdateImgSuccess: this.onUpdateImgSuccess,
                onUploadTempImgSuccess: this.onUploadTempImgSuccess }),
            _react2.default.createElement(_user_login_logs_dialog2.default, {
                ref: "user_login_logs_dialog" })
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(UserTable); //将App组件导出
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 89 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

__webpack_require__(20);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;

var UserEditDialog = _react2.default.createClass({
    displayName: "UserEditDialog",
    getInitialState: function getInitialState() {
        return {
            title: "修改用户信息",
            editUserUrl: "/user/info",
            tipOfEditing: "正在修改用户"
        };
    },
    showDialog: function showDialog() {
        this.getUserEditDialog().showDialog();
    },
    getUserEditDialog: function getUserEditDialog() {
        return this.refs.user_edit_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var _state = this.state,
            editUserUrl = _state.editUserUrl,
            tipOfEditing = _state.tipOfEditing;

        var hideMessage = _antd.message.loading(tipOfEditing, 0);
        var filterValues = function filterValues(values) {
            values.birthday = timeFormatter.long2Int(new Date(values.birthday._d).getTime());
            return values;
        };
        values = filterValues(values);
        _vm_util.ajax.put({
            url: editUserUrl,
            data: values,
            success: function (result) {
                var onEditSuccess = this.props.onEditSuccess;


                _antd.message.success(result.msg);
                this.getUserEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.user) : undefined;

                //clear form
                this.getUserEditDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getUserEditDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {
        this.getUserEditDialog().clearForm(); //!!防止触发reuqired后在关闭的bug
        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var echoData = this.props.echoData;
        var title = this.state.title;


        echoData = _vm_util.commons.clone(echoData); //!!!!!!!!!!!!!important
        // filterEchoData
        var filterEchoData = function filterEchoData(echoData) {
            if (isUndefined(echoData)) {
                return {};
            }
            if (!isUndefined(echoData.birthday)) {
                echoData.birthday = (0, _moment2.default)(timeFormatter.int2Long(echoData.birthday));
            }
            if (!isUndefined(echoData.createTime)) {
                echoData.createTime = timeFormatter.formatDate(timeFormatter.int2Long(echoData.createTime));
            }
            if (!isUndefined(echoData.updateTime)) {
                echoData.updateTime = timeFormatter.formatDate(timeFormatter.int2Long(echoData.updateTime));
            }
            return echoData;
        };
        echoData = filterEchoData(echoData);

        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "id",
                id: "id",
                config: {
                    initialValue: echoData.id
                },
                input: _react2.default.createElement(_antd.Input, { name: "id",
                    autoComplete: "off",
                    disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "生日",
                id: "birthday",
                config: {
                    initialValue: echoData.birthday,
                    rules: [{ type: 'object', required: true, message: '请输入你的生日!' }]

                },

                input: _react2.default.createElement(_antd.DatePicker, { placeholder: "\u8BF7\u8F93\u5165\u751F\u65E5", name: "birthday" })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    initialValue: echoData.status,
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _react2.default.createElement(
                        Option,
                        { value: "1" },
                        "\u6B63\u5E38"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "2" },
                        "\u51BB\u7ED3"
                    )
                )
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "用户名",
                id: "username",
                config: {
                    initialValue: echoData.username,
                    rules: [{ required: true, whitespace: true, message: '请输入用户名!' }]
                },
                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    placeholder: "\u7528\u6237\u540D" })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "密码",
                id: "password",
                config: {
                    initialValue: echoData.password,
                    rules: [{ required: true, whitespace: true, message: '请输入密码!' }]
                },

                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    placeholder: "\u5BC6\u7801" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "性别",
                id: "sex",
                config: {
                    initialValue: echoData.sex,
                    rules: [{ required: true, message: '请输入你的性别!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u4F60\u7684\u6027\u522B" },
                    _vm_util.commons.getSexOptions()
                )
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "创建时间",
                id: "ignore_createTime",
                config: {
                    initialValue: echoData.createTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "最后更新时间",
                id: "ignore_updateTime",
                config: {
                    initialValue: echoData.updateTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }]

        }, {
            cols: [{
                col: { span: 24 },
                label: "简介",
                id: "description",
                config: {
                    initialValue: echoData.description,
                    rules: [{ required: true, message: '请输入简介!' }]
                },

                input: _react2.default.createElement(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB", autosize: { minRows: 4, maxRows: 8 } })
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            title: title,
            formRows: formRows,
            formLayout: formLayout,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "user_edit_dialog" });
    }
});

exports.default = UserEditDialog; //将App组件导出

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(20);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var UserAddDialog = _react2.default.createClass({
    displayName: "UserAddDialog",
    getInitialState: function getInitialState() {
        return {
            title: "添加用户",
            addUserUrl: "/user/info"
        };
    },
    showDialog: function showDialog() {
        this.getUserAddDialog().showDialog();
    },
    getUserAddDialog: function getUserAddDialog() {
        return this.refs.user_add_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var hideMessage = _antd.message.loading('正在添加用户', 0);
        var addUserUrl = this.state.addUserUrl;

        var filterValues = function filterValues(values) {
            values.birthday = timeFormatter.long2Int(new Date(values.birthday._d).getTime());
            return values;
        };
        values = filterValues(values);
        _vm_util.ajax.post({
            url: addUserUrl,
            data: values,
            success: function (result) {
                var onAddSuccess = this.props.onAddSuccess;


                _antd.message.success(result.msg);
                this.getUserAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.user) : undefined;

                //clear form
                this.getUserAddDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getUserAddDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {

        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var title = this.state.title;


        var formRows = [{

            cols: [{
                col: { span: 11 },
                label: "用户名",
                id: "username",
                config: {
                    rules: [{ required: true, whitespace: true, message: '请输入用户名!' }]
                },
                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    placeholder: "\u7528\u6237\u540D" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "密码",
                id: "password",
                config: {
                    rules: [{ required: true, whitespace: true, message: '请输入密码!' }]
                },
                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    placeholder: "\u5BC6\u7801" })
            }]
        }, {
            cols: [{
                col: { span: 11 },
                label: "用户名",
                id: "birthday",
                config: {
                    rules: [{ type: 'object', required: true, message: '请输入你的生日!' }]

                },
                input: _react2.default.createElement(_antd.DatePicker, { placeholder: "\u8BF7\u8F93\u5165\u751F\u65E5" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)

            }, {
                col: { span: 11 },
                label: "性别",
                id: "sex",
                config: {
                    rules: [{ required: true, message: '请输入你的性别!' }]
                },
                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u4F60\u7684\u6027\u522B" },
                    _vm_util.commons.getSexOptions()
                )
            }]
        }, {
            cols: [{
                label: "简介",
                id: "description",
                config: {
                    rules: [{ required: true, message: '请输入简介!' }]
                    // initialValue: "1"
                },
                input: _react2.default.createElement(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB", autosize: { minRows: 4, maxRows: 8 } })
            }]
        }, {
            cols: [{
                label: "状态",
                id: "status",
                config: {
                    rules: [{ required: true, message: '请输入状态!' }]
                    // initialValue: "1"
                },
                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _react2.default.createElement(
                        Option,
                        { value: "1" },
                        "\u6B63\u5E38"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "2" },
                        "\u51BB\u7ED3"
                    )
                )
            }]
        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            title: title,
            formRows: formRows,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "user_add_dialog" });
    }
});

exports.default = UserAddDialog; //将App组件导出

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

var _vm_util = __webpack_require__(3);

var _antd = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 图片上传组件
 */
var ImgUpload = _react2.default.createClass({
    displayName: "ImgUpload",

    getInitialState: function getInitialState() {

        // var config = {
        //     fileTypes: ["jpg", "png"],
        //     fileMaxsize: 1024 * 1024 * 1,//1M
        //     saveImgUrl:"/src/img",//服务器接受x,y,w,h,fileId等参数,返回newImgUrl
        //     uploadTempImgUrl:"/online/img/temp",//服务器接受imgFile,返回tempImgUrl和fileId
        //      server_url_prefix:""
        //     extraInfo:{userId:11...}最后保存图片是发送到服务器的信息
        // };
        var config = this.props.config;

        return {
            config: config,
            uploadTempImgTip: "正在读取图片",
            saveImgTip: "正在保存图片",
            imgFileTooMax: "文件过大,最大允许 : " + config.fileMaxsize / 1024 + " kb",
            imgFileExtError: "文件类型错误,允许的文件类型 : " + config.fileTypes,
            imgFileIsEmpty: "请选择一个文件",
            imgUpdateSuccess: " 图片更新成功",
            willUpdatedImgInfo: {
                fileId: undefined //服务器临时保存的用户 图片的filename，如a.png，如果为undefined，那么将禁止其更新 图片
            },
            $imgPreview: undefined
        };
    },
    componentDidMount: function componentDidMount() {},
    validateImgFileOnSubmit: function validateImgFileOnSubmit() {
        //服务器未接收到相关的图片缓存
        if (isUndefined(this.state.willUpdatedImgInfo.fileId)) {
            throw this.state.imgFileIsEmpty;
        }
    },
    validateImgFileOnChoice: function validateImgFileOnChoice(imgFile) {

        // c(imgFile);

        //unselect, size
        if (isUndefined(imgFile) || isUndefined(imgFile.size)) {
            throw this.state.imgFileIsEmpty;
        }
        if (imgFile.size > this.state.config.fileMaxsize) {
            throw this.state.imgFileTooMax;
        }
        var ext = getFileNameExt(imgFile.name);
        if (!this.state.config.fileTypes.contains(ext)) {
            throw this.state.imgFileExtError;
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

        var aspectRatio = this.state.config.aspectRatio;


        aspectRatio = !isUndefined(aspectRatio) ? aspectRatio : 1 / 1;
        // c(aspectRatio);

        var $previews = $('.preview');
        //cropper options
        var options = {
            aspectRatio: aspectRatio,
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
            // window.EventsDispatcher.showMsgDialog(e);


            _antd.message.error(e);
            onUploadTempImgEnd();
            // clear input #file
            // this.clearImgInput();
            //back self original img
            // this.previewImg(this.state.user.ImgUrl);
            return;
        }
        var hideMessage = _antd.message.loading(this.state.uploadTempImgTip);

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
            beforeSend: function () {}.bind(this),
            success: function (result) {

                //更新服务器暂存图片名
                this.updateTempFileId(result.data.fileId);

                // this.initCropper();
                onUploadTempImgSuccess(result);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function () {
                this.clearSelectFileInfo();
            }.bind(this),
            complete: function () {
                //callfun
                if (callfun != undefined) {
                    callfun();
                }
                hideMessage();
                onUploadTempImgEnd();
            }.bind(this)

        });
    },
    updateTempFileId: function updateTempFileId(fileId) {
        var state = this.state;
        state.willUpdatedImgInfo.fileId = fileId;
        this.setState(state);
    },
    clearSelectFileInfo: function clearSelectFileInfo() {
        //清除用户已选择的图片信息
        this.updateTempFileId(undefined);
        this.clearImgInput();
    },
    clearImgInput: function clearImgInput() {
        this.getImgInput().val("");
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
            _antd.message.error(e);
            onUpdateImgEnd();
            return;
        }

        var hideLoading = _antd.message.loading(this.state.saveImgTip);

        // var userId = this.state.user.id;
        var url = this.state.config.saveImgUrl;
        var data = this.state.willUpdatedImgInfo;
        // add extraInfo
        data = $.extend(data, this.state.config.extraInfo);

        _vm_util.ajax.put({
            url: url,
            data: data,
            beforeSend: function () {}.bind(this),
            complete: function () {

                if (callfun != undefined) {
                    callfun();
                }
                hideLoading();
                onUpdateImgEnd();
            }.bind(this),
            success: function (result) {

                _antd.message.success(result.msg);

                onUpdateImgSuccess(result);

                this.clearSelectFileInfo();
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this)
        });
    },

    render: function render() {
        var _this = this;

        var loading = this.props.loading;
        var config = this.state.config;
        var fileTypes = config.fileTypes,
            fileMaxsize = config.fileMaxsize;

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
                        null,
                        "\u56FE\u7247\u9650\u5236:\u5141\u8BB8\u683C\u5F0F\uFF1A",
                        fileTypes.join(","),
                        " \uFF1B\u5141\u8BB8\u6700\u5927\u56FE\u7247\uFF1A",
                        fileMaxsize / 1024 / 1024,
                        " m"
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
                            disabled: loading,
                            style: { display: loading ? "none" : "block" },
                            onClick: function onClick() {
                                _this.refs.imgInput.click();
                            } }),
                        _react2.default.createElement("input", { type: "button",
                            className: "operateBtn",
                            id: "imgSaveBtn",
                            ref: "imgSaveBtn",
                            disabled: loading,
                            style: { display: loading ? "none" : "block" },
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
                    _react2.default.createElement("div", { className: "preview" })
                )
            )
        );
    }
}); //引入react组件
exports.default = ImgUpload;

/***/ }),
/* 93 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(2);

var _user_login_logs_table = __webpack_require__(38);

var _user_login_logs_table2 = _interopRequireDefault(_user_login_logs_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var UserLoginLogsDialog = _react2.default.createClass({
    displayName: 'UserLoginLogsDialog',

    getInitialState: function getInitialState() {
        return {
            visible: false,
            title: "用户登录日志",
            width: 1111
        };
    },
    showDialog: function showDialog(userId) {
        // c(this.refs);
        // c(this.refs.user_login_logs_table);
        this.setState({ visible: true });
        // this.setState({userId: userId});

        setTimeout(function () {
            this.getUserLoginLogsTable().loadDataByUserId(userId);
        }.bind(this), 10);
    },
    handleCancel: function handleCancel() {

        this.setState({ visible: false });
    },
    getUserLoginLogsTable: function getUserLoginLogsTable() {
        return this.refs.user_login_logs_table;
    },

    render: function render() {
        var _state = this.state,
            visible = _state.visible,
            title = _state.title,
            width = _state.width;

        return _react2.default.createElement(
            _antd.Modal,
            {
                id: 'user_login_logs_dialog',
                visible: visible,
                title: title,
                width: width,
                onCancel: this.handleCancel,
                footer: null },
            _react2.default.createElement(_user_login_logs_table2.default, {
                ref: 'user_login_logs_table' })
        );
    }
});

exports.default = UserLoginLogsDialog; //将App组件导出

/***/ }),
/* 95 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(20);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

var _user_login_logs_table = __webpack_require__(38);

var _user_login_logs_table2 = _interopRequireDefault(_user_login_logs_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;

var UserLoginLogsPage = _react2.default.createClass({
    displayName: "UserLoginLogsPage",

    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {
        this.getUserLoginLogsTable().loadUserLoginLogsTableData();
    },
    getUserLoginLogsTable: function getUserLoginLogsTable() {
        return this.refs.user_login_logs_table;
    },

    render: function render() {

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_user_login_logs_table2.default, {
                ref: "user_login_logs_table" })
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(UserLoginLogsPage); //将App组件导出

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(18);

__webpack_require__(2);

var _movie_table = __webpack_require__(98);

var _movie_table2 = _interopRequireDefault(_movie_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var MoviePage = _react2.default.createClass({
    displayName: "MoviePage",

    getInitialState: function getInitialState() {

        return {};
    },

    render: function render() {

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_movie_table2.default, null)
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(MoviePage); //将App组件导出

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(vm_config) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(99);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _movie_edit_dialog = __webpack_require__(100);

var _movie_edit_dialog2 = _interopRequireDefault(_movie_edit_dialog);

var _movie_add_dialog = __webpack_require__(101);

var _movie_add_dialog2 = _interopRequireDefault(_movie_add_dialog);

var _img_uploader_dialog_template = __webpack_require__(27);

var _img_uploader_dialog_template2 = _interopRequireDefault(_img_uploader_dialog_template);

var _movie_src_version_add_dialog = __webpack_require__(102);

var _movie_src_version_add_dialog2 = _interopRequireDefault(_movie_src_version_add_dialog);

var _movie_src_version_table = __webpack_require__(104);

var _movie_src_version_table2 = _interopRequireDefault(_movie_src_version_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var MovieTable = _react2.default.createClass({
    displayName: "MovieTable",

    getInitialState: function getInitialState() {

        return {
            posterUploaderDialog: {
                title: "更新电影封面",
                width: 700,
                config: {
                    aspectRatio: 1.5 / 1,
                    fileTypes: ["jpg", "png"],
                    fileMaxsize: 1024 * 1024 * 1, //2M
                    saveImgUrl: "/movie/poster",
                    uploadTempImgUrl: "/src/img",
                    server_url_prefix: vm_config.http_url_prefix,
                    extraInfo: {}
                }
            },
            imgUploaderDialog: {
                title: "更新电影图片",
                width: 700,
                config: {
                    aspectRatio: 1 / 1.5,
                    fileTypes: ["jpg", "png"],
                    fileMaxsize: 1024 * 1024 * 1, //2M
                    saveImgUrl: "/movie/img",
                    uploadTempImgUrl: "/src/img",
                    server_url_prefix: vm_config.http_url_prefix,
                    extraInfo: {}
                }
            },
            movieEditDialog: {
                echoData: undefined
            },
            movieTable: {
                title: "电影列表",
                scroll: { x: true, y: 450 },
                dataSourceUrl: "/movie/info/list",
                delMovieUrl: "/movie/info",
                editable: false,
                haveSearchMoviename: false,
                movienameDropdownVisible: false,
                bordered: false,
                tableLoading: false,
                batchDeleteBtnLoading: false,
                refreshBtnLoading: false,
                selectedRowKeys: [],
                data: [], //displayData
                originalData: [],
                page: {
                    start: 0,
                    size: 5,
                    orderBy: "",
                    orderType: "",
                    total: 0
                },
                query: {
                    name: ""
                },
                columns: [],
                deletingTip: "正在删除"
            }
        };
    },
    onSearchMoviename: function onSearchMoviename(newMovienameQuery) {
        this.updateNameOfQuery(newMovienameQuery);
        if (!isEmptyString(this.state.movieTable.query.name)) {
            this.updateMovieTableHaveSearchMoviename(true);
        } else {

            this.updateMovieTableHaveSearchMoviename(false);
        }
        this.loadMovieTableData();
    },
    updateMovieTableHaveSearchMoviename: function updateMovieTableHaveSearchMoviename(haveSearchMoviename) {
        var state = this.state;
        state.movieTable.haveSearchMoviename = haveSearchMoviename;
        this.setState(state);
    },
    updateMovieTableMovienameDropdownVisible: function updateMovieTableMovienameDropdownVisible(movienameDropdownVisible) {
        var state = this.state;
        state.movieTable.movienameDropdownVisible = movienameDropdownVisible;
        this.setState(state);
    },
    updateMovieTableSelectedRowKeys: function updateMovieTableSelectedRowKeys(selectedRowKeys) {
        var state = this.state;
        state.movieTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },
    removeMovieTableSelectedRowKeys: function removeMovieTableSelectedRowKeys(removeSelectedRowKeys) {
        var selectedRowKeys = this.state.movieTable.selectedRowKeys;
        selectedRowKeys = selectedRowKeys.removeByList(removeSelectedRowKeys);
        this.updateMovieTableSelectedRowKeys(selectedRowKeys);
    },
    updateNameOfQuery: function updateNameOfQuery(name) {
        var state = this.state;
        state.movieTable.query.name = name;
        this.setState(state);
    },
    updateMovieTableData: function updateMovieTableData(data) {
        var state = this.state;
        state.movieTable.data = data;
        this.setState(state);
    },
    updateMovieTableBatchDeleteLoading: function updateMovieTableBatchDeleteLoading(loading) {
        var state = this.state;
        state.movieTable.batchDeleteBtnLoading = loading;
        this.setState(state);
    },
    updateMovieTableRefreshBtnLoading: function updateMovieTableRefreshBtnLoading(loading) {
        var state = this.state;
        state.movieTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateMovieTablePage: function updateMovieTablePage(page) {
        var state = this.state;
        state.movieTable.page = page;
        this.setState(state);
    },
    updateMovieTableQuery: function updateMovieTableQuery(query) {
        var state = this.state;
        state.movieTable.query = query;
        this.setState(state);
    },
    updateMovieTableLoading: function updateMovieTableLoading(flag) {
        var state = this.state;
        state.movieTable.tableLoading = flag;
        this.setState(state);
    },
    updateMovieTableColumns: function updateMovieTableColumns(columns) {

        var state = this.state;
        state.movieTable.columns = columns;
        this.setState(state);
    },
    updateMovieTableOriginalData: function updateMovieTableOriginalData(originalData) {
        var state = this.state;
        state.movieTable.originalData = originalData;
        this.setState(state);
    },
    updateMovieEditDialogEchoData: function updateMovieEditDialogEchoData(echoData) {
        var state = this.state;
        state.movieEditDialog.echoData = echoData;
        this.setState(state);
    },
    showMovieImgUploaderDialog: function showMovieImgUploaderDialog(record) {
        this.getMovieImgUploaderDialog().showDialog();
        this.getMovieImgUploaderDialog().previewImg(_vm_util.commons.generateImgUrl({
            imgUrl: record.imgUrl,
            width: 300
        }));
        this.getMovieImgUploaderDialog().updateExtraInfo(record);
    },
    showMoviePosterUploaderDialog: function showMoviePosterUploaderDialog(record) {
        this.getMoviePosterUploaderDialog().showDialog();
        this.getMoviePosterUploaderDialog().previewImg(_vm_util.commons.generateImgUrl({
            imgUrl: record.posterUrl,
            width: 600
        }));
        this.getMoviePosterUploaderDialog().updateExtraInfo(record);
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        this.updateMovieTableColumns([{
            title: 'id',
            width: 100,
            dataIndex: 'id',
            sorter: true
        }, {
            title: '图片',
            width: 90,
            dataIndex: 'imgUrl',
            render: function render(text, record) {
                var imageUrl = _vm_util.commons.generateImgUrl({
                    imgUrl: text,
                    width: 50
                });

                return _react2.default.createElement("img", { onClick: function onClick() {
                        return _this.showMovieImgUploaderDialog(record);
                    }, style: {
                        width: 50,
                        height: 75,
                        cursor: "pointer"
                    }, src: imageUrl, alt: "\u6682\u65E0" });
            }
        }, {
            title: '播放封面',
            width: 120,
            dataIndex: 'posterUrl',
            render: function render(text, record) {
                var imageUrl = _vm_util.commons.generateImgUrl({
                    imgUrl: text,
                    width: 80
                });

                return _react2.default.createElement("img", { onClick: function onClick() {
                        return _this.showMoviePosterUploaderDialog(record);
                    }, style: {
                        width: 80,
                        height: 53,
                        cursor: "pointer"
                    }, src: imageUrl, alt: "\u6682\u65E0" });
            }
        }, {
            title: '电影名',
            width: 120,
            dataIndex: 'name',
            render: function render(text, record) {
                return _vm_util.commons.highLight(text, _this.state.movieTable.query.name);
            },
            sorter: true,
            filterDropdown: _react2.default.createElement(
                "div",
                { className: "custom-filter-dropdown" },
                _react2.default.createElement(Search, {
                    placeholder: "\u641C\u7D22\u7535\u5F71\u540D",
                    onSearch: this.onSearchMoviename,
                    style: { width: 200 }
                })
            ),
            filterIcon: _react2.default.createElement(_antd.Icon, { type: "search",
                style: { color: this.state.movieTable.haveSearchMoviename ? '#108ee9' : '#aaa' } })
            // filterDropdownVisible: this.state.movieTable.movienameDropdownVisible,

        }, {
            title: '别名',
            width: 100,
            dataIndex: 'alias',
            sorter: true

        },
        // {
        //     title: '简介',
        //     width: 200,
        //     dataIndex: 'description',
        //     sorter: true,
        //     render: (text) => {
        //         return commons.makeTipSpan(text, 33);
        //     },
        // },
        {

            title: '发布时间',
            width: 100,
            dataIndex: 'release_time',
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '评分',
            width: 80,
            dataIndex: 'score',
            sorter: true
        }, {
            title: '观看数',
            width: 80,
            dataIndex: 'watch_num',
            sorter: true
        }, {
            title: '时长',
            width: 80,
            dataIndex: 'movie_time',
            render: function render(text) {
                return text + " 分钟";
            },
            sorter: true
        }, {
            title: '状态',
            width: 80,
            dataIndex: 'status',
            render: function render(text) {
                return _vm_util.commons.getStatusStrByIndex({ index: text });
            },
            sorter: true
        }, {
            title: '更新时间',
            width: 100,
            dataIndex: 'update_time',
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '创建时间',
            width: 100,
            dataIndex: 'create_time',
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 100,
            render: function render(text, record) {

                var menu = _react2.default.createElement(
                    _antd.Menu,
                    null,
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { onClick: function onClick() {
                                    return _this.showMovieVideoUploadDialog(record);
                                }, href: "javascript:void(0);" },
                            "\u4E0A\u4F20\u8D44\u6E90"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { onClick: function onClick() {
                                    return _this.showEditDialog(record);
                                }, href: "javascript:void(0);" },
                            "\u7F16\u8F91"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            _antd.Popconfirm,
                            { title: "\u786E\u8BA4\u5220\u9664 ? ",
                                okText: "\u5220\u9664",
                                cancelText: "\u53D6\u6D88",
                                onConfirm: function onConfirm() {
                                    return _this.deleteRecord([record.id]);
                                } },
                            _react2.default.createElement(
                                "a",
                                { href: "javascript:void(0)" },
                                "\u5220\u9664"
                            )
                        )
                    )
                );
                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        _antd.Dropdown,
                        { overlay: menu },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0);" },
                            "\u64CD\u4F5C ",
                            _react2.default.createElement(_antd.Icon, { type: "down" })
                        )
                    )
                );
            },
            sorter: true
        }]);
        this.loadMovieTableData();
    },
    uploadMovieSrc: function uploadMovieSrc(record) {
        c("uploadMovieSrc");
    },
    handleTableChange: function handleTableChange(pagination, filters, sorter) {

        var page = this.state.movieTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateMovieTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadMovieTableData();
    },
    movieTableDataFiledsConverter: function movieTableDataFiledsConverter(originalData) {
        var data = [];
        $.each(originalData, function (i, item) {

            data.push({
                key: item.id,
                id: item.id,
                imgUrl: item.imgUrl,
                posterUrl: item.posterUrl,
                name: item.name,
                alias: item.alias,
                description: item.description,
                director_id: item.directorId,
                release_time: item.releaseTime,
                score: item.score,
                watch_num: item.watchNum,
                movie_time: item.movieTime,
                create_time: item.createTime,
                update_time: item.updateTime,
                status: item.status
            });
        }.bind(this));
        return data;
    },
    loadMovieTableData: function loadMovieTableData() {
        this.updateMovieTableLoading(true);
        this.updateMovieTableRefreshBtnLoading(true);
        var _state$movieTable = this.state.movieTable,
            page = _state$movieTable.page,
            query = _state$movieTable.query;
        //filter

        var orderType = page.orderType;
        if (orderType == "descend") {
            orderType = "desc";
        }
        if (orderType == "ascend") {
            orderType = "asc";
        }
        page.orderType = orderType;

        //ajax
        _vm_util.ajax.get({
            url: this.state.movieTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.movieTableDataFiledsConverter(originalData);
                //save data

                this.updateMovieTableOriginalData(originalData);

                this.updateMovieTableData(data);

                var page = this.state.movieTable.page;
                this.updateMovieTablePage({
                    start: page.start,
                    size: page.size,
                    orderBy: page.orderBy,
                    orderType: page.orderType,
                    total: result.data.total
                });
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function () {}.bind(this),
            complete: function () {
                this.updateMovieTableLoading(false);
                this.updateMovieTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    showEditDialog: function showEditDialog(record) {
        record = _vm_util.commons.getObjByKey(this.state.movieTable.originalData, "id", record.id);
        // c(record);
        this.updateMovieEditDialogEchoData(record);

        this.getMovieEditDialog().showDialog(record);
    },
    deleteRecord: function deleteRecord(ids) {

        var hideLoading = _antd.message.loading(deletingTip);
        this.updateMovieTableBatchDeleteLoading(true);

        var _state$movieTable2 = this.state.movieTable,
            deletingTip = _state$movieTable2.deletingTip,
            delMovieUrl = _state$movieTable2.delMovieUrl;

        _vm_util.ajax.delete({
            url: delMovieUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                this.updateMovieTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                _antd.message.success(result.msg);

                this.removeMovieTableSelectedRowKeys(ids);

                this.loadMovieTableData();
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function error() {}
        });
    },
    showAddDialog: function showAddDialog() {
        c("showAddDialog");
        this.getMovieAddDialog().showDialog();
    },
    getMovieAddDialog: function getMovieAddDialog() {
        return this.refs.movie_add_dialog;
    },
    getMovieEditDialog: function getMovieEditDialog() {
        return this.refs.movie_edit_dialog;
    },
    onEditSuccess: function onEditSuccess(newRecord) {

        var newOriginalData = _vm_util.commons.updateObjByKey(this.state.movieTable.originalData, "id", newRecord.id, newRecord);

        this.updateMovieTableOriginalData(newOriginalData);

        var newData = this.movieTableDataFiledsConverter(newOriginalData);

        this.updateMovieTableData(newData);
    },
    onAddSuccess: function onAddSuccess(newRecord) {
        // c(newRecord);
        this.loadMovieTableData();
    },
    getMovieImgUploaderDialog: function getMovieImgUploaderDialog() {
        return this.refs.movie_img_uploader_dialog;
    },
    onUpdateImgSuccess: function onUpdateImgSuccess(result) {

        //previewImg
        // const imgUrl = commons.generateImgUrl(
        //     {
        //         imgUrl: result.data.imgUrl,
        //         width: 300
        //     }
        // );
        // this.getMovieImgUploaderDialog().previewImg(imgUrl);
        this.onEditSuccess(result.data.movie);
    },
    onUploadTempImgSuccess: function onUploadTempImgSuccess(result) {
        this.getMovieImgUploaderDialog().previewImg(vm_config.http_url_prefix + result.data.imgUrl);
    },

    //---------------------------------------------------------//
    getMoviePosterUploaderDialog: function getMoviePosterUploaderDialog() {
        return this.refs.movie_poster_uploader_dialog;
    },
    onUpdatePosterSuccess: function onUpdatePosterSuccess(result) {
        //previewImg
        // const imgUrl = commons.generateImgUrl(
        //     {
        //         imgUrl: result.data.imgUrl,
        //         width: 200
        //     }
        // );
        // this.getMoviePosterUploaderDialog().previewImg(imgUrl);
        this.onEditSuccess(result.data.movie);
    },
    onUploadTempPosterSuccess: function onUploadTempPosterSuccess(result) {
        this.getMoviePosterUploaderDialog().previewImg(vm_config.http_url_prefix + result.data.imgUrl);
    },
    expandedRowRender: function expandedRowRender(record) {
        return _react2.default.createElement(
            "span",
            null,
            "\u7B80\u4ECB \uFF1A",
            _react2.default.createElement(
                "p",
                { style: { margin: 0 } },
                record.description
            ),
            _react2.default.createElement(_movie_src_version_table2.default, {
                movieId: record.id })
        );
    },
    getMovieVideoUploadDialog: function getMovieVideoUploadDialog() {
        return this.refs.movie_video_upload_dialog;
    },
    showMovieVideoUploadDialog: function showMovieVideoUploadDialog(record) {
        this.getMovieVideoUploadDialog().showDialog(record);
    },
    onMovieSrcVersionAddSuccess: function onMovieSrcVersionAddSuccess(record) {
        window.EventsDispatcher.onMovieSrcVersionAddSuccess(record);
    },

    render: function render() {
        var _this2 = this;

        var echoData = this.state.movieEditDialog.echoData;
        var _state$movieTable3 = this.state.movieTable,
            _title = _state$movieTable3.title,
            scroll = _state$movieTable3.scroll,
            selectedRowKeys = _state$movieTable3.selectedRowKeys,
            columns = _state$movieTable3.columns,
            data = _state$movieTable3.data,
            page = _state$movieTable3.page,
            tableLoading = _state$movieTable3.tableLoading,
            batchDeleteBtnLoading = _state$movieTable3.batchDeleteBtnLoading,
            refreshBtnLoading = _state$movieTable3.refreshBtnLoading,
            bordered = _state$movieTable3.bordered;


        var rowSelection = {
            onChange: function onChange(selectedRowKeys, selectedRows) {
                // c(selectedRows);
                // var selectedRowKeys = this.state.movieTable.selectedRowKeys;
                // selectedRowKeys.push(selectedRows.key);
                // this.updateMovieTableSelectedRowKeys(selectedRowKeys);
                // c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

                _this2.updateMovieTableSelectedRowKeys(selectedRowKeys);
            },
            onSelect: function onSelect(record, selected, selectedRows) {},
            onSelectAll: function onSelectAll(selected, selectedRows, changeRows) {}
        };

        var posterUploaderDialog = this.state.posterUploaderDialog;
        var imgUploaderDialog = this.state.imgUploaderDialog;

        var hasSelected = selectedRowKeys.length > 0;
        //set now page's props
        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "div",
                { style: { marginBottom: 16 } },
                _react2.default.createElement(
                    _antd.Button,
                    {
                        loading: refreshBtnLoading,
                        onClick: function onClick() {
                            _this2.loadMovieTableData();
                            window.EventsDispatcher.loadMovieSrcVersionTableData();
                        }
                    },
                    "\u5237\u65B0"
                ),
                _react2.default.createElement(
                    _antd.Button,
                    {
                        style: { marginLeft: 8 },
                        type: "primary",
                        onClick: this.showAddDialog
                    },
                    "\u6DFB\u52A0"
                ),
                _react2.default.createElement(
                    _antd.Popconfirm,
                    { title: "\u786E\u8BA4\u5220\u9664 ? ",
                        okText: "\u5220\u9664",
                        cancelText: "\u53D6\u6D88",
                        onConfirm: function onConfirm() {
                            return _this2.deleteRecord(selectedRowKeys);
                        } },
                    _react2.default.createElement(
                        _antd.Button,
                        {
                            style: { marginLeft: 8 },
                            type: "danger",
                            disabled: !hasSelected,
                            loading: batchDeleteBtnLoading
                        },
                        "\u6279\u91CF\u5220\u9664"
                    )
                ),
                _react2.default.createElement(
                    "span",
                    { style: { marginLeft: 8 } },
                    hasSelected ? "\u9009\u62E9\u4E86 " + selectedRowKeys.length + " \u4E2A\u9009\u9879" : ''
                )
            ),
            _react2.default.createElement(_antd.Table, {
                locale: { emptyText: "暂无相关电影数据" },
                columns: columns,
                expandedRowRender: this.expandedRowRender,
                rowSelection: rowSelection,
                dataSource: data,
                pagination: {
                    total: page.total,
                    showTotal: function showTotal(total, range) {
                        return "\u7B2C " + range[0] + "-" + range[1] + " \u6761\u8BB0\u5F55 , \u5171 " + total + " \u6761\u8BB0\u5F55";
                    },
                    pageSize: page.size,
                    defaultCurrent: 1
                },
                loading: tableLoading,
                onChange: this.handleTableChange,
                bordered: bordered,
                title: function title() {
                    return _title;
                }
                // footer={() => 'Footer'}
                , scroll: scroll }),
            _react2.default.createElement(_movie_edit_dialog2.default, { ref: "movie_edit_dialog",
                echoData: echoData,
                onEditSuccess: this.onEditSuccess }),
            _react2.default.createElement(_movie_add_dialog2.default, { ref: "movie_add_dialog",
                onAddSuccess: this.onAddSuccess }),
            _react2.default.createElement(_img_uploader_dialog_template2.default, {
                ref: "movie_img_uploader_dialog",
                config: imgUploaderDialog.config,
                title: imgUploaderDialog.title,
                width: imgUploaderDialog.width,
                onUpdateImgSuccess: this.onUpdateImgSuccess,
                onUploadTempImgSuccess: this.onUploadTempImgSuccess }),
            _react2.default.createElement(_img_uploader_dialog_template2.default, {
                ref: "movie_poster_uploader_dialog",
                config: posterUploaderDialog.config,
                title: posterUploaderDialog.title,
                width: posterUploaderDialog.width,
                onUpdateImgSuccess: this.onUpdatePosterSuccess,
                onUploadTempImgSuccess: this.onUploadTempPosterSuccess }),
            _react2.default.createElement(_movie_src_version_add_dialog2.default, {
                onMovieSrcVersionAddSuccess: this.onMovieSrcVersionAddSuccess,
                ref: "movie_video_upload_dialog" })
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(MovieTable); //将App组件导出
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 99 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(18);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option,
    OptGroup = _antd.Select.OptGroup;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;

var MovieEditDialog = _react2.default.createClass({
    displayName: "MovieEditDialog",
    getInitialState: function getInitialState() {
        return {
            width: 600,
            title: "修改电影信息",
            editMovieUrl: "/movie/info",
            getFilmmakersUrl: "/filmmaker/info/list",
            getActorIdsUrl: "/filmmaker/id/list/", //   ---/filmmaker/id/{movieId}
            getTagGroupsUrl: "/tagGroup/tag/list",
            getSelectedTagIdsUrl: "/tag/id/list/",
            tipOfEditing: '正在保存电影修改',
            filmmakers: [],
            actorIds: [],
            tagGroups: [],
            selectedTagIds: []
        };
    },
    updateFilmmakers: function updateFilmmakers(filmmakers) {
        this.setState({ filmmakers: filmmakers });
    },
    updateActorIds: function updateActorIds(actorIds) {
        this.setState({ actorIds: actorIds });
    },
    updateTagGroups: function updateTagGroups(tagGroups) {
        this.setState({ tagGroups: tagGroups });
    },
    updateSelectedTagIds: function updateSelectedTagIds(selectedTagIds) {
        this.setState({ selectedTagIds: selectedTagIds });
    },
    loadSelectedTagIdsData: function loadSelectedTagIdsData(movieId) {
        var getSelectedTagIdsUrl = this.state.getSelectedTagIdsUrl;

        _vm_util.ajax.get({
            url: getSelectedTagIdsUrl + movieId,
            success: function (result) {

                this.updateSelectedTagIds(result.data.list);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    loadFilmmakerData: function loadFilmmakerData(args) {
        var onSuccess = args.onSuccess;
        var getFilmmakersUrl = this.state.getFilmmakersUrl;

        _vm_util.ajax.get({
            url: getFilmmakersUrl,
            success: function (result) {

                this.updateFilmmakers(result.data.list);

                if (!isUndefined(onSuccess)) {
                    onSuccess(result);
                }
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    loadActorIdsData: function loadActorIdsData(movieId) {
        var getActorIdsUrl = this.state.getActorIdsUrl;

        _vm_util.ajax.get({
            url: getActorIdsUrl + movieId,
            success: function (result) {

                this.updateActorIds(result.data.list);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    loadTagGroupsData: function loadTagGroupsData(args) {
        var onSuccess = args.onSuccess;
        var getTagGroupsUrl = this.state.getTagGroupsUrl;

        _vm_util.ajax.get({
            url: getTagGroupsUrl,
            success: function (result) {

                this.updateTagGroups(result.data.list);

                if (!isUndefined(onSuccess)) {
                    onSuccess(result);
                }
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    showDialog: function showDialog(record) {

        this.getMovieEditDialog().showDialog();

        this.loadFilmmakerData({
            onSuccess: function () {

                this.loadActorIdsData(record.id);
            }.bind(this)
        });

        this.loadTagGroupsData({
            onSuccess: function () {

                this.loadSelectedTagIdsData(record.id);
            }.bind(this)
        });
    },
    getMovieEditDialog: function getMovieEditDialog() {
        return this.refs.movie_edit_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var _state = this.state,
            editMovieUrl = _state.editMovieUrl,
            tipOfEditing = _state.tipOfEditing;

        var hideMessage = _antd.message.loading(tipOfEditing, 0);
        var filterValues = function filterValues(values) {
            values.releaseTime = timeFormatter.long2Int(new Date(values.releaseTime._d).getTime());
            values.actorIds = values.actorIds.join(",");
            values.tagIds = values.tagIds.join(",");
            return values;
        };
        values = filterValues(values);
        // c(values);
        _vm_util.ajax.put({
            url: editMovieUrl,
            data: values,
            success: function (result) {
                var onEditSuccess = this.props.onEditSuccess;


                _antd.message.success(result.msg);
                this.getMovieEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.movie) : undefined;

                //clear form
                this.getMovieEditDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getMovieEditDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {
        this.getMovieEditDialog().clearForm(); //!!防止触发reuqired后在关闭的bug
        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var echoData = this.props.echoData;
        var _state2 = this.state,
            title = _state2.title,
            width = _state2.width,
            filmmakers = _state2.filmmakers,
            actorIds = _state2.actorIds,
            tagGroups = _state2.tagGroups,
            selectedTagIds = _state2.selectedTagIds;


        echoData = _vm_util.commons.clone(echoData); //!!!!!!!!!!!!!important
        // filterEchoData
        var filterEchoData = function filterEchoData(echoData) {
            if (isUndefined(echoData)) {
                return {};
            }
            if (!isUndefined(echoData.createTime)) {
                echoData.createTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.createTime));
            }
            if (!isUndefined(echoData.updateTime)) {
                echoData.updateTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.updateTime));
            }
            if (!isUndefined(echoData.releaseTime)) {
                echoData.releaseTime = (0, _moment2.default)(timeFormatter.int2Long(echoData.releaseTime));
            }
            return echoData;
        };
        echoData = filterEchoData(echoData);

        //filmmakerOptions,actorOptions
        var filmmakerOptions = [];

        if (!isUndefined(filmmakers)) {
            filmmakerOptions = filmmakers.map(function (item, i) {
                var val = item.id + '';
                var title = "姓名：" + item.name + "\r\n别名：" + item.alias + "\r\n简介:" + item.description;
                return _react2.default.createElement(
                    Option,
                    { title: title, key: item.name, value: val },
                    item.name
                );
            }.bind(this));
        }

        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 7 },
                label: "id",
                id: "id",
                config: {
                    initialValue: echoData.id
                },
                input: _react2.default.createElement(_antd.Input, { name: "id",
                    autoComplete: "off",
                    disabled: true })
            }, {
                col: { span: 1 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 7 },
                label: "名称",
                id: "name",
                config: {
                    initialValue: echoData.name,
                    rules: [{ required: true, message: '请输入电影名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u7535\u5F71\u540D\u79F0", name: "name" })
            }, {
                col: { span: 1 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 7 },
                label: "状态",
                id: "status",
                config: {
                    initialValue: echoData.status,
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _vm_util.commons.getStatusOptions()
                )
            }]

        }, {
            cols: [{
                col: { span: 7 },
                label: "别名",
                id: "alias",
                config: {
                    initialValue: echoData.alias,
                    rules: [{ required: true, whitespace: true, message: '请输入别名!' }]
                },
                input: _react2.default.createElement(_antd.Input, { name: "alias",
                    autoComplete: "off",
                    placeholder: "\u522B\u540D" })
            }, {
                col: { span: 1 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 7 },
                label: "发布时间",
                id: "releaseTime",
                config: {
                    initialValue: echoData.releaseTime,
                    rules: [{ type: 'object', required: true, whitespace: true, message: '请输入发布时间!' }]
                },

                input: _react2.default.createElement(_antd.DatePicker, { name: "releaseTime",
                    style: {
                        width: "100%"
                    },
                    autoComplete: "off",
                    placeholder: "\u8BF7\u8F93\u5165\u53D1\u5E03\u65F6\u95F4" })
            }, {
                col: { span: 1 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 7 },
                label: "评分",
                id: "ignore_score",
                config: {
                    initialValue: echoData.score
                },

                input: _react2.default.createElement(_antd.Input, { name: "ignore_score",
                    autoComplete: "off",
                    disabled: true })
            }]

        }, {
            cols: [{
                col: { span: 7 },
                label: "观看数",
                id: "ignore_watchNum",
                config: {
                    initialValue: echoData.watchNum
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }, {
                col: { span: 1 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 7 },
                label: "电影时长(分钟)",
                id: "movieTime",
                config: {
                    initialValue: echoData.movieTime,
                    rules: [{ required: true, message: '请输入电影时长!' }]
                },

                input: _react2.default.createElement(_antd.InputNumber, { autoComplete: "off",
                    style: { width: '100%' },
                    placeholder: "\u8BF7\u8F93\u5165\u7535\u5F71\u65F6\u957F",
                    min: 1,
                    max: 600 })
            }, {
                col: {
                    span: 1
                },

                input: _react2.default.createElement("div", null)
            }, {
                col: {
                    span: 7
                },

                label: "创建时间",
                id: "ignore_createTime",
                config: {
                    initialValue: echoData.createTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }]

        }, {
            cols: [{
                col: { span: 7 },
                label: "最后更新时间",
                id: "ignore_updateTime",
                config: {
                    initialValue: echoData.updateTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }, {
                col: { span: 1 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 7 },
                label: "导演",
                id: "directorId",
                config: {
                    initialValue: echoData.directorId,
                    rules: [{ required: true, message: '请选择导演!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        showSearch: true,
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u7535\u5F71\u4EBA",
                        placeholder: "\u8BF7\u9009\u62E9\u5BFC\u6F14",
                        style: { width: '100%' }
                    },
                    filmmakerOptions
                )
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "演员",
                id: "actorIds",
                config: {
                    initialValue: _vm_util.commons.toStrArr(actorIds),
                    rules: [{ required: true, message: '请选择演员!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        mode: "multiple",
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u7535\u5F71\u4EBA",
                        placeholder: "\u8BF7\u9009\u62E9\u6F14\u5458",
                        style: { width: '100%' }
                    },
                    filmmakerOptions
                )
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "标签",
                id: "tagIds",
                config: {
                    initialValue: _vm_util.commons.toStrArr(selectedTagIds),
                    rules: [{ required: true, message: '请选择标签!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        mode: "multiple",
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u6807\u7B7E",
                        placeholder: "\u8BF7\u9009\u62E9\u6807\u7B7E",
                        style: { width: '100%' }
                    },
                    tagGroups.map(function (group, i) {
                        // c(group);
                        return _react2.default.createElement(
                            OptGroup,
                            { key: i, label: group.name },
                            group.items.map(function (tag, i) {
                                // c(tag);
                                var v = tag.id + '';
                                return _react2.default.createElement(
                                    Option,
                                    { key: i, value: v },
                                    tag.name
                                );
                            })
                        );
                    })
                )
            }]

        }, {
            cols: [{
                col: { span: 24 },
                label: "简介",
                id: "description",
                config: {
                    initialValue: echoData.description,
                    rules: [{ required: true, message: '请输入简介!' }]
                },

                input: _react2.default.createElement(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB", autosize: { minRows: 4, maxRows: 8 } })
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            width: width,
            title: title,
            formRows: formRows,
            formLayout: formLayout,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "movie_edit_dialog" });
    }
});

exports.default = MovieEditDialog; //将App组件导出

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(18);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option,
    OptGroup = _antd.Select.OptGroup;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var MovieAddDialog = _react2.default.createClass({
    displayName: "MovieAddDialog",
    getInitialState: function getInitialState() {
        return {
            title: "添加电影",
            addMovieUrl: "/movie/info",
            getFilmmakersUrl: "/filmmaker/info/list",
            getTagGroupsUrl: "/tagGroup/tag/list",
            tipOfAddingMovie: "正在添加电影",
            filmmakers: [],
            tagGroups: []
        };
    },
    updateTagGroups: function updateTagGroups(tagGroups) {
        this.setState({ tagGroups: tagGroups });
    },
    loadTagGroupsData: function loadTagGroupsData() {
        var getTagGroupsUrl = this.state.getTagGroupsUrl;

        _vm_util.ajax.get({
            url: getTagGroupsUrl,
            success: function (result) {

                this.updateTagGroups(result.data.list);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    showDialog: function showDialog() {
        this.getMovieAddDialog().showDialog();

        this.loadFilmmakerData();

        this.loadTagGroupsData();
    },
    getMovieAddDialog: function getMovieAddDialog() {
        return this.refs.movie_add_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var tipOfAddingMovie = this.state.tipOfAddingMovie;

        var hideMessage = _antd.message.loading(tipOfAddingMovie, 0);
        var addMovieUrl = this.state.addMovieUrl;

        var filterValues = function filterValues(values) {
            values.releaseTime = timeFormatter.long2Int(new Date(values.releaseTime._d).getTime());
            values.actorIds = values.actorIds.join(",");
            values.tagIds = values.tagIds.join(",");
            return values;
        };
        values = filterValues(values);
        _vm_util.ajax.post({
            url: addMovieUrl,
            data: values,
            success: function (result) {
                var onAddSuccess = this.props.onAddSuccess;


                _antd.message.success(result.msg);
                this.getMovieAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.movie) : undefined;

                //clear form
                this.getMovieAddDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getMovieAddDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    updateFilmmakers: function updateFilmmakers(filmmakers) {
        this.setState({ filmmakers: filmmakers });
    },
    loadFilmmakerData: function loadFilmmakerData() {
        var getFilmmakersUrl = this.state.getFilmmakersUrl;

        _vm_util.ajax.get({
            url: getFilmmakersUrl,
            success: function (result) {

                this.updateFilmmakers(result.data.list);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    handleCancel: function handleCancel() {

        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var _state = this.state,
            filmmakers = _state.filmmakers,
            title = _state.title,
            tagGroups = _state.tagGroups;

        //filmmakerOptions,actorOptions

        var filmmakerOptions = [];

        if (!isUndefined(filmmakers)) {
            filmmakerOptions = filmmakers.map(function (item, i) {
                var val = item.id + '';
                var title = "姓名：" + item.name + "\r\n别名：" + item.alias + "\r\n简介:" + item.description;
                return _react2.default.createElement(
                    Option,
                    { title: title, key: item.name, value: val },
                    item.name
                );
            }.bind(this));
        }

        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "名称",
                id: "name",
                config: {
                    rules: [{ required: true, message: '请输入电影名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u7535\u5F71\u540D\u79F0", name: "name" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "别名",
                id: "alias",
                config: {
                    rules: [{ required: true, whitespace: true, message: '请输入电影别名!' }]
                },
                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    placeholder: "\u8BF7\u8F93\u5165\u7535\u5F71\u522B\u540D" })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _vm_util.commons.getStatusOptions()
                )
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "电影时长(分钟)",
                id: "movieTime",
                config: {

                    rules: [{ required: true, message: '请输入时长!' }]
                },

                input: _react2.default.createElement(_antd.InputNumber, { autoComplete: "off",
                    style: { width: '100%' },
                    placeholder: "\u8BF7\u8F93\u5165\u7535\u5F71\u65F6\u957F",
                    min: 1,
                    max: 600 })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "发布时间",
                id: "releaseTime",
                config: {
                    rules: [{ type: 'object', required: true, whitespace: true, message: '请输入发布时间!' }]
                },

                input: _react2.default.createElement(_antd.DatePicker, { autoComplete: "off",
                    placeholder: "\u8BF7\u8F93\u5165\u53D1\u5E03\u65F6\u95F4" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "演员",
                id: "actorIds",
                config: {
                    rules: [{ required: true, message: '请选择演员!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        mode: "multiple",
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u7535\u5F71\u4EBA",
                        placeholder: "\u8BF7\u9009\u62E9\u6F14\u5458",
                        style: { width: '100%' }
                    },
                    filmmakerOptions
                )
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "导演",
                id: "directorId",
                config: {
                    rules: [{ required: true, message: '请选择导演!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        showSearch: true,
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u7535\u5F71\u4EBA",
                        placeholder: "\u8BF7\u9009\u62E9\u5BFC\u6F14",
                        style: { width: '100%' }
                    },
                    filmmakerOptions
                )
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "标签",
                id: "tagIds",
                config: {
                    rules: [{ required: true, message: '请选择标签!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        mode: "multiple",
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u6807\u7B7E",
                        placeholder: "\u8BF7\u9009\u62E9\u6807\u7B7E",
                        style: { width: '100%' }
                    },
                    tagGroups.map(function (group, i) {
                        // c(group);
                        return _react2.default.createElement(
                            OptGroup,
                            { key: i, label: group.name },
                            group.items.map(function (tag, i) {
                                // c(tag);
                                var v = tag.id + '';
                                return _react2.default.createElement(
                                    Option,
                                    { key: i, value: v },
                                    tag.name
                                );
                            })
                        );
                    })
                )
            }]

        }, {
            cols: [{
                col: { span: 24 },
                label: "简介",
                id: "description",
                config: {
                    rules: [{ required: true, message: '请输入简介!' }]
                },

                input: _react2.default.createElement(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB", autosize: { minRows: 4, maxRows: 8 } })
            }]

        }];

        return _react2.default.createElement(_edit_dialog_temple2.default, {
            title: title,
            formRows: formRows,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "movie_add_dialog" });
    }
});

exports.default = MovieAddDialog; //将App组件导出

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(2);

__webpack_require__(103);

var _vm_util = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
//import "antd/dist/antd.css";


var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;

var MovieSrcVersionAddDialog = _react2.default.createClass({
    displayName: "MovieSrcVersionAddDialog",
    getInitialState: function getInitialState() {
        return {
            width: 300,
            title: "上传视频资源",
            uploadUrl: "/movie/version/info",
            loading: false,
            visible: false,
            maskClosable: false,
            fileList: [],
            movieId: undefined,
            sharpness: undefined
        };
    },
    showDialog: function showDialog(record) {
        this.updateMovieId(record.id);
        this.setState({ visible: true });
    },
    updateMovieId: function updateMovieId(movieId) {

        this.setState({ movieId: movieId });
    },
    updateLoading: function updateLoading(loading) {

        this.setState({ loading: loading });
    },
    handleSubmit: function handleSubmit(values) {},
    handleCancel: function handleCancel() {},
    updateFileList: function updateFileList(fileList) {
        this.setState({ fileList: fileList });
    },
    handleUpload: function handleUpload() {
        var _state = this.state,
            fileList = _state.fileList,
            uploadUrl = _state.uploadUrl,
            movieId = _state.movieId,
            sharpness = _state.sharpness;
        var onMovieSrcVersionAddSuccess = this.props.onMovieSrcVersionAddSuccess;

        var formData = new FormData();
        fileList.forEach(function (file) {
            formData.append('file', file);
            // formData.append('files[]', file);
        });
        formData.append("movieId", movieId);
        formData.append("sharpness", sharpness);

        this.updateLoading(true);

        _vm_util.ajax.post({
            url: uploadUrl,
            data: formData,
            enctype: 'multipart/form-data',
            contentType: false, //必须false才会避开jQuery对 formdata 的默认处理 XMLHttpRequest会对 formdata 进行正确的处理
            processData: false, //必须false才会自动加上正确的Content-Type
            beforeSend: function () {}.bind(this),
            success: function (result) {
                // c(result);
                _antd.message.success(result.msg);

                this.updateVisible(false);

                this.updateSharpness(undefined);

                this.updateFileList([]);

                onMovieSrcVersionAddSuccess(result.data.video);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {
                this.updateLoading(false);
            }.bind(this)

        });
    },
    updateVisible: function updateVisible(visible) {
        this.setState({ visible: visible });
    },
    onCancel: function onCancel() {
        this.updateVisible(false);
    },
    onSelectSharpness: function onSelectSharpness(value, option) {
        this.updateSharpness(value);
    },
    updateSharpness: function updateSharpness(sharpness) {
        this.setState({ sharpness: sharpness });
    },
    render: function render() {
        var _this = this;

        var _state2 = this.state,
            width = _state2.width,
            title = _state2.title,
            uploadUrl = _state2.uploadUrl,
            loading = _state2.loading,
            visible = _state2.visible,
            maskClosable = _state2.maskClosable;


        var props = {
            // action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: function onRemove(file) {
                _this.setState(function (_ref) {
                    var fileList = _ref.fileList;

                    var index = fileList.indexOf(file);
                    var newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList
                    };
                });
            },
            beforeUpload: function beforeUpload(file) {
                _this.setState(function (_ref2) {
                    var fileList = _ref2.fileList;
                    return {
                        fileList: [].concat(_toConsumableArray(fileList), [file])
                    };
                });
                return false;
            },
            fileList: this.state.fileList
        };

        return _react2.default.createElement(
            _antd.Modal,
            {
                width: width,
                title: title,
                uploadUrl: uploadUrl,
                loading: loading,
                visible: visible,
                closable: !loading,
                maskClosable: maskClosable,
                onCancel: this.onCancel,
                footer: null,
                style: { textAlign: "center" } },
            _react2.default.createElement(
                _antd.Upload,
                props,
                _react2.default.createElement(
                    _antd.Button,
                    {
                        disabled: this.state.fileList.length >= 1
                    },
                    _react2.default.createElement(_antd.Icon, { type: "upload" }),
                    " \u9009\u62E9\u89C6\u9891\u6587\u4EF6"
                )
            ),
            _react2.default.createElement(
                _antd.Select,
                { name: "sharpness",
                    value: this.state.sharpness,
                    disabled: loading,
                    onSelect: this.onSelectSharpness,
                    placeholder: "\u8BF7\u8F93\u5165\u6E05\u6670\u5EA6",
                    style: { width: "65%", margin: 15 } },
                _vm_util.commons.getSharpnessOptions()
            ),
            _react2.default.createElement(
                _antd.Button,
                {
                    className: "upload-demo-start",
                    type: "primary",
                    onClick: this.handleUpload,
                    disabled: this.state.fileList.length == 0 || isEmptyString(this.state.sharpness),
                    loading: loading
                },
                loading ? '上传中' : '开始上传'
            )
        );
    }
});

exports.default = MovieSrcVersionAddDialog; //将App组件导出

/***/ }),
/* 103 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(39);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _movie_src_version_edit_dialog = __webpack_require__(105);

var _movie_src_version_edit_dialog2 = _interopRequireDefault(_movie_src_version_edit_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var MovieSrcVersionTable = _react2.default.createClass({
    displayName: "MovieSrcVersionTable",

    getInitialState: function getInitialState() {

        return {

            tagTable: {
                dataSourceUrl: "/movie/version/info/list/ByMovieId/",
                bordered: false,
                tableLoading: false,
                columns: [],
                data: [],
                originalData: [],
                echoData: {},
                deletingTip: "正在删除",
                delMovieSrcVersionUrl: "/movie/version/info"

            }
        };
    },

    componentDidMount: function componentDidMount() {

        this.loadData();

        this.registEvents();
    },
    registEvents: function registEvents() {
        var _this = this;

        var movieId = this.props.movieId;

        window.eventEmitEmitter.on('onMovieSrcVersionAddSuccess', function (record) {

            if (record.movieId == movieId) {
                _this.loadData();
            }
        });
        window.eventEmitEmitter.on('loadMovieSrcVersionTableData', function () {

            _this.loadData();
        });
    },
    updateTableLoading: function updateTableLoading(loading) {
        var state = this.state;
        state.tagTable.tableLoading = loading;
        this.setState(state);
    },
    updateTableColumns: function updateTableColumns(columns) {
        var state = this.state;
        state.tagTable.columns = columns;
        this.setState(state);
    },
    updateTableData: function updateTableData(data) {
        var state = this.state;
        state.tagTable.data = data;
        this.setState(state);
    },
    updateOriginalData: function updateOriginalData(originalData) {

        var state = this.state;
        state.tagTable.originalData = originalData;
        this.setState(state);
    },
    updateTableEchoData: function updateTableEchoData(echoData) {
        var state = this.state;
        state.tagTable.echoData = echoData;
        this.setState(state);
    },
    dataConverter: function dataConverter(dataArr) {
        var data = [];
        for (var i = 0; i < dataArr.length; ++i) {
            var d = dataArr[i];
            data.push({
                key: i,
                id: d.id,
                sharpness: d.sharpness,
                status: d.status,
                create_time: d.createTime,
                update_time: d.updateTime
            });
        }
        return data;
    },
    showEditDialog: function showEditDialog(record) {

        record = _vm_util.commons.getObjByKey(this.state.tagTable.originalData, "id", record.id);

        this.updateTableEchoData(record);

        this.getEditDialog().showDialog(record);
    },
    getEditDialog: function getEditDialog() {
        return this.refs.edit_dialog;
    },
    deleteRecord: function deleteRecord(ids) {

        var hideLoading = _antd.message.loading(deletingTip);
        // this.updateMovieSrcVersionTableBatchDeleteLoading(true);

        var _state$tagTable = this.state.tagTable,
            deletingTip = _state$tagTable.deletingTip,
            delMovieSrcVersionUrl = _state$tagTable.delMovieSrcVersionUrl;

        _vm_util.ajax.delete({
            url: delMovieSrcVersionUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                // this.updateMovieSrcVersionTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                _antd.message.success(result.msg);

                // this.removeMovieSrcVersionTableSelectedRowKeys(ids);

                // this.loadMovieSrcVersionTableData();

                this.loadData();
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function error() {}
        });
    },
    loadData: function loadData() {
        var _this2 = this;

        this.updateTableLoading(true);
        var dataSourceUrl = this.state.tagTable.dataSourceUrl;
        var movieId = this.props.movieId;

        _vm_util.ajax.get({
            url: dataSourceUrl + movieId,
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.dataConverter(originalData);
                //save data

                this.updateOriginalData(originalData);

                this.updateTableData(data);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function () {}.bind(this),
            complete: function () {
                this.updateTableLoading(false);
            }.bind(this)
        });

        var columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: 100
        }, {
            title: '清晰度',
            dataIndex: 'sharpness',
            key: 'sharpness',
            width: 100,
            render: function render(text) {
                return _vm_util.commons.getSharpnessStrByIndex({ index: text });
            }
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: function render(text) {
                return _vm_util.commons.getStatusStrByIndex({ index: text });
            }
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            width: 100,
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            }
        }, {
            title: '最后更新时间',
            dataIndex: 'update_time',
            key: 'update_time',
            width: 100,
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 100,
            render: function render(text, record) {
                var menu = _react2.default.createElement(
                    _antd.Menu,
                    null,
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { onClick: function onClick() {
                                    return _this2.showEditDialog(record);
                                }, href: "javascript:void(0);" },
                            "\u7F16\u8F91"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            _antd.Popconfirm,
                            { title: "\u786E\u8BA4\u5220\u9664 ? ",
                                okText: "\u5220\u9664",
                                cancelText: "\u53D6\u6D88",
                                onConfirm: function onConfirm() {
                                    return _this2.deleteRecord([record.id]);
                                } },
                            _react2.default.createElement(
                                "a",
                                { href: "javascript:void(0)" },
                                "\u5220\u9664"
                            )
                        )
                    )
                );
                return _react2.default.createElement(
                    "span",
                    { className: "table-operation" },
                    _react2.default.createElement(
                        _antd.Dropdown,
                        { overlay: menu },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0);" },
                            "\u64CD\u4F5C ",
                            _react2.default.createElement(_antd.Icon, { type: "down" })
                        )
                    )
                );
            }
        }];
        this.updateTableColumns(columns);
    },
    onEditSuccess: function onEditSuccess(record) {
        this.loadData();
    },

    render: function render() {
        var _state$tagTable2 = this.state.tagTable,
            bordered = _state$tagTable2.bordered,
            columns = _state$tagTable2.columns,
            data = _state$tagTable2.data,
            tableLoading = _state$tagTable2.tableLoading,
            echoData = _state$tagTable2.echoData;


        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_antd.Table, {
                className: "components-table-demo-nested",
                bordered: bordered,
                loading: tableLoading,
                columns: columns,
                dataSource: data,
                pagination: false
            }),
            _react2.default.createElement(_movie_src_version_edit_dialog2.default, {
                ref: "edit_dialog",
                echoData: echoData,
                onEditSuccess: this.onEditSuccess })
        );
    }
});

exports.default = MovieSrcVersionTable; //将App组件导出

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;

var MovieSrcVersionEditDialog = _react2.default.createClass({
    displayName: "MovieSrcVersionEditDialog",
    getInitialState: function getInitialState() {
        return {
            width: 400,
            title: "修改电影资源信息",
            editUrl: "/movie/version/info",
            tipOfEditing: '正在保存电影资源修改',
            echoData: {}
        };
    },
    showDialog: function showDialog(record) {

        this.getMovieSrcVersionEditDialog().showDialog();
    },
    getMovieSrcVersionEditDialog: function getMovieSrcVersionEditDialog() {
        return this.refs.movie_src_version_edit_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var _state = this.state,
            editUrl = _state.editUrl,
            tipOfEditing = _state.tipOfEditing;

        var hideMessage = _antd.message.loading(tipOfEditing, 0);
        var filterValues = function filterValues(values) {
            return values;
        };
        values = filterValues(values);
        // c(values);
        _vm_util.ajax.put({
            url: editUrl,
            data: values,
            success: function (result) {
                var onEditSuccess = this.props.onEditSuccess;


                _antd.message.success(result.msg);
                this.getMovieSrcVersionEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.movie_src_version) : undefined;

                //clear form
                this.getMovieSrcVersionEditDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getMovieSrcVersionEditDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {
        this.getMovieSrcVersionEditDialog().clearForm(); //!!防止触发reuqired后在关闭的bug
        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var echoData = this.props.echoData;
        var _state2 = this.state,
            title = _state2.title,
            width = _state2.width;


        echoData = _vm_util.commons.clone(echoData); //!!!!!!!!!!!!!important
        // filterEchoData
        var filterEchoData = function filterEchoData(echoData) {
            if (isUndefined(echoData)) {
                return {};
            }
            if (!isUndefined(echoData.createTime)) {
                echoData.createTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.createTime));
            }
            if (!isUndefined(echoData.updateTime)) {
                echoData.updateTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.updateTime));
            }
            return echoData;
        };
        echoData = filterEchoData(echoData);

        c(echoData);

        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "id",
                id: "id",
                config: {
                    initialValue: echoData.id
                },
                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "清晰度",
                id: "sharpness",
                config: {
                    initialValue: echoData.sharpness,
                    rules: [{ required: true, message: '请输入清晰度!' }]

                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u6E05\u6670\u5EA6" },
                    _vm_util.commons.getSharpnessOptions()
                )
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    initialValue: echoData.status,
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _vm_util.commons.getStatusOptions()
                )
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: {
                    span: 11
                },

                label: "创建时间",
                id: "ignore_createTime",
                config: {
                    initialValue: echoData.createTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "最后更新时间",
                id: "ignore_updateTime",
                config: {
                    initialValue: echoData.updateTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            width: width,
            title: title,
            formRows: formRows,
            formLayout: formLayout,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "movie_src_version_edit_dialog" });
    }
});

exports.default = MovieSrcVersionEditDialog; //将App组件导出

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(28);

__webpack_require__(2);

var _filmmaker_table = __webpack_require__(107);

var _filmmaker_table2 = _interopRequireDefault(_filmmaker_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var FilmmakerPage = _react2.default.createClass({
    displayName: "FilmmakerPage",

    getInitialState: function getInitialState() {

        return {};
    },

    render: function render() {

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_filmmaker_table2.default, null)
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(FilmmakerPage); //将App组件导出

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(vm_config) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(108);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _filmmaker_edit_dialog = __webpack_require__(109);

var _filmmaker_edit_dialog2 = _interopRequireDefault(_filmmaker_edit_dialog);

var _filmmaker_add_dialog = __webpack_require__(110);

var _filmmaker_add_dialog2 = _interopRequireDefault(_filmmaker_add_dialog);

var _img_uploader_dialog_template = __webpack_require__(27);

var _img_uploader_dialog_template2 = _interopRequireDefault(_img_uploader_dialog_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var FilmmakerTable = _react2.default.createClass({
    displayName: "FilmmakerTable",

    getInitialState: function getInitialState() {

        return {

            imgUploaderDialog: {
                title: "更新电影人图片",
                width: 700,
                config: {
                    aspectRatio: 1 / 1,
                    fileTypes: ["jpg", "png"],
                    fileMaxsize: 1024 * 1024 * 1, //2M
                    saveImgUrl: "/filmmaker/img",
                    uploadTempImgUrl: "/src/img",
                    server_url_prefix: vm_config.http_url_prefix,
                    extraInfo: {}
                }
            },
            filmmakerEditDialog: {
                echoData: undefined
            },
            filmmakerTable: {
                title: "电影人列表",
                dataSourceUrl: "/filmmaker/info/list",
                delFilmmakerUrl: "/filmmaker/info",
                scroll: { x: true, y: 450 },
                editable: false,
                haveSearchFilmmakername: false,
                filmmakernameDropdownVisible: false,
                bordered: false,
                tableLoading: false,
                batchDeleteBtnLoading: false,
                refreshBtnLoading: false,
                selectedRowKeys: [],
                data: [], //displayData
                originalData: [],
                page: {
                    start: 0,
                    size: 5,
                    orderBy: "",
                    orderType: "",
                    total: 0
                },
                query: {
                    name: ""
                },
                columns: [],
                deletingTip: "正在删除"
            }
        };
    },
    onSearchFilmmakername: function onSearchFilmmakername(newFilmmakernameQuery) {
        this.updateNameOfQuery(newFilmmakernameQuery);
        if (!isEmptyString(this.state.filmmakerTable.query.name)) {
            this.updateFilmmakerTableHaveSearchFilmmakername(true);
        } else {

            this.updateFilmmakerTableHaveSearchFilmmakername(false);
        }
        this.loadFilmmakerTableData();
    },
    updateFilmmakerTableHaveSearchFilmmakername: function updateFilmmakerTableHaveSearchFilmmakername(haveSearchFilmmakername) {
        var state = this.state;
        state.filmmakerTable.haveSearchFilmmakername = haveSearchFilmmakername;
        this.setState(state);
    },
    updateFilmmakerTableFilmmakernameDropdownVisible: function updateFilmmakerTableFilmmakernameDropdownVisible(filmmakernameDropdownVisible) {
        var state = this.state;
        state.filmmakerTable.filmmakernameDropdownVisible = filmmakernameDropdownVisible;
        this.setState(state);
    },
    updateFilmmakerTableSelectedRowKeys: function updateFilmmakerTableSelectedRowKeys(selectedRowKeys) {
        var state = this.state;
        state.filmmakerTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },
    removeFilmmakerTableSelectedRowKeys: function removeFilmmakerTableSelectedRowKeys(removeSelectedRowKeys) {
        var selectedRowKeys = this.state.filmmakerTable.selectedRowKeys;
        selectedRowKeys = selectedRowKeys.removeByList(removeSelectedRowKeys);
        this.updateFilmmakerTableSelectedRowKeys(selectedRowKeys);
    },
    updateNameOfQuery: function updateNameOfQuery(name) {
        var state = this.state;
        state.filmmakerTable.query.name = name;
        this.setState(state);
    },
    updateFilmmakerTableData: function updateFilmmakerTableData(data) {
        var state = this.state;
        state.filmmakerTable.data = data;
        this.setState(state);
    },
    updateFilmmakerTableBatchDeleteLoading: function updateFilmmakerTableBatchDeleteLoading(loading) {
        var state = this.state;
        state.filmmakerTable.batchDeleteBtnLoading = loading;
        this.setState(state);
    },
    updateFilmmakerTableRefreshBtnLoading: function updateFilmmakerTableRefreshBtnLoading(loading) {
        var state = this.state;
        state.filmmakerTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateFilmmakerTablePage: function updateFilmmakerTablePage(page) {
        var state = this.state;
        state.filmmakerTable.page = page;
        this.setState(state);
    },
    updateFilmmakerTableQuery: function updateFilmmakerTableQuery(query) {
        var state = this.state;
        state.filmmakerTable.query = query;
        this.setState(state);
    },
    updateFilmmakerTableLoading: function updateFilmmakerTableLoading(flag) {
        var state = this.state;
        state.filmmakerTable.tableLoading = flag;
        this.setState(state);
    },
    updateFilmmakerTableColumns: function updateFilmmakerTableColumns(columns) {

        var state = this.state;
        state.filmmakerTable.columns = columns;
        this.setState(state);
    },
    updateFilmmakerTableOriginalData: function updateFilmmakerTableOriginalData(originalData) {
        var state = this.state;
        state.filmmakerTable.originalData = originalData;
        this.setState(state);
    },
    updateFilmmakerEditDialogEchoData: function updateFilmmakerEditDialogEchoData(echoData) {
        var state = this.state;
        state.filmmakerEditDialog.echoData = echoData;
        this.setState(state);
    },
    showFilmmakerImgUploaderDialog: function showFilmmakerImgUploaderDialog(record) {
        this.getFilmmakerImgUploaderDialog().showDialog();
        this.getFilmmakerImgUploaderDialog().previewImg(_vm_util.commons.generateImgUrl({
            imgUrl: record.imgUrl,
            width: 300
        }));
        this.getFilmmakerImgUploaderDialog().updateExtraInfo(record);
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        this.updateFilmmakerTableColumns([{
            title: 'id',
            width: 80,
            dataIndex: 'id',
            sorter: true
        }, {
            title: '图片',
            width: 90,
            dataIndex: 'imgUrl',
            render: function render(text, record) {
                var imageUrl = _vm_util.commons.generateImgUrl({
                    imgUrl: text,
                    width: 50
                });

                return _react2.default.createElement("img", { onClick: function onClick() {
                        return _this.showFilmmakerImgUploaderDialog(record);
                    }, style: {
                        width: 50,
                        height: 50,
                        cursor: "pointer"
                    }, src: imageUrl, alt: "\u6682\u65E0" });
            }
        }, {
            title: '名称',
            width: 120,
            dataIndex: 'name',
            render: function render(text, record) {
                return _vm_util.commons.highLight(text, _this.state.filmmakerTable.query.name);
            },
            sorter: true,
            filterDropdown: _react2.default.createElement(
                "div",
                { className: "custom-filter-dropdown" },
                _react2.default.createElement(Search, {
                    placeholder: "\u641C\u7D22\u7535\u5F71\u540D",
                    onSearch: this.onSearchFilmmakername,
                    style: { width: 200 }
                })
            ),
            filterIcon: _react2.default.createElement(_antd.Icon, { type: "search",
                style: { color: this.state.filmmakerTable.haveSearchFilmmakername ? '#108ee9' : '#aaa' } })
            // filterDropdownVisible: this.state.filmmakerTable.filmmakernameDropdownVisible,

        }, {
            title: '别名',
            width: 80,
            dataIndex: 'alias',
            sorter: true

        }, {
            title: '国家',
            width: 80,
            dataIndex: 'country',
            sorter: true
        }, {
            title: '职业',
            width: 80,
            dataIndex: 'profession',
            sorter: true,
            render: function render(text) {
                return _vm_util.commons.makeTipSpan(text, 10);
            }
        }, {
            title: '血型',
            width: 80,
            dataIndex: 'blood_type',
            sorter: true,
            render: function render(text, record) {
                return _vm_util.commons.getBloodTypeStrByIndex({ index: text });
            }

        }, {
            title: '生日',
            width: 80,
            dataIndex: 'birthday',
            sorter: true,

            render: function render(text, record) {
                return timeFormatter.formatDate(timeFormatter.int2Long(text));
            }
        }, {
            title: '性别',
            width: 80,
            dataIndex: 'sex',
            sorter: true,
            render: function render(text) {
                return _vm_util.commons.getSexStrByIndex({ index: text });
            }
        },

        // {
        //     title: '简介',
        //     width: 150,
        //     dataIndex: 'description',
        //     sorter: true,
        //     render: (text) => {
        //         return commons.makeTipSpan(text, 19);
        //     },
        // },
        {
            title: '状态',
            width: 80,
            dataIndex: 'status',
            render: function render(text) {
                return _vm_util.commons.getStatusStrByIndex({ index: text });
            },
            sorter: true
        }, {
            title: '更新时间',
            width: 80,
            dataIndex: 'update_time',
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '创建时间',
            width: 80,
            dataIndex: 'create_time',
            render: function render(text) {

                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 80,
            render: function render(text, record) {

                var menu = _react2.default.createElement(
                    _antd.Menu,
                    null,
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { onClick: function onClick() {
                                    return _this.showEditDialog(record);
                                }, href: "javascript:void(0);" },
                            "\u7F16\u8F91"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            _antd.Popconfirm,
                            { title: "\u786E\u8BA4\u5220\u9664 ? ",
                                okText: "\u5220\u9664",
                                cancelText: "\u53D6\u6D88",
                                onConfirm: function onConfirm() {
                                    return _this.deleteRecord([record.id]);
                                } },
                            _react2.default.createElement(
                                "a",
                                { href: "javascript:void(0)" },
                                "\u5220\u9664"
                            )
                        )
                    )
                );
                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        _antd.Dropdown,
                        { overlay: menu },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0);" },
                            "\u64CD\u4F5C ",
                            _react2.default.createElement(_antd.Icon, { type: "down" })
                        )
                    )
                );
            },
            sorter: true
        }]);
        this.loadFilmmakerTableData();
    },
    uploadFilmmakerSrc: function uploadFilmmakerSrc(record) {
        c("uploadFilmmakerSrc");
    },
    handleTableChange: function handleTableChange(pagination, filters, sorter) {

        var page = this.state.filmmakerTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateFilmmakerTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadFilmmakerTableData();
    },
    filmmakerTableDataFiledsConverter: function filmmakerTableDataFiledsConverter(originalData) {
        var data = [];
        $.each(originalData, function (i, item) {

            data.push({
                key: item.id,
                id: item.id,
                imgUrl: item.imgUrl,
                name: item.name,
                alias: item.alias,
                description: item.description,
                create_time: item.createTime,
                update_time: item.updateTime,
                status: item.status,
                profession: item.profession,
                blood_type: item.bloodType,
                sex: item.sex,
                country: item.country,
                birthday: item.birthday

            });
        }.bind(this));
        return data;
    },
    loadFilmmakerTableData: function loadFilmmakerTableData() {
        this.updateFilmmakerTableLoading(true);
        this.updateFilmmakerTableRefreshBtnLoading(true);
        var _state$filmmakerTable = this.state.filmmakerTable,
            page = _state$filmmakerTable.page,
            query = _state$filmmakerTable.query;
        //filter

        var orderType = page.orderType;
        if (orderType == "descend") {
            orderType = "desc";
        }
        if (orderType == "ascend") {
            orderType = "asc";
        }
        page.orderType = orderType;

        //ajax
        _vm_util.ajax.get({
            url: this.state.filmmakerTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.filmmakerTableDataFiledsConverter(originalData);
                //save data

                this.updateFilmmakerTableOriginalData(originalData);

                this.updateFilmmakerTableData(data);

                var page = this.state.filmmakerTable.page;
                this.updateFilmmakerTablePage({
                    start: page.start,
                    size: page.size,
                    orderBy: page.orderBy,
                    orderType: page.orderType,
                    total: result.data.total
                });
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function () {}.bind(this),
            complete: function () {
                this.updateFilmmakerTableLoading(false);
                this.updateFilmmakerTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    showEditDialog: function showEditDialog(record) {
        record = _vm_util.commons.getObjByKey(this.state.filmmakerTable.originalData, "id", record.id);

        this.updateFilmmakerEditDialogEchoData(record);

        this.getFilmmakerEditDialog().showDialog();
    },
    deleteRecord: function deleteRecord(ids) {

        var hideLoading = _antd.message.loading(deletingTip);
        this.updateFilmmakerTableBatchDeleteLoading(true);

        var _state$filmmakerTable2 = this.state.filmmakerTable,
            deletingTip = _state$filmmakerTable2.deletingTip,
            delFilmmakerUrl = _state$filmmakerTable2.delFilmmakerUrl;

        _vm_util.ajax.delete({
            url: delFilmmakerUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                this.updateFilmmakerTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                _antd.message.success(result.msg);

                this.removeFilmmakerTableSelectedRowKeys(ids);

                this.loadFilmmakerTableData();
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function error() {}
        });
    },
    showAddDialog: function showAddDialog() {
        c("showAddDialog");
        this.getFilmmakerAddDialog().showDialog();
    },
    getFilmmakerAddDialog: function getFilmmakerAddDialog() {
        return this.refs.filmmaker_add_dialog;
    },
    getFilmmakerEditDialog: function getFilmmakerEditDialog() {
        return this.refs.filmmaker_edit_dialog;
    },
    onEditSuccess: function onEditSuccess(newRecord) {

        var newOriginalData = _vm_util.commons.updateObjByKey(this.state.filmmakerTable.originalData, "id", newRecord.id, newRecord);

        this.updateFilmmakerTableOriginalData(newOriginalData);

        var newData = this.filmmakerTableDataFiledsConverter(newOriginalData);

        this.updateFilmmakerTableData(newData);
    },
    onAddSuccess: function onAddSuccess(newRecord) {
        // c(newRecord);
        this.loadFilmmakerTableData();
    },
    getFilmmakerImgUploaderDialog: function getFilmmakerImgUploaderDialog() {
        return this.refs.filmmaker_img_uploader_dialog;
    },
    onUpdateImgSuccess: function onUpdateImgSuccess(result) {

        //previewImg
        // const imgUrl = commons.generateImgUrl(
        //     {
        //         imgUrl: result.data.imgUrl,
        //         width: 300
        //     }
        // );
        // this.getFilmmakerImgUploaderDialog().previewImg(imgUrl);
        this.onEditSuccess(result.data.filmmaker);
    },
    onUploadTempImgSuccess: function onUploadTempImgSuccess(result) {
        this.getFilmmakerImgUploaderDialog().previewImg(vm_config.http_url_prefix + result.data.imgUrl);
    },
    expandedRowRender: function expandedRowRender(record) {
        return _react2.default.createElement(
            "span",
            null,
            "\u7B80\u4ECB \uFF1A",
            _react2.default.createElement(
                "p",
                { style: { margin: 0 } },
                record.description
            )
        );
    },

    render: function render() {
        var _this2 = this;

        var echoData = this.state.filmmakerEditDialog.echoData;
        var _state$filmmakerTable3 = this.state.filmmakerTable,
            _title = _state$filmmakerTable3.title,
            scroll = _state$filmmakerTable3.scroll,
            selectedRowKeys = _state$filmmakerTable3.selectedRowKeys,
            columns = _state$filmmakerTable3.columns,
            data = _state$filmmakerTable3.data,
            page = _state$filmmakerTable3.page,
            tableLoading = _state$filmmakerTable3.tableLoading,
            batchDeleteBtnLoading = _state$filmmakerTable3.batchDeleteBtnLoading,
            refreshBtnLoading = _state$filmmakerTable3.refreshBtnLoading,
            bordered = _state$filmmakerTable3.bordered;


        var rowSelection = {
            onChange: function onChange(selectedRowKeys, selectedRows) {
                // c(selectedRows);
                // var selectedRowKeys = this.state.filmmakerTable.selectedRowKeys;
                // selectedRowKeys.push(selectedRows.key);
                // this.updateFilmmakerTableSelectedRowKeys(selectedRowKeys);
                // c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

                _this2.updateFilmmakerTableSelectedRowKeys(selectedRowKeys);
            },
            onSelect: function onSelect(record, selected, selectedRows) {},
            onSelectAll: function onSelectAll(selected, selectedRows, changeRows) {}
        };

        var posterUploaderDialog = this.state.posterUploaderDialog;
        var imgUploaderDialog = this.state.imgUploaderDialog;

        var hasSelected = selectedRowKeys.length > 0;
        //set now page's props
        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "div",
                { style: { marginBottom: 16 } },
                _react2.default.createElement(
                    _antd.Button,
                    {
                        loading: refreshBtnLoading,
                        onClick: this.loadFilmmakerTableData
                    },
                    "\u5237\u65B0"
                ),
                _react2.default.createElement(
                    _antd.Button,
                    {
                        style: { marginLeft: 8 },
                        type: "primary",
                        onClick: this.showAddDialog
                    },
                    "\u6DFB\u52A0"
                ),
                _react2.default.createElement(
                    _antd.Popconfirm,
                    { title: "\u786E\u8BA4\u5220\u9664 ? ",
                        okText: "\u5220\u9664",
                        cancelText: "\u53D6\u6D88",
                        onConfirm: function onConfirm() {
                            return _this2.deleteRecord(selectedRowKeys);
                        } },
                    _react2.default.createElement(
                        _antd.Button,
                        {
                            style: { marginLeft: 8 },
                            type: "danger",
                            disabled: !hasSelected,
                            loading: batchDeleteBtnLoading
                        },
                        "\u6279\u91CF\u5220\u9664"
                    )
                ),
                _react2.default.createElement(
                    "span",
                    { style: { marginLeft: 8 } },
                    hasSelected ? "\u9009\u62E9\u4E86 " + selectedRowKeys.length + " \u4E2A\u9009\u9879" : ''
                )
            ),
            _react2.default.createElement(_antd.Table, {
                expandedRowRender: this.expandedRowRender,
                locale: { emptyText: "暂无用户数据" },
                columns: columns,
                rowSelection: rowSelection,
                dataSource: data,
                pagination: {
                    total: page.total,
                    showTotal: function showTotal(total, range) {
                        return "\u7B2C " + range[0] + "-" + range[1] + " \u6761\u8BB0\u5F55 , \u5171 " + total + " \u6761\u8BB0\u5F55";
                    },
                    pageSize: page.size,
                    defaultCurrent: 1
                },
                loading: tableLoading,
                onChange: this.handleTableChange,
                bordered: bordered,
                title: function title() {
                    return _title;
                }
                // footer={() => 'Footer'}
                , scroll: scroll }),
            _react2.default.createElement(_filmmaker_edit_dialog2.default, { ref: "filmmaker_edit_dialog",
                echoData: echoData,
                onEditSuccess: this.onEditSuccess }),
            _react2.default.createElement(_filmmaker_add_dialog2.default, { ref: "filmmaker_add_dialog",
                onAddSuccess: this.onAddSuccess }),
            _react2.default.createElement(_img_uploader_dialog_template2.default, {
                ref: "filmmaker_img_uploader_dialog",
                config: imgUploaderDialog.config,
                title: imgUploaderDialog.title,
                width: imgUploaderDialog.width,
                onUpdateImgSuccess: this.onUpdateImgSuccess,
                onUploadTempImgSuccess: this.onUploadTempImgSuccess })
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(FilmmakerTable); //将App组件导出
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 108 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(28);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;

var FilmmakerEditDialog = _react2.default.createClass({
    displayName: "FilmmakerEditDialog",
    getInitialState: function getInitialState() {

        return {
            title: "修改电影人信息",
            editFilmmakerUrl: "/filmmaker/info",
            tipOfEditing: '正在保存电影人修改'
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps() {},
    showDialog: function showDialog() {
        this.getFilmmakerEditDialog().showDialog();
    },
    getFilmmakerEditDialog: function getFilmmakerEditDialog() {
        return this.refs.filmmaker_edit_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var _state = this.state,
            editFilmmakerUrl = _state.editFilmmakerUrl,
            tipOfEditing = _state.tipOfEditing;

        var hideMessage = _antd.message.loading(tipOfEditing, 0);
        var filterValues = function filterValues(values) {
            values.birthday = timeFormatter.long2Int(values.birthday._d.getTime());
            return values;
        };
        values = filterValues(values);
        // c(values);
        _vm_util.ajax.put({
            url: editFilmmakerUrl,
            data: values,
            success: function (result) {
                var onEditSuccess = this.props.onEditSuccess;


                _antd.message.success(result.msg);
                this.getFilmmakerEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.filmmaker) : undefined;

                //clear form
                this.getFilmmakerEditDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getFilmmakerEditDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {
        this.getFilmmakerEditDialog().clearForm(); //!!防止触发reuqired后在关闭的bug
        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    updateConstellationObj: function updateConstellationObj(obj) {
        this.setState({
            constellationObj: obj
        });
    },
    onBirthdayChange: function onBirthdayChange(date, dateString) {
        var echoData = this.props.echoData;

        echoData.constellation = _vm_util.commons.transConStrByDate(date._d);
    },
    render: function render() {
        var echoData = this.props.echoData;
        var title = this.state.title;


        echoData = _vm_util.commons.clone(echoData); //!!!!!!!!!!!!!important
        // filterEchoData
        var filterEchoData = function (echoData) {
            if (isUndefined(echoData)) {
                return {};
            }
            if (!isUndefined(echoData.createTime)) {
                echoData.createTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.createTime));
            }
            if (!isUndefined(echoData.updateTime)) {
                echoData.updateTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.updateTime));
            }
            if (!isUndefined(echoData.birthday)) {
                echoData.birthday = (0, _moment2.default)(timeFormatter.int2Long(echoData.birthday));
            }

            return echoData;
        }.bind(this);

        echoData = filterEchoData(echoData);

        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "id",
                id: "id",
                config: {
                    initialValue: echoData.id
                },
                input: _react2.default.createElement(_antd.Input, { name: "id",
                    autoComplete: "off",
                    disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "名称",
                id: "name",
                config: {
                    initialValue: echoData.name,
                    rules: [{ required: true, message: '请输入电影人名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u7535\u5F71\u4EBA\u540D\u79F0", name: "name" })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    initialValue: echoData.status,
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _react2.default.createElement(
                        Option,
                        { value: "1" },
                        "\u6B63\u5E38"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "2" },
                        "\u51BB\u7ED3"
                    )
                )
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "别名",
                id: "alias",
                config: {
                    initialValue: echoData.alias,
                    rules: [{ required: true, whitespace: true, message: '请输入别名!' }]
                },
                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    placeholder: "\u522B\u540D" })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "生日",
                id: "birthday",
                config: {
                    initialValue: echoData.birthday,
                    rules: [{ type: 'object', required: true, whitespace: true, message: '请输入生日!' }]
                },

                input: _react2.default.createElement(_antd.DatePicker, { onChange: this.onBirthdayChange,
                    autoComplete: "off",
                    placeholder: "\u8BF7\u8F93\u5165\u751F\u65E5" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "性别",
                id: "sex",
                config: {
                    initialValue: echoData.sex,
                    rules: [{ required: true, message: '请输入性别!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u6027\u522B" },
                    _vm_util.commons.getSexOptions()
                )
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "职业",
                id: "profession",
                config: {
                    initialValue: echoData.profession,
                    rules: [{ required: true, whitespace: true, message: '请输入职业!' }]
                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u804C\u4E1A" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "血型",
                id: "bloodType",
                config: {
                    initialValue: echoData.bloodType,
                    rules: [{ required: true, whitespace: true, message: '请输入血型!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u8BF7\u8F93\u5165\u8840\u578B" },
                    _vm_util.commons.getBloodTypeOptions()
                )
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "国家",
                id: "country",
                config: {
                    initialValue: echoData.country,
                    rules: [{ required: true, whitespace: true, message: '请输入国家!' }]
                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u56FD\u5BB6" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "创建时间",
                id: "ignore_createTime",
                config: {
                    initialValue: echoData.createTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "最后更新时间",
                id: "ignore_updateTime",
                config: {
                    initialValue: echoData.updateTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }]

        }, {
            cols: [{
                col: { span: 24 },
                label: "简介",
                id: "description",
                config: {
                    initialValue: echoData.description,
                    rules: [{ required: true, message: '请输入简介!' }]
                },

                input: _react2.default.createElement(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB", autosize: { minRows: 4, maxRows: 8 } })
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            title: title,
            formRows: formRows,
            formLayout: formLayout,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "filmmaker_edit_dialog" });
    }
});

exports.default = FilmmakerEditDialog; //将App组件导出

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(28);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var FilmmakerAddDialog = _react2.default.createClass({
    displayName: "FilmmakerAddDialog",
    getInitialState: function getInitialState() {
        return {
            title: "添加电影人",
            addFilmmakerUrl: "/filmmaker/info",
            tipOfAddingFilmmaker: "正在添加电影人"
        };
    },
    showDialog: function showDialog() {
        this.getFilmmakerAddDialog().showDialog();
    },
    getFilmmakerAddDialog: function getFilmmakerAddDialog() {
        return this.refs.filmmaker_add_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var tipOfAddingFilmmaker = this.state.tipOfAddingFilmmaker;

        var hideMessage = _antd.message.loading(tipOfAddingFilmmaker, 0);
        var addFilmmakerUrl = this.state.addFilmmakerUrl;

        var filterValues = function filterValues(values) {
            values.birthday = timeFormatter.long2Int(values.birthday._d.getTime());
            return values;
        };
        values = filterValues(values);
        _vm_util.ajax.post({
            url: addFilmmakerUrl,
            data: values,
            success: function (result) {
                var onAddSuccess = this.props.onAddSuccess;


                _antd.message.success(result.msg);
                this.getFilmmakerAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.filmmaker) : undefined;

                //clear form
                this.getFilmmakerAddDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getFilmmakerAddDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {

        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var title = this.state.title;


        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "名称",
                id: "name",
                config: {
                    rules: [{ required: true, message: '请输入电影人名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u7535\u5F71\u4EBA\u540D\u79F0", name: "name" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "别名",
                id: "alias",
                config: {
                    rules: [{ required: true, whitespace: true, message: '请输入电影人别名!' }]
                },
                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    placeholder: "\u8BF7\u8F93\u5165\u7535\u5F71\u4EBA\u522B\u540D" })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _react2.default.createElement(
                        Option,
                        { value: "1" },
                        "\u6B63\u5E38"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "2" },
                        "\u51BB\u7ED3"
                    )
                )
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "性别",
                id: "sex",
                config: {
                    rules: [{ required: true, message: '请输入性别!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u6027\u522B" },
                    _vm_util.commons.getSexOptions()
                )
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "生日",
                id: "birthday",
                config: {
                    rules: [{ type: 'object', required: true, whitespace: true, message: '请输入生日!' }]
                },

                input: _react2.default.createElement(_antd.DatePicker, { autoComplete: "off",
                    placeholder: "\u8BF7\u8F93\u5165\u751F\u65E5" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "职业",
                id: "profession",
                config: {
                    rules: [{ required: true, whitespace: true, message: '请输入职业!' }]
                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u804C\u4E1A" })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "血型",
                id: "bloodType",
                config: {
                    rules: [{ required: true, whitespace: true, message: '请输入血型!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u8BF7\u8F93\u5165\u8840\u578B" },
                    _vm_util.commons.getBloodTypeOptions()
                )
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "国家",
                id: "country",
                config: {
                    rules: [{ required: true, whitespace: true, message: '请输入国家!' }]
                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u56FD\u5BB6" })
            }]

        }, {
            cols: [{
                col: { span: 24 },
                label: "简介",
                id: "description",
                config: {
                    rules: [{ required: true, message: '请输入简介!' }]
                },

                input: _react2.default.createElement(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB", autosize: { minRows: 4, maxRows: 8 } })
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            title: title,
            formRows: formRows,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "filmmaker_add_dialog" });
    }
});

exports.default = FilmmakerAddDialog; //将App组件导出

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(18);

__webpack_require__(2);

var _tagGroup_table = __webpack_require__(112);

var _tagGroup_table2 = _interopRequireDefault(_tagGroup_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var TagGroupPage = _react2.default.createClass({
    displayName: "TagGroupPage",

    getInitialState: function getInitialState() {

        return {};
    },

    render: function render() {

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_tagGroup_table2.default, null)
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(TagGroupPage); //将App组件导出

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(113);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _tag_table = __webpack_require__(114);

var _tag_table2 = _interopRequireDefault(_tag_table);

var _tagGroup_edit_dialog = __webpack_require__(116);

var _tagGroup_edit_dialog2 = _interopRequireDefault(_tagGroup_edit_dialog);

var _tagGroup_add_dialog = __webpack_require__(117);

var _tagGroup_add_dialog2 = _interopRequireDefault(_tagGroup_add_dialog);

var _tag_add_dialog = __webpack_require__(118);

var _tag_add_dialog2 = _interopRequireDefault(_tag_add_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var TagGroupTable = _react2.default.createClass({
    displayName: "TagGroupTable",

    getInitialState: function getInitialState() {
        return {

            editDialog: {
                echoData: {}
            },
            addDialog: {},
            tagGroupTable: {
                title: "标签分组列表",
                dataSourceUrl: "/tagGroup/info/list",
                delTagGroupUrl: "/tagGroup/info",
                scroll: { x: true, y: 450 },
                editable: false,
                haveSearchTagGroupname: false,
                tagGroupnameDropdownVisible: false,
                bordered: false,
                tableLoading: false,
                batchDeleteBtnLoading: false,
                refreshBtnLoading: false,
                expandRowByClick: false,
                selectedRowKeys: [],
                data: [], //displayData
                originalData: [],
                page: {
                    start: 0,
                    size: 5,
                    orderBy: "",
                    orderType: "",
                    total: 0
                },
                query: {
                    name: ""
                },
                columns: [],
                deletingTip: "正在删除"
            }
        };
    },
    onSearchTagGroupname: function onSearchTagGroupname(newTagGroupnameQuery) {
        this.updateNameOfQuery(newTagGroupnameQuery);
        if (!isEmptyString(this.state.tagGroupTable.query.name)) {
            this.updateTagGroupTableHaveSearchTagGroupname(true);
        } else {

            this.updateTagGroupTableHaveSearchTagGroupname(false);
        }
        this.loadTagGroupTableData();
    },
    updateTagGroupTableHaveSearchTagGroupname: function updateTagGroupTableHaveSearchTagGroupname(haveSearchTagGroupname) {
        var state = this.state;
        state.tagGroupTable.haveSearchTagGroupname = haveSearchTagGroupname;
        this.setState(state);
    },
    updateTagGroupTableTagGroupnameDropdownVisible: function updateTagGroupTableTagGroupnameDropdownVisible(tagGroupnameDropdownVisible) {
        var state = this.state;
        state.tagGroupTable.tagGroupnameDropdownVisible = tagGroupnameDropdownVisible;
        this.setState(state);
    },
    updateTagGroupTableSelectedRowKeys: function updateTagGroupTableSelectedRowKeys(selectedRowKeys) {
        var state = this.state;
        state.tagGroupTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },
    removeTagGroupTableSelectedRowKeys: function removeTagGroupTableSelectedRowKeys(removeSelectedRowKeys) {
        var selectedRowKeys = this.state.tagGroupTable.selectedRowKeys;
        selectedRowKeys = selectedRowKeys.removeByList(removeSelectedRowKeys);
        this.updateTagGroupTableSelectedRowKeys(selectedRowKeys);
    },
    updateNameOfQuery: function updateNameOfQuery(name) {
        var state = this.state;
        state.tagGroupTable.query.name = name;
        this.setState(state);
    },
    updateTagGroupTableData: function updateTagGroupTableData(data) {
        var state = this.state;
        state.tagGroupTable.data = data;
        this.setState(state);
    },
    updateTagGroupTableBatchDeleteLoading: function updateTagGroupTableBatchDeleteLoading(loading) {
        var state = this.state;
        state.tagGroupTable.batchDeleteBtnLoading = loading;
        this.setState(state);
    },
    updateTagGroupTableRefreshBtnLoading: function updateTagGroupTableRefreshBtnLoading(loading) {
        var state = this.state;
        state.tagGroupTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateTagGroupTablePage: function updateTagGroupTablePage(page) {
        var state = this.state;
        state.tagGroupTable.page = page;
        this.setState(state);
    },
    updateTagGroupTableQuery: function updateTagGroupTableQuery(query) {
        var state = this.state;
        state.tagGroupTable.query = query;
        this.setState(state);
    },
    updateTagGroupTableLoading: function updateTagGroupTableLoading(flag) {
        var state = this.state;
        state.tagGroupTable.tableLoading = flag;
        this.setState(state);
    },
    updateTagGroupTableColumns: function updateTagGroupTableColumns(columns) {

        var state = this.state;
        state.tagGroupTable.columns = columns;
        this.setState(state);
    },
    updateTagGroupTableOriginalData: function updateTagGroupTableOriginalData(originalData) {
        var state = this.state;
        state.tagGroupTable.originalData = originalData;
        this.setState(state);
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        this.updateTagGroupTableColumns([{
            title: 'id',
            width: 100,
            dataIndex: 'id',
            sorter: true
        }, {
            title: '分组名称',
            width: 90,
            dataIndex: 'name'

        }, {
            title: '状态',
            width: 80,
            dataIndex: 'status',
            render: function render(text) {
                return _vm_util.commons.getStatusStrByIndex({ index: text });
            },
            sorter: true
        }, {
            title: '更新时间',
            width: 100,
            dataIndex: 'update_time',
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '创建时间',
            width: 100,
            dataIndex: 'create_time',
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 100,
            render: function render(text, record) {
                var menu = _react2.default.createElement(
                    _antd.Menu,
                    null,
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { onClick: function onClick() {
                                    return _this.showTagAddDialog(record);
                                }, href: "javascript:void(0);" },
                            "\u6DFB\u52A0\u6807\u7B7E"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { onClick: function onClick() {
                                    return _this.showEditDialog(record);
                                }, href: "javascript:void(0);" },
                            "\u7F16\u8F91"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            _antd.Popconfirm,
                            { title: "\u786E\u8BA4\u5220\u9664 ? ",
                                okText: "\u5220\u9664",
                                cancelText: "\u53D6\u6D88",
                                onConfirm: function onConfirm() {
                                    return _this.deleteRecord([record.id]);
                                } },
                            _react2.default.createElement(
                                "a",
                                { href: "javascript:void(0)" },
                                "\u5220\u9664"
                            )
                        )
                    )
                );
                return _react2.default.createElement(
                    "span",
                    { className: "table-operation" },
                    _react2.default.createElement(
                        _antd.Dropdown,
                        { overlay: menu },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0);" },
                            "\u64CD\u4F5C ",
                            _react2.default.createElement(_antd.Icon, { type: "down" })
                        )
                    )
                );
            },
            sorter: true
        }]);
        this.loadTagGroupTableData();
    },
    uploadTagGroupSrc: function uploadTagGroupSrc(record) {
        c("uploadTagGroupSrc");
    },
    handleTableChange: function handleTableChange(pagination, filters, sorter) {

        var page = this.state.tagGroupTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateTagGroupTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadTagGroupTableData();
    },
    tagGroupTableDataFiledsConverter: function tagGroupTableDataFiledsConverter(originalData) {
        var data = [];
        $.each(originalData, function (i, item) {

            data.push({
                key: item.id,
                id: item.id,
                name: item.name,
                create_time: item.createTime,
                update_time: item.updateTime,
                status: item.status
            });
        }.bind(this));
        return data;
    },
    loadTagGroupTableData: function loadTagGroupTableData() {
        this.updateTagGroupTableLoading(true);
        this.updateTagGroupTableRefreshBtnLoading(true);
        var _state$tagGroupTable = this.state.tagGroupTable,
            page = _state$tagGroupTable.page,
            query = _state$tagGroupTable.query;
        //filter

        var orderType = page.orderType;
        if (orderType == "descend") {
            orderType = "desc";
        }
        if (orderType == "ascend") {
            orderType = "asc";
        }
        page.orderType = orderType;

        //ajax
        _vm_util.ajax.get({
            url: this.state.tagGroupTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.tagGroupTableDataFiledsConverter(originalData);
                //save data

                this.updateTagGroupTableOriginalData(originalData);

                this.updateTagGroupTableData(data);

                var page = this.state.tagGroupTable.page;
                this.updateTagGroupTablePage({
                    start: page.start,
                    size: page.size,
                    orderBy: page.orderBy,
                    orderType: page.orderType,
                    total: result.data.total
                });
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function () {}.bind(this),
            complete: function () {
                this.updateTagGroupTableLoading(false);
                this.updateTagGroupTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    updateEchoData: function updateEchoData(echoData) {
        var state = this.state;
        state.editDialog.echoData = echoData;
        this.setState(state);
    },
    showEditDialog: function showEditDialog(record) {
        record = _vm_util.commons.getObjByKey(this.state.tagGroupTable.originalData, "id", record.id);
        // c(record);
        this.updateEchoData(record);

        this.getTagGroupEditDialog().showDialog(record);
    },
    onEditSuccess: function onEditSuccess(newRecord) {
        var newOriginalData = _vm_util.commons.updateObjByKey(this.state.tagGroupTable.originalData, "id", newRecord.id, newRecord);

        this.updateTagGroupTableOriginalData(newOriginalData);

        var newData = this.tagGroupTableDataFiledsConverter(newOriginalData);

        this.updateTagGroupTableData(newData);
    },
    onAddSuccess: function onAddSuccess() {

        this.loadTagGroupTableData();
    },
    deleteRecord: function deleteRecord(ids) {

        var hideLoading = _antd.message.loading(deletingTip);
        this.updateTagGroupTableBatchDeleteLoading(true);

        var _state$tagGroupTable2 = this.state.tagGroupTable,
            deletingTip = _state$tagGroupTable2.deletingTip,
            delTagGroupUrl = _state$tagGroupTable2.delTagGroupUrl;

        _vm_util.ajax.delete({
            url: delTagGroupUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                this.updateTagGroupTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                _antd.message.success(result.msg);

                this.removeTagGroupTableSelectedRowKeys(ids);

                this.loadTagGroupTableData();
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function error() {}
        });
    },
    showAddDialog: function showAddDialog() {
        c("showAddDialog");
        this.getTagGroupAddDialog().showDialog();
    },
    showTagAddDialog: function showTagAddDialog(record) {
        this.getTagAddDialog().showDialog(record);
    },
    onTagAddSuccess: function onTagAddSuccess(record) {
        window.EventsDispatcher.onTagAddSuccess(record);
    },
    getTagAddDialog: function getTagAddDialog() {
        return this.refs.tag_add_dialog;
    },
    getTagGroupAddDialog: function getTagGroupAddDialog() {
        return this.refs.tagGroup_add_dialog;
    },
    getTagGroupEditDialog: function getTagGroupEditDialog() {
        return this.refs.tagGroup_edit_dialog;
    },
    expandedRowRender: function expandedRowRender(record) {

        return _react2.default.createElement(_tag_table2.default, {
            tagGroupId: record.id
        });
    },


    render: function render() {
        var _this2 = this;

        var _state$tagGroupTable3 = this.state.tagGroupTable,
            _title = _state$tagGroupTable3.title,
            scroll = _state$tagGroupTable3.scroll,
            expandRowByClick = _state$tagGroupTable3.expandRowByClick,
            selectedRowKeys = _state$tagGroupTable3.selectedRowKeys,
            columns = _state$tagGroupTable3.columns,
            data = _state$tagGroupTable3.data,
            page = _state$tagGroupTable3.page,
            tableLoading = _state$tagGroupTable3.tableLoading,
            batchDeleteBtnLoading = _state$tagGroupTable3.batchDeleteBtnLoading,
            refreshBtnLoading = _state$tagGroupTable3.refreshBtnLoading,
            bordered = _state$tagGroupTable3.bordered;
        var echoData = this.state.editDialog.echoData;


        var rowSelection = {
            onChange: function onChange(selectedRowKeys, selectedRows) {
                // c(selectedRows);
                // var selectedRowKeys = this.state.tagGroupTable.selectedRowKeys;
                // selectedRowKeys.push(selectedRows.key);
                // this.updateTagGroupTableSelectedRowKeys(selectedRowKeys);
                // c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

                _this2.updateTagGroupTableSelectedRowKeys(selectedRowKeys);
            },
            onSelect: function onSelect(record, selected, selectedRows) {},
            onSelectAll: function onSelectAll(selected, selectedRows, changeRows) {}
        };

        var hasSelected = selectedRowKeys.length > 0;

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "div",
                { style: { marginBottom: 16 } },
                _react2.default.createElement(
                    _antd.Button,
                    {
                        loading: refreshBtnLoading,
                        onClick: function onClick() {
                            _this2.loadTagGroupTableData();
                            window.EventsDispatcher.loadTagTableData();
                        }
                    },
                    "\u5237\u65B0"
                ),
                _react2.default.createElement(
                    _antd.Button,
                    {
                        style: { marginLeft: 8 },
                        type: "primary",
                        onClick: this.showAddDialog
                    },
                    "\u6DFB\u52A0"
                ),
                _react2.default.createElement(
                    _antd.Popconfirm,
                    { title: "\u786E\u8BA4\u5220\u9664 ? ",
                        okText: "\u5220\u9664",
                        cancelText: "\u53D6\u6D88",
                        onConfirm: function onConfirm() {
                            return _this2.deleteRecord(selectedRowKeys);
                        } },
                    _react2.default.createElement(
                        _antd.Button,
                        {
                            style: { marginLeft: 8 },
                            type: "danger",
                            disabled: !hasSelected,
                            loading: batchDeleteBtnLoading
                        },
                        "\u6279\u91CF\u5220\u9664"
                    )
                ),
                _react2.default.createElement(
                    "span",
                    { style: { marginLeft: 8 } },
                    hasSelected ? "\u9009\u62E9\u4E86 " + selectedRowKeys.length + " \u4E2A\u9009\u9879" : ''
                )
            ),
            _react2.default.createElement(_antd.Table, {
                className: "components-table-demo-nested",
                scroll: scroll,
                expandedRowRender: this.expandedRowRender,
                expandRowByClick: expandRowByClick,
                locale: { emptyText: "暂无相关标签分组数据" },
                columns: columns,
                rowSelection: rowSelection,
                dataSource: data,
                pagination: {
                    total: page.total,
                    showTotal: function showTotal(total, range) {
                        return "\u7B2C " + range[0] + "-" + range[1] + " \u6761\u8BB0\u5F55 , \u5171 " + total + " \u6761\u8BB0\u5F55";
                    },
                    pageSize: page.size,
                    defaultCurrent: 1
                },
                loading: tableLoading,
                onChange: this.handleTableChange,
                bordered: bordered,
                title: function title() {
                    return _title;
                } }),
            _react2.default.createElement(_tagGroup_edit_dialog2.default, { ref: "tagGroup_edit_dialog",
                echoData: echoData,
                onEditSuccess: this.onEditSuccess }),
            _react2.default.createElement(_tagGroup_add_dialog2.default, { ref: "tagGroup_add_dialog",
                onAddSuccess: this.onAddSuccess }),
            _react2.default.createElement(_tag_add_dialog2.default, { ref: "tag_add_dialog",
                onAddSuccess: this.onTagAddSuccess })
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(TagGroupTable); //将App组件导出

/***/ }),
/* 113 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(39);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _tag_edit_dialog = __webpack_require__(115);

var _tag_edit_dialog2 = _interopRequireDefault(_tag_edit_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var TagTable = _react2.default.createClass({
    displayName: "TagTable",

    getInitialState: function getInitialState() {

        return {

            tagTable: {
                dataSourceUrl: "/tag/info/",
                bordered: false,
                tableLoading: false,
                columns: [],
                data: [],
                originalData: [],
                echoData: {},
                deletingTip: "正在删除",
                delTagUrl: "/tag/info"

            }
        };
    },

    componentDidMount: function componentDidMount() {

        this.loadData();

        this.registEvents();
    },
    registEvents: function registEvents() {
        var _this = this;

        var tagGroupId = this.props.tagGroupId;

        window.eventEmitEmitter.on('onTagAddSuccess', function (record) {

            if (record.tagGroupId == tagGroupId) {
                _this.loadData();
            }
        });
        window.eventEmitEmitter.on('loadTagTableData', function () {

            _this.loadData();
        });
    },
    updateTableLoading: function updateTableLoading(loading) {
        var state = this.state;
        state.tagTable.tableLoading = loading;
        this.setState(state);
    },
    updateTableColumns: function updateTableColumns(columns) {
        var state = this.state;
        state.tagTable.columns = columns;
        this.setState(state);
    },
    updateTableData: function updateTableData(data) {
        var state = this.state;
        state.tagTable.data = data;
        this.setState(state);
    },
    updateOriginalData: function updateOriginalData(originalData) {

        var state = this.state;
        state.tagTable.originalData = originalData;
        this.setState(state);
    },
    updateTableEchoData: function updateTableEchoData(echoData) {
        var state = this.state;
        state.tagTable.echoData = echoData;
        this.setState(state);
    },
    dataConverter: function dataConverter(dataArr) {
        var data = [];
        for (var i = 0; i < dataArr.length; ++i) {
            var d = dataArr[i];
            data.push({
                key: i,
                id: d.id,
                name: d.name,
                status: d.status,
                create_time: d.createTime,
                update_time: d.updateTime
            });
        }
        return data;
    },
    showEditDialog: function showEditDialog(record) {

        record = _vm_util.commons.getObjByKey(this.state.tagTable.originalData, "id", record.id);

        this.updateTableEchoData(record);

        this.getEditDialog().showDialog(record);
    },
    getEditDialog: function getEditDialog() {
        return this.refs.edit_dialog;
    },
    deleteRecord: function deleteRecord(ids) {

        var hideLoading = _antd.message.loading(deletingTip);
        // this.updateTagTableBatchDeleteLoading(true);

        var _state$tagTable = this.state.tagTable,
            deletingTip = _state$tagTable.deletingTip,
            delTagUrl = _state$tagTable.delTagUrl;

        _vm_util.ajax.delete({
            url: delTagUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                // this.updateTagTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                _antd.message.success(result.msg);

                // this.removeTagTableSelectedRowKeys(ids);

                // this.loadTagTableData();

                this.loadData();
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function error() {}
        });
    },
    loadData: function loadData() {
        var _this2 = this;

        this.updateTableLoading(true);
        var dataSourceUrl = this.state.tagTable.dataSourceUrl;
        var tagGroupId = this.props.tagGroupId;

        _vm_util.ajax.get({
            url: dataSourceUrl + tagGroupId,
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.dataConverter(originalData);
                //save data

                this.updateOriginalData(originalData);

                this.updateTableData(data);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function () {}.bind(this),
            complete: function () {
                this.updateTableLoading(false);
            }.bind(this)
        });

        var columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            width: 100
        }, {
            title: '标签名称',
            dataIndex: 'name',
            key: 'name',
            width: 100
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: function render(text) {
                return _vm_util.commons.getStatusStrByIndex({ index: text });
            }
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            width: 100,
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            }
        }, {
            title: '最后更新时间',
            dataIndex: 'update_time',
            key: 'update_time',
            width: 100,
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 100,
            render: function render(text, record) {
                var menu = _react2.default.createElement(
                    _antd.Menu,
                    null,
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { onClick: function onClick() {
                                    return _this2.showEditDialog(record);
                                }, href: "javascript:void(0);" },
                            "\u7F16\u8F91"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            _antd.Popconfirm,
                            { title: "\u786E\u8BA4\u5220\u9664 ? ",
                                okText: "\u5220\u9664",
                                cancelText: "\u53D6\u6D88",
                                onConfirm: function onConfirm() {
                                    return _this2.deleteRecord([record.id]);
                                } },
                            _react2.default.createElement(
                                "a",
                                { href: "javascript:void(0)" },
                                "\u5220\u9664"
                            )
                        )
                    )
                );
                return _react2.default.createElement(
                    "span",
                    { className: "table-operation" },
                    _react2.default.createElement(
                        _antd.Dropdown,
                        { overlay: menu },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0);" },
                            "\u64CD\u4F5C ",
                            _react2.default.createElement(_antd.Icon, { type: "down" })
                        )
                    )
                );
            }
        }];
        this.updateTableColumns(columns);
    },
    onEditSuccess: function onEditSuccess(record) {
        this.loadData();
    },

    render: function render() {
        var _state$tagTable2 = this.state.tagTable,
            bordered = _state$tagTable2.bordered,
            columns = _state$tagTable2.columns,
            data = _state$tagTable2.data,
            tableLoading = _state$tagTable2.tableLoading,
            echoData = _state$tagTable2.echoData;


        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_antd.Table, {
                className: "components-table-demo-nested",
                bordered: bordered,
                loading: tableLoading,
                columns: columns,
                dataSource: data,
                pagination: false
            }),
            _react2.default.createElement(_tag_edit_dialog2.default, {
                ref: "edit_dialog",
                echoData: echoData,
                onEditSuccess: this.onEditSuccess })
        );
    }
});

exports.default = TagTable; //将App组件导出

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;

var TagEditDialog = _react2.default.createClass({
    displayName: "TagEditDialog",
    getInitialState: function getInitialState() {
        return {
            width: 400,
            title: "修改标签信息",
            editUrl: "/tag/info",
            tipOfEditing: '正在保存标签修改',
            echoData: {}
        };
    },
    showDialog: function showDialog(record) {

        this.getTagEditDialog().showDialog();
    },
    getTagEditDialog: function getTagEditDialog() {
        return this.refs.tag_edit_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var _state = this.state,
            editUrl = _state.editUrl,
            tipOfEditing = _state.tipOfEditing;

        var hideMessage = _antd.message.loading(tipOfEditing, 0);
        var filterValues = function filterValues(values) {
            return values;
        };
        values = filterValues(values);
        // c(values);
        _vm_util.ajax.put({
            url: editUrl,
            data: values,
            success: function (result) {
                var onEditSuccess = this.props.onEditSuccess;


                _antd.message.success(result.msg);
                this.getTagEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.tag) : undefined;

                //clear form
                this.getTagEditDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getTagEditDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {
        this.getTagEditDialog().clearForm(); //!!防止触发reuqired后在关闭的bug
        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var echoData = this.props.echoData;
        var _state2 = this.state,
            title = _state2.title,
            width = _state2.width;


        echoData = _vm_util.commons.clone(echoData); //!!!!!!!!!!!!!important
        // filterEchoData
        var filterEchoData = function filterEchoData(echoData) {
            if (isUndefined(echoData)) {
                return {};
            }
            if (!isUndefined(echoData.createTime)) {
                echoData.createTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.createTime));
            }
            if (!isUndefined(echoData.updateTime)) {
                echoData.updateTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.updateTime));
            }
            return echoData;
        };
        echoData = filterEchoData(echoData);

        c(echoData);

        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "id",
                id: "id",
                config: {
                    initialValue: echoData.id
                },
                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "名称",
                id: "name",
                config: {
                    initialValue: echoData.name,
                    rules: [{ required: true, message: '请输入标签名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u7B7E\u540D\u79F0", name: "name" })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    initialValue: echoData.status,
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _vm_util.commons.getStatusOptions()
                )
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: {
                    span: 11
                },

                label: "创建时间",
                id: "ignore_createTime",
                config: {
                    initialValue: echoData.createTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "最后更新时间",
                id: "ignore_updateTime",
                config: {
                    initialValue: echoData.updateTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            width: width,
            title: title,
            formRows: formRows,
            formLayout: formLayout,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "tag_edit_dialog" });
    }
});

exports.default = TagEditDialog; //将App组件导出

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(18);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;

var TagGroupEditDialog = _react2.default.createClass({
    displayName: "TagGroupEditDialog",
    getInitialState: function getInitialState() {
        return {
            width: 400,
            title: "修改标签组信息",
            editUrl: "/tagGroup/info",
            tipOfEditing: '正在保存标签组修改'
        };
    },
    showDialog: function showDialog(record) {

        this.getTagGroupEditDialog().showDialog();
    },
    getTagGroupEditDialog: function getTagGroupEditDialog() {
        return this.refs.movie_edit_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var _state = this.state,
            editUrl = _state.editUrl,
            tipOfEditing = _state.tipOfEditing;

        var hideMessage = _antd.message.loading(tipOfEditing, 0);
        var filterValues = function filterValues(values) {
            return values;
        };
        values = filterValues(values);
        // c(values);
        _vm_util.ajax.put({
            url: editUrl,
            data: values,
            success: function (result) {
                var onEditSuccess = this.props.onEditSuccess;


                _antd.message.success(result.msg);
                this.getTagGroupEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.tagGroup) : undefined;

                //clear form
                this.getTagGroupEditDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getTagGroupEditDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {
        c("handleCancel");
        this.getTagGroupEditDialog().clearForm();
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var echoData = this.props.echoData;
        var _state2 = this.state,
            title = _state2.title,
            width = _state2.width;


        echoData = _vm_util.commons.clone(echoData); //!!!!!!!!!!!!!important
        // filterEchoData
        var filterEchoData = function filterEchoData(echoData) {
            if (isUndefined(echoData)) {
                return {};
            }
            if (!isUndefined(echoData.createTime)) {
                echoData.createTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.createTime));
            }
            if (!isUndefined(echoData.updateTime)) {
                echoData.updateTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.updateTime));
            }
            return echoData;
        };
        echoData = filterEchoData(echoData);

        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "id",
                id: "id",
                config: {
                    initialValue: echoData.id
                },
                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "名称",
                id: "name",
                config: {
                    initialValue: echoData.name,
                    rules: [{ required: true, message: '请输入标签分组名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u7B7E\u5206\u7EC4\u540D\u79F0", name: "name" })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    initialValue: echoData.status,
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _vm_util.commons.getStatusOptions()
                )
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: {
                    span: 11
                },

                label: "创建时间",
                id: "ignore_createTime",
                config: {
                    initialValue: echoData.createTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "最后更新时间",
                id: "ignore_updateTime",
                config: {
                    initialValue: echoData.updateTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            width: width,
            title: title,
            formRows: formRows,
            formLayout: formLayout,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "movie_edit_dialog" });
    }
});

exports.default = TagGroupEditDialog; //将App组件导出

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var TagGroupAddDialog = _react2.default.createClass({
    displayName: "TagGroupAddDialog",
    getInitialState: function getInitialState() {
        return {
            title: "添加标签分组",
            addTagGroupUrl: "/tagGroup/info",
            tipOfAddingTagGroup: "正在标签分组"
        };
    },
    showDialog: function showDialog() {
        this.getTagGroupAddDialog().showDialog();
    },
    getTagGroupAddDialog: function getTagGroupAddDialog() {
        return this.refs.tagGroup_add_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var tipOfAddingTagGroup = this.state.tipOfAddingTagGroup;

        var hideMessage = _antd.message.loading(tipOfAddingTagGroup, 0);
        var addTagGroupUrl = this.state.addTagGroupUrl;

        var filterValues = function filterValues(values) {
            return values;
        };
        values = filterValues(values);
        _vm_util.ajax.post({
            url: addTagGroupUrl,
            data: values,
            success: function (result) {
                var onAddSuccess = this.props.onAddSuccess;


                _antd.message.success(result.msg);
                this.getTagGroupAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.tagGroup) : undefined;

                //clear form
                this.getTagGroupAddDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getTagGroupAddDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {

        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var title = this.state.title;


        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "名称",
                id: "name",
                config: {
                    rules: [{ required: true, message: '请输入标签分组名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u7B7E\u5206\u7EC4\u540D\u79F0", name: "name" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _vm_util.commons.getStatusOptions()
                )
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            title: title,
            formRows: formRows,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "tagGroup_add_dialog" });
    }
});

exports.default = TagGroupAddDialog; //将App组件导出

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var TagAddDialog = _react2.default.createClass({
    displayName: "TagAddDialog",
    getInitialState: function getInitialState() {
        return {
            title: "添加标签",
            addTagUrl: "/tag/info",
            tipOfAddingTag: "正在标签",
            echoData: {}
        };
    },
    showDialog: function showDialog(record) {

        this.updateEchoData(record);

        this.getTagAddDialog().showDialog();
    },
    updateEchoData: function updateEchoData(echoData) {
        this.setState({ echoData: echoData });
    },
    getTagAddDialog: function getTagAddDialog() {
        return this.refs.tag_add_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var tipOfAddingTag = this.state.tipOfAddingTag;

        var hideMessage = _antd.message.loading(tipOfAddingTag, 0);
        var addTagUrl = this.state.addTagUrl;

        var filterValues = function filterValues(values) {
            return values;
        };
        values = filterValues(values);
        _vm_util.ajax.post({
            url: addTagUrl,
            data: values,
            success: function (result) {
                var onAddSuccess = this.props.onAddSuccess;


                _antd.message.success(result.msg);
                this.getTagAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.tag) : undefined;

                //clear form
                this.getTagAddDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getTagAddDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {
        //clear form
        this.getTagAddDialog().clearForm();
        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var _state = this.state,
            title = _state.title,
            echoData = _state.echoData;


        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "所属标签组id",
                id: "tagGroupId",
                config: {
                    initialValue: echoData.id,
                    rules: [{ required: true }]

                },
                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "所属标签组",
                id: "ignore_tagGroupName",
                config: {
                    initialValue: echoData.name,
                    rules: [{ required: true }]

                },
                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }]
        }, {

            cols: [{
                col: { span: 11 },
                label: "名称",
                id: "name",
                config: {
                    rules: [{ required: true, message: '请输入标签名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u7B7E\u540D\u79F0", name: "name" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _vm_util.commons.getStatusOptions()
                )
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            title: title,
            formRows: formRows,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "tag_add_dialog" });
    }
});

exports.default = TagAddDialog; //将App组件导出

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(40);

__webpack_require__(2);

var _admin_table = __webpack_require__(120);

var _admin_table2 = _interopRequireDefault(_admin_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var AdminPage = _react2.default.createClass({
    displayName: "AdminPage",

    getInitialState: function getInitialState() {

        return {};
    },

    render: function render() {

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_admin_table2.default, null)
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(AdminPage); //将App组件导出

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(121);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _admin_edit_dialog = __webpack_require__(122);

var _admin_edit_dialog2 = _interopRequireDefault(_admin_edit_dialog);

var _admin_add_dialog = __webpack_require__(123);

var _admin_add_dialog2 = _interopRequireDefault(_admin_add_dialog);

var _admin_login_logs_dialog = __webpack_require__(124);

var _admin_login_logs_dialog2 = _interopRequireDefault(_admin_login_logs_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var AdminTable = _react2.default.createClass({
    displayName: "AdminTable",

    getInitialState: function getInitialState() {

        return {

            adminEditDialog: {
                echoData: undefined
            },
            adminTable: {
                title: "管理员列表",
                dataSourceUrl: "/admin/info/list",
                delAdminUrl: "/admin/info",
                scroll: { x: true, y: 450 },
                editable: false,
                haveSearchAdminname: false,
                adminnameDropdownVisible: false,
                bordered: false,
                tableLoading: false,
                batchDeleteBtnLoading: false,
                refreshBtnLoading: false,
                selectedRowKeys: [],
                data: [], //displayData
                originalData: [],
                page: {
                    start: 0,
                    size: 5,
                    orderBy: "",
                    orderType: "",
                    total: 0
                },
                query: {
                    username: ""
                },
                columns: [],
                deletingTip: "正在删除"
            }
        };
    },
    showAdminLoginLogsDialog: function showAdminLoginLogsDialog(userId) {
        this.getAdminLoginLogsDialog().showDialog(userId);
    },
    getAdminLoginLogsDialog: function getAdminLoginLogsDialog() {
        return this.refs.admin_login_logs_dialog;
    },
    onSearchAdminname: function onSearchAdminname(newAdminnameQuery) {
        this.updateNameOfQuery(newAdminnameQuery);
        if (!isEmptyString(this.state.adminTable.query.username)) {
            this.updateAdminTableHaveSearchAdminname(true);
        } else {

            this.updateAdminTableHaveSearchAdminname(false);
        }
        this.loadAdminTableData();
    },
    updateAdminTableHaveSearchAdminname: function updateAdminTableHaveSearchAdminname(haveSearchAdminname) {
        var state = this.state;
        state.adminTable.haveSearchAdminname = haveSearchAdminname;
        this.setState(state);
    },
    updateAdminTableAdminnameDropdownVisible: function updateAdminTableAdminnameDropdownVisible(adminnameDropdownVisible) {
        var state = this.state;
        state.adminTable.adminnameDropdownVisible = adminnameDropdownVisible;
        this.setState(state);
    },
    updateAdminTableSelectedRowKeys: function updateAdminTableSelectedRowKeys(selectedRowKeys) {
        var state = this.state;
        state.adminTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },
    removeAdminTableSelectedRowKeys: function removeAdminTableSelectedRowKeys(removeSelectedRowKeys) {
        var selectedRowKeys = this.state.adminTable.selectedRowKeys;
        selectedRowKeys = selectedRowKeys.removeByList(removeSelectedRowKeys);
        this.updateAdminTableSelectedRowKeys(selectedRowKeys);
    },
    updateNameOfQuery: function updateNameOfQuery(name) {
        var state = this.state;
        state.adminTable.query.username = name;
        this.setState(state);
    },
    updateAdminTableData: function updateAdminTableData(data) {
        var state = this.state;
        state.adminTable.data = data;
        this.setState(state);
    },
    updateAdminTableBatchDeleteLoading: function updateAdminTableBatchDeleteLoading(loading) {
        var state = this.state;
        state.adminTable.batchDeleteBtnLoading = loading;
        this.setState(state);
    },
    updateAdminTableRefreshBtnLoading: function updateAdminTableRefreshBtnLoading(loading) {
        var state = this.state;
        state.adminTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateAdminTablePage: function updateAdminTablePage(page) {
        var state = this.state;
        state.adminTable.page = page;
        this.setState(state);
    },
    updateAdminTableQuery: function updateAdminTableQuery(query) {
        var state = this.state;
        state.adminTable.query = query;
        this.setState(state);
    },
    updateAdminTableLoading: function updateAdminTableLoading(flag) {
        var state = this.state;
        state.adminTable.tableLoading = flag;
        this.setState(state);
    },
    updateAdminTableColumns: function updateAdminTableColumns(columns) {

        var state = this.state;
        state.adminTable.columns = columns;
        this.setState(state);
    },
    updateAdminTableOriginalData: function updateAdminTableOriginalData(originalData) {
        var state = this.state;
        state.adminTable.originalData = originalData;
        this.setState(state);
    },
    updateAdminEditDialogEchoData: function updateAdminEditDialogEchoData(echoData) {
        var state = this.state;
        state.adminEditDialog.echoData = echoData;
        this.setState(state);
    },
    showAdminImgUploaderDialog: function showAdminImgUploaderDialog(record) {
        this.getAdminImgUploaderDialog().showDialog();
        this.getAdminImgUploaderDialog().previewImg(_vm_util.commons.generateImgUrl({
            imgUrl: record.imgUrl,
            width: 300
        }));
        this.getAdminImgUploaderDialog().updateExtraInfo(record);
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        this.updateAdminTableColumns([{
            title: 'id',
            width: 80,
            dataIndex: 'id',
            sorter: true
        }, {
            title: '名称',
            width: 120,
            dataIndex: 'username',
            render: function render(text, record) {
                return _vm_util.commons.highLight(text, _this.state.adminTable.query.username);
            },
            sorter: true,
            filterDropdown: _react2.default.createElement(
                "div",
                { className: "custom-filter-dropdown" },
                _react2.default.createElement(Search, {
                    placeholder: "\u641C\u7D22\u7BA1\u7406\u5458\u540D\u79F0",
                    onSearch: this.onSearchAdminname,
                    style: { width: 200 }
                })
            ),
            filterIcon: _react2.default.createElement(_antd.Icon, { type: "search",
                style: { color: this.state.adminTable.haveSearchAdminname ? '#108ee9' : '#aaa' } })
            // filterDropdownVisible: this.state.adminTable.adminnameDropdownVisible,

        }, {
            title: '内置对象',
            width: 100,
            dataIndex: 'immutable',
            render: function render(text) {
                return _vm_util.commons.getImmutableStrByIndex({ index: text });
            }

        }, {
            title: '密码',
            width: 120,
            dataIndex: 'password'

        }, {
            title: '状态',
            width: 80,
            dataIndex: 'status',
            render: function render(text) {
                return _vm_util.commons.getStatusStrByIndex({ index: text });
            },
            sorter: true
        }, {
            title: '更新时间',
            width: 80,
            dataIndex: 'update_time',
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '创建时间',
            width: 80,
            dataIndex: 'create_time',
            render: function render(text) {

                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 80,
            render: function render(text, record) {

                var isImmutable = record.immutable == 1;
                var disabledStyle = isImmutable ? { textDecoration: "line-through", color: "red" } : {};
                var menu = _react2.default.createElement(
                    _antd.Menu,
                    null,
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { onClick: function onClick() {
                                    return _this.showAdminLoginLogsDialog(record.id);
                                }, href: "javascript:void(0);" },
                            "\u67E5\u770B\u767B\u5F55\u65E5\u5FD7"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { disabled: isImmutable, style: disabledStyle,
                                onClick: function onClick() {
                                    return _this.showEditDialog(record);
                                },
                                href: "javascript:void(0);" },
                            "\u7F16\u8F91"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            _antd.Popconfirm,
                            { title: "\u786E\u8BA4\u5220\u9664 ? ",
                                okText: "\u5220\u9664",
                                cancelText: "\u53D6\u6D88",
                                onConfirm: function onConfirm() {
                                    return _this.deleteRecord([record.id]);
                                } },
                            _react2.default.createElement(
                                "a",
                                { disabled: isImmutable, style: disabledStyle, href: "javascript:void(0)" },
                                "\u5220\u9664"
                            )
                        )
                    )
                );
                // c(record.immutable);
                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        _antd.Dropdown,
                        { overlay: menu },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0);" },
                            "\u64CD\u4F5C ",
                            _react2.default.createElement(_antd.Icon, { type: "down" })
                        )
                    )
                );
            },
            sorter: true
        }]);
        this.loadAdminTableData();
    },
    uploadAdminSrc: function uploadAdminSrc(record) {
        c("uploadAdminSrc");
    },
    handleTableChange: function handleTableChange(pagination, filters, sorter) {

        var page = this.state.adminTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateAdminTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadAdminTableData();
    },
    adminTableDataFiledsConverter: function adminTableDataFiledsConverter(originalData) {
        var data = [];
        $.each(originalData, function (i, item) {

            data.push({
                key: item.id,
                id: item.id,
                username: item.username,
                immutable: item.immutable,
                password: item.password,
                description: item.description,
                create_time: item.createTime,
                update_time: item.updateTime,
                status: item.status

            });
        }.bind(this));
        return data;
    },
    loadAdminTableData: function loadAdminTableData() {
        this.updateAdminTableLoading(true);
        this.updateAdminTableRefreshBtnLoading(true);
        var _state$adminTable = this.state.adminTable,
            page = _state$adminTable.page,
            query = _state$adminTable.query;
        //filter

        var orderType = page.orderType;
        if (orderType == "descend") {
            orderType = "desc";
        }
        if (orderType == "ascend") {
            orderType = "asc";
        }
        page.orderType = orderType;

        //ajax
        _vm_util.ajax.get({
            url: this.state.adminTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.adminTableDataFiledsConverter(originalData);
                //save data

                this.updateAdminTableOriginalData(originalData);

                this.updateAdminTableData(data);

                var page = this.state.adminTable.page;
                this.updateAdminTablePage({
                    start: page.start,
                    size: page.size,
                    orderBy: page.orderBy,
                    orderType: page.orderType,
                    total: result.data.total
                });
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function () {}.bind(this),
            complete: function () {
                this.updateAdminTableLoading(false);
                this.updateAdminTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    showEditDialog: function showEditDialog(record) {
        record = _vm_util.commons.getObjByKey(this.state.adminTable.originalData, "id", record.id);

        this.updateAdminEditDialogEchoData(record);

        this.getAdminEditDialog().showDialog(record);
    },
    deleteRecord: function deleteRecord(ids) {

        var hideLoading = _antd.message.loading(deletingTip);
        this.updateAdminTableBatchDeleteLoading(true);

        var _state$adminTable2 = this.state.adminTable,
            deletingTip = _state$adminTable2.deletingTip,
            delAdminUrl = _state$adminTable2.delAdminUrl;

        _vm_util.ajax.delete({
            url: delAdminUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                this.updateAdminTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                _antd.message.success(result.msg);

                this.removeAdminTableSelectedRowKeys(ids);

                this.loadAdminTableData();
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function error() {}
        });
    },
    showAddDialog: function showAddDialog() {
        c("showAddDialog");
        this.getAdminAddDialog().showDialog();
    },
    getAdminAddDialog: function getAdminAddDialog() {
        return this.refs.admin_add_dialog;
    },
    getAdminEditDialog: function getAdminEditDialog() {
        return this.refs.admin_edit_dialog;
    },
    onEditSuccess: function onEditSuccess(newRecord) {

        var newOriginalData = _vm_util.commons.updateObjByKey(this.state.adminTable.originalData, "id", newRecord.id, newRecord);

        this.updateAdminTableOriginalData(newOriginalData);

        var newData = this.adminTableDataFiledsConverter(newOriginalData);

        this.updateAdminTableData(newData);
    },
    onAddSuccess: function onAddSuccess(newRecord) {
        // c(newRecord);
        this.loadAdminTableData();
    },
    getAdminImgUploaderDialog: function getAdminImgUploaderDialog() {
        return this.refs.admin_img_uploader_dialog;
    },

    // onUpdateImgSuccess(result){
    //
    //     //previewImg
    //     // const imgUrl = commons.generateImgUrl(
    //     //     {
    //     //         imgUrl: result.data.imgUrl,
    //     //         width: 300
    //     //     }
    //     // );
    //     // this.getAdminImgUploaderDialog().previewImg(imgUrl);
    //     this.onEditSuccess(result.data.admin);
    // },
    // onUploadTempImgSuccess(result){
    //     this.getAdminImgUploaderDialog().previewImg(vm_config.http_url_prefix + result.data.imgUrl);
    // },

    expandedRowRender: function expandedRowRender(record) {
        return _react2.default.createElement(
            "span",
            null,
            "\u7B80\u4ECB \uFF1A",
            _react2.default.createElement(
                "p",
                { style: { margin: 0 } },
                record.description
            )
        );
    },

    render: function render() {
        var _this2 = this;

        var echoData = this.state.adminEditDialog.echoData;
        var _state$adminTable3 = this.state.adminTable,
            _title = _state$adminTable3.title,
            scroll = _state$adminTable3.scroll,
            selectedRowKeys = _state$adminTable3.selectedRowKeys,
            columns = _state$adminTable3.columns,
            data = _state$adminTable3.data,
            page = _state$adminTable3.page,
            tableLoading = _state$adminTable3.tableLoading,
            batchDeleteBtnLoading = _state$adminTable3.batchDeleteBtnLoading,
            refreshBtnLoading = _state$adminTable3.refreshBtnLoading,
            bordered = _state$adminTable3.bordered;


        var rowSelection = {
            onChange: function onChange(selectedRowKeys, selectedRows) {
                // c(selectedRows);
                // var selectedRowKeys = this.state.adminTable.selectedRowKeys;
                // selectedRowKeys.push(selectedRows.key);
                // this.updateAdminTableSelectedRowKeys(selectedRowKeys);
                // c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

                _this2.updateAdminTableSelectedRowKeys(selectedRowKeys);
            },
            onSelect: function onSelect(record, selected, selectedRows) {},
            onSelectAll: function onSelectAll(selected, selectedRows, changeRows) {}
        };

        // const posterUploaderDialog = this.state.posterUploaderDialog;
        // const imgUploaderDialog = this.state.imgUploaderDialog;


        var hasSelected = selectedRowKeys.length > 0;
        //set now page's props
        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "div",
                { style: { marginBottom: 16 } },
                _react2.default.createElement(
                    _antd.Button,
                    {
                        loading: refreshBtnLoading,
                        onClick: this.loadAdminTableData
                    },
                    "\u5237\u65B0"
                ),
                _react2.default.createElement(
                    _antd.Button,
                    {
                        style: { marginLeft: 8 },
                        type: "primary",
                        onClick: this.showAddDialog
                    },
                    "\u6DFB\u52A0"
                ),
                _react2.default.createElement(
                    _antd.Popconfirm,
                    { title: "\u786E\u8BA4\u5220\u9664 ? ",
                        okText: "\u5220\u9664",
                        cancelText: "\u53D6\u6D88",
                        onConfirm: function onConfirm() {
                            return _this2.deleteRecord(selectedRowKeys);
                        } },
                    _react2.default.createElement(
                        _antd.Button,
                        {
                            style: { marginLeft: 8 },
                            type: "danger",
                            disabled: !hasSelected,
                            loading: batchDeleteBtnLoading
                        },
                        "\u6279\u91CF\u5220\u9664"
                    )
                ),
                _react2.default.createElement(
                    "span",
                    { style: { marginLeft: 8 } },
                    hasSelected ? "\u9009\u62E9\u4E86 " + selectedRowKeys.length + " \u4E2A\u9009\u9879" : ''
                )
            ),
            _react2.default.createElement(_antd.Table, {
                expandedRowRender: this.expandedRowRender,
                locale: { emptyText: "暂无用户数据" },
                columns: columns,
                rowSelection: rowSelection,
                dataSource: data,
                pagination: {
                    total: page.total,
                    showTotal: function showTotal(total, range) {
                        return "\u7B2C " + range[0] + "-" + range[1] + " \u6761\u8BB0\u5F55 , \u5171 " + total + " \u6761\u8BB0\u5F55";
                    },
                    pageSize: page.size,
                    defaultCurrent: 1
                },
                loading: tableLoading,
                onChange: this.handleTableChange,
                bordered: bordered,
                title: function title() {
                    return _title;
                }
                // footer={() => 'Footer'}
                , scroll: scroll }),
            _react2.default.createElement(_admin_edit_dialog2.default, { ref: "admin_edit_dialog",
                echoData: echoData,
                onEditSuccess: this.onEditSuccess }),
            _react2.default.createElement(_admin_add_dialog2.default, { ref: "admin_add_dialog",
                onAddSuccess: this.onAddSuccess }),
            _react2.default.createElement(_admin_login_logs_dialog2.default, {
                ref: "admin_login_logs_dialog" })
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(AdminTable); //将App组件导出

/***/ }),
/* 121 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;

var AdminEditDialog = _react2.default.createClass({
    displayName: "AdminEditDialog",
    getInitialState: function getInitialState() {

        return {
            title: "修改管理员信息",
            editAdminUrl: "/admin/info",
            tipOfEditing: '正在保存管理员修改',
            roles: [],
            roleUrl: "/admin/role/info/all",
            selectRoleIds: [],
            selectRoleUrl: "/admin/role/id/list/byAdminId/"
        };
    },
    updateRoles: function updateRoles(roles) {
        this.setState({ roles: roles });
    },
    updateSelectRoleIds: function updateSelectRoleIds(selectRoleIds) {

        this.setState({ selectRoleIds: selectRoleIds });
    },
    loadRolesData: function loadRolesData(args) {
        var onSuccess = args.onSuccess;
        var roleUrl = this.state.roleUrl;

        _vm_util.ajax.get({
            url: roleUrl,
            success: function (result) {

                this.updateRoles(result.data.list);

                isUndefined(onSuccess) ? undefined : onSuccess(result);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    loadSelectAuthIdsData: function loadSelectAuthIdsData(adminId) {
        var selectRoleUrl = this.state.selectRoleUrl;

        _vm_util.ajax.get({
            url: selectRoleUrl + adminId,
            success: function (result) {

                this.updateSelectRoleIds(result.data.list);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    showDialog: function showDialog(record) {
        this.getAdminEditDialog().showDialog();
        this.loadRolesData({
            onSuccess: function () {
                this.loadSelectAuthIdsData(record.id);
            }.bind(this)
        });
    },
    getAdminEditDialog: function getAdminEditDialog() {
        return this.refs.admin_edit_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var _state = this.state,
            editAdminUrl = _state.editAdminUrl,
            tipOfEditing = _state.tipOfEditing;

        var hideMessage = _antd.message.loading(tipOfEditing, 0);
        var filterValues = function filterValues(values) {

            if (isUndefined(values.roleIds)) {
                values.roleIds = [];
            }
            values.roleIds = values.roleIds.join(",");

            return values;
        };
        values = filterValues(values);
        // c(values);
        _vm_util.ajax.put({
            url: editAdminUrl,
            data: values,
            success: function (result) {
                var onEditSuccess = this.props.onEditSuccess;


                _antd.message.success(result.msg);
                this.getAdminEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.admin) : undefined;

                //clear form
                this.getAdminEditDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getAdminEditDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {
        this.getAdminEditDialog().clearForm(); //!!防止触发reuqired后在关闭的bug
        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    updateConstellationObj: function updateConstellationObj(obj) {
        this.setState({
            constellationObj: obj
        });
    },
    onBirthdayChange: function onBirthdayChange(date, dateString) {
        var echoData = this.props.echoData;

        echoData.constellation = _vm_util.commons.transConStrByDate(date._d);
    },
    render: function render() {
        var echoData = this.props.echoData;
        var _state2 = this.state,
            title = _state2.title,
            roles = _state2.roles,
            selectRoleIds = _state2.selectRoleIds;


        echoData = _vm_util.commons.clone(echoData); //!!!!!!!!!!!!!important

        // filterEchoData
        var filterEchoData = function (echoData) {
            if (isUndefined(echoData)) {
                return {};
            }
            if (!isUndefined(echoData.createTime)) {
                echoData.createTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.createTime));
            }
            if (!isUndefined(echoData.updateTime)) {
                echoData.updateTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.updateTime));
            }

            return echoData;
        }.bind(this);

        echoData = filterEchoData(echoData);

        var roleOptions = [];
        if (!isUndefined(roles) && roles.length >= 1) {
            roleOptions = roles.map(function (item, i) {
                var val = item.id + '';
                var title = "角色：" + item.roleName + "\r\n简介:" + item.description;
                return _react2.default.createElement(
                    Option,
                    { title: title, key: item.id, value: val },
                    item.roleName
                );
            }.bind(this));
        }

        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "id",
                id: "id",
                config: {
                    initialValue: echoData.id
                },
                input: _react2.default.createElement(_antd.Input, { name: "id",
                    autoComplete: "off",
                    disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "名称",
                id: "username",
                config: {
                    initialValue: echoData.username,
                    rules: [{ required: true, message: '请输入管理员名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u7BA1\u7406\u5458\u540D\u79F0", name: "name" })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    initialValue: echoData.status,
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _react2.default.createElement(
                        Option,
                        { value: "1" },
                        "\u6B63\u5E38"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "2" },
                        "\u51BB\u7ED3"
                    )
                )
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "密码",
                id: "password",
                config: {
                    initialValue: echoData.password,
                    rules: [{ required: true, whitespace: true, message: '请输入密码!' }]
                },
                input: _react2.default.createElement(_antd.Input, { autoComplete: "off",
                    placeholder: "\u5BC6\u7801" })
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "创建时间",
                id: "ignore_createTime",
                config: {
                    initialValue: echoData.createTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "最后更新时间",
                id: "ignore_updateTime",
                config: {
                    initialValue: echoData.updateTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }]

        }, {
            cols: [{
                col: { span: 24 },
                label: "角色",
                id: "roleIds",
                config: {
                    initialValue: _vm_util.commons.toStrArr(selectRoleIds),
                    rules: [{ required: false, message: '请选择角色!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        showSearch: true,
                        mode: "multiple",
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u89D2\u8272",
                        placeholder: "\u8BF7\u9009\u62E9\u89D2\u8272",
                        style: { width: '100%' }
                    },
                    roleOptions
                )
            }]

        }, {
            cols: [{
                col: { span: 24 },
                label: "简介",
                id: "description",
                config: {
                    initialValue: echoData.description,
                    rules: [{ required: true, message: '请输入简介!' }]
                },

                input: _react2.default.createElement(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB", autosize: { minRows: 4, maxRows: 8 } })
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            title: title,
            formRows: formRows,
            formLayout: formLayout,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "admin_edit_dialog" });
    }
});

exports.default = AdminEditDialog; //将App组件导出

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var AdminAddDialog = _react2.default.createClass({
    displayName: "AdminAddDialog",
    getInitialState: function getInitialState() {
        return {
            title: "添加管理员",
            addAdminUrl: "/admin/info",
            tipOfAddingAdmin: "正在添加管理员",
            roles: [],
            roleUrl: "/admin/role/info/all"
        };
    },
    updateRoles: function updateRoles(roles) {
        this.setState({ roles: roles });
    },
    loadRolesData: function loadRolesData() {
        var roleUrl = this.state.roleUrl;

        _vm_util.ajax.get({
            url: roleUrl,
            success: function (result) {

                this.updateRoles(result.data.list);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    showDialog: function showDialog() {
        this.getAdminAddDialog().showDialog();
        this.loadRolesData();
    },
    getAdminAddDialog: function getAdminAddDialog() {
        return this.refs.admin_add_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var tipOfAddingAdmin = this.state.tipOfAddingAdmin;

        var hideMessage = _antd.message.loading(tipOfAddingAdmin, 0);
        var addAdminUrl = this.state.addAdminUrl;

        var filterValues = function filterValues(values) {

            if (isUndefined(values.roleIds)) {
                values.roleIds = [];
            }
            values.roleIds = values.roleIds.join(",");
            return values;
        };
        values = filterValues(values);
        _vm_util.ajax.post({
            url: addAdminUrl,
            data: values,
            success: function (result) {
                var onAddSuccess = this.props.onAddSuccess;


                _antd.message.success(result.msg);
                this.getAdminAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.admin) : undefined;

                //clear form
                this.getAdminAddDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getAdminAddDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {

        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var _state = this.state,
            title = _state.title,
            roles = _state.roles;


        var roleOptions = [];
        if (!isUndefined(roles) && roles.length >= 1) {
            roleOptions = roles.map(function (item, i) {
                var val = item.id + '';
                var title = "角色：" + item.roleName + "\r\n简介:" + item.description;
                return _react2.default.createElement(
                    Option,
                    { title: title, key: item.id, value: val },
                    item.roleName
                );
            }.bind(this));
        }

        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "名称",
                id: "username",
                config: {
                    rules: [{ required: true, message: '请输入管理员名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u7BA1\u7406\u5458\u540D\u79F0" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _react2.default.createElement(
                        Option,
                        { value: "1" },
                        "\u6B63\u5E38"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "2" },
                        "\u51BB\u7ED3"
                    )
                )
            }]

        }, {
            cols: [{
                col: { span: 11 },
                label: "密码",
                id: "password",
                config: {
                    rules: [{ required: true, message: '请输入管理员密码!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u7BA1\u7406\u5458\u5BC6\u7801" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }]

        }, {
            cols: [{
                col: { span: 24 },
                label: "角色",
                id: "roleIds",
                config: {
                    rules: [{ required: false, message: '请选择角色!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        showSearch: true,
                        mode: "multiple",
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u89D2\u8272",
                        placeholder: "\u8BF7\u9009\u62E9\u89D2\u8272",
                        style: { width: '100%' }
                    },
                    roleOptions
                )
            }]

        }, {
            cols: [{
                col: { span: 24 },
                label: "简介",
                id: "description",
                config: {
                    rules: [{ required: true, message: '请输入简介!' }]
                },

                input: _react2.default.createElement(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB", autosize: { minRows: 4, maxRows: 8 } })
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            title: title,
            formRows: formRows,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "admin_add_dialog" });
    }
});

exports.default = AdminAddDialog; //将App组件导出

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(2);

var _admin_login_logs_table = __webpack_require__(41);

var _admin_login_logs_table2 = _interopRequireDefault(_admin_login_logs_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var AdminLoginLogsDialog = _react2.default.createClass({
    displayName: 'AdminLoginLogsDialog',

    getInitialState: function getInitialState() {
        return {
            visible: false,
            title: "管理员登录日志",
            width: 1111
        };
    },
    showDialog: function showDialog(adminId) {
        // c(this.refs);
        // c(this.refs.admin_login_logs_table);
        this.setState({ visible: true });
        // this.setState({adminId: adminId});

        setTimeout(function () {
            this.getAdminLoginLogsTable().loadDataByAdminId(adminId);
        }.bind(this), 10);
    },
    handleCancel: function handleCancel() {

        this.setState({ visible: false });
    },
    getAdminLoginLogsTable: function getAdminLoginLogsTable() {
        return this.refs.admin_login_logs_table;
    },

    render: function render() {
        var _state = this.state,
            visible = _state.visible,
            title = _state.title,
            width = _state.width;

        return _react2.default.createElement(
            _antd.Modal,
            {
                id: 'admin_login_logs_dialog',
                visible: visible,
                title: title,
                width: width,
                onCancel: this.handleCancel,
                footer: null },
            _react2.default.createElement(_admin_login_logs_table2.default, {
                ref: 'admin_login_logs_table' })
        );
    }
});

exports.default = AdminLoginLogsDialog; //将App组件导出

/***/ }),
/* 125 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(127);

__webpack_require__(2);

var _role_table = __webpack_require__(128);

var _role_table2 = _interopRequireDefault(_role_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var RolePage = _react2.default.createClass({
    displayName: "RolePage",

    getInitialState: function getInitialState() {

        return {};
    },

    render: function render() {

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_role_table2.default, null)
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(RolePage); //将App组件导出

/***/ }),
/* 127 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(129);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _role_edit_dialog = __webpack_require__(130);

var _role_edit_dialog2 = _interopRequireDefault(_role_edit_dialog);

var _role_add_dialog = __webpack_require__(131);

var _role_add_dialog2 = _interopRequireDefault(_role_add_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;
//import "antd/dist/antd.css";
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var RoleTable = _react2.default.createClass({
    displayName: "RoleTable",

    getInitialState: function getInitialState() {

        return {

            roleEditDialog: {
                echoData: undefined
            },
            roleTable: {
                title: "角色列表",
                dataSourceUrl: "/admin/role/info/list",
                delRoleUrl: "/admin/role/info",
                scroll: { x: true, y: 450 },
                editable: false,
                haveSearchRolename: false,
                rolenameDropdownVisible: false,
                bordered: false,
                tableLoading: false,
                batchDeleteBtnLoading: false,
                refreshBtnLoading: false,
                selectedRowKeys: [],
                data: [], //displayData
                originalData: [],
                page: {
                    start: 0,
                    size: 5,
                    orderBy: "",
                    orderType: "",
                    total: 0
                },
                query: {
                    roleName: ""
                },
                columns: [],
                deletingTip: "正在删除"
            }
        };
    },
    onSearchRolename: function onSearchRolename(newRolenameQuery) {
        this.updateNameOfQuery(newRolenameQuery);
        if (!isEmptyString(this.state.roleTable.query.roleName)) {
            this.updateRoleTableHaveSearchRolename(true);
        } else {

            this.updateRoleTableHaveSearchRolename(false);
        }
        this.loadRoleTableData();
    },
    updateRoleTableHaveSearchRolename: function updateRoleTableHaveSearchRolename(haveSearchRolename) {
        var state = this.state;
        state.roleTable.haveSearchRolename = haveSearchRolename;
        this.setState(state);
    },
    updateRoleTableRolenameDropdownVisible: function updateRoleTableRolenameDropdownVisible(rolenameDropdownVisible) {
        var state = this.state;
        state.roleTable.rolenameDropdownVisible = rolenameDropdownVisible;
        this.setState(state);
    },
    updateRoleTableSelectedRowKeys: function updateRoleTableSelectedRowKeys(selectedRowKeys) {
        var state = this.state;
        state.roleTable.selectedRowKeys = selectedRowKeys;
        this.setState(state);
    },
    removeRoleTableSelectedRowKeys: function removeRoleTableSelectedRowKeys(removeSelectedRowKeys) {
        var selectedRowKeys = this.state.roleTable.selectedRowKeys;
        selectedRowKeys = selectedRowKeys.removeByList(removeSelectedRowKeys);
        this.updateRoleTableSelectedRowKeys(selectedRowKeys);
    },
    updateNameOfQuery: function updateNameOfQuery(name) {
        var state = this.state;
        state.roleTable.query.roleName = name;
        this.setState(state);
    },
    updateRoleTableData: function updateRoleTableData(data) {
        var state = this.state;
        state.roleTable.data = data;
        this.setState(state);
    },
    updateRoleTableBatchDeleteLoading: function updateRoleTableBatchDeleteLoading(loading) {
        var state = this.state;
        state.roleTable.batchDeleteBtnLoading = loading;
        this.setState(state);
    },
    updateRoleTableRefreshBtnLoading: function updateRoleTableRefreshBtnLoading(loading) {
        var state = this.state;
        state.roleTable.refreshBtnLoading = loading;
        this.setState(state);
    },
    updateRoleTablePage: function updateRoleTablePage(page) {
        var state = this.state;
        state.roleTable.page = page;
        this.setState(state);
    },
    updateRoleTableQuery: function updateRoleTableQuery(query) {
        var state = this.state;
        state.roleTable.query = query;
        this.setState(state);
    },
    updateRoleTableLoading: function updateRoleTableLoading(flag) {
        var state = this.state;
        state.roleTable.tableLoading = flag;
        this.setState(state);
    },
    updateRoleTableColumns: function updateRoleTableColumns(columns) {

        var state = this.state;
        state.roleTable.columns = columns;
        this.setState(state);
    },
    updateRoleTableOriginalData: function updateRoleTableOriginalData(originalData) {
        var state = this.state;
        state.roleTable.originalData = originalData;
        this.setState(state);
    },
    updateRoleEditDialogEchoData: function updateRoleEditDialogEchoData(echoData) {
        var state = this.state;
        state.roleEditDialog.echoData = echoData;
        this.setState(state);
    },
    showRoleImgUploaderDialog: function showRoleImgUploaderDialog(record) {
        this.getRoleImgUploaderDialog().showDialog();
        this.getRoleImgUploaderDialog().previewImg(_vm_util.commons.generateImgUrl({
            imgUrl: record.imgUrl,
            width: 300
        }));
        this.getRoleImgUploaderDialog().updateExtraInfo(record);
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        this.updateRoleTableColumns([{
            title: 'id',
            width: 80,
            dataIndex: 'id',
            sorter: true
        }, {
            title: '名称',
            width: 120,
            dataIndex: 'role_name',
            render: function render(text, record) {
                return _vm_util.commons.highLight(text, _this.state.roleTable.query.roleName);
            },
            sorter: true,
            filterDropdown: _react2.default.createElement(
                "div",
                { className: "custom-filter-dropdown" },
                _react2.default.createElement(Search, {
                    placeholder: "\u641C\u7D22\u89D2\u8272\u540D\u79F0",
                    onSearch: this.onSearchRolename,
                    style: { width: 200 }
                })
            ),
            filterIcon: _react2.default.createElement(_antd.Icon, { type: "search",
                style: { color: this.state.roleTable.haveSearchRolename ? '#108ee9' : '#aaa' } })
            // filterDropdownVisible: this.state.roleTable.rolenameDropdownVisible,

        }, {
            title: '内置对象',
            width: 100,
            dataIndex: 'immutable',
            render: function render(text) {
                return _vm_util.commons.getImmutableStrByIndex({ index: text });
            }

        }, {
            title: '状态',
            width: 80,
            dataIndex: 'status',
            render: function render(text) {
                return _vm_util.commons.getStatusStrByIndex({ index: text });
            },
            sorter: true
        }, {
            title: '更新时间',
            width: 80,
            dataIndex: 'update_time',
            render: function render(text) {
                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '创建时间',
            width: 80,
            dataIndex: 'create_time',
            render: function render(text) {

                return timeFormatter.formatTime(timeFormatter.int2Long(text));
            },
            sorter: true
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: 80,
            render: function render(text, record) {
                var isImmutable = record.immutable == 1;
                var disabledStyle = isImmutable ? { textDecoration: "line-through", color: "red" } : {};
                var menu = _react2.default.createElement(
                    _antd.Menu,
                    null,
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            "a",
                            { disabled: isImmutable, style: disabledStyle,
                                onClick: function onClick() {
                                    return _this.showEditDialog(record);
                                }, href: "javascript:void(0);" },
                            "\u7F16\u8F91"
                        )
                    ),
                    _react2.default.createElement(
                        _antd.Menu.Item,
                        null,
                        _react2.default.createElement(
                            _antd.Popconfirm,
                            { title: "\u786E\u8BA4\u5220\u9664 ? ",
                                okText: "\u5220\u9664",
                                cancelText: "\u53D6\u6D88",
                                onConfirm: function onConfirm() {
                                    return _this.deleteRecord([record.id]);
                                } },
                            _react2.default.createElement(
                                "a",
                                { disabled: isImmutable, style: disabledStyle, href: "javascript:void(0)" },
                                "\u5220\u9664"
                            )
                        )
                    )
                );
                // c(record.immutable);
                return _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        _antd.Dropdown,
                        { overlay: menu },
                        _react2.default.createElement(
                            "a",
                            { href: "javascript:void(0);" },
                            "\u64CD\u4F5C ",
                            _react2.default.createElement(_antd.Icon, { type: "down" })
                        )
                    )
                );
            },
            sorter: true
        }]);
        this.loadRoleTableData();
    },
    uploadRoleSrc: function uploadRoleSrc(record) {
        c("uploadRoleSrc");
    },
    handleTableChange: function handleTableChange(pagination, filters, sorter) {

        var page = this.state.roleTable.page;
        var size = pagination.pageSize;
        var start = (pagination.current - 1) * size;
        var orderBy = isUndefined(sorter.field) ? "" : sorter.field;
        var orderType = isUndefined(sorter.order) ? "" : sorter.order;
        this.updateRoleTablePage({
            start: start,
            size: size,
            orderBy: orderBy,
            orderType: orderType,
            total: page.total
        });
        this.loadRoleTableData();
    },
    roleTableDataFiledsConverter: function roleTableDataFiledsConverter(originalData) {
        var data = [];
        $.each(originalData, function (i, item) {

            data.push({
                key: item.id,
                id: item.id,
                role_name: item.roleName,
                immutable: item.immutable,
                description: item.description,
                create_time: item.createTime,
                update_time: item.updateTime,
                status: item.status

            });
        }.bind(this));
        return data;
    },
    loadRoleTableData: function loadRoleTableData() {
        this.updateRoleTableLoading(true);
        this.updateRoleTableRefreshBtnLoading(true);
        var _state$roleTable = this.state.roleTable,
            page = _state$roleTable.page,
            query = _state$roleTable.query;
        //filter

        var orderType = page.orderType;
        if (orderType == "descend") {
            orderType = "desc";
        }
        if (orderType == "ascend") {
            orderType = "asc";
        }
        page.orderType = orderType;

        //ajax
        _vm_util.ajax.get({
            url: this.state.roleTable.dataSourceUrl,
            data: $.extend(page, query),
            success: function (result) {

                var originalData = result.data.list;
                //handle data

                var data = this.roleTableDataFiledsConverter(originalData);
                //save data

                this.updateRoleTableOriginalData(originalData);

                this.updateRoleTableData(data);

                var page = this.state.roleTable.page;
                this.updateRoleTablePage({
                    start: page.start,
                    size: page.size,
                    orderBy: page.orderBy,
                    orderType: page.orderType,
                    total: result.data.total
                });
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function () {}.bind(this),
            complete: function () {
                this.updateRoleTableLoading(false);
                this.updateRoleTableRefreshBtnLoading(false);
            }.bind(this)
        });
    },
    showEditDialog: function showEditDialog(record) {
        record = _vm_util.commons.getObjByKey(this.state.roleTable.originalData, "id", record.id);

        this.updateRoleEditDialogEchoData(record);

        this.getRoleEditDialog().showDialog(record);
    },
    deleteRecord: function deleteRecord(ids) {

        var hideLoading = _antd.message.loading(deletingTip);
        this.updateRoleTableBatchDeleteLoading(true);

        var _state$roleTable2 = this.state.roleTable,
            deletingTip = _state$roleTable2.deletingTip,
            delRoleUrl = _state$roleTable2.delRoleUrl;

        _vm_util.ajax.delete({
            url: delRoleUrl,
            data: {
                deletedIds: ids.join(",")
            },
            complete: function () {
                hideLoading();
                this.updateRoleTableBatchDeleteLoading(false);
            }.bind(this),
            success: function (result) {
                _antd.message.success(result.msg);

                this.removeRoleTableSelectedRowKeys(ids);

                this.loadRoleTableData();
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            error: function error() {}
        });
    },
    showAddDialog: function showAddDialog() {
        c("showAddDialog");
        this.getRoleAddDialog().showDialog();
    },
    getRoleAddDialog: function getRoleAddDialog() {
        return this.refs.role_add_dialog;
    },
    getRoleEditDialog: function getRoleEditDialog() {
        return this.refs.role_edit_dialog;
    },
    onEditSuccess: function onEditSuccess(newRecord) {

        var newOriginalData = _vm_util.commons.updateObjByKey(this.state.roleTable.originalData, "id", newRecord.id, newRecord);

        this.updateRoleTableOriginalData(newOriginalData);

        var newData = this.roleTableDataFiledsConverter(newOriginalData);

        this.updateRoleTableData(newData);
    },
    onAddSuccess: function onAddSuccess(newRecord) {
        // c(newRecord);
        this.loadRoleTableData();
    },
    getRoleImgUploaderDialog: function getRoleImgUploaderDialog() {
        return this.refs.role_img_uploader_dialog;
    },

    // onUpdateImgSuccess(result){
    //
    //     //previewImg
    //     // const imgUrl = commons.generateImgUrl(
    //     //     {
    //     //         imgUrl: result.data.imgUrl,
    //     //         width: 300
    //     //     }
    //     // );
    //     // this.getRoleImgUploaderDialog().previewImg(imgUrl);
    //     this.onEditSuccess(result.data.role);
    // },
    // onUploadTempImgSuccess(result){
    //     this.getRoleImgUploaderDialog().previewImg(vm_config.http_url_prefix + result.data.imgUrl);
    // },

    expandedRowRender: function expandedRowRender(record) {
        return _react2.default.createElement(
            "span",
            null,
            "\u7B80\u4ECB \uFF1A",
            _react2.default.createElement(
                "p",
                { style: { margin: 0 } },
                record.description
            )
        );
    },

    render: function render() {
        var _this2 = this;

        var echoData = this.state.roleEditDialog.echoData;
        var _state$roleTable3 = this.state.roleTable,
            _title = _state$roleTable3.title,
            scroll = _state$roleTable3.scroll,
            selectedRowKeys = _state$roleTable3.selectedRowKeys,
            columns = _state$roleTable3.columns,
            data = _state$roleTable3.data,
            page = _state$roleTable3.page,
            tableLoading = _state$roleTable3.tableLoading,
            batchDeleteBtnLoading = _state$roleTable3.batchDeleteBtnLoading,
            refreshBtnLoading = _state$roleTable3.refreshBtnLoading,
            bordered = _state$roleTable3.bordered;


        var rowSelection = {
            onChange: function onChange(selectedRowKeys, selectedRows) {
                // c(selectedRows);
                // var selectedRowKeys = this.state.roleTable.selectedRowKeys;
                // selectedRowKeys.push(selectedRows.key);
                // this.updateRoleTableSelectedRowKeys(selectedRowKeys);
                // c(`selectedRowKeys is : ${selectedRowKeys}`, selectedRowKeys);

                _this2.updateRoleTableSelectedRowKeys(selectedRowKeys);
            },
            onSelect: function onSelect(record, selected, selectedRows) {},
            onSelectAll: function onSelectAll(selected, selectedRows, changeRows) {}
        };

        // const posterUploaderDialog = this.state.posterUploaderDialog;
        // const imgUploaderDialog = this.state.imgUploaderDialog;


        var hasSelected = selectedRowKeys.length > 0;
        //set now page's props
        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "div",
                { style: { marginBottom: 16 } },
                _react2.default.createElement(
                    _antd.Button,
                    {
                        loading: refreshBtnLoading,
                        onClick: this.loadRoleTableData
                    },
                    "\u5237\u65B0"
                ),
                _react2.default.createElement(
                    _antd.Button,
                    {
                        style: { marginLeft: 8 },
                        type: "primary",
                        onClick: this.showAddDialog
                    },
                    "\u6DFB\u52A0"
                ),
                _react2.default.createElement(
                    _antd.Popconfirm,
                    { title: "\u786E\u8BA4\u5220\u9664 ? ",
                        okText: "\u5220\u9664",
                        cancelText: "\u53D6\u6D88",
                        onConfirm: function onConfirm() {
                            return _this2.deleteRecord(selectedRowKeys);
                        } },
                    _react2.default.createElement(
                        _antd.Button,
                        {
                            style: { marginLeft: 8 },
                            type: "danger",
                            disabled: !hasSelected,
                            loading: batchDeleteBtnLoading
                        },
                        "\u6279\u91CF\u5220\u9664"
                    )
                ),
                _react2.default.createElement(
                    "span",
                    { style: { marginLeft: 8 } },
                    hasSelected ? "\u9009\u62E9\u4E86 " + selectedRowKeys.length + " \u4E2A\u9009\u9879" : ''
                )
            ),
            _react2.default.createElement(_antd.Table, {
                expandedRowRender: this.expandedRowRender,
                locale: { emptyText: "暂无用户数据" },
                columns: columns,
                rowSelection: rowSelection,
                dataSource: data,
                pagination: {
                    total: page.total,
                    showTotal: function showTotal(total, range) {
                        return "\u7B2C " + range[0] + "-" + range[1] + " \u6761\u8BB0\u5F55 , \u5171 " + total + " \u6761\u8BB0\u5F55";
                    },
                    pageSize: page.size,
                    defaultCurrent: 1
                },
                loading: tableLoading,
                onChange: this.handleTableChange,
                bordered: bordered,
                title: function title() {
                    return _title;
                }
                // footer={() => 'Footer'}
                , scroll: scroll }),
            _react2.default.createElement(_role_edit_dialog2.default, { ref: "role_edit_dialog",
                echoData: echoData,
                onEditSuccess: this.onEditSuccess }),
            _react2.default.createElement(_role_add_dialog2.default, { ref: "role_add_dialog",
                onAddSuccess: this.onAddSuccess })
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(RoleTable); //将App组件导出

/***/ }),
/* 129 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option,
    OptGroup = _antd.Select.OptGroup;
//import "antd/dist/antd.css";

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;

var RoleEditDialog = _react2.default.createClass({
    displayName: "RoleEditDialog",
    getInitialState: function getInitialState() {

        return {
            width: 666,
            title: "修改角色信息",
            editRoleUrl: "/admin/role/info",
            tipOfEditing: '正在保存角色修改',
            auths: [],
            selectAuthIds: [],
            authUrl: "/admin/auth/info/all",
            selectAuthUrl: "/admin/auth/id/list/byRoleId/",
            menus: [],
            selectMenuIds: [],
            menuUrl: "/admin/menu/tree/all",
            selectMenuUrl: "/admin/menu/leaf/id/list/byRoleId/"
        };
    },
    updateAuths: function updateAuths(auths) {
        this.setState({ auths: auths });
    },
    updateSelectAuthIds: function updateSelectAuthIds(selectAuthIds) {

        this.setState({ selectAuthIds: selectAuthIds });
    },
    loadAuthsData: function loadAuthsData(args) {
        var onSuccess = args.onSuccess;
        var authUrl = this.state.authUrl;

        _vm_util.ajax.get({
            url: authUrl,
            success: function (result) {

                this.updateAuths(result.data.list);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);

                isUndefined(onSuccess) ? undefined : onSuccess(result);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    loadSelectAuthIdsData: function loadSelectAuthIdsData(roleId) {
        var selectAuthUrl = this.state.selectAuthUrl;

        _vm_util.ajax.get({
            url: selectAuthUrl + roleId,
            success: function (result) {

                this.updateSelectAuthIds(result.data.list);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    updateMenus: function updateMenus(menus) {
        this.setState({ menus: menus });
    },
    updateSelectMenuIds: function updateSelectMenuIds(selectMenuIds) {

        this.setState({ selectMenuIds: selectMenuIds });
    },
    loadMenusData: function loadMenusData(args) {
        var onSuccess = args.onSuccess;
        var menuUrl = this.state.menuUrl;

        _vm_util.ajax.get({
            url: menuUrl,
            success: function (result) {

                this.updateMenus(result.data.tree);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);

                isUndefined(onSuccess) ? undefined : onSuccess(result);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    loadSelectMenuIdsData: function loadSelectMenuIdsData(roleId) {
        var selectMenuUrl = this.state.selectMenuUrl;

        _vm_util.ajax.get({
            url: selectMenuUrl + roleId,
            success: function (result) {

                this.updateSelectMenuIds(result.data.list);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    showDialog: function showDialog(record) {
        var id = record.id;

        this.getRoleEditDialog().showDialog();
        this.loadAuthsData({
            onSuccess: this.loadSelectAuthIdsData(id)
        });
        this.loadMenusData({
            onSuccess: this.loadSelectMenuIdsData(id)
        });
    },
    getRoleEditDialog: function getRoleEditDialog() {
        return this.refs.role_edit_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var _state = this.state,
            editRoleUrl = _state.editRoleUrl,
            tipOfEditing = _state.tipOfEditing;

        var hideMessage = _antd.message.loading(tipOfEditing, 0);
        var filterValues = function filterValues(values) {

            if (isUndefined(values.authIds)) {
                values.authIds = [];
            }
            values.authIds = values.authIds.join(",");

            if (isUndefined(values.menuIds)) {
                values.menuIds = [];
            }
            values.menuIds = values.menuIds.join(",");
            return values;
        };
        values = filterValues(values);
        // c(values);
        _vm_util.ajax.put({
            url: editRoleUrl,
            data: values,
            success: function (result) {
                var onEditSuccess = this.props.onEditSuccess;


                _antd.message.success(result.msg);
                this.getRoleEditDialog().closeDialog();
                //callback
                !isUndefined(onEditSuccess) ? onEditSuccess(result.data.role) : undefined;

                //clear form
                this.getRoleEditDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getRoleEditDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {
        this.getRoleEditDialog().clearForm(); //!!防止触发reuqired后在关闭的bug
        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var echoData = this.props.echoData;
        var _state2 = this.state,
            title = _state2.title,
            auths = _state2.auths,
            selectAuthIds = _state2.selectAuthIds,
            menus = _state2.menus,
            selectMenuIds = _state2.selectMenuIds,
            width = _state2.width;


        echoData = _vm_util.commons.clone(echoData); //!!!!!!!!!!!!!important
        // filterEchoData
        var filterEchoData = function (echoData) {
            if (isUndefined(echoData)) {
                return {};
            }
            if (!isUndefined(echoData.createTime)) {
                echoData.createTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.createTime));
            }
            if (!isUndefined(echoData.updateTime)) {
                echoData.updateTime = timeFormatter.formatTime(timeFormatter.int2Long(echoData.updateTime));
            }

            return echoData;
        }.bind(this);

        echoData = filterEchoData(echoData);

        var authOptions = [];

        if (!isUndefined(auths) && auths.length >= 1) {
            authOptions = auths.map(function (item, i) {
                var val = item.id + '';
                var title = "权限：" + item.authName + "\r\n简介:" + item.description;
                return _react2.default.createElement(
                    Option,
                    { title: title, key: item.id, value: val },
                    item.authName
                );
            }.bind(this));
        }
        var menuOptions = [];
        if (!isUndefined(menus) && menus.length >= 1) {
            // c("menus");
            // c(menus);
            menuOptions = menus.map(function (menu, i) {
                return _react2.default.createElement(
                    OptGroup,
                    { key: i, label: menu.menuName },
                    menu.child.map(function (ch, i) {
                        // c(tag);
                        var v = ch.id + '';
                        return _react2.default.createElement(
                            Option,
                            { key: ch.id, value: v },
                            ch.menuName
                        );
                    })
                );
            }.bind(this));
        }

        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 7 },
                label: "id",
                id: "id",
                config: {
                    initialValue: echoData.id
                },
                input: _react2.default.createElement(_antd.Input, { name: "id",
                    autoComplete: "off",
                    disabled: true })
            }, {
                col: { span: 1 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 7 },
                label: "名称",
                id: "roleName",
                config: {
                    initialValue: echoData.roleName,
                    rules: [{ required: true, message: '请输入角色名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u89D2\u8272\u540D\u79F0", name: "name" })
            }, {
                col: { span: 1 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 7 },
                label: "状态",
                id: "status",
                config: {
                    initialValue: echoData.status,
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _react2.default.createElement(
                        Option,
                        { value: "1" },
                        "\u6B63\u5E38"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "2" },
                        "\u51BB\u7ED3"
                    )
                )
            }]

        }, {
            cols: [{
                col: { span: 7 },
                label: "创建时间",
                id: "ignore_createTime",
                config: {
                    initialValue: echoData.createTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }, {
                col: { span: 1 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 7 },
                label: "最后更新时间",
                id: "ignore_updateTime",
                config: {
                    initialValue: echoData.updateTime
                },

                input: _react2.default.createElement(_antd.Input, { disabled: true })
            }]

        }, {
            cols: [{
                col: { span: 24 },
                label: "权限",
                id: "authIds",
                config: {
                    initialValue: _vm_util.commons.toStrArr(selectAuthIds),
                    rules: [{ required: false, message: '请选择权限!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        showSearch: true,
                        mode: "multiple",
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u6743\u9650",
                        placeholder: "\u8BF7\u9009\u62E9\u6743\u9650",
                        style: { width: '100%' }
                    },
                    authOptions
                )
            }]
        }, {
            cols: [{
                col: { span: 24 },
                label: "菜单",
                id: "menuIds",
                config: {
                    initialValue: _vm_util.commons.toStrArr(selectMenuIds),
                    rules: [{ required: false, message: '请选择菜单!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        showSearch: true,
                        mode: "multiple",
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u83DC\u5355",
                        placeholder: "\u8BF7\u9009\u62E9\u83DC\u5355",
                        style: { width: '100%' }
                    },
                    menuOptions
                )
            }]
        }, {
            cols: [{
                col: { span: 24 },
                label: "简介",
                id: "description",
                config: {
                    initialValue: echoData.description,
                    rules: [{ required: true, message: '请输入简介!' }]
                },

                input: _react2.default.createElement(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB", autosize: { minRows: 4, maxRows: 8 } })
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            title: title,
            width: width,
            formRows: formRows,
            formLayout: formLayout,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "role_edit_dialog" });
    }
});

exports.default = RoleEditDialog; //将App组件导出

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option,
    OptGroup = _antd.Select.OptGroup;
//import "antd/dist/antd.css";

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Sider = _antd.Layout.Sider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;
var RoleAddDialog = _react2.default.createClass({
    displayName: "RoleAddDialog",
    getInitialState: function getInitialState() {
        return {
            title: "添加角色",
            addRoleUrl: "/admin/role/info",
            tipOfAddingRole: "正在添加角色",
            auths: [],
            authUrl: "/admin/auth/info/all",
            menus: [],
            menuUrl: "/admin/menu/tree/all"
        };
    },
    updateAuths: function updateAuths(auths) {
        this.setState({ auths: auths });
    },
    loadAuthsData: function loadAuthsData() {
        var authUrl = this.state.authUrl;

        _vm_util.ajax.get({
            url: authUrl,
            success: function (result) {

                this.updateAuths(result.data.list);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    updateMenus: function updateMenus(menus) {
        this.setState({ menus: menus });
    },
    loadMenusData: function loadMenusData() {
        var menuUrl = this.state.menuUrl;

        _vm_util.ajax.get({
            url: menuUrl,
            success: function (result) {

                this.updateMenus(result.data.tree);
            }.bind(this),
            failure: function (result) {
                _antd.message.error(result.msg);
            }.bind(this),
            complete: function () {}.bind(this)
        });
    },
    showDialog: function showDialog() {
        this.getRoleAddDialog().showDialog();
        this.loadAuthsData();
        this.loadMenusData();
    },
    getRoleAddDialog: function getRoleAddDialog() {
        return this.refs.role_add_dialog;
    },
    handleSubmit: function handleSubmit(values) {
        var tipOfAddingRole = this.state.tipOfAddingRole;

        var hideMessage = _antd.message.loading(tipOfAddingRole, 0);
        var addRoleUrl = this.state.addRoleUrl;

        var filterValues = function filterValues(values) {
            if (isUndefined(values.authIds)) {
                values.authIds = [];
            }
            values.authIds = values.authIds.join(",");

            if (isUndefined(values.menuIds)) {
                values.menuIds = [];
            }
            values.menuIds = values.menuIds.join(",");
            return values;
        };
        values = filterValues(values);
        _vm_util.ajax.post({
            url: addRoleUrl,
            data: values,
            success: function (result) {
                var onAddSuccess = this.props.onAddSuccess;


                _antd.message.success(result.msg);
                this.getRoleAddDialog().closeDialog();

                //callback
                !isUndefined(onAddSuccess) ? onAddSuccess(result.data.role) : undefined;

                //clear form
                this.getRoleAddDialog().clearForm();
            }.bind(this),
            failure: function failure(result) {
                _antd.message.error(result.msg);
            },
            complete: function () {
                hideMessage();
                this.getRoleAddDialog().formLeaveLoading();
            }.bind(this)
        });
    },
    handleCancel: function handleCancel() {

        c("handleCancel");
    },
    componentDidMount: function componentDidMount() {},
    render: function render() {
        var _state = this.state,
            title = _state.title,
            auths = _state.auths,
            menus = _state.menus;


        var authOptions = [];

        if (!isUndefined(auths) && auths.length >= 1) {
            authOptions = auths.map(function (item, i) {
                var val = item.id + '';
                var title = "权限：" + item.authName + "\r\n简介:" + item.description;
                return _react2.default.createElement(
                    Option,
                    { title: title, key: item.id, value: val },
                    item.authName
                );
            }.bind(this));
        }
        var menuOptions = [];
        if (!isUndefined(menus) && menus.length >= 1) {
            // c("menus");
            // c(menus);
            menuOptions = menus.map(function (menu, i) {
                return _react2.default.createElement(
                    OptGroup,
                    { key: i, label: menu.menuName },
                    menu.child.map(function (ch, i) {
                        // c(tag);
                        var v = ch.id + '';
                        return _react2.default.createElement(
                            Option,
                            { key: ch.id, value: v },
                            ch.menuName
                        );
                    })
                );
            }.bind(this));
        }

        var formLayout = "horizontal";

        var formRows = [{
            cols: [{
                col: { span: 11 },
                label: "名称",
                id: "roleName",
                config: {
                    rules: [{ required: true, message: '请输入角色名称!' }]

                },

                input: _react2.default.createElement(_antd.Input, { placeholder: "\u8BF7\u8F93\u5165\u89D2\u8272\u540D\u79F0" })
            }, {
                col: { span: 2 },
                input: _react2.default.createElement("div", null)
            }, {
                col: { span: 11 },
                label: "状态",
                id: "status",
                config: {
                    rules: [{ required: true, message: '请输入状态!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    { placeholder: "\u8BF7\u8F93\u5165\u72B6\u6001" },
                    _react2.default.createElement(
                        Option,
                        { value: "1" },
                        "\u6B63\u5E38"
                    ),
                    _react2.default.createElement(
                        Option,
                        { value: "2" },
                        "\u51BB\u7ED3"
                    )
                )
            }]

        }, {
            cols: [{
                col: { span: 24 },
                label: "权限",
                id: "authIds",
                config: {
                    rules: [{ required: false, message: '请选择权限!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        showSearch: true,
                        mode: "multiple",
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u6743\u9650",
                        placeholder: "\u8BF7\u9009\u62E9\u6743\u9650",
                        style: { width: '100%' }
                    },
                    authOptions
                )
            }]
        }, {
            cols: [{
                col: { span: 24 },
                label: "菜单",
                id: "menuIds",
                config: {
                    rules: [{ required: false, message: '请选择菜单!' }]
                },

                input: _react2.default.createElement(
                    _antd.Select,
                    {
                        showSearch: true,
                        mode: "multiple",
                        optionFilterProp: "children",
                        notFoundContent: "\u65E0\u76F8\u5173\u83DC\u5355",
                        placeholder: "\u8BF7\u9009\u62E9\u83DC\u5355",
                        style: { width: '100%' }
                    },
                    menuOptions
                )
            }]
        }, {
            cols: [{
                col: { span: 24 },
                label: "简介",
                id: "description",
                config: {
                    rules: [{ required: true, message: '请输入简介!' }]
                },

                input: _react2.default.createElement(TextArea, { placeholder: "\u8BF7\u8F93\u5165\u7B80\u4ECB", autosize: { minRows: 4, maxRows: 8 } })
            }]

        }];
        return _react2.default.createElement(_edit_dialog_temple2.default, {
            title: title,
            formRows: formRows,
            handleSubmit: this.handleSubmit,
            handleCancel: this.handleCancel,
            ref: "role_add_dialog" });
    }
});

exports.default = RoleAddDialog; //将App组件导出

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _moment = __webpack_require__(10);

var _moment2 = _interopRequireDefault(_moment);

var _reactRouterDom = __webpack_require__(4);

__webpack_require__(40);

__webpack_require__(2);

var _vm_util = __webpack_require__(3);

var _edit_dialog_temple = __webpack_require__(5);

var _edit_dialog_temple2 = _interopRequireDefault(_edit_dialog_temple);

var _admin_login_logs_table = __webpack_require__(41);

var _admin_login_logs_table2 = _interopRequireDefault(_admin_login_logs_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import "antd/dist/antd.css";
var Option = _antd.Select.Option;
var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Footer = _antd.Layout.Footer,
    Slider = _antd.Layout.Slider;

var SubMenu = _antd.Menu.SubMenu;
var Search = _antd.Input.Search;
var TextArea = _antd.Input.TextArea;

var AdminLoginLogsPage = _react2.default.createClass({
    displayName: "AdminLoginLogsPage",

    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {
        this.getAdminLoginLogsTable().loadAdminLoginLogsTableData();
    },
    getAdminLoginLogsTable: function getAdminLoginLogsTable() {
        return this.refs.admin_login_logs_table;
    },

    render: function render() {

        return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_admin_login_logs_table2.default, {
                ref: "admin_login_logs_table" })
        );
    }
});

exports.default = (0, _reactRouterDom.withRouter)(AdminLoginLogsPage); //将App组件导出

/***/ }),
/* 133 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);