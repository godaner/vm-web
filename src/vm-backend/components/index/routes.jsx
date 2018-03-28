import React from "react";
import {Form, Layout, Menu} from "antd";
import {Route, withRouter} from "react-router-dom";


import "antd/dist/antd.css";
import "../../scss/base/routes.scss";
import "../base/events_dispatcher";
import UserPage from "../user/user_page";
import HomePage from "../home/home_page";
import UserLoginLogsPage from "../user/user_login_logs_page";
import MoviePage from "../movie/movie_page";
import FilmmakerPage from "../movie/filmmaker_page";
import TagGroupPage from "../movie/tagGroup_page";
import AdminPage from "../admin/admin_page";
import RolePage from "../admin/role_page";
import AdminLoginLogsPage from "../admin/admin_login_logs_page";

const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

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
                           let res = window.EventsDispatcher.onRouteEnter({
                               pathname: "/"
                           })
                           return <HomePage />;
                       }

                       }/>
                <Route exact path='/user'
                       render={() => {
                           let res = window.EventsDispatcher.onRouteEnter({
                               pathname: "/user"
                           })
                           if (isUndefined(res) || res) {

                               return <UserPage />;
                           } else {
                               return <div/>;
                           }
                       }

                       }/>
                <Route exact path='/user/login/logs'
                       render={() => {
                           window.EventsDispatcher.onRouteEnter({
                               pathname: "/user/login/logs"
                           })
                           return <UserLoginLogsPage />;
                       }

                       }/>
                <Route exact path='/movie'
                       render={() => {
                           let res = window.EventsDispatcher.onRouteEnter({
                               pathname: "/movie"
                           });

                           if (isUndefined(res) || res) {

                               return <MoviePage />;
                           } else {
                               return <div/>;
                           }
                       }

                       }/>
                <Route exact path='/movie/filmmaker'
                       render={() => {
                           let res = window.EventsDispatcher.onRouteEnter({
                               pathname: "/movie/filmmaker"
                           });

                           if (isUndefined(res) || res) {

                               return <FilmmakerPage />;
                           } else {
                               return <div/>;
                           }
                       }

                       }/>
                <Route exact path='/movie/tagGroup'
                       render={() => {
                           let res = window.EventsDispatcher.onRouteEnter({
                               pathname: "/movie/tagGroup"
                           });
                           if (isUndefined(res) || res) {

                               return <TagGroupPage />;
                           } else {
                               return <div/>;
                           }
                       }

                       }/>
                <Route exact path='/admin'
                       render={() => {
                           let res = window.EventsDispatcher.onRouteEnter({
                               pathname: "/admin"
                           });
                           if (isUndefined(res) || res) {

                               return <AdminPage />;
                           } else {
                               return <div/>;
                           }
                       }

                       }/>
                <Route exact path='/admin/login/logs'
                       render={() => {
                           let res = window.EventsDispatcher.onRouteEnter({
                               pathname: "/admin/login/logs"
                           });
                           if (isUndefined(res) || res) {

                               return <AdminLoginLogsPage />;
                           } else {
                               return <div/>;
                           }
                       }

                       }/>
                <Route exact path='/admin/role'
                       render={() => {
                           let res = window.EventsDispatcher.onRouteEnter({
                               pathname: "/admin/role"
                           });
                           if (isUndefined(res) || res) {

                               return <RolePage />;
                           } else {
                               return <div/>;
                           }
                       }

                       }/>
            </div>
        );
    }
});

export default withRouter(Routes);   //将App组件导出
