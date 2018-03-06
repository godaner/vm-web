import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import {Switch, BrowserRouter, HashRouter, Route} from 'react-router-dom';
import {EventEmitter} from 'events';
import "antd/dist/antd.css";
import '../scss/home_page.scss';
import "./events_dispatcher";


var HomePage = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        //set now page's props
        return (
           <div>home_page</div>
        );
    }
});

export default HomePage;   //将App组件导出
