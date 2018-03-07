import React from "react"; //引入react组件
import {EventEmitter} from "events";
import {ajax,commons} from "./vm_util";
window.event = new EventEmitter();
//项目前端事件分发器
window.EventsDispatcher = {
    event: window.event,
    showLoginDialog(args) {
        this.event.emit('showLoginDialog', args);
    },
    onRouteEnter: function (args) {
        this.event.emit('onRouteEnter', args);
    }

};
var eventsDispatcher = window.EventsDispatcher;
var EventsDispatcher = eventsDispatcher;


