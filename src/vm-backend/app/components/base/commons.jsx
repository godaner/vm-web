import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Modal, Menu, Breadcrumb, Form, Icon, Input, Button, Checkbox} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
import {Switch, BrowserRouter, HashRouter, Route} from 'react-router-dom';
import EditFormTemple from "./edit_form_temple";

import "./events_dispatcher";


import "antd/dist/antd.css";
import '../../scss/base/edit_dialog.scss';

import {ajax, commons} from "../base/vm_util";


var Commons = React.createClass({
    getInitialState: function () {
        return {


        };
    },
    registEvents(){

    },
    componentDidMount(){

        this.registEvents();

    },

    render: function () {

        //get props
        const {} = this.props;

        //get state
        const {} = this.state;
        return (
            <div id="commons">

            </div>
        );
    }
})

export default Commons;   //将App组件导出