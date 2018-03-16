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
            tipOfOffLine: "您已离线",
            onlineUserBasicInfoUrl: "/user/online/basicInfo",

            //用户未登录时受保护的页面，用于用户注销后或者被动离线后调用
            protectedUserPageLists: ["/user/[0-9/_-a-zA-Z]*"],
            user: {},//默认为空对象
            pollOnlineUserStatusTimer: undefined,
            pollOnlineUserStatusTimerInterval: 10000,
            isFirstVisitPage: true//用于辅助轮询
        };
    },
    componentDidMount: function () {
        this.registEvents();
        //刷新页面后轮询获取在线用户，如果用户不在线，那么保护页面
        this.startPollOnlineUserStatus();
        //set is first visit page flag
    },
    setIsFirstVisitPage: function (bol) {
        var state = this.state;
        state.isFirstVisitPage = bol;
        this.setState(state);
    },
    stopPollOnlineUserStatus: function () {
        if (!isUndefined(this.state.pollOnlineUserStatusTimer)) {
            clearInterval(this.state.pollOnlineUserStatusTimer);
            this.setPollOnlineUserStatusTimer(undefined);
        }
    },
    startPollOnlineUserStatus: function () {
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
    pollOnlineUserStatus: function () {
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
                    this.closeLoginDialog();//!!!防止用户登陆后再次点开登录框!!!
                }
                this.setIsFirstVisitPage(false);
            }.bind(this)
        });
    },
    setPollOnlineUserStatusTimer: function (pollOnlineUserStatusTimer) {
        var state = this.state;
        state.pollOnlineUserStatusTimer = pollOnlineUserStatusTimer;
        this.setState(state);
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
                ignoreAjaxError: true,
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
        this.startPollOnlineUserStatus();
    },
    showRegistDialog: function () {
        this.refs.regist_dialog.showRegistDialog();
    },
    closeRegistDialog: function () {
        this.refs.regist_dialog.closeRegistDialog();
    },
    onRegistSuccess: function (user) {
        this.updateStateUser(user);
        this.startPollOnlineUserStatus();
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

    logout: function () {
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
            var headImgUrl = generateImgUrl({
                imgUrl: this.state.user.imgUrl,
                width: 50
            });
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