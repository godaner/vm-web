import React from "react";
import {Avatar, Dropdown, Form, Layout, Menu, message, notification} from "antd";
//import "antd/dist/antd.css";
import "../../scss/index/head.scss";
import "../base/events_dispatcher";
import {ajax} from "../base/vm_util";
const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

var Head = React.createClass({
    getInitialState: function () {
        return {
            USER_IS_LOGIN_IN_OTHER_AREA: -1,
            USER_LOGIN_TIMEOUT: -2,
            UPDATE_MENU_TREE: -3,
            ADMIN_IS_FROZENED: -4,
            ADMIN_IS_DELETED: -5,
            ADMIN_INFO_IS_UPDATED: -6,
            checkUrl: "/admin/online",
            logoutUrl: "/admin/logout",
            tipOfLogouting: "正在登出",
            admin: {},
            colorList: ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'],
            pollingTimer: undefined,
            pollingInterval: 600000,//ms
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

        c("disConnectOnlineStatusWS");
        c(this.state);
        let {stompClient, connected} = this.state;
        if (isUndefined(accessToken) || connected) {
            return;
        }
        if (isUndefined(stompClient)) {
            let url = vm_config.http_url_prefix + '/adminWS/ep_admin_ws';
            let socket = new SockJS(url);
            stompClient = Stomp.over(socket);
            stompClient.heartbeat.outgoing = 1000;  // client will send heartbeats every 20000ms
            stompClient.heartbeat.incoming = 1000;      // client does not want to receive heartbeats from the server
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
            UPDATE_MENU_TREE,
            ADMIN_IS_FROZENED,
            ADMIN_IS_DELETED,
            ADMIN_INFO_IS_UPDATED
        } = this.state;
        this.updateConnected(true);
        let subscription = stompClient.subscribe('/user/' + accessToken + '/adminOnlineStatus', function (res) {
            let r = JSON.parse(res.body);
            c(r);

            let {code, msg, data} = r;
            let tipTitle, tipDuration=null;
            if (USER_IS_LOGIN_IN_OTHER_AREA == code) {
                let {loginRecord} = data;
                loginRecord.createTime = timeFormatter.formatTime(timeFormatter.int2Long(loginRecord.createTime));
                msg = " 账户在 [ " + loginRecord.country + "-" + loginRecord.province + "-" + loginRecord.city + "] 登陆 , ip 为 :" + loginRecord.loginIp + " , 时间 : " + loginRecord.createTime;
                tipTitle = '异地登陆警告';
                this.whenAdminOffline({
                    tipType: 'warning',
                    tipTitle: tipTitle,
                    tipMsg: msg,
                    tipDuration: tipDuration
                });
            } else if (USER_LOGIN_TIMEOUT == code) {
                tipTitle = '登录超时警告';
                let {time} = data;
                time = timeFormatter.formatTime(timeFormatter.int2Long(time));
                msg = " 账户登录超时 , 时间 : " + time;
                this.whenAdminOffline({
                    tipType: 'warning',
                    tipTitle: tipTitle,
                    tipMsg: msg,
                    tipDuration: tipDuration
                });
            } else if (UPDATE_MENU_TREE == code) {
                tipTitle = '菜单更新';
                let {newMenuTree} = data;
                msg = " 账户菜单已被更新 !";
                notification['warning']({
                    message: tipTitle,
                    description: msg,
                    duration: tipDuration
                });
                window.EventsDispatcher.updateAdminMenuTree(newMenuTree);
            } else if (ADMIN_IS_FROZENED == code) {
                tipTitle = '冻结警告';
                let {time} = data;
                time = timeFormatter.formatTime(timeFormatter.int2Long(time));
                msg = " 账户已被冻结 , 时间 : " + time;
                this.whenAdminOffline({
                    tipType: 'warning',
                    tipTitle: tipTitle,
                    tipMsg: msg,
                    tipDuration: tipDuration
                });
            } else if (ADMIN_IS_DELETED == code) {
                tipTitle = '删除警告';
                let {time} = data;
                time = timeFormatter.formatTime(timeFormatter.int2Long(time));
                msg = " 账户已被删除 , 时间 : " + time;
                this.whenAdminOffline({
                    tipType: 'warning',
                    tipTitle: tipTitle,
                    tipMsg: msg,
                    tipDuration: tipDuration
                });
            } else if (ADMIN_INFO_IS_UPDATED == code) {
                tipTitle = '账户信息更新提示';
                let {newAdmin,time} = data;

                time = timeFormatter.formatTime(timeFormatter.int2Long(time));
                msg = " 账户信息已被远端更新 , 时间 : " + time;
                notification['warning']({
                    message: tipTitle,
                    description: msg,
                    duration: tipDuration
                });
                window.EventsDispatcher.updateLoginAdminInfo(newAdmin);
            }

        }.bind(this));
        this.updateSubscriptions([subscription]);
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
    componentDidMount(){

        this.startPollingCheckOnlineAdmin();
        this.registEvents();


    },
    startPollingCheckOnlineAdmin(){
        let {pollingInterval, pollingTimer} = this.state;
        if (!isUndefined(pollingTimer)) {
            return;
        }
        this.checkOnlineAdmin();
        pollingTimer = setInterval(function () {
            this.checkOnlineAdmin();
        }.bind(this), pollingInterval);
        this.updatePollingTimer(pollingTimer);
    },
    stopPollingCheckOnlineAdmin(){
        const {pollingTimer} = this.state;
        clearInterval(pollingTimer);
        this.updatePollingTimer(undefined);

    },
    updatePollingTimer(pollingTimer){
        this.setState({pollingTimer});
    },
    registEvents(){
        window.eventEmitEmitter.on('stopPollingCheckOnlineAdmin', () => {//当用户直接在地址栏输入url时，回显nav
            this.stopPollingCheckOnlineAdmin();
        });
        window.eventEmitEmitter.on('startPollingCheckOnlineAdmin', () => {//当用户直接在地址栏输入url时，回显nav
            this.startPollingCheckOnlineAdmin();
        });

        window.eventEmitEmitter.on('updateLoginAdminInfo', (admin) => {//登录，注销等情况

            if (isUndefined(admin)) {
                admin = {};
            }
            this.updateAdmin(admin);
        });
        window.eventEmitEmitter.on('connectOnlineStatusWS', (token) => {

            this.connectOnlineStatusWS(token)
        });
        window.eventEmitEmitter.on('disConnectOnlineStatusWS', () => {

            this.disConnectOnlineStatusWS()
        });
    },
    updateAdmin(admin){
        this.setState({admin});
    },
    whenAdminOffline(args){
        args = isUndefined(args) ? {} : args;
        let {tipType, tipTitle, tipMsg, tipDuration} = args;

        window.EventsDispatcher.disConnectOnlineStatusWS();

        window.EventsDispatcher.showLoginDialog();

        window.EventsDispatcher.updateLoginAdminInfo(undefined);

        window.EventsDispatcher.stopPollingCheckOnlineAdmin();

        if (isUndefined(tipMsg)) {
            return;
        }


        // warning
        tipType = isUndefined(tipType) ? 'open' : tipType;
        tipTitle = isUndefined(tipTitle) ? '信息' : tipTitle;

        notification[tipType]({
            message: tipTitle,
            description: tipMsg,
            duration: tipDuration
        });
    },
    whenAdminOnline(admin){
        window.EventsDispatcher.connectOnlineStatusWS(admin.token);

        window.EventsDispatcher.updateLoginAdminInfo(admin);

        // window.EventsDispatcher.startPollingCheckOnlineAdmin();

    },
    checkOnlineAdmin(){

        const {checkUrl} = this.state;

        ajax.get({
            url: checkUrl,
            ignoreAjaxError: true,
            success: function (result) {
                const {admin} = result.data;
                if (isUndefined(admin)) {

                    this.whenAdminOffline();

                } else {

                    this.whenAdminOnline(admin);
                }


            }.bind(this),
            failure: function (result) {
                window.EventsDispatcher.showLoginDialog();
            },
            error: function () {//出现错误
                window.EventsDispatcher.showLoginDialog();
            },
            complete: function () {

            }.bind(this)
        });
    },
    logout(){
        const {logoutUrl, tipOfLogouting} = this.state;

        const hiddenMessage = message.loading(tipOfLogouting, 0);

        ajax.put({
            url: logoutUrl,
            success: function (result) {

                this.whenAdminOffline({
                    tipType: 'success',
                    tipTitle: '注销提示',
                    tipMsg: result.msg
                });
            }.bind(this),
            failure: function (result) {
                message.error(result.msg);
            },
            complete: function () {
                hiddenMessage();
            }.bind(this)
        });
    },
    render () {
        const {admin, colorList} = this.state;
        const username = admin.username;
        const color = colorList[0];


        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.logout}>注销</a>
                </Menu.Item>

            </Menu>
        );
        //set now page's props
        return (

            <div id="head">
                <div style={{fontSize: 25, color: '#22B9FF', float: 'left'}}>
                    VM后台管理系统
                </div>
                <div style={{color: '#22B9FF', float: 'right'}}>


                    <Dropdown overlay={menu}>
                        <Avatar style={{cursor: "pointer", backgroundColor: color, verticalAlign: 'middle'}}
                                size="large">
                            {username}
                        </Avatar>

                    </Dropdown>
                </div>
            </div>
        );
    }
});

export default Head;   //将App组件导出
