import React from "react";
import {ajax,commons} from './vm_util'; //引入react组件
import {EventEmitter} from "events";
window.eventEmit = new EventEmitter();
//项目前端事件分发器
window.VmFrontendEventsDispatcher = {
    event: window.eventEmit,
    showMsgDialog: function (msg, onCloseCallfun) {
        this.event.emit('showMsgDialog', msg, onCloseCallfun);
    },
    closeMsgDialog: function () {
        this.event.emit('closeMsgDialog');
    },
    showLoading: function (msg) {
        this.event.emit('showLoading', msg);
    },
    closeLoading: function () {
        this.event.emit('closeLoading');
    },
    updateHeadComponentUser: function (newUser) {
        this.event.emit('updateHeadComponentUser', newUser);
    },
    protectPage: function () {
        this.event.emit('protectPage');
    },
    getOnlineUser: function (callfun) {
        this.event.emit('getOnlineUser', callfun);
    },
    feelerOnlineUser: function (callfun) {
        this.event.emit('feelerOnlineUser', callfun);
    }
};
window.EventsDispatcher = window.VmFrontendEventsDispatcher;
var eventsDispatcher = window.EventsDispatcher;
var EventsDispatcher = eventsDispatcher;


