import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import {EventEmitter} from 'events';
import "antd/dist/antd.css";
import '../../scss/home/home_page.scss';
import "../base/events_dispatcher";
import {Switch, BrowserRouter, HashRouter, Route, Link,withRouter} from 'react-router-dom';
import {ajax,commons} from "../base/vm_util";


var HomePage = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount(){
    },
    render: function () {
        //set now page's props
        return (
           <div>home_page</div>
        );
    }
});

export default withRouter(HomePage);   //将App组件导出
