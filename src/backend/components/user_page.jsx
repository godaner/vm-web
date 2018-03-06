import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import HomePage from "./home_page";
import {Switch, BrowserRouter, HashRouter, Route} from 'react-router-dom';
import {EventEmitter} from 'events';
import "antd/dist/antd.css";
import '../scss/user_page.scss';
import "./events_dispatcher";


var UserPage = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        //set now page's props
        return (
           <div>UserPage</div>
        );
    }
});

export default UserPage;   //将App组件导出
