import React from "react"; //引入react组件
import {EventEmitter} from "events";
window.eventEmitter = new EventEmitter();
//项目前端事件分发器
window.EventsDispatcher = {
    event: window.eventEmitter,
    showLoginDialog() {
        this.event.emit('showLoginDialog');
    },
    onRouteEnter (args) {
        this.event.emit('onRouteEnter', args);
    },
    onTagAddSuccess (record) {
        this.event.emit('onTagAddSuccess', record);
    },
    loadTagTableData() {
        this.event.emit('loadTagTableData');
    },
    onMovieSrcVersionAddSuccess (record) {
        this.event.emit('onMovieSrcVersionAddSuccess', record);
    },
    loadMovieSrcVersionTableData() {
        this.event.emit('loadMovieSrcVersionTableData');
    },
    updateLoginAdminInfo(admin) {//用户check，注销，登录调用
        this.event.emit('updateLoginAdminInfo', admin);
    },
    updateAdminMenuTree(menuTree) {
        this.event.emit('updateAdminMenuTree', menuTree);
    },
    backToHomePage(){

        this.event.emit('backToHomePage');
    }
};
const eventsDispatcher = window.EventsDispatcher;
const EventsDispatcher = eventsDispatcher;


