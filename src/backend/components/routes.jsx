import ReactDOM from 'react-dom';
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Form, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import {Switch, BrowserRouter, HashRouter, Route, withRouter} from 'react-router-dom';


import "antd/dist/antd.css";
import '../scss/routes.scss';
import "./events_dispatcher";
import HomePage from "./home_page";
import UserPage from "./user_page";
import {ajax,commons} from "./vm_util";

var Routes = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount(){

    },
    render: function () {
        return (
            <div style={{marginTop: 35, padding: 24, background: '#fff', minHeight: 360}}>
                <Route exact path='/'
                       render={() => {
                           window.EventsDispatcher.onRouteEnter({
                               pathname: "/"
                           })
                           return <HomePage />;
                       }

                       }/>
                <Route exact path='/user'
                       render={() => {
                           window.EventsDispatcher.onRouteEnter({
                               pathname: "/user"
                           })
                           return <UserPage />;
                       }

                       }/>
            </div>
        );
    }
});

export default withRouter(Routes);   //将App组件导出
