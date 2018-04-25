import React from "react";
import {Avatar, Dropdown, Form, Layout, Menu, message} from "antd";
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
            checkUrl: "/admin/online",
            logoutUrl: "/admin/logout",
            tipOfLogouting: "正在登出",
            admin: {},
            colorList: ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'],
            pollingTimer: undefined,
            pollingInterval: 600,
            connected: false,
            stompClient: undefined
        };
    },
    updateConnected(connected){
        this.setState({connected});
    },
    updateStompClient(stompClient){
        this.setState({stompClient});
    },
    connectOnlineStatusWS(accessToken){
        let {stompClient} = this.state;
        if (isUndefined(accessToken) || !isUndefined(stompClient)) {
            return;
        }
        let url = vm_config.http_url_prefix + '/adminWS/ep_admin_ws';
        let socket = new SockJS(url);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            c('Connected: ' + frame);
            stompClient.subscribe('/user/' + accessToken + '/adminOnlineStatus', function (res) {
                const {code, msg} = JSON.parse(res.body);
                message.info(msg);
                this.whenAdminOffline();
            });
            this.updateStompClient(stompClient);
            this.updateConnected(true);

        }.bind(this));
    },
    disConnectOnlineStatusWS(){
        const {stompClient} = this.state;
        if (isUndefined(stompClient)) {
            return;
        }
        stompClient.disconnect();
        this.updateStompClient(undefined);
        this.updateConnected(false);
    },
    componentDidMount(){
        // this.checkOnlineAdmin();
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
    },
    updateAdmin(admin){
        this.setState({admin});
    },
    whenAdminOffline(){
        window.EventsDispatcher.showLoginDialog();

        window.EventsDispatcher.updateLoginAdminInfo(undefined);

        window.EventsDispatcher.stopPollingCheckOnlineAdmin();

        this.disConnectOnlineStatusWS();
    },
    whenAdminOnline(admin){
        window.EventsDispatcher.updateLoginAdminInfo(admin);

        window.EventsDispatcher.startPollingCheckOnlineAdmin();

        this.connectOnlineStatusWS(admin.token);
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

                message.success(result.msg);

                this.whenAdminOffline();
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
