var req;
var visitID;


/**
 * 獲取拜访记录參數
 * @param prefix如    admins.
 * @returns {String}
 */
function getVisitInfoObj() {
    // 获取当前的网址
    var link = window.location.href;
    // 获取上页地址
    var oldlink = document.referrer;
    // 获取当前访问页的标题
    var titleName = document.title;
    // 屏幕分辨率
    var screen = window.screen.width + "*" + window.screen.height;
    // 异步请求发送
    /*  url =  url + "?ip="+ip+"page=" + escape(link) + "&oldlink=" + escape(oldlink) + "&title="
     *  + escape(titleName) + "&sys=" + getSysInfo() + "&s=" + screen + "&b=" + GetBrowserType() +
     *  " " + GetBrowserVersion() + "&c=" + remote_ip_info.cuntry +"&p=" + remote_ip_info.province +
     *  "&c=" + remote_ip_info.city + "&k=" + GetKeyword(oldlink);
     *
     *  */

    /*var returnCitySN = {"cip": "180.120.216.21", "cid": "320600", "cname": "江苏省南通市"};*/
    /*var remote_ip_info = {"ret":1,"start":-1,"end":-1,"country":"\u4e2d\u56fd","province":"\u6c5f\u82cf","city":"\u5357\u901a","district":"","isp":"","type":"","desc":""};*/

    return {
        ip: returnCitySN.cip,
        page: escape(link),
        oldLink: escape(oldlink),
        title: escape(titleName),
        system: getSysInfo(),
        dpi: screen,
        browser: GetBrowserType() + " " + GetBrowserVersion(),
        country: remote_ip_info.country,
        province: remote_ip_info.province,
        city: remote_ip_info.city,
        keyword: GetKeyword(oldlink)
    };
}


/**
 * 獲取拜访记录參數
 * @param prefix如    admins.
 * @returns {String}
 */
function getVisitInfo() {
    // 获取当前的网址
    var link = window.location.href;
    // 获取上页地址
    var oldlink = document.referrer;
    // 获取当前访问页的标题
    var titleName = document.title;
    // 屏幕分辨率
    var screen = window.screen.width + "*" + window.screen.height;
    // 异步请求发送
    /*  url =  url + "?ip="+ip+"page=" + escape(link) + "&oldlink=" + escape(oldlink) + "&title="
     *  + escape(titleName) + "&sys=" + getSysInfo() + "&s=" + screen + "&b=" + GetBrowserType() +
     *  " " + GetBrowserVersion() + "&c=" + remote_ip_info.cuntry +"&p=" + remote_ip_info.province +
     *  "&c=" + remote_ip_info.city + "&k=" + GetKeyword(oldlink);
     *
     *  */

    /*var returnCitySN = {"cip": "180.120.216.21", "cid": "320600", "cname": "江苏省南通市"};*/
    /*var remote_ip_info = {"ret":1,"start":-1,"end":-1,"country":"\u4e2d\u56fd","province":"\u6c5f\u82cf","city":"\u5357\u901a","district":"","isp":"","type":"","desc":""};*/
    return "ip=" + returnCitySN.cip +
        "&page=" + escape(link) +
        "&oldLink=" + escape(oldlink) +
        "&title=" + escape(titleName) +
        "&system=" + getSysInfo() +
        "&dpi=" + screen +
        "&browser=" + GetBrowserType() + " " + GetBrowserVersion() +
        "&country=" + remote_ip_info.country +
        "&province=" + remote_ip_info.province +
        "&city=" + remote_ip_info.city +
        "&keyword=" + GetKeyword(oldlink);
}


// 获取来自搜索引擎的关键词
function GetKeyword(url) {
    if (url.toString().indexOf("baidu") > 0) {
        return request(url, "wd");
    }
    else if (url.toString().indexOf("google") > 0) {
        return request(url, "q");
    }
    else if (url.toString().indexOf("sogou") > 0) {
        return request(url, "query");
    }
    else if (url.toString().indexOf("soso") > 0) {
        return request(url, "w");
    }
    else {
        return "";
    }
}

// 获取链接地址中某个参数的值
function request(url, paras) {
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}


// 回调函数，可以获取添加后的访问ID，以便其他操作。
function callback() {
    if (req.readyState == 4) {
        if (req.status == 200) {
            visitID = req.responseText.toString();
        }
        else {

        }
    }
    else {

    }
}


// 获取系统信息
function getSysInfo() {

    var ua = navigator.userAgent.toLowerCase();
    isWin7 = ua.indexOf("nt 6.1") > -1
    isVista = ua.indexOf("nt 6.0") > -1
    isWin2003 = ua.indexOf("nt 5.2") > -1
    isWinXp = ua.indexOf("nt 5.1") > -1
    isWin2000 = ua.indexOf("nt 5.0") > -1
    isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1)
    isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1)
    isAir = (ua.indexOf("adobeair") != -1)
    isLinux = (ua.indexOf("linux") != -1)
    var broser = "";
    if (isWin7) {
        sys = "Windows 7";
    } else if (isVista) {
        sys = "Vista";
    } else if (isWinXp) {
        sys = "Windows xp";
    } else if (isWin2003) {
        sys = "Windows 2003";
    } else if (isWin2000) {
        sys = "Windows 2000";
    } else if (isWindows) {
        sys = "Windows";
    } else if (isMac) {
        sys = "Macintosh";
    } else if (isAir) {
        sys = "Adobeair";
    } else if (isLinux) {
        sys = "Linux";
    } else {
        sys = "Unknow";
    }
    return sys;
}

// 获取浏览器类型
function GetBrowserType() {

    var ua = navigator.userAgent.toLowerCase();

    if (ua == null) return "ie";

    else if (ua.indexOf('chrome') != -1) return "chrome";

    else if (ua.indexOf('opera') != -1) return "opera";

    else if (ua.indexOf('msie') != -1) return "ie";

    else if (ua.indexOf('safari') != -1) return "safari";

    else if (ua.indexOf('firefox') != -1) return "firefox";

    else if (ua.indexOf('gecko') != -1) return "gecko";

    else return "ie";

}

// 获取浏览器版本
function GetBrowserVersion() {

    var ua = navigator.userAgent.toLowerCase();

    if (ua == null) return "null";

    else if (ua.indexOf('chrome') != -1) return ua.substring(ua.indexOf('chrome') + 7, ua.length).split(' ')[0];

    else if (ua.indexOf('opera') != -1) return ua.substring(ua.indexOf('version') + 8, ua.length);

    else if (ua.indexOf('msie') != -1) return ua.substring(ua.indexOf('msie') + 5, ua.length - 1).split(';')[0];

    else if (ua.indexOf('safari') != -1) return ua.substring(ua.indexOf('safari') + 7, ua.length);

    else if (ua.indexOf('gecko') != -1) return ua.substring(ua.indexOf('firefox') + 8, ua.length);

    else return "null";

}