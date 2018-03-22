import React from "react"; //引入react组件
import {EventEmitter} from "events";
import {ajax, commons} from "./vm_util";
window.eventEmitter = new EventEmitter();
//项目前端事件分发器
window.EventsDispatcher = {
    event: window.eventEmitter,
    showLoginDialog(args) {
        this.event.emit('showLoginDialog', args);
    },
    onRouteEnter (args) {
        this.event.emit('onRouteEnter', args);
    },
    onTagAddSuccess (record) {
        this.event.emit('onTagAddSuccess', record);
    }

};
const eventsDispatcher = window.EventsDispatcher;
const EventsDispatcher = eventsDispatcher;


