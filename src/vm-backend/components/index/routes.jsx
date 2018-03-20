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
                           window.EventsDispatcher.onRouteEnter({
                               pathname: "/movie"
                           })
                           return <MoviePage />;
                       }

                       }/>
                <Route exact path='/movie/filmmaker'
                       render={() => {
                           window.EventsDispatcher.onRouteEnter({
                               pathname: "/movie/filmmaker"
                           })
                           return <FilmmakerPage />;
                       }

                       }/>
                <Route exact path='/movie/tagGroup'
                       render={() => {
                           window.EventsDispatcher.onRouteEnter({
                               pathname: "/movie/tagGroup"
                           })
                           return <TagGroupPage />;
                       }

                       }/>
            </div>
        );
    }
});

export default withRouter(Routes);   //将App组件导出
