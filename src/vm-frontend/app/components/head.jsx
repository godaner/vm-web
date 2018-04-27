import React from "react";
import {ajax, commons} from './vm_util'; //引入react组件
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
            user: {},//默认为空对象
            pollOnlineUserStatusTimer: undefined,
            pollOnlineUserStatusTimerInterval: vm_config.online_user_polling_interval,
            isFirstVisitPage: true,//用于辅助轮询
            connected: false,
            stompClient: undefined,
            subscriptions: []
        };
    },
    updateConnected(connected){
        this.setState({connected});
    },
    updateStompClient(stompClient){
        this.setState({stompClient});
    },
    updateSubscriptions(subscriptions){

        this.setState({subscriptions});
    },
    connectOnlineStatusWS(accessToken){


        // c(this.state);
        let {stompClient, connected} = this.state;
        if (isUndefined(accessToken) || connected) {
            return;
        }
        if (isUndefined(stompClient)) {
            let url = vm_config.http_url_prefix + '/userWS/ep_user_ws';
            let socket = new SockJS(url);
            stompClient = Stomp.over(socket);
            stompClient.heartbeat.outgoing = 10000;  // client will send heartbeats every 20000ms
            stompClient.heartbeat.incoming = 10000;      // client does not want to receive heartbeats from the server
            stompClient.connect({}, function (frame) {
                c('Consocketnected: ' + frame);
                this.updateStompClient(stompClient);
                this.subscribe(stompClient, accessToken);
            }.bind(this));
        } else {

            this.subscribe(stompClient, accessToken);
        }

    },
    subscribe(stompClient, accessToken){
        const {
            USER_IS_LOGIN_IN_OTHER_AREA,
            USER_LOGIN_TIMEOUT,
            USER_IS_FROZENED,
            USER_IS_DELETED,
            USER_INFO_IS_UPDATED
        } = this.state;
        this.updateConnected(true);
        let subscription = stompClient.subscribe('/user/' + accessToken + '/userOnlineStatus', function (res) {
            let r = JSON.parse(res.body);
            c(r);

            let {code, msg, data} = r;
            if (USER_IS_LOGIN_IN_OTHER_AREA == code) {
                this.whenUserOffline({
                    msg:"异地登陆"
                });
            } else if (USER_LOGIN_TIMEOUT == code) {
                this.whenUserOffline({
                    msg:"登录超时"
                });
            } else if (USER_IS_FROZENED == code) {

                this.whenUserOffline({
                    msg:"账户被冻结"
                });
            } else if (USER_IS_DELETED == code) {

                this.whenUserOffline({
                    msg:"账户被删除"
                });
            } else if (USER_INFO_IS_UPDATED == code) {
                this.whenUserOffline({
                    msg:"账户信息被更新"
                });
            }

        }.bind(this));
        this.updateSubscriptions([subscription]);
    },
    whenUserOffline(args){
        let {msg} = args;


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
    whenUserOnline(user){
        this.startPollOnlineUserStatus();
        this.connectOnlineStatusWS(user.token);
        this.closeLoginDialog();//!!!防止用户登陆后再次点开登录框!!!
        window.VmFrontendEventsDispatcher.updateImgUploaderImgUrl(user.imgUrl);
        this.updateStateUser(user);
    },
    disConnectOnlineStatusWS(){
        let {subscriptions, connected, stompClient} = this.state;
        c("disConnectOnlineStatusWS");
        c(this.state);
        if (!connected && !isUndefined(stompClient)) {
            return;
        }
        for (let i = 0; i < subscriptions.length; i++) {
            subscriptions[i].unsubscribe();
        }
        this.updateConnected(false);
    },
    componentDidMount: function () {
        this.registEvents();
        this.startPollOnlineUserStatus();


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
                if (!isOnline) {//online ?
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
    setPollOnlineUserStatusTimer: function (pollOnlineUserStatusTimer) {
        var state = this.state;
        state.pollOnlineUserStatusTimer = pollOnlineUserStatusTimer;
        this.setState(state);
    },
    registEvents: function () {
        //注册更新头像事件
        window.eventEmit.on('updateHeadComponentUser', (newUser) => {
            this.updateStateUser(newUser);
        });

        //检测用户是否有在线
        window.eventEmit.on('feelerOnlineUser', (args) => {
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
        window.eventEmit.on('getOnlineUser', (args) => {

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
        window.eventEmit.on('protectPage', () => {
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

        this.startPollOnlineUserStatus();
    },
    showRegistDialog: function () {
        this.refs.regist_dialog.showRegistDialog();
    },
    closeRegistDialog: function () {
        this.refs.regist_dialog.closeRegistDialog();
    },
    onRegistSuccess: function (user) {
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
                this.whenUserOffline({msg: result.msg});
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
            var headImgUrl = commons.generateImgUrl({
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