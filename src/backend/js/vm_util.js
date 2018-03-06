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

    requestServerSuccess: function (args, result) {
        if (isUndefined(result)) {
            return;
        }
        if (fail(result.code) && !isUndefined(args.onResponseFailure)) {
            args.onResponseFailure(result);
        }
        if (success(result.code) && !isUndefined(args.onResponseSuccess)) {
            args.onResponseSuccess(result);
        }

    },
    requestServerError: function (args, XMLHttpRequest, textStatus, errorThrown) {
        console.error(XMLHttpRequest);
        console.error(textStatus);
        console.error(errorThrown);

        // window.VmFrontendEventsDispatcher.showMsgDialog(this.ajaxError, function () {
        //
        // });
        if (!isUndefined(args.onRequestError)) {
            args.onRequestError();
        }


    },
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
        //handle args.loadingMsg
        // if (!isUndefined(args.loadingMsg)) {
        //     window.EventsDispatcher.showLoading(args.loadingMsg);
        // }
        // c("request data is : ");
        // c(args);
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
                this.requestServerSuccess(args, result);
            }.bind(this),
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                this.requestServerError(args, XMLHttpRequest, textStatus, errorThrown);
            }.bind(this)
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


