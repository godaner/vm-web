import {message, Select} from "antd";
import React from "react";
const Option = Select.Option;
function fail(code) {
    return code < 0;
}

function success(code) {
    return code > 0;
}


/**
 * json用data传递-后台使用@RequestBody;<br/>
 * 非json用url拼接-后台使用@RequestParam
 * @type {{ajaxError: string, requestServerSuccess: ajax.requestServerSuccess, requestServerError: ajax.requestServerError, ajax: ajax.ajax, get: ajax.get, put: ajax.put, post: ajax.post, contentType: {TEXT: string, JSON: string}}}
 */
var ajax = {
    ajaxError: "网络不佳,请稍后重试",
    ajax: function (args) {

        //handler args.async
        if (isUndefined(args.async)) {
            args.async = true;
        }

        //handle args.contentType
        if (isUndefined(args.contentType)) {
            // args.contentType = "application/json";
            args.contentType = ajax.contentType.DEFAULT;
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
        c("Request args is : ");
        c(args);
        c("Request url is : ");
        c(args.url);
        c("Request data is : ");
        c(args.data);
        $.ajax({
            url: vm_config.http_url_prefix + args.url,
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
                    args.failure(result);
                }
            }.bind(this),
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //tip
                message.error(this.ajaxError);

                if (!isUndefined(args.error)) {
                    args.error(args, XMLHttpRequest, textStatus, errorThrown);
                }
            }.bind(this),
            complete: function (XMLHttpRequest, textStatus) {
                if (!isUndefined(args.complete)) {
                    args.complete(args, XMLHttpRequest, textStatus);
                }
            }.bind(this),
        });
    },
    get: function (args) {
        args.type = "GET";
        this.ajax(args);
    },
    put: function (args) {
        args.type = "PUT";
        this.ajax(args);
    },
    post: function (args) {
        args.type = "POST";
        this.ajax(args);
    },
    delete: function (args) {
        args.type = "DELETE";
        args.contentType = ajax.contentType.JSON;//!!!delete比较特殊，无法采用DEFAULT: "application/x-www-form-urlencoded"方式
        this.ajax(args);
    },
    contentType: {
        TEXT: "text/plain",
        JSON: "application/json",
        DEFAULT: "application/x-www-form-urlencoded"
    }
};


var commons = {
    toStrArr(notStrArr){
        for (var i = 0; i < notStrArr.length; i++) {
            notStrArr[i] = notStrArr[i] + '';
        }
        return notStrArr;
    },
    getOptions(args){
        var {start, data} = args;
        if (isUndefined(start)) {
            start = 1
        }

        var options = [];
        for (var i = 0; i < data.length; i++) {
            const v = i + start + '';
            options.push(<Option key={i} value={v}>{data[i]}</Option>);
        }
        return options;
    },
    getSexStrs(){
        return ['男', '女', '未知'];
    },
    getSexOptions(){

        const sexs = commons.getSexStrs();

        return commons.getOptions({data: sexs});
    },
    getBloodTypeStrs(){
        return ['A', 'B', 'AB', 'O', 'E', '未知'];
    },
    getBloodTypeStrByIndex(args){
        const {index} = args

        const bloodTypes = commons.getBloodTypeStrs();

        return bloodTypes[index - 1];
    },
    getBloodTypeOptions(){

        const bloodTypes = commons.getBloodTypeStrs();

        return commons.getOptions({data: bloodTypes});
    },
    getSexStrByIndex(args){
        const {index} = args

        const sexs = ['男', '女', '未知'];

        return sexs[index - 1];
    },
    getConsStrs(){
        return ['魔羯', '水瓶', '双鱼', '牡羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '魔羯'];
    },
    getConStrByIndex(args){
        const {index} = args;

        const consStr = commons.getCons();

        return consStr[index];
    },
    getConStrByDate(args){
        const {date} = args;

        const index = commons.transConIntByDate({date, date});


        return commons.transConStrByIndex(index);
    },
    getConIntByDate(args){
        const {date} = args;
        const month = date.getMonth() + 1
        const day = date.getDay();
        return month - (day < "102223444433".charAt(month - 1) - -19);   //输出0～12的数字，0表示摩羯，1表示水瓶，依此类推，...，11是射手，12是摩羯。
    },

    generateImgUrl(args){
        const {width, imgUrl} = args;
        if (isUndefined(width)) {
            return vm_config.http_url_prefix + imgUrl;
        }
        return vm_config.http_url_prefix + imgUrl + "/" + width;
    },
    makeTipSpan(text, len){
        if (isUndefined(len)) {
            len = 20;
        }
        var sText = text.substring(0, len);

        if (text.length > 20) {
            sText += "...";
        }
        return <span title={text}>{sText}</span>
    },
    /**
     * 对url添加时间戳
     * @param url
     * @returns {*}
     */
    timestamp(url){
        //  var getTimestamp=Math.random();
        var t = new Date().getTime();
        url = addUrlParam({
            url: url,
            obj: {
                t: t
            }
        })
        c(url);
        return url;
    },

    /**
     * 对url添加参数,替换原有参数
     * @param url
     * @returns {*}
     */
    addUrlParam(args){

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

    changeUrlParam(url, arg, val){
        var pattern = arg + '=([^&]*)';
        var replaceText = arg + '=' + val;
        return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
    },
    /**
     * 获取指定的URL参数值
     * URL:http://www.quwan.com/index?name=tyler
     * 参数：paramName URL参数
     * 调用方法:getParam("name")
     * 返回值:tyler
     */
    getUrlParam(url, variable) {

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
    objDeepCopy(obj){
        if(isUndefined(obj)){
            return undefined;
        }
        var str, newobj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        } else if (window.JSON) {
            str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
        } else {
            for (var i in obj) {
                newobj[i] = typeof obj[i] === 'object' ?
                    cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;

    },
    clone(obj){

        return commons.objDeepCopy(obj);

    },
    updateObjByKey(objArr, key, keyVal, newObj){
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
    getObjByKey(objArr, key, keyVal){
        for (var i = 0; i < objArr.length; i++) {
            var obj = objArr[i];
            if (obj[key] == keyVal) {
                //深拷贝
                return commons.objDeepCopy(obj);
            }
        }
    },
    getFieldListByKey(objArr, keyName){
        var retArr = [];
        for (var i = 0; i < objArr.length; i++) {
            var obj = objArr[i];
            retArr.push(obj[keyName]);
        }
        return retArr;
    },
    undefined2EmptyStr(obj){
        if (isUndefined(obj)) {
            return "";
        }
    },
    highLight: function (sourceText, highLightText) {
        if (isUndefined(highLightText)) {
            return sourceText;
        }
        sourceText = sourceText.replace(highLightText, "");
        return <span><span style={{color: "red"}}>{highLightText}</span>{sourceText}</span>;
    }
};

exports.commons = commons;
exports.ajax = ajax;
