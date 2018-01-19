import React from "react"; //引入react组件
import {Link, withRouter} from "react-router-dom";
import LoginDialog from "./login_dialog";
import RegistDialog from "./regist_dialog";
import "../scss/head.scss";
/**
 * 用户信息展示,界面跳转，保护用户界面的职责
 */
var Head = React.createClass({

    getInitialState: function () {
        return {
            logouting: "正在注销...",
            logoutSuccess: "注销成功",
            logoutFailure: "注销失败",
            accountLoginOtherArea: "账户在其他地方登录",
            sessionTimeOut: "登录超时",
            onlineUserBasicInfoUrl: "/user/online/basicInfo",

            //用户未登录时受保护的页面，用于用户注销后或者被动离线后调用
            protectedUserPageLists: ["/user/[0-9/_-a-zA-Z]*"],
            user: {},//默认为空对象
            ws: {
                url: undefined,
                obj: undefined//websocket对象
            }
        };
    },
    componentDidMount: function () {
        this.registEvents();
        //刷新页面后获取在线用户，并且建立新的ws连接，如果用户不在线，那么保护页面
        // this.getOnlineUser();
        window.VmFrontendEventsDispatcher.feelerOnlineUser({
            onFeelerOnlineUser: function (isOnline, u) {

                //update user in state
                window.VmFrontendEventsDispatcher.updateHeadComponentUser(u);

                if (!isUndefined(u)) {
                    //when user is online,open websocket
                    this.wsOpen(u.id, function () {
                        this.wsLogin();
                    }.bind(this));
                } else {
                    window.VmFrontendEventsDispatcher.protectPage();
                }
            }.bind(this)
        });

    },
    registEvents: function () {
        //注册更新头像事件
        window.event.on('updateHeadComponentUser', (newUser) => {
            this.updateStateUser(newUser);
        });

        //检测用户是否有在线
        window.event.on('feelerOnlineUser', (args) => {
            const url = "/user/feelerOnlineUser";
            ajax.get({
                url: url,
                onBeforeRequest: function () {
                }.bind(this),
                onResponseStart: function () {
                }.bind(this),
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
                }.bind(this),
                onResponseFailure: function (result) {
                }.bind(this),
                onResponseEnd: function () {
                }.bind(this),
                onRequestError: function () {
                }.bind(this)
            })

        });
        //获取用户是否有在线
        window.event.on('getOnlineUser', (args) => {

            const url = "/user/online";
            ajax.get({
                url: url,
                onBeforeRequest: function () {
                }.bind(this),
                onResponseStart: function () {
                }.bind(this),
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
                }.bind(this),
                onResponseFailure: function (result) {
                }.bind(this),
                onResponseEnd: function () {
                }.bind(this),
                onRequestError: function () {
                }.bind(this)
            })

        });

        //保护页面的职责
        window.event.on('protectPage', () => {
            c("protectPage");
            for (var i = 0; i < vm_config.protectedUserPageLists.length; i++) {
                var protectedPage = vm_config.protectedUserPageLists[i];
                c(this.props.location.pathname);
                if (this.props.location.pathname.match(protectedPage)) {
                    this.props.history.replace("/");
                    break;
                }
            }
            //update head user
            window.VmFrontendEventsDispatcher.updateHeadComponentUser(undefined);

        });
    },
    showLoginDialog: function () {
        this.refs.login_dialog.showLoginDialog();
    },
    closeLoginDialog: function () {
        this.refs.login_dialog.closeLoginDialog();
    },
    onLoginSuccess: function (user) {
        //update and show user info
        this.updateStateUser(user);
        //open ws
        this.wsOpen(user.id, function () {
            //ajax ws
            this.wsLogin();
        }.bind(this));
    },
    showRegistDialog: function () {
        this.refs.regist_dialog.showRegistDialog();
    },
    closeRegistDialog: function () {
        this.refs.regist_dialog.closeRegistDialog();
    },
    onRegistSuccess: function (user) {
        this.updateStateUser(user);
        //open ws
        this.wsOpen(user.id, function () {
            //ajax ws
            this.wsLogin();
        }.bind(this));
    },
    updateStateUser(user){
        //when login success reset user
        var state = this.state;
        if (isEmpty(user)) {
            state.user = {};
        } else {
            state.user = user;

        }
        this.setState(state);
    },
    updateStateWs: function (ws) {
        var state = this.state;
        if (isEmpty(ws)) {
            state.ws = {};
        } else {
            state.ws = ws;
        }
        this.setState(state);
    },
    wsClose: function () {
        if (undefined != this.state.ws.obj) {
            this.state.ws.obj.close();
            this.updateStateWs({
                obj: undefined,
                url: undefined
            });
        }
    },
    wsOpen: function (userId, onOpenSuccess) {

        //if ws is closed , init ws
        if (undefined == this.state.ws.obj) {
            //if have not user login , it will not open ws

            if (!isEmpty(userId)) {
                var wsUrl = vm_config.ws_url_prefix + "/ws/user/status/" + userId;
                var wsObj = new WebSocket(wsUrl);

                this.updateStateWs({
                    obj: wsObj,
                    url: wsUrl
                });

                this.state.ws.obj.onopen = function () {
                    if (!isEmpty(onOpenSuccess)) {
                        onOpenSuccess();
                    }
                }.bind(this, onOpenSuccess);
                // onmessage
                this.state.ws.obj.onmessage = function (e) {
                    this.handleWsMessage(e.data);
                }.bind(this);

            }
        }

    },
    wsSend: function (sendCallfun) {
        //open ws
        this.wsOpen(this.state.user.id, function () {
        });
        //send msg
        if (!isEmpty(this.state.ws.obj)) {
            if (this.state.ws.obj.readyState == 0) {//CONNECTING
                this.state.ws.obj.onopen = function () {
                    sendCallfun(this.state.ws.obj);
                }.bind(this, sendCallfun);
            } else if (this.state.ws.obj.readyState == 1) {//OPEN
                sendCallfun(this.state.ws.obj);
            }
        }


    },
    handleWsMessage: function (msg) {
        var message = JSON.parse(msg);
        //account login in other area
        if (message.result == WS_USER_STATUS_RESULT_CODE_LOGIN_OTHER_AREA) {
            window.VmFrontendEventsDispatcher.protectPage();
            // c("WS_USER_STATUS_RESULT_CODE_LOGIN_OTHER_AREA");
            this.httpLogout(this.state.accountLoginOtherArea, function () {
                this.wsClose();
            }.bind(this));


        }
        //session timeout
        if (message.result == WS_USER_STATUS_RESULT_CODE_SESSION_TIMEOUT) {
            window.VmFrontendEventsDispatcher.protectPage();
            // c("WS_USER_STATUS_RESULT_CODE_SESSION_TIMEOUT");
            this.httpLogout(this.state.sessionTimeOut, function () {
                this.wsClose();
            }.bind(this));
        }
    },
    wsLogout: function () {
        //ajax ws
        ajax.put({
            url: "/user/ws/ctrl/logout/" + this.state.user.id,
            onResponseSuccess: function () {
                this.wsClose();
            }.bind(this)
        });
    },
    wsLogin: function () {
        //ajax ws
        ajax.put({
            url: "/user/ws/ctrl/login/" + this.state.user.id

        });
    },
    logout(msg){

        this.httpLogout(msg, function () {
            this.wsLogout();
            window.VmFrontendEventsDispatcher.protectPage();
        }.bind(this));
    },

    httpLogout: function (msg, callfun) {
        //default msg
        if (isEmpty(msg)) {
            msg = this.state.logoutSuccess;
        }
        //show loading dialog
        window.VmFrontendEventsDispatcher.showLoading(this.state.logouting);

        const url = "/user/logout";

        ajax.put({
            url: url,
            onBeforeRequest: function () {

            }.bind(this),
            onResponseStart: function () {
                //close loading dialog
                window.VmFrontendEventsDispatcher.closeLoading();
            }.bind(this),
            onResponseSuccess: function (result) {
                //callfun
                if (!isEmpty(callfun)) {
                    callfun();
                }

                window.VmFrontendEventsDispatcher.showMsgDialog(msg);

                //update user in state
                this.updateStateUser({});


            }.bind(this),
            onResponseFailure: function (result) {
                window.VmFrontendEventsDispatcher.showMsgDialog(this.state.logoutFailure);
            }.bind(this),
            onResponseEnd: function () {
            }.bind(this)
        });


    },
    render: function () {
        //在线
        var loginStatus = function () {
            var onlineUserBasicInfoLocation = {
                pathname: this.state.onlineUserBasicInfoUrl
            };
            //imgUrl
            var headImgUrl = vm_config.http_url_prefix + this.state.user.imgUrl + "?width=50";
            return (
                <span>
                    <li>
                        <Link id="headImg_a" to={onlineUserBasicInfoLocation}>
                            <img id="headImg_img" src={headImgUrl}/>
                        </Link>
                    </li>
                    <li>
                        <Link id="username" to={onlineUserBasicInfoLocation}>
                            {this.state.user.username}

                        </Link>
                    </li>
                    <li>
                    <a href="javascript:void(0);" onClick={() => {
                        this.logout()
                    }}>注销</a>
                    </li>
                </span>
            );
        }.bind(this);
        //离线
        var logoutStatus = function () {
            return (
                <span>

                    <li>
                        <a href="javascript:void(0);" onClick={this.showLoginDialog}>登录</a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" onClick={this.showRegistDialog}>注册</a>
                    </li>
                </span>
            );
        }.bind(this);
        return (
            <div id="fragment_head_content">
                <div id="nav_div">
                    <ul id="fragment_head_nav">
                        <li id="fragment_head_nav_logo">
                            <Link to="/">
                                <span id="logo_v">V</span><span id="logo_m">M</span>
                            </Link>
                        </li>
                        <li id="user_li">
                            <ul id="user_ul">


                                {isEmpty(this.state.user) ? logoutStatus() : loginStatus()}

                            </ul>
                        </li>

                    </ul>

                </div>
                {/*与nav_div同高,用于填充nav_div脱离文档流后的空白*/}
                <div id="blank_div"></div>
                {/*登录框*/}
                <LoginDialog ref="login_dialog" onLoginSuccess={this.onLoginSuccess}/>
                {/*注册框*/}
                <RegistDialog ref="regist_dialog" onRegistSuccess={this.onRegistSuccess}/>
            </div>
        );
    }
});

export default withRouter(Head);   //将App组件导出