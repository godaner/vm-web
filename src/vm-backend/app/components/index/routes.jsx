import React from "react";
import {Form, Layout, Menu} from "antd";
import {Route, withRouter} from "react-router-dom";
//import "antd/dist/antd.css";
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
        return {
            menuKeys: undefined//undefined说明未执行updateAdminMenuTree，反之已经执行
        };
    },
    componentDidMount(){
        this.registEvents();
    },
    updateMenuKeys(menuKeys){
        this.setState({menuKeys});
    },
    registEvents(){

        window.eventEmitter.on('updateAdminMenuTree', (menuTree) => {//更新routes
            var menuKeys = [];
            if (!isEmptyList(menuTree)) {
                $.each(menuTree, function (i, menu) {
                    $.each(menu.child, function (j, ch) {
                        menuKeys.push(ch.keyProp);
                    });
                });
            }

            this.updateMenuKeys(menuKeys);

        });

    },
    render: function () {
        var {menuKeys} = this.state;

        if (!isUndefined(menuKeys) && !menuKeys.contains(this.props.location.pathname)) {//菜单key不包含当前路径，滚回主页去（防止误入）
            window.EventsDispatcher.backToHomePage();
        }
        if (isUndefined(menuKeys)) {
            menuKeys = [];
        }
        return (
            <div style={{marginTop: 35, padding: 24, background: '#fff', minHeight: 360}}>
                <Route exact path='/'
                       render={() => {
                           window.EventsDispatcher.onRouteEnter({
                               pathname: "/"
                           });


                           return <HomePage />;

                       }

                       }/>

                {
                    menuKeys.contains("/user") ? <Route exact path='/user'
                                                        render={() => {
                                                            window.EventsDispatcher.onRouteEnter({
                                                                pathname: "/user"
                                                            });


                                                            return <UserPage />;

                                                        }

                                                        }/> : <div></div>

                }
                {
                    menuKeys.contains("/user/login/logs") ? <Route exact path='/user/login/logs'
                                                                   render={() => {
                                                                       window.EventsDispatcher.onRouteEnter({
                                                                           pathname: "/user/login/logs"
                                                                       });
                                                                       return <UserLoginLogsPage />;
                                                                   }

                                                                   }/> : <div></div>

                }
                {
                    menuKeys.contains("/movie") ? <Route exact path='/movie'
                                                         render={() => {
                                                             window.EventsDispatcher.onRouteEnter({
                                                                 pathname: "/movie"
                                                             });


                                                             return <MoviePage />;

                                                         }

                                                         }/> : <div></div>

                }
                {
                    menuKeys.contains("/movie/filmmaker") ? <Route exact path='/movie/filmmaker'
                                                                   render={() => {
                                                                       window.EventsDispatcher.onRouteEnter({
                                                                           pathname: "/movie/filmmaker"
                                                                       });


                                                                       return <FilmmakerPage />;

                                                                   }

                                                                   }/> : <div></div>

                }

                {
                    menuKeys.contains("/movie/tagGroup") ? <Route exact path='/movie/tagGroup'
                                                                  render={() => {
                                                                      window.EventsDispatcher.onRouteEnter({
                                                                          pathname: "/movie/tagGroup"
                                                                      });


                                                                      return <TagGroupPage />;

                                                                  }

                                                                  }/> : <div></div>

                }
                {
                    menuKeys.contains("/admin") ? <Route exact path='/admin'
                                                         render={() => {
                                                             window.EventsDispatcher.onRouteEnter({
                                                                 pathname: "/admin"
                                                             });
                                                             return <AdminPage />;
                                                         }

                                                         }/> : <div></div>

                }
                {
                    menuKeys.contains("/admin/login/logs") ? <Route exact path='/admin/login/logs'
                                                                    render={() => {
                                                                        window.EventsDispatcher.onRouteEnter({
                                                                            pathname: "/admin/login/logs"
                                                                        });


                                                                        return <AdminLoginLogsPage />;

                                                                    }

                                                                    }/> : <div></div>

                }
                {
                    menuKeys.contains("/admin/role") ? <Route exact path='/admin/role'
                                                              render={() => {
                                                                  window.EventsDispatcher.onRouteEnter({
                                                                      pathname: "/admin/role"
                                                                  });


                                                                  return <RolePage />;

                                                              }

                                                              }/> : <div></div>

                }

            </div>
        );
    }
});

export default withRouter(Routes);   //将App组件导出
