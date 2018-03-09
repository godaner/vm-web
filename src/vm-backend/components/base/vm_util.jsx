import {Layout, Menu, Breadcrumb, Icon, Select, DatePicker, message, notification, Button, Table, Input} from 'antd';
import ReactDOM from 'react-dom';
import React from 'react';
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
    ajaxError: "访问服务器失败,请稍后重试",
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
    contentType: {
        TEXT: "text/plain",
        JSON: "application/json",
        DEFAULT: "application/x-www-form-urlencoded"
    }
};


var commons = {
    updateObjByKey(objArr,key,keyVal,newObj){
        var newArr = [];
        for(var i =0;i<objArr.length;i++){
            var obj = objArr[i];
            if(obj[key] == keyVal){
                newArr.push(newObj);
            }else{
                newArr.push(obj);
            }
        }
        return newArr;
    },
    getObjByKey(objArr,key,keyVal){
        for(var i =0;i<objArr.length;i++){
            var obj = objArr[i];
            if(obj[key] == keyVal){
                return obj;
            }
        }
    },
    undefined2EmptyStr(obj){
        if(isUndefined(obj)){
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
